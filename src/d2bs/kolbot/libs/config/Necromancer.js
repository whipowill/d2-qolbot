function LoadConfig()
{
	Config.SkipImmune = []; // "fire", "cold", "lightning", "poison", "physical", "magic"
	Config.SkipEnchant = []; // "extra strong", "extra fast", "cursed", "magic resistant", "fire enchanted", "lightning enchanted", "cold enchanted", "mana burn", "teleportation", "spectral hit", "stone skin", "multiple shots"
	Config.SkipAura = []; // "fanaticism", "might", "holy fire", "blessed aim", "holy freeze", "holy shock". Conviction is bugged, don't use it.

	// ID 	Skill
	// -1	Nothing
	// 0	Attack
	// 1	Kick
	// 2	Throw
	// 66	Amplify Damage
	// 71	Dim Vision
	// 72	Weaken
	// 76	Iron Maiden
	// 77	Terror
	// 81	Confuse
	// 82	Life Tap
	// 86	Attract
	// 87	Decrepify
	// 91	Lower Resist
	// 67	Teeth
	// 68	Bone Armor
	// 73	Poison Dagger
	// 74	Corpse Explosion
	// 78	Bone Wall
	// 83	Poison Explosion
	// 84	Bone Spear
	// 88	Bone Prison
	// 92	Poison Nova
	// 93	Bone Spirit
	// 69	Skeleton Mastery
	// 70	Raise Skeleton
	// 75	Clay Golem
	// 79	Golem Mastery
	// 80	Raise Skeletal Mage
	// 85	Blood Golem
	// 89	Summon Resist
	// 90	Iron Golem
	// 94	Fire Golem
	// 95	Revive

	Config.AttackSkill[0] = -1; // Preattack skill.
	Config.AttackSkill[1] = -1; // Primary skill to bosses.
	Config.AttackSkill[2] = -1; // Primary untimed skill to bosses. Keep at -1 if Config.AttackSkill[1] is untimed skill.
	Config.AttackSkill[3] = -1; // Primary skill to others.
	Config.AttackSkill[4] = -1; // Primary untimed skill to others. Keep at -1 if Config.AttackSkill[3] is untimed skill.
	Config.AttackSkill[5] = -1; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = -1; // Secondary untimed skill if monster is immune to primary untimed.

	Config.LowManaSkill[0] = -1; // Timed low mana skill.
	Config.LowManaSkill[1] = -1; // Untimed low mana skill.

	Config.Curse[0] = 0; // Boss curse. Use skill number or set to 0 to disable.
	Config.Curse[1] = 0; // Other monsters curse. Use skill number or set to 0 to disable.

	Config.ExplodeCorpses = 0; // Explode corpses. Use skill number or 0 to disable. 74 = Corpse Explosion, 83 = Poison Explosion
	Config.Golem = "None"; // Golem. 0 or "None" = don't summon, 1 or "Clay" = Clay Golem, 2 or "Blood" = Blood Golem, 3 or "Fire" = Fire Golem
	Config.Skeletons = 0; // Number of skeletons to raise. Set to "max" to auto detect, set to 0 to disable.
	Config.SkeletonMages = 0; // Number of skeleton mages to raise. Set to "max" to auto detect, set to 0 to disable.
	Config.Revives = 0; // Number of revives to raise. Set to "max" to auto detect, set to 0 to disable.
	Config.PoisonNovaDelay = 2; // Delay between two Poison Novas in seconds.
	Config.ActiveSummon = false; // Raise dead between each attack. If false, it will raise after clearing a spot.
	Config.ReviveUnstackable = true; // Revive monsters that can move freely after you teleport.
	Config.IronGolemChicken = 30; // Exit game if Iron Golem's life is less or equal to designated percent.
	
	Config.Dodge = true; // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.

	Config.AutoSkill.Enabled = false; // Enable or disable AutoSkill system
	Config.AutoSkill.Build = [];

	Config.AutoStat.Enabled = false; // Enable or disable AutoStat system
	Config.AutoStat.Build = Config.AutoStat.preset_caster; // prefilled options are "Config.AutoStat.preset_melee" or "Config.AutoStat.preset_caster"
}