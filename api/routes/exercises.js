const express = require('express')
const router = express.Router()
const pool = require('./../pg-set')


router.post('/', (request, response) => {
    const { exercisename, startat, endat, kcalperhour } = request.body
  
    pool.query('INSERT INTO exercises (exercisename, startat, endat, kcalperhour)\
     VALUES ($1, $2, $3, $4)', [ exercisename, startat, endat, kcalperhour ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.idp}`)
    })
})

module.exports = router