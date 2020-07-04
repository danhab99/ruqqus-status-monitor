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
const persistStatus = s => writeFileSync(LAST_STATUS_FILE, s)

console.log(new Date().toString(), 'Doing check')

fetch('https://ruqqus.com/')
  .then(res => {
    console.log('Response', res)
    if (!res.ok) {
      console.log('Ruqqus is down')

      if (LAST_STATUS === 'up') {
        postTweet('@ruqqus Ruqqus.com is down')
      }
      else if (LAST_STATUS === 'down') {
        postTweet('@ruqqus Ruqqus.com is still down')
      }
      
      persistStatus('down')
    }
    else {
      if (LAST_STATUS === 'down') {
        postTweet('@ruqqus Ruqqus.com is back online')
      }
      console.log('Ruqqus is fine')
      persistStatus('up')
    }
  })