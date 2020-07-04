const fetch = require('node-fetch');
const { readFileSync, writeFileSync, existsSync } = require('fs')
const postStatus = require('./postStatus')

const LAST_STATUS_FILE = `${__dirname}/.last_status`

if (!existsSync(LAST_STATUS_FILE)) {
  writeFileSync(LAST_STATUS_FILE, '', { flag: 'w+' })
}

const LAST_STATUS = readFileSync(LAST_STATUS_FILE).toString()

console.log('Doing check')

fetch('https://ruqqus.com/')
  .then(res => {
    console.log('Response', res)
    if (res.status >= 500) {
      console.log('Ruqqus is down')

      if (LAST_STATUS === 'up') {
        postStatus('Ruqqus.com is down')
      }
      else if (LAST_STATUS === 'down') {
        postStatus('Ruqqus.com is still down')
      }
      
      writeFileSync(LAST_STATUS_FILE, 'down')
    }
    else {
      if (LAST_STATUS === 'down') {
        postStatus('Ruqqus.com is back online')
      }
      console.log('Ruqqus is fine')
      writeFileSync(LAST_STATUS_FILE, 'up')
    }
  })