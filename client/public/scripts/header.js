const header = document.querySelector('header')

const headerContainer = document.createElement('nav')
headerContainer.className = 'header-container'

const headerLeft = document.createElement('a')
headerLeft.className = 'header-left'
headerLeft.href = '/'

const headerLogo = document.createElement('img')
headerLogo.src = '/logo.svg'
headerLogo.alt = 'Street Eats logo'

const headerTitle = document.createElement('h1')
headerTitle.textContent = 'Street Eats'

headerLeft.appendChild(headerLogo)
headerLeft.appendChild(headerTitle)

const headerRight = document.createElement('div')
headerRight.className = 'header-right'

const headerButton = document.createElement('button')
headerButton.className = 'outline'
headerButton.textContent = 'Home'

headerButton.addEventListener('click', function handleClick(event) {
  window.location = '/'
})

headerRight.appendChild(headerButton)

headerContainer.appendChild(headerLeft)
headerContainer.appendChild(headerRight)

header.appendChild(headerContainer)
