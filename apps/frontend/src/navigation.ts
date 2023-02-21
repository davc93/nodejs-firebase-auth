import { globalUser } from './main'
import { type User } from './models/user.model'

function renderPage () {
  // detect path
  let currentPage: string | undefined
  const path = window.location.pathname

  const pages = document.querySelectorAll('#pages > *')

  // comparing pages with path

  pages.forEach((page) => {

    if (page.classList.contains(path)) {
      currentPage = path
      if(page.classList.contains('private') && !globalUser.isVerified){
        currentPage = '/unauthorized'
      }
      // console.log({'Page':currentPage})
      // console.log(currentPage)
    }
  })
  if (!currentPage) {
    currentPage = '/not-found'
  }

  // add class inactive
  pages.forEach((node) => {

    

    if (!node.classList.contains(currentPage as string)) {
      node.classList.add('inactive')
    } else {
      
      node.classList.remove('inactive')
    }
  })
  setElements(globalUser)
}

function setElements (user: User) {
  if (user.isVerified) {
    const privateElements = document.querySelectorAll('.private')
    privateElements.forEach((element: any) => {
      if (element.parentNode.id !== 'pages') {
        element.classList.remove('inactive')
      }
    })
    const onlyPublicElements = document.querySelectorAll('.only-public')
    onlyPublicElements.forEach((element: any) => {
      if (element.parentNode.id !== 'pages') {
        element.classList.add('inactive')
      }
    })
  } else {
    const privateElements = document.querySelectorAll('.private')
    privateElements.forEach((element: any) => {
      if (element.parentNode.id !== 'pages') {
        element.classList.add('inactive')
        // console.log(element.parentNode)
      }
    })
    const onlyPublicElements = document.querySelectorAll('.only-public')
    onlyPublicElements.forEach((element: any) => {
      if (element.parentNode.id !== 'pages') {
        // console.log(element.parentNode)
        element.classList.remove('inactive')
      }
    })
  }
}

function navigation (page: string) {
  window.history.pushState({}, '', page)
  renderPage()
}
export {
  renderPage,
  setElements,
  navigation
}
