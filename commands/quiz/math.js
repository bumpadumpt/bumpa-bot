const { SlashCommandBuilder } = require('discord.js');
/*
let array;
const fs = require('fs');
fs.readFile('math-questions.txt', 'utf8', (err, qs) => {
  if (err) {
    console.error(err);
    return;
  }
  array = qs.split('\n');
});
*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('math')
		.setDescription('give ez math random problem'),
	async execute(interaction) {
		let a = Math.floor(Math.random()*9+2);
		let b = Math.floor(Math.random()*10+11);
		let int = a*b;
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
				time = (Date.now() - time)/1000;
				correct = true;
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
}