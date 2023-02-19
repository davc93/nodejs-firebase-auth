import { globalUser } from "./main";
import { User } from "./models/user.model";

function navigation () {
  // detect path
  let currentPage: string | undefined;
  let path = window.location.pathname
  if(path == '/'){
    path = '/login'
  }

  const pages = document.querySelectorAll('#pages > *')
  
  //comparing pages with path

  pages.forEach((node)=>{
    if(node.classList.contains(path.slice(1))){
      currentPage = path.slice(1)
      // console.log(currentPage)
    }

  })

  if(!currentPage){
    currentPage = 'not-found'
  }
  // add class inactive
  pages.forEach((node)=>{
    if(!node.classList.contains(currentPage as string)){
      node.classList.add('inactive')
    } else {
      node.classList.remove('inactive')
    }
  })
  setElements(globalUser)
}


function setElements(user:User) {
  if(user.isVerified){
    const privateElements = document.querySelectorAll('.private')
    privateElements.forEach((element:any)=>{
      if (element.parentNode.id !== 'pages') {
      
        element.classList.remove('inactive')  
      }
      
    })
    const onlyPublicElements = document.querySelectorAll('.only-public')
    onlyPublicElements.forEach((element:any)=>{
      if (element.parentNode.id !== 'pages') {
        
        element.classList.add('inactive')
      }
    })

  } else {
    const privateElements = document.querySelectorAll('.private')
    privateElements.forEach((element:any)=>{
      if (element.parentNode.id !=='pages') {
        
        element.classList.add('inactive')
        // console.log(element.parentNode)
      }
    })
    const onlyPublicElements = document.querySelectorAll('.only-public')
    onlyPublicElements.forEach((element:any)=>{
      if(element.parentNode.id !=='pages'){
        // console.log(element.parentNode)
        element.classList.remove('inactive')
      }

    })
  }
}

export {
  navigation,
  setElements
}
