const { spawn } = require('child_process');
const dotenv =require('dotenv')
// Set the API key and user credentials
dotenv.config()
const apiKey = process.env.API_KEY
const email = 'davc93@gmail.com';
const password = 'clave1234';
console.log(apiKey)

// Define the curl command as an array of arguments
const curlArgs = [
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey,
  '--header', 'Content-Type: application/json',
  '--data-raw', JSON.stringify({
    email: email,
    password: password,
    returnSecureToken: true
  })
];

// Spawn a child process to execute the curl command
const curlProcess = spawn('curl', curlArgs);

// Capture the output of the curl command
let responseData = '';
curlProcess.stdout.on('data', (data) => {
  responseData += data.toString();
});

// Handle errors and exit events
curlProcess.on('error', (error) => {
  console.error(`Error executing curl command: ${error}`);
});
curlProcess.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`curl command exited with code ${code} and signal ${signal}`);
  } else {
    console.log(`curl command completed successfully`);
    console.log(`Response: ${responseData}`);
    // Parse the JSON response and extract the ID token and refresh token
    const responseJson = JSON.parse(responseData);
    const idToken = responseJson.idToken;
    const refreshToken = responseJson.refreshToken;
    console.log(`ID token: ${idToken}`);
    console.log(`Refresh token: ${refreshToken}`);
  }
});