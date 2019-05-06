const express = require('express')
const router = express.Router()
const pool = require('./../pg-set')

router.get('/', (req, res, next) => {
    pool.query('SELECT firstname, secondname, phone, email, gender, height, targetweight FROM proteges',
    (error, results) => {
        if(error) {throw error}
        res.status(200).json(results.rows)
        console.log(results.rows)
    })
})

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT firstname, secondname, phone, email, gender, height, targetweight FROM\
    proteges WHERE idp = $1', [id], (error, results) => {
        if(error) { throw error }
        res.status(200).json(results.rows)
        console.log(results.rows)
    })
})

module.exports = router