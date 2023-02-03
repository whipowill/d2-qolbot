function LoadConfig()
{
	// choose your build
	include("config/Templates/Druid/Summon.js");
	//include("config/Templates/Druid/Windy.js");
	//include("config/Templates/Druid/Fury.js");

	// run the build
	LoadTemplate();

	// autoequip on/off
	Config.AutoEquip = true; // this is cool until you get good stuff
}