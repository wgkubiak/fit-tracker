const express = require('express')
const router = express.Router()
const pool = require('./../pg-set')


router.get('/', (req, res, next) => {
  pool.query('SELECT exercises.* FROM proteges JOIN daily ON idp = p_id JOIN exercises ON idd = d_id',
  (error, results) => {
      if(error) {throw error}
      res.status(200).json(results.rows)
  })
})

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT exercises.* FROM proteges JOIN daily ON idp = p_id JOIN exercises ON\
   idd = d_id WHERE idp = $1', [id], (error, results) => {
      if(error) { throw error }
      res.status(200).json(results.rows)
  })
})

router.post('/', (request, response) => {
  const { d_did, exercisename, startat, endat, kcalperhour } = request.body

  pool.query('INSERT INTO exercises (d_did, exercisename, startat, endat, kcalperhour)\
   VALUES ($1, $2, $3, $4, $5)', [ d_did, exercisename, startat, endat, kcalperhour], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Meal added with ID: ${results.idm}`)
  })
})

module.exports = router