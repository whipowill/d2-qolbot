function LoadConfig()
{
	// choose your build
	include("config/Templates/Amazon/Bowazon.js");
	//include("config/Templates/Barbarian/Javazon.js");

	// run the build
	LoadTemplate();

	// autoequip on/off
	Config.AutoEquip = true; // this is cool until you get good stuff
	Config.AutoMercEquip = true;
}