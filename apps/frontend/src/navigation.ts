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
      console.log(currentPage)
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

}

export {
  navigation
}
