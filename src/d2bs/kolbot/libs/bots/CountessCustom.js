/**
*	@filename	Countess.js
*	@author		kolton
*	@desc		kill The Countess and optionally kill Ghosts along the way
*/

function CountessCustom() {

	this.getPlayerCount = function () {
		var count = 0,
			party = getParty();

		if (party) {
			do {
				count += 1;
			} while (party.getNext());
		}

		return count;
	};

	var i, poi;

	// wait for others
	say("Waiting for team."); // announce
	var i;
	for (i = 0; i < 3; i += 1)
	{
		delay(10000); // wait 10 seconds
		say("leader "+me.name); // set leader
	}

	// flight check
	var party;
	party = this.getPlayerCount();
	if (party < 2)
	{
		D2Bot.printToConsole("Not enough party members ("+party+").");
		quit();
	}

	// summon to town
	delay(1000);
	Town.goToTown(1);
	say("1");

	delay(30000);

	// do chores
	Town.doChores();
	say("3");

	delay(30000);

	// prepare for war
	say("prep");

	// move to black marsh
	Pather.useWaypoint(6);
	Precast.doPrecast(true);

	// move to tower
	if (!Pather.moveToExit([20, 21, 22, 23, 24, 25], true)) {
		throw new Error("Failed to move to Countess");
	}

	poi = getPresetUnit(me.area, 2, 580);

	if (!poi) {
		throw new Error("Failed to move to Countess (preset not found)");
	}

	switch (poi.roomx * 5 + poi.x) {
	case 12565:
		Pather.moveTo(12578, 11043);
		break;
	case 12526:
		Pather.moveTo(12548, 11083);
		break;
	}

	// open portal
	Pather.makePortal(true); // flag true use the portal you opened
	delay(100);
	say("1"); // summon followers into the fray

	// hide like a coward
	delay(1000);

	// go back inside
	Pather.usePortal(25, me.name);

	// kill the boss
	Attack.clear(20, 0, getLocaleString(2875)); // The Countess

	// call home
	say("town");

	// return
	return true;
}