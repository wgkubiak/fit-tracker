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
    const { firstname, secondname, birthdate, phone, email, gender, height, targetweight, kcaldemand } = request.body
  
    pool.query('INSERT INTO proteges (firstname, secondname, birthdate, phone, email, gender, height, targetweight, kcaldemand)\
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [ firstname, secondname, birthdate, phone, email, gender, height, targetweight, kcaldemand ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.idp}`)
    })
})

router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const { phone, email, targetweight } = req.body
  
    pool.query(
      'UPDATE proteges SET phone = $1, email = $2, targetweight = $3 WHERE idp = $4',
      [phone, email, targetweight, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
})

router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM proteges WHERE idp = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
})

module.exports = router