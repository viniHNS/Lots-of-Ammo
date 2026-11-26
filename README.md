<div align="center">

# Lots of Ammo

The ammo base for SPT 4.1.6: 50 new cartridges in 14 calibers and two 5.56x45 M855 ammo boxes, loaded into every magazine, chamber and cylinder that takes the caliber.

![Version](https://img.shields.io/badge/version-2.0.0-orange?style=flat)
![SPT](https://img.shields.io/badge/SPT-4.1.6-blue?style=flat)
![WTT-CommonLib](https://img.shields.io/badge/WTT--CommonLib-3.0.6-purple?style=flat)
![.NET](https://img.shields.io/badge/.NET-10-512BD4?style=flat&logo=dotnet)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

[Features](#features) · [Install](#install) · [Ammo](#ammo) · [Shared with MSGA](#shared-with-make-shotguns-great-again) · [Ammo boxes](#ammo-boxes) · [As a dependency](#using-it-as-a-dependency) · [Build](#build-from-source) · [Credits](#credits)

</div>

---

## Features

- **50 cartridges** with their own models, stats, handbook prices and English names, most of them also in Brazilian Portuguese.
- **Every gun that takes the caliber can use them.** For the calibers that already exist in the game (9x19, .300 Blackout, .357 Magnum, .338 Lapua, 7.62x51, 5.56x45, .50 AE, 12/70) the rounds are added to the same magazines, chambers and revolver cylinders as the cartridge they are based on. The .50 Beowulf, 10mm Auto, .458 SOCOM, .45-70, .410 and .700 Nitro Express rounds are listed by the guns of those calibers themselves, and the .410 and .700 Nitro rounds have no gun of their own here: they are ammo for other mods to build guns around.
- **Two 5.56x45 M855 ammo boxes**: a steel can with 420 rounds and a wooden crate with 1200.
- **Plays well with Make Shotguns Great Again.** The 12/70, .410 and .700 Nitro rounds from [Make Shotguns Great Again](https://github.com/viniHNS/Make-Shotguns-Great-Again) are included here with the same item ids, and are only registered when that mod is not installed. It does not need this mod, and this mod does not need it.
- **No trader offers.** The mod only registers the items; other mods (like [Little Addons](https://github.com/viniHNS/Little-Addons), which sells its rounds) decide where they are sold. Most of the 12/70 rounds and the .700 Nitro FMJ can also turn up as loot, as they do in Make Shotguns Great Again (see [Shared with MSGA](#shared-with-make-shotguns-great-again)).
- **Server-only.** There is no BepInEx plugin.

---

## Install

Install [WTT-CommonLib](https://github.com/WelcomeToThursday/WTT-CommonLib) **3.0.6** or newer (3.0.x) first. Then extract `LotsOfAmmo.zip` into your SPT game folder:

```
<game folder>/
└── SPT_Runtime/user/mods/LotsOfAmmo/
    ├── LotsOfAmmo.dll
    ├── bundles.json
    ├── bundles/                    52 bundles: models and textures
    │   └── shared/msga/            16 copies of the Make Shotguns Great Again rounds
    └── db/
        ├── CustomItems/            one file per caliber
        ├── SharedItems/msga/       12/70, .410 and .700 Nitro (only loaded without MSGA)
        └── SharedLocales/msga/     the ".410" caliber name (only loaded without MSGA)
```

> **Little Addons** needs this mod from its next release on. Without it the server refuses to start any mod.

---

## Ammo

Damage, penetration, armor damage and velocity are the values the mod sets (the rest comes from the round it is based on); handbook prices are in roubles.

### 9x19mm

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| 9x19mm Hornady Critical Defense FTX® | 78 | 10 | 24 | 347 | 260 |
| 9x19mm Federal HST | 80 | 15 | 30 | 351 | 350 |
| 9x19mm Soft Point (SP) | 68 | 13 | 30 | 360 | 90 |
| 9x19mm Tula | 63 | 15 | 32 | 350 | 45 |

### .300 Blackout

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| .300 Blackout TAC-TX | 80 | 25 | 35 | 716 | 260 |
| .300 Blackout TCX | 98 | 10 | 20 | 716 | 300 |

### .357 Magnum

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| .357 Magnum FMJ +P+ | 71 | 40 | 47 | 420 | 330 |

### .338 Lapua Magnum

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| .338 Lapua Magnum SP | 168 | 25 | 62 | 849 | 760 |

### 7.62x51mm

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| 7.62x51mm M118LR Match | 88 | 33 | 48 | 808 | 360 |

### 5.56x45mm

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| 5.56x45mm Polymer Case | 54 | 31 | 37 | 922 | 220 |

### .50 AE

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| .50 AE AP | 70 | 50 | 65 | 470 | 1,150 |

### .50 Beowulf

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| .50 Beowulf FMJ | 114 | 27 | 52 | 560 | 520 |
| .50 Beowulf HP | 140 | 9 | 30 | 541 | 480 |
| .50 Beowulf Hydra-Shok JHP | 128 | 15 | 36 | 550 | 500 |
| .50 Beowulf AP | 96 | 46 | 66 | 540 | 1,050 |
| .50 Beowulf Canister | 30 | 3 | 24 | 420 | 420 |
| .50 Beowulf FTX | 122 | 20 | 42 | 546 | 640 |
| .50 Beowulf Xtreme Penetrator | 112 | 35 | 58 | 541 | 1,150 |

### 10mm Auto

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| 10mm Auto FMJ | 75 | 28 | 42 | 355 | 140 |
| 10mm Auto XTP JHP | 95 | 14 | 28 | 389 | 170 |
| 10mm Auto Xtreme Penetrator | 64 | 33 | 48 | 457 | 420 |
| 10mm Auto AP | 60 | 42 | 56 | 410 | 640 |

### .458 SOCOM

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| .458 SOCOM FMJ | 106 | 31 | 50 | 503 | 490 |
| .458 SOCOM HP | 130 | 10 | 28 | 579 | 460 |
| .458 SOCOM SP | 118 | 19 | 38 | 511 | 480 |
| .458 SOCOM MFX | 110 | 25 | 44 | 564 | 610 |
| .458 SOCOM Controlled Fracturing | 124 | 14 | 32 | 518 | 760 |
| .458 SOCOM Xtreme Penetrator | 104 | 39 | 60 | 561 | 1,100 |

### .45-70 Government

| Round | Damage | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: |
| .45-70 Govt Core-Lokt SP | 132 | 18 | 40 | 405 | 420 |
| .45-70 Govt FTX | 138 | 24 | 46 | 625 | 620 |
| .45-70 Govt JHP | 158 | 10 | 30 | 640 | 550 |
| .45-70 Govt Hard Cast | 126 | 36 | 62 | 587 | 980 |
| .45-70 Govt Xtreme Penetrator | 118 | 43 | 66 | 640 | 1,270 |
| .45-70 Govt AP | 108 | 52 | 78 | 701 | 1,780 |

---

## Shared with Make Shotguns Great Again

These 16 rounds exist in both mods **with the same item ids, stats and models**. **If [Make Shotguns Great Again](https://github.com/viniHNS/Make-Shotguns-Great-Again) is installed, they come from it** and this mod registers none of them (its own copy of the bundles stays unused). Without it, this mod registers them, so the ids always exist and a profile keeps its cartridges if you install or remove Make Shotguns Great Again later.

The copies carry the same loot and secure-container settings the rounds have in Make Shotguns Great Again and the default stack sizes of its `ammoStackSizes` (12/70 and .410 stacks of 20, .700 Nitro stacks of 10). They have **no trader offers, no hideout recipes and no bot loadouts**: those stay in Make Shotguns Great Again.

Two rounds of Make Shotguns Great Again are **not** here and stay exclusive to it, because they need its code: the 12/70 'Hellfire' hybrid buckshot (its spark effect is drawn by that mod's client plugin) and the 5.45x39 'Svalka' anti-drone buckshot (that mod adds it to the assault rifles).

Rounds like the .410 and .700 Nitro have no gun here; the guns are in Make Shotguns Great Again.

### 12/70

| Round | Damage | Pellets | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 12/70 Winchester Super-X 00 buckshot | 39 | 6 | 4 | 28 | 415 | 40 |
| 12/70 Magnum Express Kinghunter | 54 | 9 | 4 | 33 | 385 | 50 |
| 12/70 armor-piercing Slug “SVAROG” | 155 | 1 | 40 | 71 | 510 | 800 |
| 12/70 Flechette Kinghunter | 23 | 10 | 35 | 28 | 320 | 351 |
| 12/70 7mm Buckshot Brass Case | 41 | 10 | 2 | 22 | 415 | 24 |
| 12/70 'FRAG-12' | 203 | 1 | 30 | 60 | 320 | 1,200 |

### .410

| Round | Damage | Pellets | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| .410/76 lead birdshot | 10 | 20 | 0 | 2 | 330 | 85 |
| .410/76 000 buckshot | 35 | 5 | 3 | 10 | 330 | 155 |
| .410/76 lead slug | 95 | 1 | 14 | 30 | 420 | 190 |
| .410/65 lead birdshot | 10 | 15 | 0 | 2 | 350 | 70 |
| .410/65 000 buckshot | 35 | 3 | 3 | 10 | 330 | 125 |
| .410/65 lead slug | 80 | 1 | 12 | 25 | 425 | 155 |

### .700 Nitro Express

| Round | Damage | Pellets | Penetration | Armor damage | Muzzle velocity (m/s) | Handbook (RUB) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| .700 Nitro Express FMJ | 280 | 1 | 19 | 600 | 605 | 1,710 |
| .700 Nitro Express SP "Mammoth" | 430 | 1 | 15 | 90 | 605 | 2,800 |
| .700 Nitro Express AP "Goliath" | 220 | 1 | 60 | 100 | 605 | 8,000 |
| .700 Nitro Express buckshot "Cerberus" | 65 | 8 | 8 | 35 | 605 | 3,600 |

Pellets is the number of projectiles per shot.

---

## Ammo Boxes

- **5.56x45mm M855 Ammo Can (420 pcs)**: holds 420 rounds of 5.56x45mm M855, handbook price 96,759 RUB, weight 7.1 kg (empty), 2x2 slots.
- **5.56x45mm M855 Ammo Box (1200 pcs)**: holds 1200 rounds of 5.56x45mm M855, handbook price 290,321 RUB, weight 12.1 kg (empty), 4x2 slots.

---

## Using It as a Dependency

The mod is meant to be the ammo base of other mods. Declare it in your `ModMetadata` and the server refuses to start your mod when it is missing:

```csharp
public Dictionary<string, Range>? ModDependencies { get; init; } = new()
{
    { "com.wtt.commonlib", new Range("~3.0.6") },
    { "com.vinihns.lotsofammo", new Range("~2.0.0") },
};
```

- **ModGuid** `com.vinihns.lotsofammo`, **version range** `~2.0.0` (item ids never change inside the 2.x line; new rounds may be added).
- **Load order.** Its loader runs at `OnLoadOrder.Preload + 1`, right after WTT-CommonLib, so every id exists when a loader at `Preload + 2` or later runs. Use that for filters, presets and offers that mention these ids.
- **Using the ids.** List the item ids in your `Chambers`, `Cartridges` or `defAmmo` as usual. To sell a round, put an offer in your own `db/CustomAssortSchemes` (WTT-CommonLib) with the round's id as `_tpl`; `addtoTraders` in `db/CustomItems` only works for items created in the same file. Little Addons does exactly that.
- **Ids that are always there.** The 16 shared rounds exist whether or not Make Shotguns Great Again is installed, so your mod can depend on them too.

---

## Build from Source

Requires the .NET 10 SDK.

> The project deploys straight into `D:\Jogos\SPT4.1\SPT_Runtime\user\mods` when that folder exists. Close the SPT server first (it locks the DLL) and change `SptModsDir` in `Server/LotsOfAmmo.csproj` if your game is somewhere else.

```
dotnet build LotsOfAmmo.sln -c Debug     # build + deploy
dotnet build LotsOfAmmo.sln -c Release   # also writes LotsOfAmmo.zip next to the solution
```

### Project Structure

```
Lots-of-Ammo/
├── LotsOfAmmo.sln
└── Server/
    ├── LotsOfAmmo.csproj
    ├── Mod.cs                  mod metadata
    ├── LotsOfAmmoLoader.cs     registers the items through WTT-CommonLib
    ├── bundles.json
    ├── bundles/                (shared/msga/ holds the Make Shotguns Great Again copies)
    └── db/
        ├── CustomItems/        one file per caliber
        ├── SharedItems/msga/   rounds shared with Make Shotguns Great Again
        └── SharedLocales/msga/
```

---

## Credits

- Items are registered with [WTT-CommonLib](https://github.com/WelcomeToThursday/WTT-CommonLib).
- The 12/70, .410 and .700 Nitro rounds come from Make Shotguns Great Again, where their models are credited to: 12/70 Winchester Super-X 00 buckshot, [Guy in a Poncho](https://sketchfab.com/ponchoguy); 12/70 AP Slug SVAROG, Flechette Kinghunter and Magnum Express Kinghunter, [Deadcomrade](https://sketchfab.com/deadcomrade).

## License

[MIT](LICENCE). The license covers the code and the data of the mod; third-party models listed in Credits keep the terms of their authors.
