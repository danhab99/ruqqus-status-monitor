const Twitter = require('twitter');
const Discord = require('discord.js');

const twitterClient = new Twitter(require('./twitter-secrets.json'));
const discordClient = new Discord.Client();
const discordSecrets = require('./discord-secrets.json')


module.exports = postStatus = status => {
  discordClient.login(discordSecrets['token'])

  discordClient.on('ready', () => {
    console.log(`Discord logged in as ${discordClient.user.tag}!`);
    let guild = discordClient.guilds.cache.get(discordSecrets['guildID']), // returns a Guild or undefined
    channel;

    if (guild) {
      channel = guild.channels.cache.get(discordSecrets['channelID']);
      if (channel) {
        console.log('Sending on discord', status)
        channel.send(status)
      }
      else {
        console.error("There's no channel with that ID")
      }
    }
    else {
      console.error('There is no guild with that ID')
    }
  });

  console.log('Tweeting', status)
  return twitterClient.post('statuses/update', { status })
  .then(tweet => {
    console.log('Tweet posted successfully')
  })
  .catch(err => {
    console.error('Tweet failed to post', err)
  })
}