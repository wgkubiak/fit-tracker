const express = require('express')
const router = express.Router()
const pool = require('./../pg-set')

router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM proteges',
    (error, results) => {
        if(error) {throw error}
        res.status(200).json(results.rows)
    })
})

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM proteges WHERE idp = $1', [id], (error, results) => {
        if(error) { throw error }
        res.status(200).json(results.rows)
    })
})


router.post('/', (request, response) => {
    const { firstname, secondname, phone, email, gender, height, targetweight } = request.body
  
    pool.query('INSERT INTO proteges (firstname, secondname, phone, email, gender, height, targetweight)\
     VALUES ($1, $2, $3, $4, $5, $6, $7)', [ firstname, secondname, phone, email, gender, height, targetweight ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.idp}`)
    })
})

module.exports = router