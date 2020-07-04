# ruqqus-status-monitor

Tweets anytime Ruqqus is down. [Ruqqus.com](https://ruqqus.com/) is checked hourly to avoid spam.

## Setup

1. Get your twitter secrets from the twitter developer dashboard and put them in `./twitter-secrets.json`, go to [npm twitter](https://www.npmjs.com/package/twitter#for-user-based-authentication) to learn more.
2. Get your discord secret from the discord dev dashboard and put them in `./discord-secrets.json [token]`
3. Set `guildID` and `channelID` in your discord secrets to the server and channel you want notifications to be sent on
4. Run `docker-compose up -d --build` to boot service
5. Leave it alone. Thing should beable to handle itself just fine

## Changing check interval

This program runs in a cron job defined in `./cron`. Go to [crontab guru](https://crontab.guru/) to learn more about how to change the interval. Please don't make it anymore frequent than an hour, we all know how unstable Ruqqus servers can be.
