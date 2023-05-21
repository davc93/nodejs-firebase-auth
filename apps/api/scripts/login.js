const { spawn } = require("child_process");
const readline = require("readline");

const config = require("../src/config");

function login(email, password) {
  // Define the curl command as an array of arguments
  const curlArgs = [
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      config.apikey,
    "--header",
    "Content-Type: application/json",
    "--data-raw",
    JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
  ];

  // Spawn a child process to execute the curl command
  const curlProcess = spawn("curl", curlArgs);

  // Capture the output of the curl command
  let responseData = "";
  curlProcess.stdout.on("data", (data) => {
    responseData += data.toString();
  });

  // Handle errors and exit events
  curlProcess.on("error", (error) => {
    console.error(`Error executing curl command: ${error}`);
  });
  curlProcess.on("exit", (code, signal) => {
    if (code !== 0) {
      console.error(
        `curl command exited with code ${code} and signal ${signal}`
      );
    } else {
      console.log(`curl command completed successfully \n`);
      const responseJson = JSON.parse(responseData);
      const idToken = responseJson.idToken;
      const refreshToken = responseJson.refreshToken;
      console.log(`ID token: ${idToken}`);
      console.log(`\n`);
      console.log(`Refresh token: ${refreshToken}`);
    }
  });
}

function promptUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter email: ", (email) => {
    rl.question("Enter password: ", async (password) => {
      try {
        login(email, password);
        rl.close()
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    });
  });
}
promptUser();
