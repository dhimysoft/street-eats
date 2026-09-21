import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { apiRouter, pageRouter } from './routes/foods.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Built client (from `npm run build` in /client) lands in server/public
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/foods', apiRouter)
app.use('/foods', pageRouter)

// Any route not matched above gets the 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, '../client/public/404.html'))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🌮 Server listening on http://localhost:${PORT}`)
})
