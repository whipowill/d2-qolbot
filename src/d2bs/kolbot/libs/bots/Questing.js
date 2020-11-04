/***	@filename	Questing.js*	@author		whipowill*	@desc		Auto level the character.*/function Questing(){	var i, j,		quests = [			[1, "act1_den_of_evil"],			[2, "act1_sisters_burial_grounds"],			[4, "act1_search_for_cain"],			[5, "act1_forgotten_tower"],			//[3, "act1_tools_of_the_trade"], // this is done in "sisters to the slaughter" quest			//[6, "act1_sisters_to_the_slaughter"],			[9, "act2_radaments_lair"],			[10, "act2_horadric_staff"],			//[11, "act2_tainted_sun"], // this is done in "horadric staff" quest			[12, "act2_arcane_sanctuary"],			//[13, "act2_summoner"], // this is done in "arcane sanctuary" quest			//[14, "act2_seven_tombs"],			//[20, "act3_golden_bird"], // this is done in "khalims will" quest			[18, "act3_khalims_will"],			[19, "act3_blade_of_the_old_religion"],			[17, "act3_lam_esens_tome"],			//[21, "act3_blackened_temple"], // this is done in "khalims will" quest			//[22, "act3_guardian"],			[25, "act4_fallen_angel"],			[27, "act4_hells_forge"],			//[26, "act4_terrors_end"],			//[35, "act5_seige_on_haggorath"], // this is done in "rescue on mount arreat" quest			[36, "act5_rescue_on_mount_arreat"],			[37, "act5_prison_of_ice"],			//[38, "act5_betrayal_of_haggorath"], // this is done in "prison of ice" quest			//[39, "act5_rite_of_passage"],			//[40, "act5_eve_of_destruction"],		];	this.checkQuest = function (id)	{		sendPacket(1, 0x40);		delay(500);		return me.getQuest(id, 0);	};	this.idle = function ()	{		// idle...		print('Idle.');		while (1)			delay(1000);	};	this.error = function (msg)	{		// print		print(msg);		D2Bot.printToConsole(msg);		// die		//D2Bot.stop();		// idle		this.idle();	};	this.getUnitHelper = function (type, id)	{		// init		var find;		// loop		var i;		for (i = 0; i < 10; i += 1)		{			// find			find = getUnit(type, id);			if (find) break;			delay(500);		}		// if never found...		if (!find) this.error('Unable to find unit (' + type + ', ' + id + ').');		// return		return find;	};	this.clearAndCapture = function (zone_id, is_block_town = false)	{		// report		print('Attempting to clear and capture.');		// prepare for fight		Precast.doPrecast(true);		// go to zone		Pather.journeyTo(zone_id); // zone ids are found in sdk/areas.txt		// capture waypoint		var is_waypoint = Pather.getWP(zone_id);		// clear zone		Attack.clearLevel();		// take a break		if (is_waypoint && !is_block_town)			Town.doChores();		// return		return true;	};	this.townAndTalk = function (name, travel_code = null)	{		// report		print('Attempting to town and talk.');		// go to town		Town.goToTown();		delay(1000);		// switch name...		switch (name) {			case 'warriv':				break;			case 'akara':				break;			case 'kashya':				Pather.moveTo(4492, 4632);				break;			case 'charsi':				Pather.moveTo(3959, 5224);				break;			case 'jerhyn':				Pather.moveTo(5087, 5148);				break;			case 'kaelan':				Pather.moveTo(5087, 5148);				break;			case 'atma':				Pather.moveTo(5137, 5054);				break;			case 'drognan':				Pather.moveTo(5097, 5044);				break;			case 'meshif':				Pather.moveTo(5201, 5068);				break;			case 'hratli':				break;			case 'ormus':				break;			case 'asheara':				Pather.moveTo(5044, 5092);				break;			case 'alkor':				Pather.moveTo(5083, 5018);				break;			case 'deckard cain':				Pather.moveTo(5021, 5033);				break;			case 'qual-kehk':				Pather.moveTo(5072, 5077);				break;			case 'anya':				Pather.moveTo(5104, 5119);				break;		}		// if npc is found...		var npc = this.getUnitHelper(1, name);		if (npc)		{			// mve to npc			Town.move(npc);			// talk to them (5x to make sure to clear dialogues)			npc.openMenu();			delay(1000);			me.cancel();			npc.openMenu();			delay(1000);			me.cancel();			npc.openMenu();			delay(1000);			me.cancel();			npc.openMenu();			delay(1000);			me.cancel();			npc.openMenu();			delay(1000);			// travel or cancel			if (travel_code)			{				Misc.useMenu(travel_code); // travel codes are found in sdk/npcmenuid				delay(500);			}			else			{				me.cancel();			}		}		// return		return true;	};	this.talkToNPC = function (name, portal_destination_id)	{		// report		print('Attempting to talk to NPC (not in town).');		// if npc is found...		var npc = this.getUnitHelper(1, name);		if (npc)		{			// move to npc			Pather.moveToUnit(npc);			// talk to them			npc.interact();			delay(1000);			me.cancel();			npc.interact();			delay(1000);			me.cancel();			npc.interact();			delay(1000);			me.cancel();			// take portal			if (portal_destination_id)			{				Pather.usePortal(portal_destination_id); // this never works?			}		}		else this.error('Unable to find NPC.');		// return		return true;	};	this.pickAndPlunder = function (object_id = null, item_id = null, is_consume_item = false)	{		// report		print('Attempting to pick and plunder.');		// if chest...		if (object_id)		{			// move to chest			Pather.moveToPreset(me.area, 2, object_id);			// open chest			var chest = this.getUnitHelper(2, object_id); // object id from objects file			if (chest)			{				if (!Misc.openChest(chest))					this.error('Unable to open chest.');				delay(500);			}			else this.error('Unable to find chest.');		};		// if looking for item...		if (item_id)		{			// find item			var item = this.getUnitHelper(4, item_id); // item id from alias file			if (item)			{				// pickup item				if (!Pickit.pickItem(item))					this.error('Unable to pickup item.');				delay(500);				if (is_consume_item)				{					clickItem(1, item);				}			}			else this.error('Unable to find item.');		}		// return		return true;	};	this.keyAndKeyhole = function (object_id, item_id)	{		// report		print('Attempting to key and keyhole.');		// move to keyhole		Pather.moveToPreset(me.area, 2, object_id);		// prepare keyhole		var keyhole = this.getUnitHelper(2, object_id);		if (keyhole)		{			// open keyhole			if (!Misc.openChest(keyhole))				this.error('Unable to open keyhole.');			delay(5000);			// prepare key			var key = me.getItem(item_id);			if (key)			{				key.toCursor();				submitItem();				delay(5000);			}			else this.error('Unable to find key.');		}		else this.error('Unable to find keyhole.');		// return		return true;	};	this.cubeAndCreate = function (trans_item_id, item_id1 = null, item_id2 = null, item_id3 = null, item_id4 = null)	{		// report		print('Attempting to cube and create.');		// open stash		if (!Town.openStash())			this.error('Failed to open stash.');		// open cube		if (!Cubing.openCube())			this.error('Failed to open cube.');		// empty cube		if (!Cubing.emptyCube())			this.error('Failed to empty cube.');		// add items to cube		var item;		if (item_id1)		{			item = me.getItem(item_id1);			Storage.Cube.MoveTo(item);		}		if (item_id2)		{			item = me.getItem(item_id2);			Storage.Cube.MoveTo(item);		}		if (item_id3)		{			item = me.getItem(item_id3);			Storage.Cube.MoveTo(item);		}		if (item_id4)		{			item = me.getItem(item_id4);			Storage.Cube.MoveTo(item);		}		// transmute		transmute();		delay(5000);		// move to inventory		var trans_item = me.getItem(trans_item_id);		if (trans_item)		{			Storage.Inventory.MoveTo(trans_item);			delay(5000);			me.cancel();		}		else this.error('Something went wrong.');		// return		return true;	};	this.equipAndAttack = function (object_id, item_id)	{		// log original weapon		var original;		var item = me.getItem();		if (item) {			do {				if (item.bodylocation === 4) {					original = item;					break;				}			} while (item.getNext());		}		// check the new item...		var item = me.getItem(item_id);		if (item.mode === 1 && item.bodylocation === 4)		{			this.error('Weapon to equip is already equipped.');		}		else		{		}		// equip the new item		item.toCursor(); // click new item		delay(500);		clickItem(0, 4); // move to weapon slot		delay(500);		var cursorItem = getUnit(100);		if (Storage.Inventory.CanFit(cursorItem))			Storage.Inventory.MoveTo(cursorItem);		// attack the object		var object = this.getUnitHelper(2, object_id);		Pather.moveToPreset(me.area, 2, object_id);		Skill.cast(0, Skill.getHand(0), object);		delay(500);		Skill.cast(0, Skill.getHand(0), object);		delay(500);		Skill.cast(0, Skill.getHand(0), object);		delay(500);		Skill.cast(0, Skill.getHand(0), object);		delay(500);		Skill.cast(0, Skill.getHand(0), object);		// reequip the old item		var item = me.getItem(original.classid);		item.toCursor(); // click new item		delay(500);		clickItem(0, 4); // move to weapon slot		delay(500);		var cursorItem = getUnit(100);		if (Storage.Inventory.CanFit(cursorItem))			Storage.Inventory.MoveTo(cursorItem); // move old item to inventory	};	/////////////////////////////////////////////////	/////////////////////////////////////////////////	/////////////////////////////////////////////////	this.act1_den_of_evil = function ()	{		// report		print('act1_den_of_evil');		// start at town		Town.goToTown(1);		// clear blood moor		this.clearAndCapture(2);		// run corpsefire script		include('bots/Corpsefire.js');		Config.Corpsefire.ClearDen = true;		Corpsefire.call();		// return to town		this.townAndTalk('akara');		// report		D2Bot.printToConsole('Act 1 - Quest (1/6) - "Den of Evil" is complete.');		// return		return true;	};	this.act1_sisters_burial_grounds = function ()	{		// report		print('act1_sisters_burial_grounds');		// start at blood moor		Town.goToTown(1);		// clear cold plains		this.clearAndCapture(3);		// run mausoleum script		include('bots/Mausoleum.js');		Config.Mausoleum.KillBloodRaven = true;		Config.Mausoleum.ClearCrypt = true;	 	Mausoleum.call();		// return to town		this.townAndTalk('kashya');		// report		D2Bot.printToConsole('Act 1 - Quest (2/6) - "Sister\'s Burial Grounds" is complete.');		// return		return true;	};	this.act1_search_for_cain = function ()	{		// report		print('act1_search_for_cain');		// start at cold plains		Town.goToTown(1);		// clear stony field		this.clearAndCapture(4);		// clear underground passage		this.clearAndCapture(10);		// clear dark wood		this.clearAndCapture(5);		// run tristram script		include('bots/Tristram.js'); // will perform all steps in quest line		Tristram.call();		// report		D2Bot.printToConsole('Act 1 - Quest (3/6) - "Search for Cain" is complete.');		// return		return true;	};	this.act1_forgotten_tower = function ()	{		// report		print('act1_forgotten_tower');		// start at dark wood		Town.goToTown(1);		// clear black marsh		this.clearAndCapture(6);		// run countess script		include('bots/Countess.js');		Config.Countess.KillGhosts = true;		Countess.call();		// return to town		this.townAndTalk('akara');		// report		D2Bot.printToConsole('Act 1 - Quest (4/6) - "Forgotten Tower" is complete.');		// return		return true;	};	this.act1_tools_of_the_trade = function ()	{		// report		print('act1_tools_of_the_trade');		// start at black marsh		Town.goToTown(1);		// clear tamoe highlands		this.clearAndCapture(7);		// clear outer cloister		this.clearAndCapture(27);		// run smith script		//include('bots/Smith.js');		//Smith.call();		// clear barracks		this.clearAndCapture(28);		// pickup malus		this.pickAndPlunder(108, 89);		// return to town		this.townAndTalk('charsi');		// report		D2Bot.printToConsole('Act 1 - Quest (5/6) - "Tools of the Trade" is complete.');		// return		return true;	};	this.act1_sisters_to_the_slaughter = function ()	{		if (!me.getQuest(3, 3))		{			// run tools of the trade			this.act1_tools_of_the_trade(); // it won't ever be marked complete (charsi imbue)		}		// report		print('act1_sisters_to_the_slaughter');		// start at outer cloister		Town.goToTown(1);		Pather.useWaypoint(27);		// clear barracks		this.clearAndCapture(28);		// clear jail		this.clearAndCapture(29);		this.clearAndCapture(30);		this.clearAndCapture(31);		// clear inner cloister		this.clearAndCapture(32);		// clear cathedral		this.clearAndCapture(33);		// clear catacombs		this.clearAndCapture(34);		this.clearAndCapture(35);		this.clearAndCapture(36);		this.clearAndCapture(37); // andariel is here		// run countess script		//include('bots/Andariel.js');		//Andariel.call();		// travel to act 2		this.townAndTalk('warriv', 0x0D36);		// talk to jerhyn		this.townAndTalk('jerhyn');		// report		D2Bot.printToConsole('Act 1 - Quest (6/6) - "Sisters to the Slaughter" is complete.');		// idle		this.idle();		// return		return true;	};	this.act2_radaments_lair = function ()	{		// check access		if (!Pather.accessToAct(2)) {			return false;		}		// report		print('act2_radaments_lair');		// start at town		Town.goToTown(2);		// clear sewers		this.clearAndCapture(47);		this.clearAndCapture(48);		// run radament script		include('bots/Radament.js');		Radament.call();		// pickup skill book		this.pickAndPlunder(null, 552, true);		// clear sewers 3		this.clearAndCapture(49, false);		// talk to atma		this.townAndTalk('atma');		// report		D2Bot.printToConsole('Act 2 - Quest (1/6) - "Radament\'s Lair" is complete.');		// return		return true;	};	this.act2_horadric_staff = function ()	{		// check access		if (!Pather.accessToAct(2)) {			return false;		}		// report		print('act2_horadric_staff');		// start at town		Town.goToTown(2);		// if NOT have cube...		if (!me.getItem(549))		{			print('Get the Horadric Cube.');			// clear rocky waste			this.clearAndCapture(41);			// clear dry hills			this.clearAndCapture(42);			// clear halls of the dead			this.clearAndCapture(56);			this.clearAndCapture(57);			this.clearAndCapture(60);			// pickup horadric cube			this.pickAndPlunder(354, 549);		}		// if NOT have staff...		if (!me.getItem(91) && !me.getItem(92))		{			print('Get the Staff of Kings.');			// clear far oasis			this.clearAndCapture(43);			// clear maggot lair			this.clearAndCapture(62);			this.clearAndCapture(63);			this.clearAndCapture(64);			// pickup staff of kings			this.pickAndPlunder(356, 92);		}		// if NOT have amulet...		if (!me.getItem(91) && !me.getItem(521))		{			print('Get the Viper Amulet.');			// clear lost city			this.clearAndCapture(44);			// clear ancient tunnels			this.clearAndCapture(65);			// clear valley of snakes			this.clearAndCapture(45);			// clear claw viper temple			this.clearAndCapture(58);			this.clearAndCapture(61);			// pickup amulet of the viper			this.pickAndPlunder(149, 521);		}		// if NOT have horadric staff...		if (!me.getItem(91))		{			print('Make the Horadric Staff.');			// go to town			Town.goToTown(2);			// talk to drognan			this.townAndTalk('drognan');			// assemble horadric staff			this.cubeAndCreate(91, 92, 521);		}		// report		D2Bot.printToConsole('Act 2 - Quest (2/6) - "Horadric Staff" is complete.');		D2Bot.printToConsole('Act 2 - Quest (3/6) - "Tainted Sun" is complete.');		// return		return true;	};	this.act2_arcane_sanctuary = function ()	{		// check access		if (!Pather.accessToAct(2)) {			return false;		}		// report		print('act2_arcane_sanctuary');		// start at town		Town.goToTown(2);		// talk to jerhyn		this.townAndTalk('jerhyn');		//this.townAndTalk('kaelan');		// clear harem		this.clearAndCapture(50);		this.clearAndCapture(51);		// clear palace cellar		this.clearAndCapture(52);		this.clearAndCapture(53);		this.clearAndCapture(54);		// clear arcane sanctuary		this.clearAndCapture(74, true); // flag true to block town		// open horazons journal		this.pickAndPlunder(357);		// capture waypoint in canyon of the magi		Pather.getWP(46);		// report		D2Bot.printToConsole('Act 2 - Quest (4/6) - "Arcane Sanctuary" is complete.');		D2Bot.printToConsole('Act 2 - Quest (5/6) - "Summoner" is complete.');		// return		return true;	};	this.act2_seven_tombs = function ()	{		// check access		if (!Pather.accessToAct(2)) {			return false;		}		// report		print('act2_seven_tombs');		// start at town		Town.goToTown(2);		// run tombs script		include('bots/Tombs.js');	 	Tombs.call(); 		// move to canyon of magi and tal rashas tomb	 	Pather.journeyTo(46);	 	Pather.moveToExit(getRoom().correcttomb, true); // flag true to enter door	 	Pather.moveToPreset(me.area, 2, 152, -11, 3) // move to staff room		// if you have the horadric staff...	 	if (me.getItem(91))	 	{			// open hole in wall			this.keyAndKeyhole(152, 91);			delay(5000);		}	 	// run duriel script		//include('bots/Duriel.js');	 	//Duriel.call();	 	// clear duriels chamber		Pather.useUnit(2, 100, 73); // use secret door		Attack.kill(211); // kill duriel (will error if he's already dead)		Pickit.pickItems();	 	// talk to tyrael	 	Pather.moveTo(22609, 15707);	 	Pather.moveTo(22576, 15690);	 	Pather.moveTo(22576, 15599);	 	this.talkToNPC('tyrael', 40); // flag true to take portal	 	// travel to act 3	 	this.townAndTalk('jerhyn');	 	this.townAndTalk('meshif', 0x0D38);	 	// talk to hratil		this.townAndTalk('hratli');		// report		D2Bot.printToConsole('Act 2 - Quest (6/6) - "Seven Tombs" is complete.');		// return		return true;	};	this.act3_khalims_will = function ()	{		// check access		if (!Pather.accessToAct(3)) {			return false;		}		// report		print('act3_khalims_will');		// start at town		Town.goToTown(3);		// if NOT have khalims will or khalim's eye...		if (!me.getItem(174) && !me.getItem(553))		{		 	// clear spider forest		 	this.clearAndCapture(76);		 	// clear spider cavern and pickup khalim's eye		 	this.clearAndCapture(85);		 	this.pickAndPlunder(407, 553);		 	// clear great marsh		 	this.clearAndCapture(77);		}		// if NOT have khalims will or khalim's brain...		if (!me.getItem(174) && !me.getItem(555))		{		 	// clear flayer jungle		 	this.clearAndCapture(78);		 	// clear flayer dungeon and pickup khalim's brain		 	this.clearAndCapture(88);		 	this.clearAndCapture(89);		 	this.clearAndCapture(91);		 	this.pickAndPlunder(406, 555);		}		// if NOT have khalims will or khalim's heart...		if (!me.getItem(174) && !me.getItem(554))		{		 	// clear lower kurast		 	this.clearAndCapture(79);		 	// clear kurast bazaar		 	this.clearAndCapture(80);		 	// clear sewers and pickup khalim's heart		 	this.clearAndCapture(92);		 	this.pickAndPlunder(367); // touch the lever		 	Pather.useUnit(2, 366, 93); // use secret door		 	this.clearAndCapture(93);		 	this.pickAndPlunder(405, 554);		}		// if NOT have khalims will or khalim's flail...		if (!me.getItem(174) && !me.getItem(173))		{			// clear upper kurast		 	this.clearAndCapture(81);		 	// clear kurast causeway		 	this.clearAndCapture(82);		 	// clear travincal		 	this.clearAndCapture(83);		 	// pickup khalims flail		 	this.pickAndPlunder(null, 173);		}		// if we have all the parts...		if (me.getItem(173) && me.getItem(553) && me.getItem(554) && me.getItem(555))		{			// assemble khalims will			this.cubeAndCreate(174, 553, 554, 555, 173);		}		// if we have khalim's will...		if (me.getItem(174))		{			// go to travincal			Pather.journeyTo(83);			// move to compelling orb			Pather.moveTo(5788, 1810);			// clear the area			Attack.clear(50);			// equip khalims will			this.equipAndAttack(404, 174);		}		// report		D2Bot.printToConsole('Act 3 - Quest (1/6) - "Golden Bird" is complete.');		D2Bot.printToConsole('Act 3 - Quest (2/6) - "Khalim\'s Will" is complete.');		D2Bot.printToConsole('Act 3 - Quest (3/6) - "Blackened Temple" is complete.');		// return		return true;	};	this.act3_blade_of_the_old_religion = function ()	{		// check access		if (!Pather.accessToAct(3)) {			return false;		}		// report		print('act3_blade_of_the_old_religion');		// start at town		Town.goToTown(3);		// if NOT have gidbinn...		if (!me.getItem(87))		{			// go to flayer jungle			Pather.journeyTo(78);		 	// pickup gidbinn		 	this.pickAndPlunder(252);		 	Attack.clear(50);		 	delay(5000);		 	Attack.clear(50);		 	this.pickAndPlunder(null, 87);		}		// talk to ormus and asheara		this.townAndTalk('ormus');		this.townAndTalk('asheara');		// report		D2Bot.printToConsole('Act 3 - Quest (4/6) - "Blade of the Old Religion" is complete.');		// return		return true;	};	this.act3_lam_esens_tome = function ()	{		// check access		if (!Pather.accessToAct(3)) {			return false;		}		// report		print('act3_lam_esens_tome');		// start at town		Town.goToTown(3);	 	// if we don't already have lam essen's tome...	 	if (!me.getItem(548))		{			// run kurast temples script			include('bots/KurastTemples.js');		 	KurastTemples.call();			// find ruined temple			Pather.journeyTo(94);			this.pickAndPlunder(193, 548);		}		else		{			// talk to alkor			this.townAndTalk('alkor');		}		// report		D2Bot.printToConsole('Act 3 - Quest (5/6) - "Lam Essen\'s Tome" is complete.');		// return		return true;	};	this.act3_guardian = function ()	{		// check access		if (!Pather.accessToAct(3)) {			return false;		}		// report		print('act3_guardian');		// start at town		Town.goToTown(3);		// go to travincal		Pather.journeyTo(83);		Pather.moveTo(5155, 1492); // move to compelling orb		//Attack.clear(50); // clear the area		Pather.useUnit(2, 386, 100); // use secret door		// clear duriance of hate		//this.clearAndCapture(100);		//this.clearAndCapture(101);		// run mephisto script		include('bots/Mephisto.js');		//Config.Mephisto.MoatTrick = false;		Config.Mephisto.KillCouncil = true;		Config.Mephisto.TakeRedPortal = true;	 	Mephisto.call();		// report		D2Bot.printToConsole('Act 3 - Quest (6/6) - "The Guardian" is complete.');		// idle		this.idle();		// return		return true;	};	this.act4_fallen_angel = function ()	{		// check access		if (!Pather.accessToAct(4)) {			return false;		}		// report		print('act4_fallen_angel');		// start at town		Town.goToTown(4);		// clear outer steppes		this.clearAndCapture(104);		// kill izual		Pather.moveToPreset(105, 1, 256);		Attack.kill(256);		Pickit.pickItems();		delay(5000);		this.talkToNPC('izual');		Town.visitTown();		this.talkToNPC('tyrael');		// clear plains of despair		this.clearAndCapture(105);		// clear city of the damned		this.clearAndCapture(106);		// report		D2Bot.printToConsole('Act 4 - Quest (1/3) - "Fallen Angel" is complete.');		// return		return true;	};	this.act4_hells_forge = function ()	{		// check access		if (!Pather.accessToAct(4)) {			return false;		}		// report		print('act4_hells_forge');		// start at town		Town.goToTown(4);		// talk to cain		this.townAndTalk('deckard cain');		// run hephasto script		//include('bots/Hephasto.js');		//Hephasto.call();		// kill hephasto		Pather.journeyTo(107);		Pather.moveToPreset(107, 2, 376);		Attack.clear(50);		// pickup hellforge hammer		//this.pickAndPlunder(null, 90); // not sure why this doesn't work?		Pickit.pickItems(); // fallback		// destroy metphisto's hellstone		this.equipAndAttack(376, 90);		// clear river of flame		this.clearAndCapture(107);		// report		D2Bot.printToConsole('Act 4 - Quest (2/3) - "Hell\'s Forge" is complete.');		// return		return true;	};	this.act4_terrors_end = function ()	{		// check access		if (!Pather.accessToAct(4)) {			return false;		}		// report		print('act4_terrors_end');		// start at town		Town.goToTown(4);		// run diablo script		include('bots/Diablo.js');		Config.Diablo.Entrance = true;		Diablo.call();		// talk to tyrael		Town.goToTown();		Pather.moveTo(5021, 5033);		this.talkToNPC('tyrael', 109);		// report		D2Bot.printToConsole('Act 4 - Quest (3/3) - "Terrors End" is complete.');		// idle		this.idle();		// return		return true;	};	this.act5_seige_on_haggorath = function ()	{		// check access		if (!Pather.accessToAct(5)) {			return false;		}		// report		print('act5_seige_on_haggorath');		// start at town		Town.goToTown(5);		// clear bloody foothills		this.clearAndCapture(110);		// report		D2Bot.printToConsole('Act 5 - Quest (1/6) - "Seige on Harrogath" is complete.');		// return		return true;	};	this.act5_rescue_on_mount_arreat = function ()	{		// call previous quest		this.act5_seige_on_haggorath(); // it won't ever be marked complete (larzuk socket)		// check access		if (!Pather.accessToAct(5)) {			return false;		}		// report		print('act5_rescue_on_mount_arreat');		// start at town		Town.goToTown(5);		// clear frigid highlands		this.clearAndCapture(111);		// go back to town		Town.goToTown();		Pather.journeyTo(111);		// find a free captured soldiers from prisons		var prisons = getPresetUnits(111, 2, 473);		while (prisons.length > 0)		{			var x = prisons[0].roomx * 5 + prisons[0].x;			var y = prisons[0].roomy * 5 + prisons[0].y;			// move to pen			Pather.moveTo(x+5, y-5);			// wait for merc to open prison			delay(10000);			// destroy everything			Attack.clear(20);			// move to next prison			prisons.shift();		}		// clear arreat plateau		this.clearAndCapture(112);		// talk to qualkhek		this.townAndTalk('qual-kehk');		// report		D2Bot.printToConsole('Act 5 - Quest (2/6) - "Rescue On Mount Arreat" is complete.');		// return		return true;	};	this.act5_prison_of_ice = function ()	{		// check access		if (!Pather.accessToAct(5)) {			return false;		}		// report		print('act5_prison_of_ice');		// start at town		Town.goToTown(5);		// clear crystalline passage		this.clearAndCapture(113);		// clear frozen river		this.clearAndCapture(114);		// move to anya		Pather.moveToPreset(me.area, 2, 460);		delay(1000);		// move to anya		var anya = this.getUnitHelper(2, 558);		Pather.moveToUnit(anya);		//anya.interact();		sendPacket(1, 0x13, 4, 0x2, 4, anya.gid);		delay(300);		me.cancel();		// return to malah		Town.goToTown();		Town.move('malah');		var malah = this.getUnitHelper(1, 'malah');		malah.openMenu();		me.cancel();		// take portal back to anya		Town.move('portalspot');		Pather.usePortal(114, me.name);		anya.interact();		delay(300);		me.cancel();		// go back to town		Town.goToTown();		Town.move('malah');		malah.openMenu();		me.cancel();		delay(500);		// consume the scroll		var scroll = me.getItem(646);		if (scroll)			clickItem(1, scroll);		// report		D2Bot.printToConsole('Act 5 - Quest (3/6) - "Prison of Ice" is complete.');		// call next quest		this.act5_betrayal_of_haggorath(); // it won't ever be marked complete (anya rename item)		// return		return true;	};	this.act5_betrayal_of_haggorath = function ()	{		// check access		if (!Pather.accessToAct(5)) {			return false;		}		// report		print('act5_betrayal_of_haggorath');		// start at town		Town.goToTown(5);		// run pindle script		include('bots/Pindleskin.js');		Config.Pindleskin.UseWaypoint = false;		Config.Pindleskin.KillNihlathak = true;		Config.Pindleskin.ViperQuit = true; // End script if Tomb Vipers are found.		Pindleskin.call();		// get waypoint		Pather.getWP(123); // halls of pain		// I'm not including any clearing of levels in this zone		// due to the threat of Tomb Vipers.		// run nilithak script		include('bots/Nihlathak.js');		Config.Nihlathak.ViperQuit = true; // End script if Tomb Vipers are found.		Nihlathak.call();		// talk to anya		this.townAndTalk('anya');		// report		D2Bot.printToConsole('Act 5 - Quest (4/6) - "Betrayal of Haggorath" is complete.');		// return		return true;	};	this.act5_rite_of_passage = function ()	{		// check access		if (!Pather.accessToAct(5)) {			return false;		}		// report		print('act5_rite_of_passage');		// start at town		Town.goToTown(5);		// clear glacial trail		this.clearAndCapture(115);		// clear forzen tundra		this.clearAndCapture(117);		// clear the ancients way		this.clearAndCapture(118);		// clear arreat summit		Pather.journeyTo(120);		this.pickAndPlunder(546); // touch the ancients alter		me.cancel();		this.clearAndCapture(120);		Pather.useUnit(2, 128, 547); // use secret door		// clear worldstone keep		this.clearAndCapture(128); // lvl 1		this.clearAndCapture(129); // lvl 2		// report		D2Bot.printToConsole('Act 5 - Quest (5/6) - "Rite of Passage" is complete.');		// return		return true;	};	this.act5_eve_of_destruction = function ()	{		// check access		if (!Pather.accessToAct(5)) {			return false;		}		// report		print('act5_eve_of_destruction');		// start at town		Town.goToTown(5);		// clear worldstone keep		this.clearAndCapture(130); // lvl 3		include('bots/Baal.js');		Config.Baal.SoulQuit = false; // End script if Souls (Undead Soul Killers) are found.		Config.Baal.DollQuit = false; // End script if Dolls (Undead Stigyan Dolls) are found.		Config.Baal.KillBaal = true; // Kill Baal. Leaves game after wave 5 if false.		Baal.call();		// report		D2Bot.printToConsole('Act 5 - Quest (6/6) - "Rite of Passage" is complete.');		// return		return true;	};	for (i = 0; i < quests.length; i += 1)	{		for (j = 0; j < 3; j += 1)		{			if (!this.checkQuest(quests[i][0]))			{				try {					if (this[quests[i][1]]()) {						break;					}				} catch (e) {				}			} else {				break;			}		}		if (j === 3) {			D2Bot.printToConsole('Quest "' + quests[i][1] + '" failed.');		}	}	// idle	this.idle();	// die	D2Bot.stop();	// return	return true;}