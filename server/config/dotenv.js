import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Resolved from this file so it works whether the process starts in
// server/ (npm start) or server/config/ (npm run reset).
dotenv.config({ path: path.resolve(__dirname, '../.env') })
