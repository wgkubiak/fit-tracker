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
	
    pool.query('SELECT * FROM\
     proteges JOIN daily ON idp = p_id WHERE idp = $1', [id], (error, results) => {
        if(error) { throw error }
        res.status(200).json(results.rows)
    })
})

// TODO: Usuwajac dzien, usuwasz rowniez dane z meals i exercises
router.get('/:id', (req, res, next) => {
    const {id} = parseInt(req.params.id)
	
    pool.query('SELECT daily.* FROM\
     proteges JOIN daily ON idp = p_id WHERE idp = $1 AND EXTRACT(month FROM dailydate) = 4', [id], (error, results) => {
        if(error) { throw error }
        res.status(200).json(results.rows)
    })
})

module.exports = router