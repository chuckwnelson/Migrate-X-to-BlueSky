import { getFollowingProfiles, saveFollowingProfilesToFile } from './getXFollows.js';
import connectAndFollow from './searchOnBlueSky.js';

function fetchAndSaveProfiles(username: string) {
  getFollowingProfiles(username).then(profiles => {
      saveFollowingProfilesToFile(profiles);
  });
}

function tryConnectAndFollow() {
    connectAndFollow();
}

console.log('----- init -----')
console.log('----- X.com Profile: ' + process.env.USERNAME + '-----')
// Run the application with USERNAME specified as an environment variable
// Example: USERNAME=johndoe node your_script_name.js
if (!process.env.USERNAME) {
    throw new Error('USERNAME environment variable is not set. Set this in the package.json');
} else {
  fetchAndSaveProfiles(process.env.USERNAME || '')
}
