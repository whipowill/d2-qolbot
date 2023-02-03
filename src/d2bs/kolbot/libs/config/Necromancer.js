function LoadConfig()
{
	// choose your build
	include("config/Templates/Necromancer/Summon.js");

	// run the build
	LoadTemplate();

	// autoequip on/off
	Config.AutoEquip = true; // this is cool until you get good stuff
}