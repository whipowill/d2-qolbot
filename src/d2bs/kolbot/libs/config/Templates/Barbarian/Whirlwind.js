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
	// 126	Bash
	// 132	Leap
	// 133	Double Swing
	// 139	Stun
	// 140	Double Throw
	// 143	Leap Attack
	// 144	Concentrate
	// 147	Frenzy
	// 151	Whirlwind
	// 152	Berserk
	// 127	Sword Mastery
	// 128	Axe Mastery
	// 129	Mace Mastery
	// 134	Pole Arm Mastery
	// 135	Throwing Mastery
	// 136	Spear Mastery
	// 141	Increased Stamina
	// 145	Iron Skin
	// 148	Increased Speed
	// 153	Natural Resistance
	// 130	Howl
	// 131	Find Potion
	// 137	Taunt
	// 138	Shout
	// 142	Find Item
	// 146	Battle Cry
	// 149	Battle Orders
	// 150	Grim Ward
	// 154	War Cry
	// 155	Battle Command

	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = me.getSkill(151, 1) ? 151 : 0; // Primary skill for bosses.
	Config.AttackSkill[2] = 0; // Backup/Immune skill for bosses.
	Config.AttackSkill[3] = me.getSkill(151, 1) ? 151 : 0; // Primary skill for others.
	Config.AttackSkill[4] = 0; // Backup/Immune skill for others.

	Config.LowManaSkill[0] = 0; // Low mana skill.

	Config.BOSwitch = 0; // Precast weapon slot - 0 = slot I, 1 = slot II
	Config.FindItem = true; // Use Find Item skill on corpses after clearing.
	Config.FindItemSwitch = 0; // Find Item weapon slot - 0 = slot I, 1 = slot II

	Config.Dodge = false; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.

	Config.AutoSkill.Enabled = true; // Enable or disable AutoSkill system
	Config.AutoSkill.Build = [
		[153, 1, false], // natural resistance
		[145, 1, false], // iron skin
		[141, 1, false], // stamina
		[132, 1, false], // leap
		[149, 1, false], // battle orders
		[151, 100, false], // whirlwind
		[146, 100, false], // battle cry
		[138, 100, false], // shout
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