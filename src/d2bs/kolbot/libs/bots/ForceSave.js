function ForceSave() {

	// send update
	delay(500);
	D2Bot.updateRuns();
	delay(500);

	// use plugy command to save
	delay(500);
	say("/save");
	delay(5000);
	
	// return
	return true;
}