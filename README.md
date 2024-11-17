# Migrate from X.com to BlueSky

This is a script that will make a list of all profiles you follow on x.com then try to add them on BlueSky.

This searches for someone with the same username from x to bluesky, so obviously it's not perfect.

It will generate a log file that shows if it was able to follow or not.

WARNING: This is scraping your own profile. Definitely against the TOS of x.com. *Use at your own risk.*

### Stack
- Node.js
- Typescript
- Selenium + Chrome Webdriver
- BlueSky API

# Getting Started

Prereqs: This uses Selenium webdriver, and you will need to have a browser installed based on your system. This script uses chrome by default. More information here: https://www.selenium.dev/selenium/docs/api/javascript/

`npm install`

`npm run build`

## Getting Your X.com Follows

`npm start`

1. The script will ask you for your x.com @profile name. (Leading @ is optional).

2. After prompt, it will launch Chrome and go to the x.com homepage, where you will need to login.

3. Once the script detects you are logged in, it will take over and navigate to your follow list, then start downloading.

4. When it's done, it will close the browser window. Your follows are saved in a text file called following_profiles.txt

## Following them on BlueSky

TBD
