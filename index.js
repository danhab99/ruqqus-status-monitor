const Twitter = require('twitter');
const fetch = require('node-fetch');
const { readFileSync, writeFileSync, existsSync } = require('fs')

const LAST_STATUS_FILE = `${__dirname}/.last_status`

if (!existsSync(LAST_STATUS_FILE)) {
  writeFileSync(LAST_STATUS_FILE, '', { flag: 'w+' })
}

const LAST_STATUS = readFileSync(LAST_STATUS_FILE).toString()
const client = new Twitter(require('./twitter-secrets.json'));
const postTweet = status => {
  console.log('Tweeting', status)
  return client.post('statuses/update', { status })
  .then(tweet => {
    console.log('Tweet posted successfully')
  })
  .catch(err => {
    console.error('Tweet failed to post', err)
  })
}

console.log('Doing check')

fetch('https://ruqqus.com/')
  .then(res => {
    console.log('Response', res)
    if (res.status >= 500) {
      console.log('Ruqqus is down')

      if (LAST_STATUS === 'up') {
        postTweet('Ruqqus.com is down')
      }
      else if (LAST_STATUS === 'down') {
        postTweet('Ruqqus.com is still down')
      }
      
      writeFileSync(LAST_STATUS_FILE, 'down')
    }
    else {
      if (LAST_STATUS === 'down') {
        postTweet('Ruqqus.com is back online')
      }
      console.log('Ruqqus is fine')
      writeFileSync(LAST_STATUS_FILE, 'up')
    }
  })