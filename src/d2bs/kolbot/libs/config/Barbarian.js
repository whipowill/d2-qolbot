function LoadConfig()
{
	// choose your build
	include("config/Templates/Barbarian/Frenzy.js");
	//include("config/Templates/Barbarian/Whirlwind.js");
	//include("config/Templates/Barbarian/Throw.js");

	// run the build
	LoadTemplate();

	// autoequip on/off
	Config.AutoEquip = true; // this is cool until you get good stuff
	Config.AutoMercEquip = true;
}