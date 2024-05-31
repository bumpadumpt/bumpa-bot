const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flashcards')
		.setDescription('random problem'),
	async execute(interaction) {
        let array;
        //___________________
        const fs = require('fs');
        fs.readFile('chp6.txt', 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          array = data.split('\n');
        });
        let num = Math.random()*array.length;
		let ans = int.toString()
		let time = Date.now();
		await interaction.reply(a + ' * ' + b);
		
		const collector = interaction.channel.createMessageCollector({
			filter: (msg) => msg.channelId === interaction.channelId,
			time: 10000
		});

		let correct = false;
		collector.on('collect', msg => {
			if(msg.content == ans) {
				correct = true;
				time = (Date.now() - time)/1000;
				msg.reply(`correctly answered in ${time} seconds`);
				collector.stop();
			}


			
		  });

		collector.on('end', collected => {
			if(correct == false) {
				interaction.channel.send('lol too slow');
			}
		  });
	},
};