
import auth from "./auth";
import { navigation } from "./navigation";
import { User } from "./models/user.model";

export let globalUser: User = {
  email: null,
  token: null,
  isVerified: false,
};

window.addEventListener("DOMContentLoaded", navigation);
auth.authObserver();
const links = document.querySelectorAll("a");
links.forEach((anchor: HTMLAnchorElement) => {
  anchor.addEventListener("click", (event: any) => {
    event.preventDefault();
    const url = event.target.href;
    // console.log(url)
    window.history.pushState({}, "", url);
    navigation();
  });
});

const loginMessage = document.querySelector(
  "#login-form .submit-message p"
) as Element;

const signupMessage = document.querySelector(
  "#signup-form .submit-message p"
) as Element;

export const loginForm = document.querySelector("#login-form") as HTMLFormElement;
loginForm?.addEventListener("submit", async (event: any) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  try {
    const userCredentials = await auth.loginEmailAndPassword(email, password);
    const { user }: any = userCredentials;
    const { accessToken, emailVerified } = user;

    if (emailVerified) {
      globalUser.email = email;
      globalUser.token = accessToken;
      globalUser.isVerified = true;
      

      loginMessage.textContent = `Logged succesfull ${user.email}`;
      event.target.reset();
      setTimeout(() => {
        window.history.pushState({}, "", "/profile");
        navigation();
        loginMessage.textContent = null;
      }, 3000);
    } else {
      throw new Error("Debes Verificar tu email");
    }
  } catch (error) {
    loginMessage.textContent = `${error}`;
  }
});
export const signUpForm = document.querySelector("#signup-form") as HTMLFormElement
signUpForm?.addEventListener("submit", async (event: any) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  try {
    const userCredentials = await auth.signUpEmailAndPassword(email, password);
    await auth.sendVerificationEmail(userCredentials.user);
    const { user }: any = userCredentials;
    const { accessToken, uid, emailVerified } = user;
    console.log(user);
    console.log(accessToken, uid, emailVerified);
    signupMessage.textContent = `Sign Up Successfull we send email to ${user.email} to verified your account`;
    event.target.reset();

  } catch (error) {
    console.error(error);
    signupMessage.textContent = `${error}`;
  }
});

const logout = document.querySelector("#logout");
logout?.addEventListener("click", async () => {
  try {
    await auth.logout();
    window.location.href = "/";
    console.log("logout succesfull");
  } catch (error) {
    console.error(error);
  }
});

const googleButtons = document.querySelectorAll('.google-button')
googleButtons.forEach((button)=>{
  button?.addEventListener('click',async (event) => {
    event.preventDefault()
    await auth.google()
    loginMessage.textContent = 'Login succesfull!'
    signupMessage.textContent = 'Login succesfull!'
      setTimeout(() => {
        loginMessage.textContent = null
        signupMessage.textContent = null
        window.history.pushState({}, "", "/profile");
        navigation();
      }, 3000);
  })
})
