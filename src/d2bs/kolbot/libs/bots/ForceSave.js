function ForceSave() {

	delay(5000);

	// use plugy command to save
	say("Saving.");
	say("/save");
	delay(5000);

	// send update
	D2Bot.updateRuns();
	delay(5000);

	// For reasons I don't fully understand, this was not working reliably.
	// Switching the order of events, to save first before updating run counts,
	// and adding additional wait time, seems to have fixed this.

	// return
	return true;
}