function LoadConfig()
{
	// choose your build
	include("config/Templates/Sorceress/Meteor.js");
	//include("config/Templates/Sorceress/Blizzard.js");

	// run the build
	LoadTemplate();

	// autoequip on/off
	Config.AutoEquip = true; // this is cool until you get good stuff
	Config.AutoMercEquip = true;
}