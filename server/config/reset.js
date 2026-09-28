import { pool } from './database.js'
import foodData from '../data/foods.js'

const createFoodsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS foods;

    CREATE TABLE IF NOT EXISTS foods (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      country VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      priceRange VARCHAR(10) NOT NULL,
      spiceLevel VARCHAR(50) NOT NULL,
      image VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      whereToTry TEXT NOT NULL
    )
  `

  try {
    await pool.query(createTableQuery)
    console.log('🎉 foods table created successfully')
  }
  catch (err) {
    console.error('⚠️ error creating foods table', err)
  }
}

const seedFoodsTable = async () => {
  await createFoodsTable()

  for (const food of foodData) {
    const insertQuery = {
      text: `
        INSERT INTO foods (slug, name, country, city, category, priceRange, spiceLevel, image, description, whereToTry)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `
    }

    const values = [
      food.slug,
      food.name,
      food.country,
      food.city,
      food.category,
      food.priceRange,
      food.spiceLevel,
      food.image,
      food.description,
      food.whereToTry
    ]

    try {
      await pool.query(insertQuery, values)
      console.log(`✅ ${food.name} added successfully`)
    }
    catch (err) {
      console.error(`⚠️ error inserting ${food.name}`, err)
    }
  }

  await pool.end()
}

seedFoodsTable()
