using SPTarkov.Server.Core.Models.Spt.Mod;
using Range = SemanticVersioning.Range;

namespace LotsOfAmmo;

public record ModMetadata : IModMetadata
{
    public string ModGuid { get; init; } = "com.vinihns.lotsofammo";
    public string Name { get; init; } = "Lots of Ammo";
    public string Author { get; init; } = "viniHNS";
    public List<string>? Contributors { get; init; }
    public SemanticVersioning.Version Version { get; init; } = new("2.0.0");
    public Range SptVersion { get; init; } = new("~4.1.6");
    public bool HasPrepatcher { get; init; } = false;
    public List<string>? Incompatibilities { get; init; }

    public Dictionary<string, Range>? ModDependencies { get; init; } = new()
    {
        { "com.wtt.commonlib", new Range("~3.0.6") },
    };

    public string? Url { get; init; } = "https://github.com/viniHNS/Lots-of-Ammo";
    public string License { get; init; } = "MIT";
}
