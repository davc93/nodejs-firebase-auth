import './style.css'
import auth from './auth'
import { navigation } from './navigation'


window.addEventListener('DOMContentLoaded',navigation)
auth.authObserver()
const links = document.querySelectorAll('a')
links.forEach((anchor:HTMLAnchorElement)=>{
    anchor.addEventListener('click',(event:any)=>{
        event.preventDefault()
        const url = event.target.href
        // console.log(url)
        window.history.pushState({},'',url)
        navigation()
        
    })
})

const loginMessage = document.querySelector('#login-form .submit-message p') as Element

const signupMessage = document.querySelector('#signup-form .submit-message p') as Element

const loginForm = document.querySelector('#login-form')
loginForm?.addEventListener('submit',async (event:any)=>{
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    try {
        
        const userCredentials = await auth.loginEmailAndPassword(email,password)
        const {user}:any = userCredentials
        const {accessToken,uid,emailVerified        } = user
        console.log(accessToken,uid,emailVerified)
        loginMessage.textContent = `Logged succesfull ${user.email}`
        setTimeout(() => {
            window.history.pushState({},'','/profile')
            navigation()
        }, 3000);

    } catch (error) {
        loginMessage.textContent = `${error}`
    }
    
    
})
const signUpForm = document.querySelector('#signup-form')
signUpForm?.addEventListener('submit',async (event:any)=>{
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    try {
        const userCredentials = await auth.signUpEmailAndPassword(email,password)
        const {user}:any = userCredentials
        const {accessToken,uid,emailVerified        } = user
        console.log(user)
        console.log(accessToken,uid,emailVerified)
        signupMessage.textContent = `Sign Up Successfull ${user.email}`
        setTimeout(() => {
            window.history.pushState({},'','/profile')
            navigation()
        }, 3000);
    } catch (error) {
        console.error(error)
        signupMessage.textContent = `${error}`
    }    
})

const logout = document.querySelector('#logout')
logout?.addEventListener('click',async ()=>{
    try {
        
        await auth.logout()
        console.log('logout succesfull')
    } catch (error) {
        console.error(error)
    }
})
