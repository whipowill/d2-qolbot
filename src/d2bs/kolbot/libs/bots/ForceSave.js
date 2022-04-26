function ForceSave() {

	// send update
	delay(5000);
	D2Bot.updateRuns();

	// use plugy command to save
	say("/save");
	delay(5000);
	
	// return
	return true;
}