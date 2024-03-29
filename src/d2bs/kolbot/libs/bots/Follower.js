/*
* Follower by kolton
* To initiate the follow sequence make a TP and send command "1".
*
* Commands:
* Main commands:
*	1 - take leader's tp from town / move to leader's town
*	2 - take leader's tp to town
*	3 - town manager
*	c - get corpse
*	p - pick items
*	s - toggle stop
*	<charname> s - toggle stop <charname>
* Attack:
*	a - attack toggle for all
*	<charname> a - attack toggle for <charname>
*	aon - attack on for all
*	<charname> aon - attack on for <charname>
*	aoff - attack off for all
*	<charname> aoff - attack off for <charname>
* Teleport: *** characters without teleport skill will ignore tele command ***
*	tele - toggle teleport for all
*	<charname> tele - toggle teleport for <charname>
*	tele on - teleport on for all
*	<charname> tele on -  teleport on for <charname>
*	tele off - teleport off for all
*	<charname> tele off - teleport off for <charname>
* Skills: *** refer to skills.txt ***
*	all skill <skillid> - change skill for all. refer to skills.txt
*	<charname> skill <skillid> - change skill for <charname>
*	<class> skill <skillid> - change skill for all characters of certain class *** any part of class name will do *** for example: "sorc skill 36", "zon skill 0", "din skill 106"
* Auras: *** refer to skills.txt ***
*	all aura <skillid> - change aura for all paladins
*	<charname> aura <skillid> - change aura for <charname>
* Town:
*	a2-5 - move to appropriate act (after quest) !NOTE: Disable 'no sound' or game will crash!
*	talk <npc name> - talk to a npc in town
* Misc.
*	cow - enter red cow portal
*	wp - all players activate a nearby wp
*	<charname> wp - <charname> activates a nearby wp
*	bo - barbarian precast
*	<charname> tp - make a TP. Needs a TP tome if not using custom libs.
*	move - move in a random direction (use if you're stuck by followers)
*	reload - reload script. Use only in case of emergency, or after editing character config.
*	quit - exit game
*/

