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
	// ID	Skill
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
	Config.AttackSkill[1] = 0; // Primary skill for bosses.
	Config.AttackSkill[2] = 0; // Backup/Immune skill for bosses.
	Config.AttackSkill[3] = 0; // Primary skill for others.
	Config.AttackSkill[4] = 0; // Backup/Immune skill for others.

	Config.LowManaSkill[0] = 0; // Low mana skill.

	Config.BOSwitch = 0; // Precast weapon slot - 0 = slot I, 1 = slot II
	Config.FindItem = true; // Use Find Item skill on corpses after clearing.
	Config.FindItemSwitch = 0; // Find Item weapon slot - 0 = slot I, 1 = slot II

	Config.Dodge = false; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.

	Config.AutoSkill.Enabled = false; // Enable or disable AutoSkill system
	Config.AutoSkill.Build = [];

	Config.AutoStat.Enabled = false; // Enable or disable AutoStat system
	Config.AutoStat.Build = Config.AutoStat.preset_melee; // prefilled options are "Config.AutoStat.preset_melee" or "Config.AutoStat.preset_caster"
}