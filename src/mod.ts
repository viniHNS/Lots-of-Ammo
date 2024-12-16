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
import { ItemType } from "@spt/models/eft/common/tables/ITemplateItem";


class Mod implements IPostDBLoadMod, IPreSptLoadMod
{

    preSptLoad(container: DependencyContainer): void 
    {
        // get the logger from the server container
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.logWithColor("[ViniHNS] Adding loots of Ammo!", LogTextColor.GREEN);
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

        const new9mmAmmoId = [
            "675f634ff132d4b47f2c1281"
        ]

        const caliber9mm = "Caliber9x19PARA";

        /*
        const mags9mm = [
            "624c3074dbbd335e8e6becf3", "630769c4962d0247b029dc60", "630767c37d50ff5e8a1ea71a", "5a7ad2e851dfba0016153692",
            "5a718b548dc32e000d46d262", "63076701a987397c0816d21b", "5a718da68dc32e000d46d264", "5a718f958dc32e00094b97e7",
            "5d2f213448f0355009199284", "5926c3b286f774640d189b6b", "5a351711c4a282000b1521a4", "5cadc2e0ae9215051e1c21e7",
            "576a5ed62459771e9c2096cb", "5de8e8dafd6b4e6e2276dc32", "5de8ea8ffd6b4e6e2276dc35", "5de8eaadbbaf010b10528a6d",
            "5de8eac42a78646d96665d91", "5c5db6552e2216001026119d", "5894a05586f774094708ef75", "5c5db6742e2216000f1b2852",
            "5c5db6652e221600113fba51", "56d59948d2720bb7418b4582", "5c920e902e221644f31c3c99", "602286df23506e50807090c6",
            "599860ac86f77436b225ed1a", "5c0673fb0db8340023300271", "5c0672ed0db834001b7353f3", "5998529a86f774647f44f421",
            "66992713ae08c5c29e0c4f97", "6699271b9950f5f4cd060299", "669927203c4fda6471005cbe", "66992725ae08c5c29e0c4f9a",
            "6699272a3c4fda6471005cc1", "668031ffe3e7eb26e8004cdd", "66866f4ec3d473265104f381", "66866f622a2296a8d9099639"
        ]
        */

        const default9mmId = "56d59d3ad2720bdb418b4577";

        // Object.values lets us grab the 'value' part as an array and ignore the 'key' part
        const item = Object.values(tables.templates.items);

       
        // Use the itemHelper class to assist us in getting only magazines
        // We are filtering all items to only those with a base class of MAGAZINE (5448bc234bdc2d3c308b4569)
        const Allmagazines = item.filter(x => itemHelper.isOfBaseclass(x._id, BaseClasses.MAGAZINE));
        const Magazines9mm = Allmagazines.filter(x => x._props.Cartridges[0]._props.filters[0].Filter.includes(default9mmId));

        // Loop through all magazines
        for (const magazines of Magazines9mm) 
        {
            magazines._props.Cartridges[0]._props.filters[0].Filter.push(...new9mmAmmoId);
            if (config.enableLogs)
            {
                logger2.info(`Added new ammo to the mag: ${magazines._name}`);
            }
        }

        // Loop through all weapons and add the new ammo to the chamber
        for (const weapons of Object.values(tables.templates.items)) 
        {
            const weapClass: string = weapons._props.weapClass;
            const type: ItemType = weapons._type;

            if (weapClass == "" || weapClass == null || type == "Node")
            {
                if (config.enableLogs)
                {
                    logger2.warning(`Skipping ${weapons._name}`);
                }
                continue;
            }
            if (weapons._props.Caliber == caliber9mm)
            {
                weapons._props.Chambers[0]._props.filters[0].Filter.push(...new9mmAmmoId);
                if (config.enableLogs)
                {
                    logger2.info(`Added new ammo to the weapon: ${weapons._name}`);
                }
            }
        }

















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
