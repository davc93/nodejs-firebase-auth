import auth from "./auth/auth";
import { navigation, renderPage, setElements } from "./navigation";
import { User } from "./models/user.model";
import {
  loginForm,
  signUpForm,
  loginMessage,
  signupMessage,
  links,
  logout,
  googleButtons,
  emailAccount,
  profileForm,
  profileMessage,
} from "./nodes";
// import profile  from "./auth/profile";
export let globalUser: User = {
  email: null,
  token: null,
  isVerified: null,
};
// const api = profile()
window.addEventListener("DOMContentLoaded", renderPage);
auth.authObserver(async (user: any) => {
  if (user?.emailVerified) {
    const { accessToken, email } = user;
    globalUser.email = email;
    globalUser.token = accessToken;
    globalUser.isVerified = true;
    setElements(globalUser);
    emailAccount.textContent = globalUser.email;
    // const userInfo = await api.getProfileInfo(globalUser.token as string)
    // render
  } else {
    emailAccount.textContent = null;
    setElements(globalUser);
    console.log("you have to login");
  }
});

links.forEach((anchor: HTMLAnchorElement) => {
  anchor.addEventListener("click", (event: any) => {
    event.preventDefault();
    const url = event.target.href;
    // console.log(url)
    navigation(url);
  });
});

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

      event.target.reset();

      navigation("/profile");
      loginMessage.textContent = null;
    } else {
      throw new Error("Debes Verificar tu email");
    }
  } catch (error) {
    loginMessage.textContent = `${error}`;
  }
});
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

logout?.addEventListener("click", async () => {
  try {
    await auth.logout();
    navigation("/");
    console.log("logout succesfull");
  } catch (error) {
    console.error(error);
  }
});

googleButtons.forEach((button) => {
  button?.addEventListener("click", async (event) => {
    event.preventDefault();
    await auth.google();

    loginMessage.textContent = null;
    signupMessage.textContent = null;
    navigation("/profile");
  });
});

profileForm.addEventListener('submit',(event)=>{
  event.preventDefault()
  const target = event.target as HTMLFormElement
  const phone = target?.phone.value
  const rut = target?.rut.value
  const address = target?.address.value
  // validations

  const data = {
    phone,
    rut,
    address
  }
  console.log(data)
  target.reset()
  profileMessage.textContent = 'All Done'
  // try {
  //   api.addInfo(globalUser.token as string,data)
  //   target.reset() 
  // } catch (error) {
  //   profileMessage.textContent = `${error}`
  // }
})
