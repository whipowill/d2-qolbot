function LoadConfig()
{
	Config.SkipImmune = []; // "fire", "cold", "lightning", "poison", "physical", "magic"
	Config.SkipEnchant = []; // "extra strong", "extra fast", "cursed", "magic resistant", "fire enchanted", "lightning enchanted", "cold enchanted", "mana burn", "teleportation", "spectral hit", "stone skin", "multiple shots"
	Config.SkipAura = []; // "fanaticism", "might", "holy fire", "blessed aim", "holy freeze", "holy shock". Conviction is bugged, don't use it.

	// ID	Skill
	// -1	Nothing
	// 0	Attack
	// 1	Kick
	// 2	Throw
	// 36	Fire Bolt
	// 37	Warmth
	// 41	Inferno
	// 46	Blaze
	// 47	Fire Ball
	// 51	Fire Wall
	// 52	Enchant
	// 56	Meteor
	// 61	Fire Mastery
	// 62	Hydra
	// 38	Charged Bolt
	// 42	Static Field
	// 43	Telekinesis
	// 48	Nova
	// 49	Lightning
	// 53	Chain Lightning
	// 54	Teleport
	// 57	Thunder Storm
	// 58	Energy Shield
	// 63	Lightning Mastery
	// 39	Ice Bolt
	// 40	Frozen Armor
	// 44	Frost Nova
	// 45	Ice Blast
	// 50	Shiver Armor
	// 55	Glacial Spike
	// 59	Blizzard
	// 60	Chilling Armor
	// 64	Frozen Orb
	// 65	Cold Mastery

	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = -1; // Primary skill to bosses.
	Config.AttackSkill[2] = -1; // Primary untimed skill to bosses. Keep at -1 if Config.AttackSkill[1] is untimed skill.
	Config.AttackSkill[3] = -1; // Primary skill to others.
	Config.AttackSkill[4] = -1; // Primary untimed skill to others. Keep at -1 if Config.AttackSkill[3] is untimed skill.
	Config.AttackSkill[5] = -1; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = -1; // Secondary untimed skill if monster is immune to primary untimed.
	Config.ClearPath = true; // true means don't use Teleport

	Config.LowManaSkill[0] = -1; // Timed low mana skill.
	Config.LowManaSkill[1] = -1; // Untimed low mana skill.

	Config.CastStatic = 100; // Cast static until the target is at designated life percent. 100 = disabled.
	Config.StaticList = []; // List of monster NAMES or CLASSIDS to static. Example: Config.StaticList = ["Andariel", 243];

	Config.Dodge = true; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.

	Config.AutoBuild.Enabled = false;
	Config.AutoBuild.Template = "BuildName";
}