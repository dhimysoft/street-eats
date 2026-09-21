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

const showCards = (foods) => {
  mainContent.replaceChildren()

  if (foods.length === 0) {
    const message = document.createElement('h2')
    message.textContent = 'No Foods Found 😞'
    mainContent.appendChild(message)
    return
  }

  foods.forEach(food => mainContent.appendChild(createCard(food)))
}

const renderFoods = async () => {
  const response = await fetch('/api/foods')
  const data = await response.json()

  if (!data) {
    showCards([])
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

renderFoods()
