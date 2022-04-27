# Qolbot

A botting application for Diablo II version ``1.13d`` w/ PlugY support.

The most enjoyable way of using this software is to host LAN games that your other singleplayer characters can join.  It's like having your own ladder reset where you roll through the game with a full team.

This is a fork of an old version of Kolbot w/ some bug fixes.

## Install

- Install prerequisites:
	- [Microsoft Visual C++ 2010 Redistributable Package (x86)](https://www.microsoft.com/en-us/download/details.aspx?id=5555)
	- [Microsoft .NET Framework 4.0 (or higher)](https://dotnet.microsoft.com/download/dotnet-framework)
- Download this [zipfile](https://github.com/whipowill/d2-qolbot/archive/master.zip) and extract it.
- Modify ``D2bot.exe`` to run as administrator for all users.
- Run ``D2bot.exe``.
- Create your bot profiles:
	- ``Mode`` is ``Single Player``.
	- ``Parameters`` are ``-direct -txt -ns -w``.
		- The ``-w`` has to be in there or it won't work!
	- ``Diablo Path`` is ``C:\your\path\to\Diablo II\Game.exe``.
	- ``Entry Script`` is ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\D2BotLead.dbj``
- Create your bot scripts:
	- These files are found in ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\libs\config\``.
	- Copy ``Sorceress.js`` and rename as ``Sorceress.Yourcharactername.js``.
	- This file controls where your bot goes and how it fights.
	- The setting ``Scripts.UserAddon`` must be set to ``false``.
	- Use this handy [skill sheet](https://user.xmission.com/~trevin/DiabloIIv1.09_Skills.html) to look up attack skill IDs.
- Create your pickit rulesets:
	- These files are found in ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\pickit\``.
	- These files control what items your character picks up and keeps.
	- These files are referenced in your player scripts.
- Select your profiles and click the ``Start`` button.

## Changes

I've made some changes to the original Kolbot code:

- ``Config.InfiniteStash=true`` - will enable use of PlugY pages.
- ``Config.ViperCheck=true`` - will quit the game if encounter has Vipers.
- ``Config.DollsCheck=true`` - will quit the game if encounter has Dolls.
- ``Config.ClearPath=true`` - set to true if you don't want to use Teleport.
- ``Config.Leaders=["MyCharOne", "MyCharTwo"]`` - set an array of characters who bots will allow to be leader.
- ``Scripts.ForceSave=true`` - put at the end of your scripts, will fix progress retention issues.

## Multiplayer

- Prep the game:
	- Join a TCP/IP game using address ``localhost``.
	- It will fail, but the game will remember this address for the bots.
	- Host a TCP/IP game on the character you wish to play.
- Run ``D2bot.exe``.
- Modify your bot profiles:
	- ``Entry Script`` is ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\D2BotTcpIpJoin.dbj``.
- Modify your bot scripts:
	- Set ``Scripts.Follower`` to ``true``
- Select your profiles and click the ``Start`` button.

### Chat Commands

Learn these chat commands to control your bot party:

- ``leader <YOURNAME>`` - bots will mark you as their leader.
- ``1`` - bots will follow your portal from town (call from any act).
- ``2`` - bots will follow your portal to town (call only if closeby).
- ``3`` - bots will do repairs and town chores.
- ``a2``, ``a3``, ``a4``, ``a5`` - bots will complete quest dialogues to travel to that act town.
- ``quit`` - bots will quit the game and rejoin.
- ``<BOTNAME> quit`` - bot will quit the game and rejoin.
- ``reload`` - bots will reload their configs.
- ``talk <NPCNAME>`` - bots will complete quests by talking to NPC.
- ``wp`` - bots will capture the nearest waypoint.
- ``s`` - bots will stop moving and freeze.
- ``<BOTNAME> s`` - bot will stop moving and freeze.
- ``move`` - bots will shuffle position.

To address issues w/ bots not reliably saving progress on TCP/IP games, I added this command:

- ``save`` - bots will issue PlugY ``/save`` to force save.

A full list of all available commands can be found [here](https://raw.githubusercontent.com/whipowill/d2-qolbot/master/src/d2bs/kolbot/libs/bots/Follower.js).

## Console

- Press ``Pause/Break`` key to pause the bot.
- Press ``+`` on the numpad to bring up ingame console:
	- Type ``reload`` to reload the bot / restart quests.
	- Type ``getMouseCoords(1)`` to get X,Y location of cursor on map.

## Issues

- The bot will mess up your shared stash unless you fix the config.
	- Modify your ``PlugY.ini`` file:
		- Make sure ``OpenSharedStashOnLoading`` is ``0``.
- You can't play another character while a bot is running bc your shared stash will get overwritten.
	- Modify your bot profile:
		- ``Entry Script`` is ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\D2BotTcpIpHost.dbj``.
			- By running as TCP/IP host, shared stash is disabled.
- Depending on how the bot disconnects from TCP/IP games, it effects their progress retention.
	- If you the player as host quit the game, and the bots are disconnected, everyone will retain progess.
		- This seems to be good and nothing needs fixing.
	- If the bot as joiner quits the game, it seems they only retain recent but not all progress.
		- Nothing I can do to fix this, they will quit when they chicken.
	- If the bot as host quits the game, it looses all progress.
		- This was fixed by adding ``Scripts.ForceSave=true`` to the end of bot configs.
			- It uses PlugY to force a save by printing ``/save`` to the chat.
- If you have maphack installed it means that all your bots will launch w/ maphack too.
	- This causes unecessary overhead on your machine, but you can turn it off:
		- Copy your game folder to another directory, I named mine ``Diablo II - Bots``.
		- Modify the ``Plugy.ini`` in that directory to not load ``BH.dll``.
		- Change the ``Diablo Path`` in your botting profile to use the new ``Game.exe``.
		- The bot will still save to your original D2 directory bc the path is defined in the Windows registry.
- I could never get this to work w/ Wine, no matter how hard I tried.

## References

- [Kolbot](https://github.com/kolton/d2bot-with-kolbot/tree/patch-113d-core15) - the original code repository.
- [Documentation](https://github.com/blizzhackers/documentation/blob/master/kolbot/Hotkeys.md/#hotkeys) - official documentation.
- [API Documentation](https://github.com/noah-/d2bs) - more documentation.
- [D2 Skills Chart](https://user.xmission.com/~trevin/DiabloIIv1.09_Skills.html) - list of skills w/ ID numbers.