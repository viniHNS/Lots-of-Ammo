/* eslint-disable @typescript-eslint/naming-convention */

import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { VFS } from "@spt/utils/VFS";
import { ImporterUtil } from "@spt/utils/ImporterUtil";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import path from "path";
import config from "../config/config.json"
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";


class Mod implements IPostDBLoadMod, IPreSptLoadMod
{

    preSptLoad(container: DependencyContainer): void 
    {
        // get the logger from the server container
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.logWithColor("[ViniHNS] Adding lots of Ammo!", LogTextColor.GREEN);
    }

    public postDBLoad(container: DependencyContainer): void
    {

        const logger2 = container.resolve<ILogger>("WinstonLogger");

        // get database from server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // Get ItemHelper ready to use
        const itemHelper: ItemHelper = container.resolve<ItemHelper>("ItemHelper");

        // Get all the in-memory json found in /assets/database
        const tables: IDatabaseTables = databaseServer.getTables();

        const new9mmAmmoId: string[] = [
            "675f634ff132d4b47f2c1281", "6760722b169af95328139b80", "6760a728fa36a05e723d69e7", "67606fd205e98fee67b22293"
        ];

        const new12gaugeAmmoId: string[] = [
            "67688d2f4c7b7d3afcf1f36e"
        ];

        const new50aeAmmoId: string[] = [
            "676a0831faeabbb1a7dc58f8"
        ];

        const new556AmmoId: string[] = [
            "67689886d281a6080adbdb51"
        ];

        const new357AmmoId: string[] = [
            "67670e9615726ef8b12a8388"
        ];

        const new300BlkAmmoId: string[] = [
            "6761690ac456a89d5bb0d14b", "6761830c70f9c039ee0e73f2"
        ]

        const new338LapuaAmmoId: string[] = [
            "6767352b148c068905b8a911"
        ];

        const new762x51AmmoId: string[] = [
            "67683cf96dd721014a55c205", "676ac1b09ccda4ddc5b1ab96"
        ];

        const caliber9mm: string = "Caliber9x19PARA";
        const caliber300blk: string = "Caliber762x35";
        const caliber357: string = "Caliber9x33R";
        const caliber338lapua: string = "Caliber86x70";
        const caliber762x51: string = "Caliber762x51";
        const caliber12gauge: string = "Caliber12g";
        const caliber556: string = "Caliber556x45NATO";
        const caliber50ae: string = "Caliber127x33";

        const default9mmId: string = "56d59d3ad2720bdb418b4577";
        const default300BlkId: string = "619636be6db0f2477964e710";
        const default357Id: string = "62330b3ed4dc74626d570b95";
        const default338lapuaId: string = "5fc275cf85fd526b824a571a";
        const default762x51Id: string = "58dd3ad986f77403051cba8f";
        const default12gaugeId: string = "560d5e524bdc2d25448b4571";
        const default556Id: string = "54527a984bdc2d4e668b4567";
        const default50aeId: string = "668fe62ac62660a5d8071446";

        // Object.values lets us grab the 'value' part as an array and ignore the 'key' part
        const item: ITemplateItem[]  = Object.values(tables.templates.items);

       
        // Use the itemHelper class to assist us in getting only magazines
        // We are filtering all items to only those with a base class of MAGAZINE (5448bc234bdc2d3c308b4569)
        const allMagazines: ITemplateItem[] = item.filter(x => itemHelper.isOfBaseclass(x._id, BaseClasses.MAGAZINE));
        
        const magazines9mm: ITemplateItem[] = allMagazines.filter(x => x._props.Cartridges[0]._props.filters[0].Filter.includes(default9mmId));
        const magazines300Blk: ITemplateItem[] = allMagazines.filter(x => x._props.Cartridges[0]._props.filters[0].Filter.includes(default300BlkId));
        const magazines357: ITemplateItem[] = allMagazines.filter(x => x._props.Cartridges[0]._props.filters[0].Filter.includes(default357Id));
        const magazines338lapua: ITemplateItem[] = allMagazines.filter(x => x._props.Cartridges[0]._props.filters[0].Filter.includes(default338lapuaId));
        const magazines762x51: ITemplateItem[] = allMagazines.filter(x => x._props.Cartridges[0]._props.filters[0].Filter.includes(default762x51Id));
        const magazines12gauge: ITemplateItem[] = allMagazines.filter(x => x._props.Cartridges[0]._props.filters[0].Filter.includes(default12gaugeId));
        const magazines556: ITemplateItem[] = allMagazines.filter(x => x._props.Cartridges[0]._props.filters[0].Filter.includes(default556Id));
        const magazines50ae: ITemplateItem[] = allMagazines.filter(x => x._props.Cartridges[0]._props.filters[0].Filter.includes(default50aeId));

        const weapons9mm: ITemplateItem[] = item.filter(x => x._props?.ammoCaliber === caliber9mm);
        const weapons300Blk: ITemplateItem[] = item.filter(x => x._props?.ammoCaliber === caliber300blk);
        const weapons357: ITemplateItem[] = item.filter(x => x._props?.ammoCaliber === caliber357);
        const weapons338lapua: ITemplateItem[] = item.filter(x => x._props?.ammoCaliber === caliber338lapua);
        const weapons762x51: ITemplateItem[] = item.filter(x => x._props?.ammoCaliber === caliber762x51);
        const weapons12gauge: ITemplateItem[] = item.filter(x => x._props?.ammoCaliber === caliber12gauge);
        const weapons556: ITemplateItem[] = item.filter(x => x._props?.ammoCaliber === caliber556);
        const weapons50ae: ITemplateItem[] = item.filter(x => x._props?.ammoCaliber === caliber50ae);

        // Loop through all 9mm magazines
        for (const magazines of magazines9mm) 
        {
            magazines._props.Cartridges[0]._props.filters[0].Filter.push(...new9mmAmmoId);
            if (config.enableLogs)
            {
                logger2.debug(`[Lots of Ammo] Added new ammo to the 9mm mag: ${magazines._name}`);
            }
        }

        // Loop through all 300Blk magazines
        for (const magazines of magazines300Blk) 
        {
            magazines._props.Cartridges[0]._props.filters[0].Filter.push(...new300BlkAmmoId);
            if (config.enableLogs)
            {
                logger2.debug(`[Lots of Ammo] Added new ammo to the 300Blk mag: ${magazines._name}`);
            }
        }

        // Loop through all 338Lapua magazines
        for (const magazines of magazines338lapua) 
        {
            magazines._props.Cartridges[0]._props.filters[0].Filter.push(...new338LapuaAmmoId);
            if (config.enableLogs)
            {
                logger2.debug(`[Lots of Ammo] Added new ammo to the 338Lapua mag: ${magazines._name}`);
            }
        }

        // Loop through all 357 magazines
        for (const magazines of magazines357) 
        {
            magazines._props.Cartridges[0]._props.filters[0].Filter.push(...new357AmmoId);
            if (config.enableLogs)
            {
                logger2.debug(`[Lots of Ammo] Added new ammo to the 357 mag: ${magazines._name}`);
            }
            if (magazines._id === "619f54a1d25cbd424731fb99") // Chiappa Rhino .357 6-round cylinder
            {
                magazines._props.Slots?.forEach(slot => 
                {
                    slot?._props?.filters?.[0]?.Filter?.push(...new357AmmoId);
                });
            }    
        }

        // Loop through all 762x51 magazines
        for (const magazines of magazines762x51) 
        {
            magazines._props.Cartridges[0]._props.filters[0].Filter.push(...new762x51AmmoId);
            if (config.enableLogs)
            {
                logger2.debug(`[Lots of Ammo] Added new ammo to the 762x51 mag: ${magazines._name}`);
            }
        }

        // Loop through all 12gauge magazines
        for (const magazines of magazines12gauge) 
        {
            magazines._props.Cartridges[0]._props.filters[0].Filter.push(...new12gaugeAmmoId);
            if (config.enableLogs)
            {
                logger2.debug(`[Lots of Ammo] Added new ammo to the 12gauge mag: ${magazines._name}`);
            }
        }

        // Loop through all 556 magazines
        for (const magazines of magazines556) 
        {
            magazines._props.Cartridges[0]._props.filters[0].Filter.push(...new556AmmoId);
            if (config.enableLogs)
            {
                logger2.debug(`[Lots of Ammo] Added new ammo to the 556 mag: ${magazines._name}`);
            }
        }

        // Loop through all 50ae magazines
        for (const magazines of magazines50ae) 
        {
            magazines._props.Cartridges[0]._props.filters[0].Filter.push(...new50aeAmmoId);
            if (config.enableLogs)
            {
                logger2.debug(`[Lots of Ammo] Added new ammo to the 50ae mag: ${magazines._name}`);
            }
        }

        // Loop through all weapons and add the new ammo to the chamber
        for (const weapons of weapons9mm) 
        {
            if (weapons?._props?.Chambers?.[0]?._props?.filters?.[0]?.Filter)
            {
                weapons._props.Chambers[0]._props.filters[0].Filter.push(...new9mmAmmoId);
                if (config.enableLogs) 
                {
                    logger2.debug(`[Lots of Ammo] Added new ammo to the weapon: ${weapons._name}`);
                }
            }
        }

        for (const weapons of weapons556)
        {
            if (weapons?._props?.Chambers?.[0]?._props?.filters?.[0]?.Filter)
            {
                weapons._props.Chambers[0]._props.filters[0].Filter.push(...new556AmmoId);
                if (config.enableLogs)
                {
                    logger2.debug(`[Lots of Ammo] Added new ammo to the weapon: ${weapons._name}`);
                }
            }
        }

        for (const weapons of weapons12gauge)
        {
            if (weapons?._props?.Chambers?.[0]?._props?.filters?.[0]?.Filter)
            {
                weapons._props.Chambers[0]._props.filters[0].Filter.push(...new12gaugeAmmoId);
                if (config.enableLogs)
                {
                    logger2.debug(`[Lots of Ammo] Added new ammo to the weapon: ${weapons._name}`);
                }
                if (weapons?._props?.Chambers?.[1])
                {
                    weapons._props.Chambers[1]._props.filters[0].Filter.push(...new12gaugeAmmoId);
                }
            }
        }

        for (const weapons of weapons50ae)
        {
            if (weapons?._props?.Chambers?.[0]?._props?.filters?.[0]?.Filter)
            {
                weapons._props.Chambers[0]._props.filters[0].Filter.push(...new50aeAmmoId);
                if (config.enableLogs)
                {
                    logger2.debug(`[Lots of Ammo] Added new ammo to the weapon: ${weapons._name}`);
                }
            }
        }

        for (const weapons of weapons300Blk) 
        {
            if (weapons?._props?.Chambers?.[0]?._props?.filters?.[0]?.Filter)
            {
                weapons._props.Chambers[0]._props.filters[0].Filter.push(...new300BlkAmmoId);
                if (config.enableLogs)
                {
                    logger2.debug(`[Lots of Ammo] Added new ammo to the weapon: ${weapons._name}`);
                }
            }
        }

        for (const weapons of weapons338lapua) 
        {
            if (weapons?._props?.Chambers?.[0]?._props?.filters?.[0]?.Filter)
            {
                weapons._props.Chambers[0]._props.filters[0].Filter.push(...new338LapuaAmmoId);
                if (config.enableLogs)
                {
                    logger2.debug(`[Lots of Ammo] Added new ammo to the weapon: ${weapons._name}`);
                }
            }
        }

        for (const weapons of weapons357) 
        {
            if (weapons?._props?.Chambers?.[0]?._props?.filters?.[0]?.Filter)
            {
                weapons._props.Chambers[0]._props.filters[0].Filter.push(...new357AmmoId);
                if (config.enableLogs) 
                {
                    logger2.debug(`[Lots of Ammo] Added new ammo to the weapon: ${weapons._name}`);
                }
            }
        }

        for (const weapons of weapons762x51) 
        {
            if (weapons?._props?.Chambers?.[0]?._props?.filters?.[0]?.Filter)
            {
                weapons._props.Chambers[0]._props.filters[0].Filter.push(...new762x51AmmoId);
                if (config.enableLogs) 
                {
                    logger2.debug(`[Lots of Ammo] Added new ammo to the weapon: ${weapons._name}`);
                }
            }
        }

        //add oil filter supressor to the makarov threaded barrel
        tables.templates.items["579204f224597773d619e051"]._props.Slots[1]._props.filters[0].Filter.push("6766bdb3e654a22d0549ec85")

        // -----------------------------------------------------------------------------------------------------------------------------------

        // Thanks TRON <3
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const ImporterUtil = container.resolve<ImporterUtil>("ImporterUtil");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const VFS = container.resolve<VFS>("VFS");
        const locales = db.locales.global;
        const items = db.templates.items;
        const handbook = db.templates.handbook.Items;
        const modPath = path.resolve(__dirname.toString()).split(path.sep).join("/")+"/";

        const mydb = ImporterUtil.loadRecursive(`${modPath}../db/`);

        const itemPath = `${modPath}../db/templates/items/`;
        const handbookPath = `${modPath}../db/templates/handbook/`;

        const buffs = db.globals.config.Health.Effects.Stimulator.Buffs


        for(const itemFile in mydb.templates.items) {
            const item = JsonUtil.deserialize(VFS.readFile(`${itemPath}${itemFile}.json`));
            const hb = JsonUtil.deserialize(VFS.readFile(`${handbookPath}${itemFile}.json`));

            const itemId = item._id;
            //logger.info(itemId);

            items[itemId] = item;
            //logger.info(hb.ParentId);
            //logger.info(hb.Price);
            handbook.push({
                "Id": itemId,
                "ParentId": hb.ParentId,
                "Price": hb.Price
            });
        }
        for (const trader in mydb.traders.assort) {
            const traderAssort = db.traders[trader].assort
            
            for (const item of mydb.traders.assort[trader].items) {
                traderAssort.items.push(item);
            }
    
            for (const bc in mydb.traders.assort[trader].barter_scheme) {
                traderAssort.barter_scheme[bc] = mydb.traders.assort[trader].barter_scheme[bc];
            }
    
            for (const level in mydb.traders.assort[trader].loyal_level_items) {
                traderAssort.loyal_level_items[level] = mydb.traders.assort[trader].loyal_level_items[level];
            }
        }
        //logger.info("Test");
        // default localization
        for (const localeID in locales)
        {
            for (const id in mydb.locales.en.templates) {
                const item = mydb.locales.en.templates[id];
                //logger.info(item);
                for(const locale in item) {
                    //logger.info(locale);
                    //logger.info(item[locale]);
                    //logger.info(`${id} ${locale}`);
                    locales[localeID][`${id} ${locale}`] = item[locale];
                }
            }

            for (const id in mydb.locales.en.preset) {
                const item = mydb.locales.en.preset[id];
                for(const locale in item) {
                    //logger.info(`${id} ${locale}`);
                    locales[localeID][`${id}`] = item[locale];
                }
            }
        }

        for (const localeID in mydb.locales)
        {
            for (const id in mydb.locales[localeID].templates) {
                const item = mydb.locales[localeID].templates[id];
                //logger.info(item);
                for(const locale in item) {
                    locales[localeID][`${id}`] = item[locale];
                }
            }

            for (const id in mydb.locales[localeID].preset) {
                const item = mydb.locales[localeID].preset[id];
                for(const locale in item) {
                    //logger.info(`${id} ${locale}`);
                    locales[localeID][`${id} ${locale}`] = item[locale];
                }
                
            }

        }
    }
}

export const mod = new Mod();
