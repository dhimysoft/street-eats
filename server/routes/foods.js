import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import FoodsController from '../controllers/foods.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// JSON API: /api/foods
export const apiRouter = express.Router()

apiRouter.get('/', FoodsController.getFoods)
apiRouter.get('/:slug', FoodsController.getFoodBySlug)

// Pages: /foods/:slug
export const pageRouter = express.Router()

pageRouter.get('/:slug', async (req, res) => {
  try {
    const exists = await FoodsController.foodExists(req.params.slug)

    if (exists) {
      res.status(200).sendFile(path.resolve(__dirname, '../../client/public/food.html'))
    }
    else {
      res.status(404).sendFile(path.resolve(__dirname, '../../client/public/404.html'))
    }
  }
  catch (error) {
    res.status(500).send(error.message)
  }
})
