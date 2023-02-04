function LoadConfig()
{
	// choose your build
	include("config/Templates/Assassin/Kick.js");
	//include("config/Templates/Assassin/Trap.js");

	// run the build
	LoadTemplate();

	// autoequip on/off
	Config.AutoEquip = true; // this is cool until you get good stuff
	Config.AutoMercEquip = true;
}