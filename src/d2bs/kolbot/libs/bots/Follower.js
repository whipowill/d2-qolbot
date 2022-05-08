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
		commanders = Config.Leaders,
		attack = true,
		openContainers = true,
		classes = ["amazon", "sorceress", "necromancer", "paladin", "barbarian", "druid", "assassin"],
		action = "";

	// https://www.quoteambition.com/darkest-dungeon-quotes/
	var quotetime = 0;
	var quotes_town = [
		"In time, you will know the tragic extent of my failings.",
		"Ruin has come to our family.",
		"I remember days when the sun shone and laughter could be heard from the tavern.",
		"The cost of preparedness - measured now in gold, later in blood.",
		"My obsession caused this great foulness, and it is shameful that I must rely upon you to set it right.",
		"In that limitless chasm of chaos - they will realize the truth of it. 'We are not the flame,' they will cry out, 'We are but moths and we are doomed!' ",
		"Once again, the stars are right and the manor sits at the very epicenter of cosmic unrest. Cultists rally to their twisted idols and great gongs sound in anticipation of the coming sacrifices. Far below, life-laden shadows pulse to the unrelenting rhythm of a beating heart.",
		"This sprawling estate - a mecca of madness and morbidity. Your work begins.",
		"The front line of this war is not in the dungeon, but rather, inside the mind.",
		"Welcome home, such as it is. This squalid hamlet, these corrupted lands, they are yours now, and you are bound to them.",
		"The bellows blast once again! The forge stands ready to make weapons of war.",
		"Women and men, soldiers and outlaws, fools and corpses - all will find their way to us now that the road is clear.",
		"There is a sickness in the ancient pitted cobbles of the old road, and on its writhing path you will face viciousness, violence, and perhaps other damnably transcendent terrors.",
		"Once our estate was the envy of this land.",
		"I was lord of this place, before the crows and rats made it their domain.",
		"They must learn more than brutal blood-letting! They must learn to survive!",
		"This man understands that adversity and existence are one and the same.",
		"At home in wild places, she is a stalwart survivor and a strict instructor.",
		"Idol, amulet, or lucky charm - the simplest object can be a talisman against evil.",
		"Curiosity, interest, and obsession - mile markers on my road to damnation.",
		"Alone in the woods or tunnels, survival is the same. Prepare, persist, and overcome.",
		"Success depends on survival.",
		"Shoot, bandage, and pillage - the dancing steps of war.",
		"A lawman and his faithful beast - a bond forged by battle and bloodshed.",
		"These tonics and herbs will stave off infection and neutralize contagion.",
		"Failure tests the mettle of the heart, brain, and body.",
		"Carelessness will find no clemency in this place!",
		"The requirements of survival cannot be met on an empty stomach.",
		"Survival is a tenuous proposition in this sprawling tomb.",
		"True desperation is known only when escape is impossible.",
		"Tokens of hope, recovered from the encroaching dark.",
		"The Abbot will be grateful - the trappings of his faith have been restored.",
		"Disinfection, at last.",
		"The Brigands are undone - our family crest is once again a symbol of strength!",
		"Let those dirty beasts worship the mud now!",
		"In radiance may we find victory.",
		"The light, the promise of safety!",
		"A handsome reward for a task well performed.",
		"To those with a keen eye, gold gleams like a dagger's point.",
		"Experimental techniques and tonics can overcome things a sharpened sword cannot.",
		"Make no mistake, we will face ever greater threats. Our soldiers must be ready.",
		"Every creature has a weakness. The wise hero trains for what she will face.",
		"With enough ale, maybe they can be inured against the horrors below.",
		"Gilded icons and dogmatic rituals - for some, a tonic against the bloodshed.",
		"A sharper sword, a stronger shield. Anything to prolong a soldier's life.",
		"A strict regimen is paramount, if one is to master the brutal arithmetic of combat.",
		"Rarities and curios, sold at a profit, of course.",
		"To fight the abyss, one must know it.",
		"An increasing stockpile of curious trinkets, gathered from forbidden places.",
		"Self-preservation is paramount - at any cost!",
		"She searches where others will not go, and sees what others will not see.",
		"Barbaric rage and unrelenting savagery make for a powerful ally.",
		"A champion markswoman keen for a new kind of challenge.",
		"Our supplies are replenished, the soldiers will feast tonight.",
		"The cobwebs have been dusted, the pews set straight. The Abbey calls to the faithful.",
		"I see something long-absent in the sunken faces of passersby - a glimmer of hope.",
		"In truth, I cannot tell how much time has passed since I sent that letter.",
		"Every cleared path and charted route reduces the isolation of our troubled estate.",
		"Paths and roads bring soldiers and supplies, let them arrive unharried!",
		"These medicines will prevent the outbreak of epidemics in our struggling hamlet.",
		"At last, wholesome marine life can flourish, if indeed there is such a thing.",
		"Trouble yourself not with the cost of this crusade - its noble end affords you broad tolerance in your choice of means.",
		"All manner of diversion and dalliance await those who cross the threshold with coin in hand.",
		"More arrive, foolishly seeking fortune and glory in this domain of the damned.",
		"It is done. Turn yourself now to the conditions of those poor devils who remain.",
		"Wealth beyond measure, awarded to the brave and the foolhardy alike.",
		"Those without a stomach for this place must move on.",
		"The raw strength of youth may be spent, but his eyes hold the secrets of a hundred campaigns.",
		"We are born of this thing, made from it, and we will be returned to it in time.",
		"The degeneracy of the hamlet is nothing, I fear, when compared to the condition of surrounding acres.",
		"Let me share with you the terrible wonders I have come to know.",
		"Our family name once so well-regarded is now barely whispered aloud by decent folk.",
		"All the decadent horrors I have seen pale in comparison with that final, crowning thing. I could not look, nor could I look away!",
		"Some guy made fun of my helmet, so I butchered him in a public place.",
		"I do this because it irritates you.",
		"I know just enough to be dangerous, now be still.",
		"Someone arm wrestle me! Come on, you cowards!",
		"You answered the letter - now like me, you are part of this place.",
		"Curious methodologies and apparatus can calm even the most tormented soul.",
		"Trinkets and charms, gathered from all the forgotten corners of the earth.",
		"Fan the flames! Mold the metal! We are raising an army!",
		"Great heroes can be found even here, in the mud and rain.",
		"There is a great horror beneath the manor - a crawling chaos that must be destroyed!",
		"Strong drink, a game of chance, and companionship - the rush of life.",
		"There is power in symbols. Collect the scattered scraps of faith and give comfort to the masses.",
		"Can you feel it? The walls between the sane world and that unplumbed dimension of delirium is tenuously thin here.",
		"A man in a robe, claiming communion with the divine. Madness.",
		"So many young gentlemen, so little propriety.",
	];
	var quotes_battle = [
		"In time, you will know the tragic extent of my failings.",
		"Remind yourself that overconfidence is a slow and insidious killer.",
		"Prodigious size alone does not dissuade the sharpened blade.",
		"Leave nothing unchecked, there is much to be found in forgotten places.",
		"Brigands have run off these lanes. Keep to the side path - the hamlet is just ahead.",
		"The mighty sword arm anchored by holy purpose - a zealous warrior.",
		"Many fall in the face of chaos, but not this one. Not today.",
		"Monstrous size has no intrinsic merit, unless inordinate exsanguination be considered a virtue.",
		"'We are the flame,' they cry, 'and darkness fears us!'",
		"These nightmarish creatures can be felled! They can be beaten!",
		"Dispatch this thug in brutal fashion, that all may hear of your arrival!",
		"An ambush! Send these vermin a message - the rightful owner has returned, and their kind is no longer welcome.",
		"And now the true test - hold fast or expire?",
		"Injury and despondence set the stage for heroism or cowardice.",
		"Great adversity has beauty - it is the fire that tempers the blade.",
		"Slowly, gently, this is how life is taken.",
		"Where there is no peril in the task, there can be no glory in its accomplishment.",
		"Do not ruminate on this fleeting failure - the campaign is long, and victory will come.",
		"A moment of valor shines brightest against a backdrop of despair.",
		"Good fortune and hard work may yet arrest this plague.",
		"A setback, but not the end of things!",
		"Wounds to be tended - lessons to be learned.",
		"You will endure this loss, and learn from it.",
		"You cannot learn a thing you think you know.",
		"We fall so that we may learn to pick ourselves up once again.",
		"Our land is remote and unneighbored. Every lost resource must be recovered.",
		"Ignorance of your enemy and of yourself will invariably lead to defeat.",
		"This expedition, at least, promises success.",
		"Squirming, contorting, and ever-expanding - this horror must be unmade!",
		"The great ruins belong to us, and we will find whatever secrets they hold.",
		"More bones returned to rest. Devils remanded to their abyss.",
		"Room by room, hall by hall, we reclaim what is ours.",
		"This day belongs to the light!",
		"Confidence surges as the enemy crumbles!",
		"Another abomination cleansed from our lands.",
		"The bigger the beast, the greater the glory.",
		"A victory - perhaps a turning point.",
		"A little hope, however desperate, is never without worth.",
		"Adversity can foster hope and resilience.",
		"The frothing waters subside - the advantage is ours!",
		"Shattered and unmade! Or, perhaps, reborn?",
		"It will live again in another time, another place.",
		"The way is lit. The path is clear. We require only the strength to follow it.",
		"As the light gains purchase, spirits are lifted and purpose is made clear.",
		"A wise general cuts losses, and regroups.",
		"This skirmish may be lost, but the battle may yet be won.",
		"The sin is not in being outmatched, but in failing to recognize it.",
		"Some may fall, but their knowledge lives on.",
		"Send this one to journey elsewhere, for we have a need of sterner stock.",
		"Driving out corruption is an endless battle, but one that must be fought.",
		"Anger is power - unleash it!",
		"The agents of pestilence will yet be driven from our woods!",
		"Tortured and reclusive - this man is more dangerous than he seems.",
		"Elusive, evasive, persistent - righteous traits for a rogue.",
		"What better laboratory than the blood-soaked battlefield?",
		"A sister of battle - pious and unrelenting.",
		"This one has become vestigial, useless.",
		"Suffer not the lame horse - nor the broken man.",
		"Life - the greatest treasure of all.",
		"All my life, I could feel an insistent gnawing at the back of my mind. It was a yearning - a thirst for discovery - which could be neither numbed nor sated.",
		"Mind that such missteps are the exception, and not the rule.",
		"Death is patient, it will wait.",
		"Another soul battered and broken, cast aside like a spent torch.",
		"Death and demise - cause for celebration!",
		"Sloped shoulders, wild eyes and a stumbling gate - this one is no more good to us.",
		"Even in death, the captain shouts his orders and the crew obeys.",
		"Most will end up here, covered in the poisoned earth, awaiting merciful oblivion.",
		"Did he foresee his own demise? I care not, so long as he remains dead.",
		"In life, his claims to precognition were dubious at best, in death, they are ridiculous.",
		"Even reanimated bones can fall - even the dead can die again.",
		"With no living sinew to actuate them, will these walking bones finally fail?",
		"Leave her corpse to rot, consumed by the spores she spawned.",
		"It is as grotesque in death as it was in life.",
		"The thing is even more horrible in death. Liquefaction cannot come soon enough.",
		"Death cannot be escaped, but it can be postponed.",
		"No chance for egress - will this be a massacre?",
		"The plume and the pistol - a fitting end to my folly, and a curse upon us all.",
		"I knew all these paths once - now they are as twisted as my own ambitions.",
		"An eternity of futile struggle - a penance for my unspeakable transgressions.",
		"Mechanical hazards, possessed by evil intent.",
		"The human mind - fragile like a robin's egg.",
		"Even the aged oak will fall to the tempest's winds.",
		"Fear and frailty finally claim their due.",
		"More dust, more ashes - more disappointment.",
		"Their squeals fade, their confidence is shaken!",
		"I smell brimstone. Or is that hyacinth?",
		"Silence, my arbalest sings!",
		"I am fueled by the blood of my enemies, thank you.",
		"Thank my torturer who was tasked with keeping me alive.",
		"Did I wash this needle? Well, too late now.",
		"An impressive wound! Let me make a quick sketch.",
		"As life ebbs, terrible vistas of emptiness reveal themselves.",
		"Success, so clearly in view. Or, is it merely a trick of the light?",
		"It's a sad day when I am your best hope.",
		"Be wary, triumphant pride precipitates a dizzying fall.",
	];

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

	this.sayQuotes = function (quotetime, quotes_town, quotes_battle)
	{
		// if quotes are turned off, bail
		if (!Config.DarkQuotes) return 0;

		// init
		var speak = false;
		var now = Date.now();

		// if first run
		if (!quotetime) return now + Math.floor(Math.random() * 120000);

		// if speak
		if (quotetime - now < 0)
		{
			if (me.inTown)
			{
				quotetime = now + 120000 + Math.floor(Math.random() * 240000);
				var quotes = quotes_town;
			}
			else
			{
				quotetime = now + 120000 + Math.floor(Math.random() * 480000);
				var quotes = quotes_battle;
			}

			// roll the dice on what quote to use
			var ran = Math.floor(Math.random() * quotes.length);

			// say the quote
			say(quotes[ran]);
		}

		// return
		return quotetime;
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
			//say("Portal is open.");
		}
	};

	addEventListener("chatmsg", this.chatEvent);

	// Override config values that use TP
	Config.TownCheck = false;
	Config.TownHP = 0;
	Config.TownMP = 0;
	charClass = classes[me.classid];

	for (i = 0; i < 20; i += 1) {
		leader = this.getLeader(Config.Leader);

		if (leader) {
			break;
		}

		delay(1000);
	}

	if (!leader) {
		say("Leader not found.");
		delay(500);
		say("/save");
		delay(5000);
		quit();
	} else {
		//say("Leader found.");
	}

	while (!Misc.inMyParty(Config.Leader)) {
		delay(500);
	}

	//say("Partied.");

	if (me.inTown) {
		Town.move("portalspot");
	}

	// Main Loop
	while (Misc.inMyParty(Config.Leader)) {

		// say quote
		quotetime = this.sayQuotes(quotetime, quotes_town, quotes_battle);

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
					Pather.moveTo(leaderUnit.x + rand(-5, 5), leaderUnit.y + rand(-5, 5));
				}
			}

			if (attack) {
				Attack.clear(20, false, false, false, false);
				this.pickPotions(20);
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
					//say("Taking exit.");
					delay(500);
					Pather.moveToExit(leader.area, true);

					break;
				case 2:
					//say("Taking portal.");

					break;
				case 3:
					//say("Taking waypoint.");
					delay(500);
					Pather.useWaypoint(leader.area, true);

					break;
				case 4:
					//say("Special transit.");

					break;
				}

				while (me.area === 0) {
					delay(100);
				}

				leaderUnit = this.getLeaderUnit(Config.Leader);
			}
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
		case "wp":
		case me.name + "wp":
			if (me.inTown) {
				break;
			}

			delay(rand(1, 3) * 500);

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
				say("Got waypoint.");
			} else {
				say("Failed to get waypoint.");
			}

			me.cancel();

			break;
		case "c":
			if (!me.inTown) {
				Town.getCorpse();
			}

			break;
		case "p":
			say("!Picking items.");
			Pickit.pickItems();

			if (openContainers) {
				this.openContainers(20);
			}

			say("!Done picking.");

			break;
		case "1":
			if (me.inTown && leader.inTown && this.checkLeaderAct(leader) !== me.act) {
				//say("Going to leader's town.");
				Town.goToTown(this.checkLeaderAct(leader));
				Town.move("portalspot");
			} else if (me.inTown) {
				//say("Going outside.");
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
				//say("Going to town.");
				Pather.usePortal(null, leader.name);
			}

			break;
		case "3":
			if (me.inTown) {
				//say("Running town chores.");
				Town.doChores();
				Town.move("portalspot");
				say("Ready.");
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