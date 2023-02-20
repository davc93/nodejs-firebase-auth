export function insertLoader () {
  const container = document.createElement('span')
  container.className = 'loader'
  const bubble1 = document.createElement('span')
  const bubble2 = document.createElement('span')
  const bubble3 = document.createElement('span')
  container.append(bubble1, bubble2, bubble3)

  return container
}

// span class="loader">
//                       <span></span>
//                       <span></span>
//                       <span></span>
//                     </span>
