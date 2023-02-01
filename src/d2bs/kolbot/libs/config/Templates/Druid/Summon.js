function LoadTemplate()
{
	Config.SkipImmune = ["physical"]; // "fire", "cold", "lightning", "poison", "physical", "magic"
	Config.SkipEnchant = []; // "extra strong", "extra fast", "cursed", "magic resistant", "fire enchanted", "lightning enchanted", "cold enchanted", "mana burn", "teleportation", "spectral hit", "stone skin", "multiple shots"
	Config.SkipAura = []; // "fanaticism", "might", "holy fire", "blessed aim", "holy freeze", "holy shock". Conviction is bugged, don't use it.

	// ID	Skill
	// -1	Nothing
	// 0	Attack
	// 1	Kick
	// 2	Throw
	// 221	Raven
	// 222	Plague Poppy
	// 226	Oak Sage
	// 227	Summon Spirit Wolf
	// 231	Cycle of Life
	// 236	Heart of Wolverine
	// 237	Summon Fenris
	// 241	Vines
	// 246	Spirit of Barbs
	// 247	Summon Grizzly
	// 223	Wearwolf
	// 224	Shape Shifting
	// 228	Wearbear
	// 232	Feral Rage
	// 233	Maul
	// 238	Rabies
	// 239	Fire Claws
	// 242	Hunger
	// 243	Shock Wave
	// 248	Fury
	// ID	Skill
	// 225	Firestorm
	// 229	Molten Boulder
	// 230	Arctic Blast
	// 234	Eruption
	// 235	Cyclone Armor
	// 240	Twister
	// 244	Volcano
	// 245	Tornado
	// 249	Armageddon
	// 250	Hurricane

	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = 0; // Primary skill to bosses.
	Config.AttackSkill[2] = -1; // Primary untimed skill to bosses. Keep at -1 if Config.AttackSkill[1] is untimed skill.
	Config.AttackSkill[3] = 0; // Primary skill to others.
	Config.AttackSkill[4] = -1; // Primary untimed skill to others. Keep at -1 if Config.AttackSkill[3] is untimed skill.
	Config.AttackSkill[5] = -1; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = -1; // Secondary untimed skill if monster is immune to primary untimed.

	Config.LowManaSkill[0] = -1; // Timed low mana skill.
	Config.LowManaSkill[1] = -1; // Untimed low mana skill.

	Config.Wereform = "Werebear"; // 0 / false - don't shapeshift, 1 / "Werewolf" - change to werewolf, 2 / "Werebear" - change to werebear

	Config.SummonRaven = false;
	Config.SummonSpiritWolf = true;
	Config.SummonDireWolf = true;
	Config.SummonGrizzly = true;
	Config.SummonSpirit = "Oak Sage"; // 0 = disabled, 1 / "Oak Sage", 2 / "Heart of Wolverine", 3 / "Spirit of Barbs"
	Config.SummonVine = "Carrion Vine"; // 0 = disabled, 1 / "Poison Creeper", 2 / "Carrion Vine", 3 / "Solar Creeper"

	Config.Dodge = true; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.

	Config.AutoSkill.Enabled = true; // Enable or disable AutoSkill system
	Config.AutoSkill.Build = [
		[231, 1, false], // carrion vine
		[227, 5, false], // wolf
		[228, 1, false], // wearbear
		[224, 5, false], // lycanthropy
		[247, 10, false], // bear
		[237, 10, false], // dire wolf
		[227, 10, false], // wolf
		[226, 10, false], // oak sage = 226, hotw = 236
		[224, 10, false], // lycanthropy
		[247, 100, false], // bear
		[237, 100, false], // dire wolf
		[227, 100, false], // wolf
		[226, 100, false], // oak sage = 226, hotw = 236
	];;

	Config.AutoStat.Enabled = true; // Enable or disable AutoStat system
	Config.AutoStat.Build = [
		["s", 12], // stat strength for quilt armor
		["v", 28], // spend in vitality until it reaches 28 (level 5)
		["e", 50], // spend in energy until 50 (level 8)
		["v", 50], // spend more in vitality
		["s", 15], // get up to 15 strength (level 13)
		["v", 65], // spend in vitality (level 18)
		["s", 35], // get up to 25 strength (level 20)
		["e", 75], // spend in energy (level 25)
		["v", 75], // level 27
		["s", 55], // level 31
		["v", 100], // level 36
		["s", 80], // level 41
		["v", 125], // level 46
		["s", 95], // level 49 (less if done stat quests)
		["v", "all"], // put rest of the points in vitality
	];
};