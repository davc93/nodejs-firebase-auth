import './style.css'
import auth from './auth'
import { navigation } from './navigation'


window.addEventListener('DOMContentLoaded',navigation)

const links = document.querySelectorAll('a')
links.forEach((anchor:HTMLAnchorElement)=>{
    anchor.addEventListener('click',(event:any)=>{
        event.preventDefault()
        const url = event.target.href
        console.log(url)
        window.history.pushState({},'',url)
        navigation()
        
    })
})

const loginForm = document.querySelector('#login-form')
loginForm?.addEventListener('submit',(event:any)=>{
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    auth.loginEmailAndPassword(email,password)
    
    
})

console.log('ts funcionando')