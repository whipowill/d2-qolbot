function LoadTemplate()
{
	Config.SkipImmune = []; // "fire", "cold", "lightning", "poison", "physical", "magic"
	Config.SkipEnchant = []; // "extra strong", "extra fast", "cursed", "magic resistant", "fire enchanted", "lightning enchanted", "cold enchanted", "mana burn", "teleportation", "spectral hit", "stone skin", "multiple shots"
	Config.SkipAura = []; // "fanaticism", "might", "holy fire", "blessed aim", "holy freeze", "holy shock". Conviction is bugged, don't use it.

	// ID	Skill
	// -1	Nothing
	// 0	Attack
	// 1	Kick
	// 2	Throw
	// 6	Magic Arrow
	// 7	Fire Arrow
	// 11	Cold Arrow
	// 12	Multiple Shot
	// 16	Exploding Arrow
	// 21	Ice Arrow
	// 22	Guided Arrow
	// 26	Strafe
	// 27	Immolation Arrow
	// 31	Freezing Arrow
	// 8	Inner Sight
	// 9	Critical Strike
	// 13	Dodge
	// 17	Slow Missiles
	// 18	Avoid
	// 23	Penetrate
	// 28	Dopplezon
	// 29	Evade
	// 32	Valkyrie
	// 33	Pierce
	// 10	Jab
	// 14	Power Strike
	// 15	Poison Javelin
	// 19	Impale
	// 20	Lightning Bolt
	// 24	Charged Strike
	// 25	Plague Javelin
	// 30	Fend
	// 34	Lightning Strike
	// 35	Lightning Fury

	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = me.getSkill(22, 1) ? 22 : 0; // Primary skill to bosses.
	Config.AttackSkill[2] = -1; // Primary untimed skill to bosses. Keep at -1 if Config.AttackSkill[1] is untimed skill.
	Config.AttackSkill[3] = me.getSkill(12, 1) ? 12 : 0; // Primary skill to others.
	Config.AttackSkill[4] = -1; // Primary untimed skill to others. Keep at -1 if Config.AttackSkill[3] is untimed skill.
	Config.AttackSkill[5] = 0; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = 0; // Secondary untimed skill if monster is immune to primary untimed.

	Config.LowManaSkill[0] = 0; // Timed low mana skill.
	Config.LowManaSkill[1] = 0; // Untimed low mana skill.

	Config.LightningFuryDelay = 0; // Lightning fury interval in seconds. LF is treated as timed skill.
	Config.SummonValkyrie = true; // Summon Valkyrie

	Config.Dodge = false; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.

	Config.AutoSkill.Enabled = false; // Enable or disable AutoSkill system
	Config.AutoSkill.Build = [
		[29, 1, false], // evade
		[18, 1, false], // avoid
		[13, 1, false], // dodge
		[26, 100, false], // strafe
		[22, 100, false], // guided arrow
		[12, 10, false], // multiple shot
		[33, 1, false], // pierce
		[23, 100, false], // penetrate
		[9, 100, false], // critical strike
	];

	Config.AutoStat.Enabled = true; // Enable or disable AutoStat system
	Config.AutoStat.Build = [
		["s", 12], // stat strength for quilt armor
		["v", 28], // spend in vitality until it reaches 28 (level 5)
		["d", 50], // spend in energy until 50 (level 8)
		["v", 50], // spend more in vitality
		["s", 15], // get up to 15 strength (level 13)
		["v", 65], // spend in vitality (level 18)
		["s", 35], // get up to 25 strength (level 20)
		["d", 75], // spend in energy (level 25)
		["v", 75], // level 27
		["s", 55], // level 31
		["v", 100], // level 36
		["s", 80], // level 41
		["v", 125], // level 46
		["s", 95], // level 49 (less if done stat quests)
		["v", "all"], // put rest of the points in vitality
	];
}