function Follower() {
	var i, j, stop, leader, leaderUnit, charClass, piece, skill, result, unit, player,
		commanders = Config.LeaderOptions,
		attack = true,
		openContainers = true,
		classes = ["amazon", "sorceress", "necromancer", "paladin", "barbarian", "druid", "assassin"],
		action = "";

	this.doChores = function () {
		say("Running town chores.");

		// do chores
		Town.doChores();

		// do quest chores
		Quester.runQuests(true);

		// check skill points to spend
		if (Config.AutoSkill.Enabled) {
			AutoSkill.init(Config.AutoSkill.Build, Config.AutoSkill.Save);
		}

		// check stat points to spend
		if (Config.AutoStat.Enabled) {
			AutoStat.init(Config.AutoStat.Build, Config.AutoStat.Save, Config.AutoStat.BlockChance, Config.AutoStat.UseBulk);
		}

		// move to portal
		Town.move("portalspot");

		// report
		say("Ready.");
	}


	// Get leader's Party Unit
	this.getLeader = function (name) {
		var player = getParty();

		if (player) {
			do {
				if (player.name === name) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	};

	// Get leader's Unit
	this.getLeaderUnit = function (name) {
		var player = getUnit(0, name);

		if (player) {
			do {
				if (!player.dead) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	};

	// Get leader's act from Party Unit
	this.checkLeaderAct = function (unit) {
		if (unit.area <= 39) {
			return 1;
		}

		if (unit.area >= 40 && unit.area <= 74) {
			return 2;
		}

		if (unit.area >= 75 && unit.area <= 102) {
			return 3;
		}

		if (unit.area >= 103 && unit.area <= 108) {
			return 4;
		}

		return 5;
	};

	// Change areas to where leader is
	this.checkExit = function (unit, area) {
		if (unit.inTown) {
			return false;
		}

		var i, target,
			exits = getArea().exits;

		for (i = 0; i < exits.length; i += 1) {
			if (exits[i].target === area) {
				return 1;
			}
		}

		if (unit.inTown) {
			target = getUnit(2, "waypoint");

			if (target && getDistance(me, target) < 20) {
				return 3;
			}
		}

		target = getUnit(2, "portal");

		if (target) {
			do {
				if (target.objtype === area) {
					Pather.usePortal(null, null, target);

					return 2;
				}
			} while (target.getNext());
		}

		// Arcane<->Cellar portal
		if ((me.area === 74 && area === 54) || (me.area === 54 && area === 74)) {
			Pather.usePortal(null);

			return 4;
		}

		// Tal-Rasha's tomb->Duriel's lair
		if (me.area >= 66 && me.area <= 72 && area === 73) {
			Pather.useUnit(2, 100, area);

			return 4;
		}

		// Throne->Chamber
		if (me.area === 131 && area === 132) {
			target = getUnit(2, 563);

			if (target) {
				Pather.usePortal(null, null, target);

				return 4;
			}
		}

		return false;
	};

	// Talk to a NPC
	this.talk = function (name) {
		if (!me.inTown) {
			say("I'm not in town!");

			return false;
		}

		if (typeof name === "string") {
			name = name.toLowerCase();
		} else {
			say("No NPC name given.");

			return false;
		}

		var npc, names;

		switch (me.act) {
		case 1:
			names = ["gheed", "charsi", "akara", "kashya", "cain", "warriv"];

			break;
		case 2:
			names = ["fara", "lysander", "greiz", "elzix", "jerhyn", "meshif", "drognan", "atma", "cain"];

			break;
		case 3:
			names = ["alkor", "asheara", "ormus", "hratli", "cain"];

			break;
		case 4:
			names = ["halbu", "tyrael", "jamella", "cain"];

			break;
		case 5:
			names = ["larzuk", "malah", "qual-kehk", "anya", "nihlathak", "cain"];

			break;
		}

		if (names.indexOf(name) === -1) {
			say("Invalid NPC.");

			return false;
		}

		if (!Town.move(name === "jerhyn" ? "palace" : name)) {
			Town.move("portalspot");
			say("Failed to move to town spot.");

			return false;
		}

		npc = getUnit(1);

		if (npc) {
			do {
				if (npc.name.replace(/ /g, "").toLowerCase().indexOf(name) > -1) {
					npc.openMenu();
					me.cancel();
					Town.move("portalspot");
					say("Done talking.");

					return true;
				}
			} while (npc.getNext());
		}

		say("NPC not found.");
		Town.move("portalspot");

		return false;
	};

	// Change act after completing last act quest
	this.changeAct = function (act) {
		var npc, preArea, target;

		preArea = me.area;

		switch (act) {
		case 2:
			if (me.area >= 40) {
				break;
			}

			Town.move("warriv");

			npc = getUnit(1, 155);

			if (npc) {
				npc.openMenu();
				Misc.useMenu(0x0D36);
			}

			break;
		case 3:
			if (me.area >= 75) {
				break;
			}

			Town.move("palace");

			npc = getUnit(1, 201);

			if (npc) {
				npc.openMenu();
				me.cancel();
			}

			Town.move("meshif");

			npc = getUnit(1, 210);

			if (npc) {
				npc.openMenu();
				Misc.useMenu(0x0D38);
			}

			break;
		case 4:
			if (me.area >= 103) {
				break;
			}

			if (me.inTown) {
				Town.move("cain");

				npc = getUnit(1, 245);

				if (npc) {
					npc.openMenu();
					me.cancel();
				}

				Town.move("portalspot");
				Pather.usePortal(102, null);
			}

			delay(1500);

			target = getUnit(2, 342);

			if (target) {
				Pather.moveTo(target.x - 3, target.y - 1);
			}

			Pather.usePortal(null);

			break;
		case 5:
			if (me.area >= 109) {
				break;
			}

			Town.move("tyrael");

			npc = getUnit(1, "tyrael");

			if (npc) {
				npc.openMenu();
				me.cancel();

				try {
					Pather.useUnit(2, 566, 109);
				} catch (a5e) {

				}
			}

			break;
		}

		delay(2000);

		while (!me.area) {
			delay(500);
		}

		if (me.area === preArea) {
			me.cancel();
			Town.move("portalspot");
			say("Act change failed.");

			return false;
		}

		Town.move("portalspot");
		//say("Act change successful.");

		if (act === 2) {
			//say("Don't forget to talk to Drognan after getting the Viper Amulet!");
		}

		if (act === 3) {
			//say("Don't forget to talk to Hratli before getting the Gidbinn!");
		}

		return true;
	};

	this.pickPotions = function (range) {
		if (me.dead) {
			return false;
		}

		Town.clearBelt();

		while (!me.idle) {
			delay(40);
		}

		var status,
			pickList = [],
			item = getUnit(4);

		if (item) {
			do {
				if ((item.mode === 3 || item.mode === 5) && item.itemType >= 76 && item.itemType <= 78 && getDistance(me, item) <= range) {
					pickList.push(copyUnit(item));
				}
			} while (item.getNext());
		}

		pickList.sort(Pickit.sortItems);

		while (pickList.length > 0) {
			item = pickList.shift();

			if (item && copyUnit(item).x) {
				status = Pickit.checkItem(item).result;

				if (status && Pickit.canPick(item)) {
					Pickit.pickItem(item, status);
				}
			}
		}

		return true;
	};

	this.openContainers = function (range) {
		var unit, ox, oy,
			unitList = [],
			containers = ["chest", "loose rock", "hidden stash", "loose boulder", "corpseonstick", "casket", "armorstand", "weaponrack", "barrel", "holeanim",
							"roguecorpse", "ratnest", "corpse", "goo pile", "largeurn", "urn", "chest3", "jug", "skeleton", "guardcorpse", "sarcophagus",
							"cocoon", "basket", "stash", "hollow log", "hungskeleton", "pillar", "skullpile", "skull pile", "jar3", "jar2", "jar1", "bonechest", "woodchestl",
							"woodchestr", "barrel wilderness", "burialchestr", "burialchestl", "explodingchest", "chestl", "chestr", "icecavejar1", "icecavejar2",
							"icecavejar3", "icecavejar4", "deadperson", "deadperson2", "evilurn", "tomb1l", "tomb3l", "tomb2", "tomb3", "object2", "groundtomb", "groundtombl"
						];

		ox = me.x;
		oy = me.y;
		unit = getUnit(2);

		if (unit) {
			do {
				if (containers.indexOf(unit.name.toLowerCase()) > -1 && unit.mode === 0 && getDistance(me, unit) <= range) {
					unitList.push(copyUnit(unit));
				}
			} while (unit.getNext());
		}

		while (unitList.length > 0) {
			unitList.sort(Sort.units);

			unit = unitList.shift();

			if (unit) {
				Misc.openChest(unit);
				Pickit.pickItems();
			}
		}

		return true;
	};

	this.chatEvent = function (nick, msg) {

		Banter.delay(); // delay speaking

		if (msg && nick === Config.Leader) {
			switch (msg) {
			case "tele":
			case me.name + " tele":
				if (Pather.teleport) {
					Pather.teleport = false;

					say("Teleport off.");
				} else {
					Pather.teleport = true;

					say("Teleport on.");
				}

				break;
			case "tele off":
			case me.name + " tele off":
				Pather.teleport = false;

				say("Teleport off.");

				break;
			case "tele on":
			case me.name + " tele on":
				Pather.teleport = true;

				say("Teleport on.");

				break;
			case "a":
			case me.name + " a":
				if (attack) {
					attack = false;

					say("Attack off.");
				} else {
					attack = true;

					say("Attack on.");
				}

				break;
			case "flash":
				Packet.flash(me.gid);

				break;
			case "aoff":
			case me.name + " aoff":
				attack = false;

				say("Attack off.");

				break;
			case "aon":
			case me.name + " aon":
				attack = true;

				say("Attack on.");

				break;
			case "save":
				say("/save");
				delay(5000);
				say("Saved.");
				break;
			case "prep":
			case "precast":
				Precast.doPrecast(true);
				break;
			case "town":
				Pather.makePortal(true); // take the portal to town
				this.doChores();
				break;
			case "quit":
			case me.name + " quit":
				quit();
				break;
			case "s":
			case me.name + " s":
				if (stop) {
					stop = false;

					say("Resuming.");
				} else {
					stop = true;

					say("Stopping.");
				}

				break;
			case "r":
				if (me.mode === 17) {
					me.revive();
				}

				break;
			default:
				if (me.classid === 3 && msg.indexOf("aura ") > -1) {
					piece = msg.split(" ")[0];

					if (piece === me.name || piece === "all") {
						skill = parseInt(msg.split(" ")[2], 10);

						if (me.getSkill(skill, 1)) {
							say("Active aura is: " + skill);

							Config.AttackSkill[2] = skill;
							Config.AttackSkill[4] = skill;

							Skill.setSkill(skill, 0);
							//Attack.init();
						} else {
							say("I don't have that aura.");
						}
					}

					break;
				}

				if (msg.indexOf("skill ") > -1) {
					piece = msg.split(" ")[0];

					if (charClass.indexOf(piece) > -1 || piece === me.name || piece === "all") {
						skill = parseInt(msg.split(" ")[2], 10);

						if (me.getSkill(skill, 1)) {
							say("Attack skill is: " + skill);

							Config.AttackSkill[1] = skill;
							Config.AttackSkill[3] = skill;

							//Attack.init();
						} else {
							say("I don't have that skill.");
						}
					}

					break;
				}

				// if command is includes "portal"
				if (msg.indexOf("portal ") > -1) {
					piece = msg.split(" ")[0];

					// if command is for me...
					if (piece === me.name)
					{
						// if has skill teleport
						if (this.canWormhole())
						{
							// capture location
							piece = msg.split(" ")[2];

							// init travel to location
							this.openWormhole(piece);
						}
						else
						{
							say("I am not able to travel quickly.");
						}
					}
					break;
				}

				action = msg;

				break;
			}
		}

		if (msg && msg.split(" ")[0] === "leader" && commanders.indexOf(nick) > -1) {
			piece = msg.split(" ")[1];

			if (typeof piece === "string") {
				if (commanders.indexOf(piece) === -1) {
					commanders.push(piece);
				}

				say("Switching leader to " + piece + ".");

				Config.Leader = piece;
				leader = this.getLeader(Config.Leader);
				leaderUnit = this.getLeaderUnit(Config.Leader);
			}
		}
	};

	// keep log of waypoint already gathered
	var wp_logbook = [];

	this.hasWaypoint = function ()
	{
		var area = me.area;
		if (wp_logbook.indexOf(me.area) > -1)
		{
			return true;
		}

		return false;
	};

	this.gatherWaypoint = function ()
	{
		if (me.inTown || this.hasWaypoint()) {
			return;
		}

		//delay(rand(1, 3) * 500);
		unit = getUnit(2, "waypoint");

		if (unit) {
			WPLoop:
			for (i = 0; i < 3; i += 1) {
				if (getDistance(me, unit) > 3) {
					Pather.moveToUnit(unit);
				}

				unit.interact();

				for (j = 0; j < 100; j += 1) {
					if (j % 20 === 0) {
						me.cancel();
						delay(300);
						unit.interact();
					}

					if (getUIFlag(0x14)) {
						break WPLoop;
					}

					delay(10);
				}
			}
		}

		if (getUIFlag(0x14)) {
			say("Waypoint gathered.");
			wp_logbook.push(me.area); // save to log
		} else {
			//say("Failed to gather waypoint.");
		}

		me.cancel();
	};

	this.canWormhole = function ()
	{
		if (me.classid === 1 && me.getSkill(54, 1))
		{
			return true;
		}

		return false;
	};

	this.openWormhole = function (destination)
	{
		// I need to add a check in here for hasWaypoint
		// so she doesn't run off into the wild and get killed.
		var is_portal = true;
		switch (destination)
		{
			case "countess":
				say("Opening portal to the Tower Cellar Level 5.");
				Town.goToTown(1);
				Pather.useWaypoint(6);
				Pather.moveToExit([20, 21, 22, 23, 24, 25], true);
				break;
			case "mausoleum":
				say("Opening portal to the Mausoleum.");
				Town.goToTown(1);
				Pather.useWaypoint(3);
				Pather.moveToExit(17, true);
				Pather.moveToExit(19, true);
				break;
			case "pit":
				say("Opening portal to the Pit.");
				Town.goToTown(1);
				Pather.useWaypoint(6);
				Pather.moveToExit([7, 12], true);
				break;
			case "andy":
			case "andariel":
				say("Opening portal to the Catacombs Level 4.");
				Town.goToTown(1);
				Pather.useWaypoint(35);
				Pather.moveToExit([36, 37], true);
				break;
			case "at": // ancient tunnels
			case "tunnels":
				say("Opening portal to the Ancient Tunnels.");
				Town.goToTown(2);
				Pather.useWaypoint(44);
				Pather.moveToExit(65, true);
				break;
			case "summoner":
				say("Opening portal to the Arcane Sanctuary.");
				Pather.useWaypoint(74);
				Pather.moveToPreset(me.area, 2, 357, -3, -3);
				break;
			case "duriel":
				say("Opening portal to Tal Rasha's Chamber.");
				Town.goToTown(2);
				Pather.useWaypoint(46);
				Pather.moveToExit(getRoom().correcttomb, true);
				Pather.moveToPreset(me.area, 2, 152, -11, 3);
				break;
			case "ft": // forgotten temple
			case "kt":
			case "temple":
				say("Opening portal to the Forgotten Temple.");
				Town.goToTown(3);
				Pather.journeyTo(94);
				break;
			case "meph":
			case "mephisto":
				say("Opening portal to the Durance of Hate Level 3.");
				Town.goToTown(3);
				Pather.useWaypoint(101);
				Pather.moveToExit(102, true);
				break;
			case "diablo":
				say("Opening portal to the Chaos Sanctuary.");
				Town.goToTown(4);
				Pather.useWaypoint(107);
				Pather.moveTo(7788, 5292);
				break;
			case "halls":
			case "nihlathak":
				say("Opening portal to the Halls of Vaught.");
				Town.goToTown(5);
				Pather.useWaypoint(123);
				Pather.moveToExit(124, true);
				break;
			case "baal":
				say("Opening portal to Baal's Throne Room.");
				Town.goToTown(5);
				Pather.useWaypoint(129);
				Pather.moveToExit([130, 131], true);
				break;
			default:
				say("No such place.");
				is_portal = false;
				break;
		}

		if (is_portal)
		{
			// go back to town
			Pather.makePortal(true); // flag true to use portal

			// announce
			say("Portal is open.");
		}
	};

	// BEGIN EXECUTION

	addEventListener("chatmsg", this.chatEvent);

	// Override config values that use TP
	Config.TownCheck = false;
	Config.TownHP = 0;
	Config.TownMP = 0;
	charClass = classes[me.classid];

	if (Config.Leader)
		say("Searching for leader " + Config.Leader + ".");
	for (i = 0; i < 20; i += 1) {
		leader = this.getLeader(Config.Leader);

		if (leader) {
			break;
		}

		delay(1000);
	}

	if (!leader) {
		say("Leader not found.");
		quit();
	} else {
		say("Leader found.");
	}

	while (!Misc.inMyParty(Config.Leader)) {
		delay(500);
	}

	//say("Partied.");

	if (me.inTown) {
		this.doChores();
	}

	// Main Loop
	while (Misc.inMyParty(Config.Leader)) {

		// say quote
		Banter.speak();

		if (me.mode === 17) {
			while (!me.inTown) {
				me.revive();
				delay(1000);
			}

			Town.move("portalspot");
			say("I'm alive!");
		}

		while (stop) {
			delay(500);
		}

		if (!me.inTown)
		{
			if (!leaderUnit || !copyUnit(leaderUnit).x) {
				leaderUnit = this.getLeaderUnit(Config.Leader);

				if (leaderUnit) {
					//say("Leader unit found.");
				}
			}

			if (!leaderUnit) {
				player = getUnit(0);

				if (player) {
					do {
						if (player.name !== me.name) {
							Pather.moveToUnit(player);

							break;
						}
					} while (player.getNext());
				}
			}

			if (leaderUnit && getDistance(me.x, me.y, leaderUnit.x, leaderUnit.y) <= 60) {
				if (getDistance(me.x, me.y, leaderUnit.x, leaderUnit.y) > 6) {
					//Pather.moveToUnit(leaderUnit);

					// make the bots stand randomly arround you
					Pather.moveTo(leaderUnit.x + rand(-6, 6), leaderUnit.y + rand(-6, 6));
				}
			}

			if (attack) {
				Attack.clear(20, false, false, false, false);
				this.pickPotions(20);

				// look for nearby quest items
				Pickit.pickItems();
			}

			if (me.classid === 3 && Config.AttackSkill[2] > 0) {
				Skill.setSkill(Config.AttackSkill[2], 0);
			}

			if (leader.area !== me.area && !me.inTown) {
				while (leader.area === 0) {
					delay(100);
				}

				result = this.checkExit(leader, leader.area);

				switch (result) {
				case 1:
					Pather.moveToExit(leader.area, true);
					break;
				case 2:
					break;
				case 3:
					Pather.useWaypoint(leader.area, true);
					break;
				case 4:
					break;
				}

				while (me.area === 0) {
					delay(100);
				}

				leaderUnit = this.getLeaderUnit(Config.Leader);
			}

			// look for nearby waypoints
			this.gatherWaypoint();

			// autoequip any items if you can
			Item.autoEquip();
			Item.autoMercEquip();
		}

		switch (action) {
			case "cow":
				if (me.area === 1) {
					Town.move("portalspot");

					if (!Pather.usePortal(39)) {
						say("Failed to use cow portal.");
					}
				}
				break;
			case "move":
				Pather.moveTo(me.x + rand(-5, 5), me.y + rand(-5, 5));
				break;
			case "status":
				Quester.runQuests(true, true); // flag true to only display status
				break;
			case "reload":
				say("Reloading.");
				// doesn't work
				break;
			case "cube":
				Cubing.doCubing();
				break;
			case "c":
				if (!me.inTown) {
					Town.getCorpse();
				}

				break;
			case "pick":
			case "p":
				say("!Picking items.");
				Pickit.pickItems();

				if (openContainers) {
					this.openContainers(20);
				}

				//say("!Done picking.");

				break;
			case "1":
				if (me.inTown) {
					say("Going outside.");
					Town.goToTown(this.checkLeaderAct(leader));
					Town.move("portalspot");

					if (!Pather.usePortal(null, leader.name)) {
						break;
					}

					while (!this.getLeaderUnit(Config.Leader) && !me.dead) {
						Attack.clear(10);
						delay(200);
					}
				}

				break;
			case "2":
				if (!me.inTown) {
					delay(150);
					say("Going to town.");
					Pather.usePortal(null, leader.name);
					this.doChores();
				}
				else
				{
					if (leader.inTown && this.checkLeaderAct(leader) !== me.act) {
						say("Going to leader's town.");
						Town.goToTown(this.checkLeaderAct(leader));
						Town.move("portalspot");
					}
				}

				break;
			case "3":
				if (me.inTown) {
					this.doChores();
				}

				break;
			case "h":
				if (me.classid === 4) {
					Skill.cast(130);
				}

				break;
			case "bo":
				if (me.classid === 4) {
					Precast.doPrecast(true);
				}

				break;
			case "a2":
			case "a3":
			case "a4":
			case "a5":
				this.changeAct(parseInt(action[1], 10));

				break;
			case me.name + " tp":
				unit = me.findItem("tbk", 0, 3);

				if (unit && unit.getStat(70)) {
					unit.interact();

					break;
				}

				unit = me.findItem("tsc", 0, 3);

				if (unit) {
					unit.interact();

					break;
				}

				say("No TP scrolls or tomes.");

				break;
		}

		if (action.indexOf("talk") > -1) {
			this.talk(action.split(" ")[1]);
		}

		action = "";

		delay(100);
	}

	return true;
}