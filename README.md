# Qolbot

A botting application for Diablo II LOD ``1.13d`` w/ PlugY support.

This is a fork of an older branch of Kolbot, modified with all the necessary changes and provided here with all the necessary instructions to get it working on your SP PlugY version of the game.

## Prerequisites

- Make sure these are installed:
	- [Microsoft Visual C++ 2010 Redistributable Package (x86)](https://www.microsoft.com/en-us/download/details.aspx?id=5555)
	- [Microsoft .NET Framework 4.0 (or higher)](https://dotnet.microsoft.com/download/dotnet-framework)
- Make sure you're using ``DDraw`` and not ``Glide``.
	- Check this [guide](https://github.com/whipowill/d2-plugy-qol/blob/master/Guides/Video.md) for info about video libraries.
- Modify your ``PlugY.ini`` file:
	- Make sure ``OpenSharedStashOnLoading`` is ``0``.

## Install

- Download this [zipfile](https://github.com/whipowill/d2-qolbotl/archive/master.zip) and extract it.
- Modify ``D2bot.exe`` to run as administrator for all users.
- Run ``D2bot.exe``.
- Create a new profile:
	- ``Profile Name`` is ``Yourprofilename``.
	- ``Character`` is ``Yourcharactername``.
	- ``Mode`` is ``Single Player``.
	- Parameters are ``-direct -txt -ns -w``.
		- The ``-w`` has to be in there or it won't work!
	- ``Diablo Path`` is ``C:\your\path\to\Diablo II\Game.exe``.
	- ``Entry Script`` is ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\D2BotLead.dbj``
	- ``Visible`` is checked.
- Create a new script:
	- These files are found in ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\libs\config\``.
	- Copy ``Sorceress.js`` and rename as ``Sorceress.Yourcharactername.js``.
	- Make edits to the profile as you see fit.
- Create a new pickit:
	- These files are found in ``C:\your\path\to\d2-qolbot\src\d2bs\kolbot\pickit\``.
	- These control what items your character picks up and keeps.
	- Modifying these files is optional.
	- These files are referenced in your character script.
- Select the manager profile and hit ``Start``.

## Known Issues

- This doesn't work w/ Wine, no matter how hard you try.
- Hovering over found items in the manager normally will show a screenshot of the item, but sometimes it gives an error.  Just hit continue and everything will be fine.

## Tips

- It's best to use a Sorceress for Teleport speed runs.

## References

- [Kolbot](https://github.com/kolton/d2bot-with-kolbot/tree/patch-113d-core15) - the original code repository.
- [Issue #338](https://github.com/kolton/d2bot-with-kolbot/issues/338) - instructions on modifications.
- [Pickit](https://github.com/blizzhackers/pickits/tree/master/custom) - downloable pickit rulesets.