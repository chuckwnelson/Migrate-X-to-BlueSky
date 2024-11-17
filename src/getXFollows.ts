import { Builder, By, until, WebElement } from 'selenium-webdriver';
import fs from 'fs';

type ProfileName = string;

async function getFollowingProfiles(XUsername: string): Promise<ProfileName[]> {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log('Going to X profile: ', XUsername)
        await driver.get('https://x.com/home');

        console.log('Login process initiated. Login to your x.com account in order to see your follow list.');

        // Wait for the user to log in manually by polling the user session
        await driver.wait(until.urlContains('/home'), 30000);

        console.log('Login successful, waiting for following page to load');
        await driver.sleep(5000);
        // Navigate to the following page if login redirects elsewhere
        await driver.get('https://x.com/' + XUsername +'/following');
        await driver.sleep(5000);

        //Our saved profiles array
        let followingProfiles: ProfileName[] = [];

        //X.com only shows so many per page, lets simulate scrolling down 10 times to get a bulk of followers.
        // TODO: ask how many followers the user has, then turn that into the number of pages for the followers list
        for (let i = 0; i < 10; i++) {
          console.log(`Scrolling to the bottom to load more followers, iteration ${i+1}`);
          await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');

          console.log('Getting list of profiles on page')
          let followingElements: WebElement[] = await driver.findElements(By.css('div[aria-label="Timeline: Following"] a[role="link"]'));
          //Remove Duplicates
          let uniqueFollowingElements = new Set();

          followingElements = followingElements.filter(element => {
            let href = element.getAttribute('href');
            if (uniqueFollowingElements.has(href)) {
              return false;
            }
            uniqueFollowingElements.add(href);
            return true;
          });

          for (let element of followingElements) {
            let href: string = await element.getAttribute('href');
            let profileName: ProfileName = href.replace('https://x.com/', '');
            if (!followingProfiles.includes(profileName) && /^[a-zA-Z0-9_]+$/.test(profileName)) {
              console.log('Found:', profileName)
              followingProfiles.push(profileName);
            }
          }

          await driver.sleep(5000);
        }


        console.log('Number of @profiles found:', followingProfiles.length)
        return followingProfiles;
    } finally {
        // Close the browser
        await driver.quit();
    }
}

function saveFollowingProfilesToFile(followingProfiles: ProfileName[]): void {
    //Clear the file for use
    try {
        fs.unlinkSync('following_profiles.txt');
    } catch (err:any) {
        if (err.code !== 'ENOENT') {
            console.error('Error clearing the file', err);
        }
    }

    fs.writeFile('following_profiles.txt', followingProfiles.join('\n'), (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Following profiles have been written to following_profiles.txt');
        }
    });
}

export { getFollowingProfiles, saveFollowingProfilesToFile };
