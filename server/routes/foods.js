import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import foods from '../data/foods.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// JSON API: /api/foods
export const apiRouter = express.Router()

apiRouter.get('/', (req, res) => {
  res.status(200).json(foods)
})

apiRouter.get('/:slug', (req, res) => {
  const food = foods.find(food => food.slug === req.params.slug)

  if (food) {
    res.status(200).json(food)
  }
  else {
    res.status(404).json({ error: 'Food not found' })
  }
})

// Pages: /foods/:slug
export const pageRouter = express.Router()

pageRouter.get('/:slug', (req, res) => {
  const food = foods.find(food => food.slug === req.params.slug)

  if (food) {
    res.status(200).sendFile(path.resolve(__dirname, '../../client/public/food.html'))
  }
  else {
    res.status(404).sendFile(path.resolve(__dirname, '../../client/public/404.html'))
  }
})
