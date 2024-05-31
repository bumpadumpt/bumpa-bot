const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('harder_math')
		.setDescription('give harder math random problem'),
	async execute(interaction) {
		let a = Math.floor(Math.random()*27+3);
		let b = Math.floor(Math.random()*20+11);
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