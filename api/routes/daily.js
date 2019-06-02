const express = require('express')
const router = express.Router()
const pool = require('./../pg-set')

router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM daily',
    (error, results) => {
        if(error) {throw error}
        res.status(200).json(results.rows)
    })
})

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
	
    pool.query('SELECT * FROM daily n JOIN proteges on idp = p_id WHERE dailydate\
     = (SELECT MAX(dailydate) FROM daily WHERE p_id = $1 GROUP BY p_id HAVING p_id\
     = n.p_id)', [id], (error, results) => {
        if(error) { throw error }
        res.status(200).json(results.rows)
    })
})

router.post('/', (request, response) => {
    const { p_id, dailydate } = request.body
  
    pool.query('INSERT INTO daily (p_id, dailydate) VALUES ($1, $2)',
     [ p_id, dailydate ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.p_id}`)
    })
})

module.exports = router