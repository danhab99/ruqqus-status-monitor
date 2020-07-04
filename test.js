const Twitter = require('twitter');
const client = new Twitter(require('./twitter-secrets.json'));

client.post('statuses/update', { status: "This is a test tweet" })
  .then(tweet => {
    console.log('Tweet posted successfully', tweet)
  })
  .catch(err => {
    console.error('Tweet failed to post', err)
  })