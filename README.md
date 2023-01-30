# Qolbot

A botting application for Diablo II version ``1.13d`` w/ PlugY support.

The most enjoyable way of using this software is to host LAN games that your other singleplayer characters can join.  It's like having your own ladder reset where you roll through the game with a full team.

This is a fork of an old version of Kolbot w/ some bug fixes.

![Qolbot](https://i.imgur.com/xJqNewn.png)

## Vision

Most of my work on this code involves the ``Follower.js`` and ``Quester.js`` files.  My goal is to create an experience where the bots will join your games and play with you and automatically do the things a normal person would do.  They crack jokes, they gather waypoints, they complete quests, they gear up, they choose skills, they gamble, etc.

### Features

- Gallows humor remarks as you play
- Capture waypoints as you go
- Complete quests as you go (work in progress)
- Custom inventory sizes to accomodate your mods
- Infinite stash support for PlugY

### Todo

- Experiment w/ AutoBuild abilities
- Experiment w/ AutoEquip abilities

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
	- ``_DefaultConfig.js`` is a config file that applies to all characters, most of the settings are in here.
	- Copy ``Yourclass.js``, rename as ``Yourclass.Yourcharactername.js``, and modify as needed.
- Create your pickit rulesets:
	- These files are found in ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\pickit\``.
	- These files control what items your character picks up and keeps.
	- These files are referenced in your bot scripts.
- Select your profile and click the ``Start`` button.

## Multiplayer

- Prep the game:
	- Join a TCP/IP game using address ``localhost``.
	- It will fail, but the game will remember this address for the bots.
	- Host a TCP/IP game on the character you wish to play.
- Run ``D2bot.exe``.
- Modify your bot profiles:
	- ``Entry Script`` is ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\D2BotTcpIpJoin.dbj``.
- Modify your bot scripts:
	- In ``_DefaultConfig.js``:
		- Set ``Config.Leader=`` the character you intend to play.
		- Set ``Scripts.Follower=true``.
		- Set ``Config.PublicMode=2``.
- Select your profiles and click the ``Start`` button.

### Chat Commands

- ``1`` - take the portal opened into the wild
- ``2`` - take the portal opened back to town
- ``3`` - perform town chores
- ``save`` - bots will issue PlugY ``/save`` to force save
- ``town`` - bots will go to town from wherever they are (use when lost)
- ``move`` - bots will shuffle around (use when stuck)
- ``prep`` - bots will get prepared for battle (use for summons that take time)
- ``status`` - bots will report quest progress
- ``<BOTNAME> portal <DESTINATION>`` - dispatch a Sorceress a desired place and open a portal
	- Act 1 - ``countess``, ``mausoleum``, ``pit``, ``andariel``
	- Act 2 - ``tunnels``, ``summoner``, ``duriel``
	- Act 3 - ``temple``, ``mephisto``
	- Act 4 - ``diablo``
	- Act 5 - ``halls``, ``baal``

## Console

- Press ``Pause/Break`` key to pause the bot.
- Press ``+`` on the numpad to bring up ingame console:
	- Type ``reload`` to reload the bot / restart quests.
	- Type ``getMouseCoords(1)`` to get X,Y location of cursor on map.

## Issues

- The bot will mess up your shared stash unless you fix the config.
	- Modify your ``PlugY.ini`` file:
		- Set ``OpenSharedStashOnLoading=0``.
- You can't play another character while a bot is running bc your shared stash will get overwritten.
	- Modify your bot profile:
		- ``Entry Script`` is ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\D2BotTcpIpHost.dbj``.
			- By running as TCP/IP host, shared stash is disabled.
- If you have maphack installed it means that all your bots will launch w/ maphack too.
	- This causes unecessary overhead on your machine, but you can turn it off.
	- Copy your game folder to another directory, I named mine ``Diablo II - Bots``.
	- Modify the ``Plugy.ini`` in that directory to not load ``BH.dll``.
	- Change the ``Diablo Path`` in your botting profile to use the new ``Game.exe``.
	- The bot will still save to your original D2 directory bc the path is defined in the Windows registry.

## References

- [Kolbot](https://github.com/kolton/d2bot-with-kolbot/tree/patch-113d-core15) - the original code repository.
- [Documentation](https://github.com/blizzhackers/documentation/blob/master/kolbot/Hotkeys.md/#hotkeys) - official documentation.
- [API Documentation](https://github.com/noah-/d2bs) - more documentation.
- [D2 Skills Chart](https://user.xmission.com/~trevin/DiabloIIv1.09_Skills.html) - list of skills w/ ID numbers.