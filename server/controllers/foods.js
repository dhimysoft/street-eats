import { pool } from '../config/database.js'

// Postgres lowercases unquoted column names, so alias them back to the
// camelCase keys the frontend already reads.
const foodColumns = `
  id,
  slug,
  name,
  country,
  city,
  category,
  priceRange AS "priceRange",
  spiceLevel AS "spiceLevel",
  image,
  description,
  whereToTry AS "whereToTry"
`

export const getFoods = async (req, res) => {
  try {
    const results = await pool.query(`SELECT ${foodColumns} FROM foods ORDER BY id`)
    res.status(200).json(results.rows)
  }
  catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export const getFoodBySlug = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT ${foodColumns} FROM foods WHERE slug = $1`,
      [req.params.slug]
    )

    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Food not found' })
    }

    res.status(200).json(results.rows[0])
  }
  catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// Used by the page route to decide between the detail page and the 404 page.
export const foodExists = async (slug) => {
  const results = await pool.query('SELECT 1 FROM foods WHERE slug = $1', [slug])
  return results.rows.length > 0
}

export default { getFoods, getFoodBySlug, foodExists }
