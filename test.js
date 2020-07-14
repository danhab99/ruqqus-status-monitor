const Twitter = require('twitter');
const client = new Twitter(require('./twitter-secrets.json'));
const time = () => (new Date()).toString()

client.post('statuses/update', { status: `${time()} This is a test tweet` })
  .then(tweet => {
    console.log('Tweet posted successfully', tweet)
  })
  .catch(err => {
    console.error('Tweet failed to post', err)
  })