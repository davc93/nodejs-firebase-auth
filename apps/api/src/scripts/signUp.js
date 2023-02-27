const admin = require("firebase-admin");
const { initFirebase } = require("../firebase/init");
const readline = require("readline");
async function signUp(email, password) {
  const response = await admin.auth().createUser({
    email,
    emailVerified: false,
    password,
    displayName: "Diego",
  });
  return response;
}

function promptUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter email: ", (email) => {
    rl.question("Enter password: ", async (password) => {
      try {
        const response = await signUp(email, password);
        console.log(response);
      } catch (error) {
        console.error(error);
        process.exit(1)
      }
    });
  });
}

initFirebase();
promptUser();
