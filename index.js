const { Client, GatewayIntentBits } = require('discord.js');
const { token, welcomeChannelId } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once('ready', () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    
    client.user.setActivity('the world burn.', { type: 'WATCHING' }, (error) => {
        if (error) {
            console.error(`Error setting activity: ${error.message}`);
        } else {
            console.log(`Activity set successfully.`);
        }
    });
});

client.on('guildMemberAdd', member => {
    console.log(`New member joined: ${member.user.tag}`);

    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);

    if (welcomeChannel) {
        welcomeChannel.send(`**Welcome to The Premium Lounge ${member} ❗**`);
        console.log(`Welcome message sent to ${welcomeChannel.name}`);
    } else {
        console.error(`The specified welcome channel (${welcomeChannelId}) was not found.`);
    }
});

client.login(token);
