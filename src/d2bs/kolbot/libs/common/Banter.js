/**
*	@filename	Banter.js
*	@author		whipowill
*	@desc		handle player commentary
*/

var Banter = {

	time: 0,
	quotes: [],

	init: function ()
	{
		this.quotes = JSON.parse(FileTools.readText("libs/config/Quotes/quotes.json"));

		return null;
	},

	delay: function ()
	{
		this.time = now + 30000 + Math.floor(Math.random() * 30000); // 30sec-1min

		return null;
	},

	speak: function ()
	{
		// if quotes are turned off, bail
		if (!Config.DarkQuotes) return null;

		// init
		var speak = false;
		var now = Date.now();

		// if back to town, reset clock
		if (!this.time) this.time = now + Math.floor(Math.random() * 60000); // 0-1 minute

		// if speak
		if (this.time - now < 0)
		{
			if (me.inTown)
			{
				this.time = now + 60000 + Math.floor(Math.random() * 120000); // 1-3 minutes
				var list = this.quotes.town;
			}
			else
			{
				this.time = now + 60000 + Math.floor(Math.random() * 120000); // 1-3 minutes
				var list = this.quotes.combat;
			}

			// roll the dice on what quote to use
			var ran = Math.floor(Math.random() * list.length);

			// say the quote
			say(list[ran]);
		}

		return null;
	}
};