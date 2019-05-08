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

module.exports = router