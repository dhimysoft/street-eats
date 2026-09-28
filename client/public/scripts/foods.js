const mainContent = document.getElementById('main-content')
const searchInput = document.getElementById('search')

const createCard = (food) => {
  const card = document.createElement('article')
  card.classList.add('card')

  const topContainer = document.createElement('div')
  topContainer.classList.add('top-container')
  topContainer.style.backgroundImage = `url(${food.image})`

  const bottomContainer = document.createElement('div')
  bottomContainer.classList.add('bottom-container')

  const name = document.createElement('h3')
  name.textContent = food.name
  bottomContainer.appendChild(name)

  const location = document.createElement('p')
  location.textContent = `📍 ${food.city}, ${food.country}`
  bottomContainer.appendChild(location)

  const category = document.createElement('p')
  category.innerHTML = `<mark>${food.category}</mark> · ${food.priceRange} · Spice: ${food.spiceLevel}`
  bottomContainer.appendChild(category)

  const link = document.createElement('a')
  link.textContent = 'Read More →'
  link.href = `/foods/${food.slug}`
  bottomContainer.appendChild(link)

  card.appendChild(topContainer)
  card.appendChild(bottomContainer)

  return card
}

const showMessage = (heading, detail) => {
  const message = document.createElement('h2')
  message.textContent = heading

  mainContent.replaceChildren(message)

  if (detail) {
    const note = document.createElement('p')
    note.textContent = detail
    mainContent.appendChild(note)
  }
}

const showCards = (foods) => {
  mainContent.replaceChildren()

  if (foods.length === 0) {
    showMessage('No Foods Found 😞')
    return
  }

  foods.forEach(food => mainContent.appendChild(createCard(food)))
}

const renderFoods = async () => {
  let data

  // The server reads these from Postgres, so anything from a dropped
  // connection to a failed query ends up here. Say so instead of
  // leaving the page blank.
  try {
    const response = await fetch('/api/foods')

    if (!response.ok) {
      throw new Error(`the server returned ${response.status}`)
    }

    data = await response.json()
  }
  catch (error) {
    showMessage(
      "Couldn't load the dishes 😞",
      `The server couldn't reach the database (${error.message}). Make sure it is running and connected, then reload.`
    )
    return
  }

  if (!Array.isArray(data)) {
    showMessage("Couldn't load the dishes 😞", 'The server sent back something unexpected.')
    return
  }

  showCards(data)

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase()
    const matches = data.filter(food =>
      [food.name, food.country, food.city, food.category]
        .some(field => field.toLowerCase().includes(query))
    )
    showCards(matches)
  })
}

const requestedUrl = window.location.href.split('/').pop()

if (requestedUrl) {
  window.location.href = '/404.html'
}
else {
  renderFoods()
}
