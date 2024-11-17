import { getFollowingProfiles, saveFollowingProfilesToFile } from './getXFollows.js';
import connectAndFollow from './searchOnBlueSky.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('============================================')
console.log('----- Starting Migrate X to BlueSky... -----')
console.log('----- Script created by www.ChuckWNelson.com -----')
console.log('----- Follow me on BlueSky: @chuckwnelson.bsky.social [https://bsky.app/profile/chuckwnelson.bsky.social] -----')
console.log('============================================')
rl.question('Enter the X.com @username: ', (username) => {

    //remove @ if the first char
    if (username.charAt(0) === '@') {
        username = username.slice(1);
    }

    fetchAndSaveProfiles(username);
    rl.close();
});

function fetchAndSaveProfiles(username: string) {
  console.log('----- X.com Profile: @' + username + ' -----')
  getFollowingProfiles(username).then(profiles => {
      saveFollowingProfilesToFile(profiles);
  });
}

function tryConnectAndFollow() {
    connectAndFollow();
}
