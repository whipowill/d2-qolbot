# Qolbot

A botting application for Diablo II version ``1.13d`` w/ PlugY support.

This is a fork of an old version of Kolbot.  I've made modifictions to fix bugs, improve performance, and add PlugY support.

## Word To The Wise

You don't want to use this software to bot farm items.  It will ruin the game for you -- trust me.

The more enjoyable and rewarding way to use this software is use it to host LAN games that your other singleplayer characters can join.  It's like your own ladder reset where you steamroll through the game with a full team.

## How To Install

- Modify your ``PlugY.ini`` file:
	- Make sure ``OpenSharedStashOnLoading`` is ``0``.
- Install prerequisites:
	- [Microsoft Visual C++ 2010 Redistributable Package (x86)](https://www.microsoft.com/en-us/download/details.aspx?id=5555)
	- [Microsoft .NET Framework 4.0 (or higher)](https://dotnet.microsoft.com/download/dotnet-framework)
- Download this [zipfile](https://github.com/whipowill/d2-qolbot/archive/master.zip) and extract it.
- Modify ``D2bot.exe`` to run as administrator for all users.
- Run ``D2bot.exe``.
- Create your character profiles:
	- ``Profile Name`` is ``Yourprofilename``.
	- ``Character`` is ``Yourcharactername``.
	- ``Mode`` is ``Single Player``.
	- ``Parameters`` are ``-direct -txt -ns -w``.
		- The ``-w`` has to be in there or it won't work!
	- ``Diablo Path`` is ``C:\your\path\to\Diablo II\Game.exe``.
	- ``Entry Script`` is ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\D2BotLead.dbj``
- Create your character scripts:
	- These files are found in ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\libs\config\``.
	- Copy ``Sorceress.js`` and rename as ``Sorceress.Yourcharactername.js``.
	- This file controls where your character goes and how it fights.
	- The setting ``Scripts.UserAddon`` must be set to ``false``.
	- Use this handy [skill sheet](https://user.xmission.com/~trevin/DiabloIIv1.09_Skills.html) to look up attack skill IDs.
- Create your pickit rulsets:
	- These files are found in ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\pickit\``.
	- These files control what items your character picks up and keeps.
	- These files are referenced in your player scripts.
- Select your profiles and click the ``Start`` button.

## How To Play Multiplayer Games

- Run the game.
- Host a TCP/IP game on the character you wish to play.
- Run ``D2bot.exe``.
- Modify your character profiles:
	- ``Entry Script`` is ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\D2BotTcpIpJoin.dbj``.
- Modify your character scripts:
	- Set ``Scripts.Follower`` to ``true``
- Select your profiles and click the ``Start`` button.

### Chat Commands

Learn these chat commands to control you bot party:

- ``leader <YOURNAME>`` - The bots will mark you as the leader.
- ``1`` - The bots will follow your portal from town.
- ``2`` - The bots will follow your portal to town.
- ``3`` - The bots will do repairs and town chores.
- ``a1``, ``a2``, ``a3``, ``a4``, ``a5`` - The bots will try to move to that act town.
- ``quit <BOTNAME>`` - The bot will quit the game and rejoin.
- ``reload`` - The bots will reload their configs (assuming you made changes).

A full list of all available commands can be found [here](https://github.com/kolton/d2bot-with-kolbot/wiki/Follower).

## Console Commands

- Press ``Pause/Break`` key to pause the bot.
- Press ``NUMPAD +`` key to bring up ingame console.
	- Type ``reload`` to reload the bot / restart quests.
	- Type ``getMouseCoords(1)`` to get X,Y location of cursor on map.

### Issues

- I could never get this to work w/ Wine, no matter how hard I tried.

## References

- [Kolbot](https://github.com/kolton/d2bot-with-kolbot/tree/patch-113d-core15) - the original code repository.
- [Documentation](https://github.com/blizzhackers/documentation/blob/master/kolbot/Hotkeys.md/#hotkeys) - official documentation.
- [API Documentation](https://github.com/noah-/d2bs) - more documentation.
- [D2 Skills Chart](https://user.xmission.com/~trevin/DiabloIIv1.09_Skills.html) - list of skills w/ ID numbers.