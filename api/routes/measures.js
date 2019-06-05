const express = require('express')
const router = express.Router()
const pool = require('./../pg-set')

router.get('/', (req, res, next) => {
    pool.query('SELECT proteges.*, measures.* FROM proteges JOIN measures ON idp = p_id WHERE\
    measuredate = (SELECT MAX(measuredate) FROM measures)',
    (error, results) => {
        if(error) {throw error}
        res.status(200).json(results.rows)
    })
})

router.get('/last', (req, res, next) => {
    pool.query('SELECT proteges.*, measures.* FROM proteges JOIN measures ON idp = p_id',
    (error, results) => {
        if(error) {throw error}
        res.status(200).json(results.rows)
    })
})

router.get('/last/:id', (req, res, next) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT proteges.*, measures.* FROM proteges JOIN measures ON idp = p_id WHERE\
    measuredate = (SELECT MAX(measuredate) FROM measures) AND idp = $1', [id],
    (error, results) => {
        if(error) {throw error}
        res.status(200).json(results.rows)
    })
})

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM proteges JOIN measures ON idp = p_id WHERE idp = $1', [id], (error, results) => {
        if(error) { throw error }
        res.status(200).json(results.rows)
    })
})

router.post('/', (request, response) => {
    const { p_id, currentweight, waist, neck, bodyfat, measuredate } = request.body
  
    pool.query('INSERT INTO measures (p_id, currentweight, waist, neck, bodyfat, measuredate)\
     VALUES ($1, $2, $3, $4, $5, $6)', [ p_id, currentweight, waist, neck, bodyfat, measuredate ], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Measure added with ID: ${results.p_id}`)
    })
})

router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM measures WHERE p_id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
})

module.exports = router