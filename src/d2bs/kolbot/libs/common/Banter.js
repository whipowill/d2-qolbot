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
		// init
		var now = Date.now();

		// if you were going to speak in the next 15 seconds...
		if (this.time - now <= 15000)
		{
			// delay a little longer
			this.time = now + 60000 + Math.floor(Math.random() * 120000); // 1-3 minute
		}

		return null;
	},

	speak: function ()
	{
		// if quotes are turned off, bail
		if (!Config.DarkQuotes) return null;

		// init
		var now = Date.now();

		// if just entered chat, reset clock
		if (!this.time) this.time = now + 60000 + Math.floor(Math.random() * 120000); // 1-3 minute

		// if speak
		if (now > this.time)
		{
			if (me.inTown)
			{
				this.time = now + 15000 + Math.floor(Math.random() * 60000); // 15sec-1min
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