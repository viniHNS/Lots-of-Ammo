/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/naming-convention */

import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import config from "../config/config.json";
import path from "path";
import fs from "fs";

class Mod implements IPostDBLoadMod, IPreSptLoadMod {
    private readonly MOD_NAME = "[ViniHNS] Lots of Ammo";
    
    // Ammo IDs by caliber
    private readonly AMMO_IDS = {
        NEW_9MM: [
            "675f634ff132d4b47f2c1281",
            "6760722b169af95328139b80", 
            "6760a728fa36a05e723d69e7",
            "67606fd205e98fee67b22293"
        ],
        NEW_12GAUGE: ["67688d2f4c7b7d3afcf1f36e"],
        NEW_50AE: ["676a0831faeabbb1a7dc58f8"],
        NEW_556: ["67689886d281a6080adbdb51"],
        NEW_357: ["67670e9615726ef8b12a8388"],
        NEW_300BLK: [
            "6761690ac456a89d5bb0d14b",
            "6761830c70f9c039ee0e73f2"
        ],
        NEW_338LAPUA: ["6767352b148c068905b8a911"],
        NEW_762X51: [
            "67683cf96dd721014a55c205",
            "676ac1b09ccda4ddc5b1ab96"
        ]
    };

    // Caliber constants
    private readonly CALIBERS = {
        "9MM": "Caliber9x19PARA",
        "300BLK": "Caliber762x35",
        "357": "Caliber9x33R",
        "338LAPUA": "Caliber86x70",
        "762X51": "Caliber762x51",
        "12GAUGE": "Caliber12g",
        "556": "Caliber556x45NATO",
        "50AE": "Caliber127x33"
    };

    // Default ammo IDs for filtering
    private readonly DEFAULT_AMMO_IDS = {
        "9MM": "56d59d3ad2720bdb418b4577",
        "300BLK": "619636be6db0f2477964e710",
        "357": "62330b3ed4dc74626d570b95",
        "338LAPUA": "5fc275cf85fd526b824a571a",
        "762X51": "58dd3ad986f77403051cba8f",
        "12GAUGE": "560d5e524bdc2d25448b4571",
        "556": "54527a984bdc2d4e668b4567",
        "50AE": "668fe62ac62660a5d8071446"
    };

    // Special items
    private readonly SPECIAL_ITEMS = {
        MAKAROV_THREADED_BARREL: "579204f224597773d619e051",
        OIL_FILTER_SUPPRESSOR: "6766bdb3e654a22d0549ec85",
        CHIAPPA_RHINO_CYLINDER: "619f54a1d25cbd424731fb99"
    };

    preSptLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.logWithColor(`${this.MOD_NAME}: Loading...`, LogTextColor.GREEN);
    }

    public postDBLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        
        try {
            const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
            const tables = databaseServer.getTables();
            const itemHelper = container.resolve<ItemHelper>("ItemHelper");

            // Apply ammo modifications
            this.addAmmoToMagazines(tables, itemHelper, logger);
            this.addAmmoToWeapons(tables, itemHelper, logger);
            this.addSpecialModifications(tables);
            this.loadCustomDatabase(container);

            logger.logWithColor(`${this.MOD_NAME}: Loading complete.`, LogTextColor.GREEN);
        } catch (error) {
            logger.error(`${this.MOD_NAME}: Error during loading: ${error}`);
        }
    }

    private addAmmoToMagazines(tables: IDatabaseTables, itemHelper: ItemHelper, logger: ILogger): void {
        const items = Object.values(tables.templates.items);
        const allMagazines = items.filter(x => itemHelper.isOfBaseclass(x._id, BaseClasses.MAGAZINE));

        

        // Process each caliber
        Object.keys(this.CALIBERS).forEach(caliberKey => {
            const defaultAmmoId = this.DEFAULT_AMMO_IDS[caliberKey];
            const newAmmoIds = this.AMMO_IDS[`NEW_${caliberKey}`];
            
            if (!defaultAmmoId || !newAmmoIds) return;

            const magazines = allMagazines.filter(magazine => 
                magazine._props.Cartridges?.[0]?._props?.filters?.[0]?.Filter?.includes(defaultAmmoId)
            );

            magazines.forEach(magazine => {
                magazine._props.Cartridges[0]._props.filters[0].Filter.push(...newAmmoIds);
                
                if (config.enableLogs) {
                    logger.debug(`${this.MOD_NAME}: Added new ${caliberKey} ammo to magazine: ${magazine._name}`);
                }

                // Special case for Chiappa Rhino cylinder
                if (magazine._id === this.SPECIAL_ITEMS.CHIAPPA_RHINO_CYLINDER && caliberKey === "357") {
                    magazine._props.Slots?.forEach(slot => {
                        slot?._props?.filters?.[0]?.Filter?.push(...newAmmoIds);
                    });
                }  
            });
        });

        // Special case for MTS-255 cylinder (12 gauge)
        const mts255Cylinder = tables.templates.items["60dc519adf4c47305f6d410d"]; // MTS-255 cylinder ID
        if (mts255Cylinder && this.AMMO_IDS.NEW_12GAUGE) {
            for (let i = 0; i < 5; i++) {
                if (mts255Cylinder._props.Slots?.[i]?._props?.filters?.[0]?.Filter) {
                    mts255Cylinder._props.Slots[i]._props.filters[0].Filter.push(...this.AMMO_IDS.NEW_12GAUGE);
                }
            }
        }
    }

    private addAmmoToWeapons(tables: IDatabaseTables, itemHelper: ItemHelper, logger: ILogger): void {
        const items = Object.values(tables.templates.items);

        // Process each caliber for weapons
        Object.keys(this.CALIBERS).forEach(caliberKey => {
            const caliberName = this.CALIBERS[caliberKey];
            const newAmmoIds = this.AMMO_IDS[`NEW_${caliberKey}`];
            
            if (!caliberName || !newAmmoIds) return;

            const weapons = items.filter(item => item._props?.ammoCaliber === caliberName);

            weapons.forEach(weapon => {
                if (weapon?._props?.Chambers?.[0]?._props?.filters?.[0]?.Filter) {
                    weapon._props.Chambers[0]._props.filters[0].Filter.push(...newAmmoIds);
                    
                    if (config.enableLogs) {
                        logger.debug(`${this.MOD_NAME}: Added new ${caliberKey} ammo to weapon: ${weapon._name}`);
                    }

                    // Special case for double-barrel shotguns (second chamber)
                    if (caliberKey === "12GAUGE" && weapon._props.Chambers[1]) {
                        weapon._props.Chambers[1]._props.filters[0].Filter.push(...newAmmoIds);
                    }
                }
            });
        });
    }

    private addSpecialModifications(tables: IDatabaseTables): void {
        // Add oil filter suppressor to Makarov threaded barrel
        const makarovBarrel = tables.templates.items[this.SPECIAL_ITEMS.MAKAROV_THREADED_BARREL];
        if (makarovBarrel?._props?.Slots?.[1]?._props?.filters?.[0]?.Filter) {
            makarovBarrel._props.Slots[1]._props.filters[0].Filter.push(this.SPECIAL_ITEMS.OIL_FILTER_SUPPRESSOR);
        }
    }

    private loadCustomDatabase(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        
        const modPath = path.resolve(__dirname, "../");
        const dbPath = path.join(modPath, "db");
        
        if (!fs.existsSync(dbPath)) {
            logger.warning(`${this.MOD_NAME}: Database folder not found at ${dbPath}`);
            return;
        }

        try {
            const customDb = this.loadRecursive(dbPath, jsonUtil, logger);
            this.processCustomItems(customDb, db, jsonUtil);
            this.processTraderAssorts(customDb, db);
            this.processLocalizations(customDb, db);
        } catch (error) {
            logger.error(`${this.MOD_NAME}: Error loading custom database: ${error}`);
        }
    }

    private loadRecursive(dirPath: string, jsonUtil: JsonUtil, logger: ILogger): any {
        const result: any = {};
        
        const loadDirectory = (currentPath: string, obj: any): void => {
            if (!fs.existsSync(currentPath)) return;
            
            fs.readdirSync(currentPath).forEach(file => {
                const fullPath = path.join(currentPath, file);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    obj[file] = {};
                    loadDirectory(fullPath, obj[file]);
                } else if (file.endsWith('.json')) {
                    const fileName = file.replace('.json', '');
                    try {
                        obj[fileName] = jsonUtil.deserialize(fs.readFileSync(fullPath, 'utf8'));
                    } catch (error) {
                        logger.error(`${this.MOD_NAME}: Error loading ${fullPath}: ${error}`);
                    }
                }
            });
        };
        
        loadDirectory(dirPath, result);
        return result;
    }

    private processCustomItems(customDb: any, db: any, jsonUtil: JsonUtil): void {
        if (!customDb.templates?.items) return;

        Object.keys(customDb.templates.items).forEach(itemFile => {
            const item = customDb.templates.items[itemFile];
            const handbook = customDb.templates.handbook?.[itemFile];
            
            if (item && handbook) {
                db.templates.items[item._id] = item;
                db.templates.handbook.Items.push({
                    Id: item._id,
                    ParentId: handbook.ParentId,
                    Price: handbook.Price
                });
            }
        });
    }

    private processTraderAssorts(customDb: any, db: any): void {
        if (!customDb.traders?.assort) return;

        Object.keys(customDb.traders.assort).forEach(traderId => {
            const traderAssort = db.traders[traderId]?.assort;
            const customAssort = customDb.traders.assort[traderId];
            
            if (traderAssort && customAssort) {
                if (customAssort.items) traderAssort.items.push(...customAssort.items);
                if (customAssort.barter_scheme) Object.assign(traderAssort.barter_scheme, customAssort.barter_scheme);
                if (customAssort.loyal_level_items) Object.assign(traderAssort.loyal_level_items, customAssort.loyal_level_items);
            }
        });
    }

    private processLocalizations(customDb: any, db: any): void {
        if (!customDb.locales) return;

        const locales = db.locales.global;
        
        // Process default English localization
        if (customDb.locales.en) {
            Object.keys(locales).forEach(localeId => {
                this.processLocaleData(customDb.locales.en, locales[localeId]);
            });
        }

        // Process specific localizations
        Object.keys(customDb.locales).forEach(localeKey => {
            if (localeKey !== 'en' && locales[localeKey]) {
                this.processLocaleData(customDb.locales[localeKey], locales[localeKey]);
            }
        });
    }

    private processLocaleData(sourceLocale: any, targetLocale: any): void {
        if (sourceLocale.templates) {
            Object.keys(sourceLocale.templates).forEach(id => {
                const item = sourceLocale.templates[id];
                Object.keys(item).forEach(key => {
                    targetLocale[`${id} ${key}`] = item[key];
                });
            });
        }

        if (sourceLocale.preset) {
            Object.keys(sourceLocale.preset).forEach(id => {
                const item = sourceLocale.preset[id];
                Object.keys(item).forEach(key => {
                    targetLocale[id] = item[key];
                });
            });
        }
    }
}

module.exports = { mod: new Mod() };