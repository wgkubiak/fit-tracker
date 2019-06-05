const express = require('express')
const router = express.Router()
const pool = require('./../pg-set')

module.exports = router

router.get('/', (req, res, next) => {
    pool.query('SELECT meals.* FROM proteges JOIN daily ON idp = p_id JOIN meals ON idd = d_id',
    (error, results) => {
        if(error) {throw error}
        res.status(200).json(results.rows)
    })
})

router.post('/', (request, response) => {
    const { d_id, mealname, kcalperdg, gramature } = request.body
  
    pool.query('INSERT INTO meals (d_id, mealname, kcalperdg, gramature)\
     VALUES ($1, $2, $3, $4)', [ d_id, mealname, kcalperdg, gramature], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Meal added with ID: ${results.d_id}`)
    })
})

module.exports = router