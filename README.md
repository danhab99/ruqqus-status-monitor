# ruqqus-status-monitor

Tweets anytime Ruqqus is down. [Ruqqus.com](https://ruqqus.com/) is checked hourly to avoid spam.

## Setup

1. Get your twitter secrets from the twitter developer dashboard and put them in `./twitter-secrets.json`, go to [npm twitter](https://www.npmjs.com/package/twitter#for-user-based-authentication) to learn more.
2. Run `docker-compose up` to boot service
3. Leave it alone. Thing should beable to handle itself just fine

## Changing check interval

This program runs in a cron job defined in `./cron`. Go to [crontab guru](https://crontab.guru/) to learn more about how to change the interval. Please don't make it anymore frequent than an hour, we all know how unstable Ruqqus servers can be.
