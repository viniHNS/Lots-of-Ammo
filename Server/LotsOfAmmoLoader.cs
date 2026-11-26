using System.Reflection;
using SPTarkov.Common.Models.Logging;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Spt.Mod;

namespace LotsOfAmmo;

/// Some rounds are shared with Make Shotguns Great Again (12/70, .410 and .700 Nitro, same ids). They live in
/// db/SharedItems/msga and are registered only when that mod is NOT installed, so it never gets duplicates and
/// never needs this mod.
/// </summary>
[Injectable(TypePriority = OnLoadOrder.Preload + 1)]
public class LotsOfAmmoLoader(
    WTTServerCommonLib.WTTServerCommonLib wttCommon,
    IReadOnlyList<SptMod> loadedMods,
    ISptLogger<LotsOfAmmoLoader> logger) : IOnLoad
{
    private const string MsgaGuid = "com.vinihns.makeshotgunsgreatagain";

    public async Task OnLoadAsync(CancellationToken cancellationToken)
    {
        var assembly = Assembly.GetExecutingAssembly();

        await wttCommon.CustomItemServiceExtended.CreateCustomItems(assembly);
        logger.Success("[LotsOfAmmo] Ammo and ammo boxes loaded.");

        if (loadedMods.Any(mod => mod.ModMetadata.ModGuid == MsgaGuid))
        {
            logger.Info("[LotsOfAmmo] Make Shotguns Great Again is installed: its shared rounds (12/70, .410, .700 Nitro) come from that mod.");
            return;
        }

        await wttCommon.CustomItemServiceExtended.CreateCustomItems(assembly, Path.Combine("db", "SharedItems", "msga"));
        await wttCommon.CustomLocaleService.CreateCustomLocales(assembly, Path.Combine("db", "SharedLocales", "msga"));
        logger.Success("[LotsOfAmmo] Make Shotguns Great Again not found: 12/70, .410 and .700 Nitro rounds loaded.");
    }
}
