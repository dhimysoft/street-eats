const renderFood = async () => {
  const requestedSlug = window.location.pathname.split('/').pop()

  const response = await fetch(`/api/foods/${requestedSlug}`)
  const foodContent = document.getElementById('food-content')

  if (!response.ok) {
    const message = document.createElement('h2')
    message.textContent = 'No Food Found 😞'
    foodContent.replaceChildren(message)
    return
  }

  const food = await response.json()

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
