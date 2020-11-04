/**
*	@filename	Radament.js
*	@author		kolton
*	@desc		kill Radament
*/

function Radament() {
	Town.doChores();
	Pather.useWaypoint(48);
	Precast.doPrecast(true);

	if (!Pather.moveToExit(49, true) || !Pather.moveToPreset(me.area, 2, 355)) {
		throw new Error("Failed to move to Radament");
	}

	//Attack.kill(229); // Radament
	Attack.clear(20); // focusing only on radament gets you killed
	Pickit.pickItems();
	Attack.openChests(20);

	return true;
}