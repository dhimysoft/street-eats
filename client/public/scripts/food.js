const showMessage = (foodContent, heading, detail) => {
  const message = document.createElement('h2')
  message.textContent = heading

  foodContent.replaceChildren(message)

  if (detail) {
    const note = document.createElement('p')
    note.textContent = detail
    foodContent.appendChild(note)
  }
}

const renderFood = async () => {
  const requestedSlug = window.location.pathname.split('/').pop()
  const foodContent = document.getElementById('food-content')

  let food

  try {
    const response = await fetch(`/api/foods/${requestedSlug}`)

    // A 404 means the dish isn't in the table; anything else means the
    // server couldn't talk to the database.
    if (response.status === 404) {
      showMessage(foodContent, 'No Food Found 😞')
      return
    }

    if (!response.ok) {
      throw new Error(`the server returned ${response.status}`)
    }

    food = await response.json()
  }
  catch (error) {
    showMessage(
      foodContent,
      "Couldn't load this dish 😞",
      `The server couldn't reach the database (${error.message}). Make sure it is running and connected, then reload.`
    )
    return
  }

  document.getElementById('image').src = food.image
  document.getElementById('image').alt = food.name
  document.getElementById('name').textContent = food.name
  document.getElementById('location').textContent = `📍 ${food.city}, ${food.country}`
  document.getElementById('description').textContent = food.description
  document.getElementById('category').textContent = food.category
  document.getElementById('priceRange').textContent = food.priceRange
  document.getElementById('spiceLevel').textContent = food.spiceLevel
  document.getElementById('whereToTry').textContent = food.whereToTry
  document.title = `Street Eats - ${food.name}`
}

renderFood()
