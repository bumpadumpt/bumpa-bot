const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction) {
		await interaction.reply('Pong!');
		//const Userfilter = message => message.author.id == interaction.user.id;

		const collector = interaction.channel.createMessageCollector({
			filter: (msg) => msg.author.id === interaction.user.id,
			time: 5000 
		});

		collector.on('collect', msg => {
			console.log(`Collected: ${msg.content}`);
			msg.reply('hi');
			// Handle the collected message as needed
		  });

		collector.on('end', collected => {
			console.log(collected.size);
		  });
	},
};