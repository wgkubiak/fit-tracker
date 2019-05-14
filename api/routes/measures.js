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

module.exports = router