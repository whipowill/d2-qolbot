# Qolbot

A botting application for Diablo II LOD ``1.13d`` w/ PlugY support.

This is a fork of an older branch of Kolbot, modified with all the necessary changes and provided here with all the necessary instructions to get it working on your SP PlugY version of the game.

## Prerequisites

- Make sure these are installed:
	- [Microsoft Visual C++ 2010 Redistributable Package (x86)](https://www.microsoft.com/en-us/download/details.aspx?id=5555)
	- [Microsoft .NET Framework 4.0 (or higher)](https://dotnet.microsoft.com/download/dotnet-framework)
- Modify your ``PlugY.ini`` file:
	- Make sure ``OpenSharedStashOnLoading`` is ``0``.
	- This makes the bot fill up personal stash instead of shared stash.

## Install

- Download this [zipfile](https://github.com/whipowill/d2-qolbot/archive/master.zip) and extract it.
- Modify ``D2bot.exe`` to run as administrator for all users.
- Run ``D2bot.exe``.
- Create a new profile:
	- ``Profile Name`` is ``Yourprofilename``.
	- ``Character`` is ``Yourcharactername``.
	- ``Mode`` is ``Single Player``.
	- ``Parameters`` are ``-direct -txt -3dfx -ns -w``.
		- The ``-w`` has to be in there or it won't work!
	- ``Diablo Path`` is ``C:\your\path\to\Diablo II\Game.exe``.
	- ``Entry Script`` is ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\D2BotLead.dbj``
	- ``Visible`` is checked.
- Create a new player script:
	- These files are found in ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\libs\config\``.
	- Copy ``Sorceress.js`` and rename as ``Sorceress.Yourcharactername.js``.
	- This file controls where your character goes and how it fights.
	- The setting ``Scripts.UserAddon`` must be set to ``false``.
	- Use this handy [skill sheet](https://user.xmission.com/~trevin/DiabloIIv1.09_Skills.html) to look up attack skill IDs.
- Create a new pickit rulset:
	- These files are found in ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\pickit\``.
	- These files control what items your character picks up and keeps.
	- These files are referenced in your player script.
	- I recommend using the ``QOL`` files included in this repo.
- Select your profile and click the ``Start`` button.

### Wine

- This doesn't work w/ Wine, no matter how hard you try.

## Automation

I programmed the ``Questing.js`` file to do all the quests in the game.  This is a work in progress:

- It won't auto-equip or auto-skill (todo).
- It will idle the character at the end of every act.
- You must model your script after the ``Sorceress.Questing.js`` example file.
- You are very likely to die on HC.

## Commands

- Press ``Pause/Break`` key to pause the bot.
- Press ``NUMPAD+`` key to bring up ingame console.
	- Type ``reload`` to reload the bot / restart quests.
	- Type ``getMouseCoords(1)`` to get X,Y location of cursor on map.

## References

- [Kolbot](https://github.com/kolton/d2bot-with-kolbot/tree/patch-113d-core15) - the original code repository.
- [Issue #338](https://github.com/kolton/d2bot-with-kolbot/issues/338) - instructions on modifications.
- [Documentation](https://github.com/blizzhackers/documentation/blob/master/kolbot/Hotkeys.md/#hotkeys) - official documentation.
- [API Documentation](https://github.com/noah-/d2bs) - more documentation.
- [D2 Skills Chart](https://user.xmission.com/~trevin/DiabloIIv1.09_Skills.html) - list of skills w/ ID numbers.
- [Pickit Files](https://github.com/blizzhackers/pickits/tree/master/custom) - downloable pickit rulesets.