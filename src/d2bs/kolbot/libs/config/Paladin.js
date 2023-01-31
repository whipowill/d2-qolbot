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
	// 96	Sacrifice
	// 97	Smite
	// 101	Holy Bolt
	// 106	Zeal
	// 107	Charge
	// 111	Vengeance
	// 112	Blessed Hammer
	// 116	Conversion
	// 117	Holy Shield
	// 121	Fist of the Heavens
	// 98	Might
	// 102	Holy Fire
	// 103	Thorns
	// 108	Blessed Aim
	// 113	Concentration
	// 114	Holy Freeze
	// 118	Holy Shock
	// 119	Sanctuary
	// 122	Fanaticism
	// 123	Conviction
	// ID	Skill
	// 99	Prayer
	// 100	Resist Fire
	// 104	Defiance
	// 105	Resist Cold
	// 109	Cleansing
	// 110	Resist Lightning
	// 115	Vigor
	// 120	Meditation
	// 124	Redemption
	// 125	Salvation

	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = 0; // Primary skill to bosses.
	Config.AttackSkill[2] = -1; // Primary aura to bosses
	Config.AttackSkill[3] = 0; // Primary skill to others.
	Config.AttackSkill[4] = 0; // Primary aura to others.
	Config.AttackSkill[5] = 0; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = =1; // Secondary aura.

	Config.LowManaSkill[0] = 0; // Low mana skill.
	Config.LowManaSkill[1] = -1; // Low mana aura.

	Config.AvoidDolls = false; // Try to attack Soul Killers from a greater distance with hammerdins.
	Config.Vigor = false; // Swith to Vigor when running
	Config.Charge = false; // Use Charge when running
	Config.Redemption = [50, 50]; // Switch to Redemption after clearing an area if under designated life or mana. Format: [lifepercent, manapercent]

	Config.Dodge = false; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.

	Config.AutoSkill.Enabled = false; // Enable or disable AutoSkill system
	Config.AutoSkill.Build = [];

	Config.AutoStat.Enabled = false; // Enable or disable AutoStat system
	Config.AutoStat.Build = Config.AutoStat.preset_melee; // prefilled options are "Config.AutoStat.preset_melee" or "Config.AutoStat.preset_caster"
}