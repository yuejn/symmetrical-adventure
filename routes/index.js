const express = require('express')
const router = express.Router()
const boardController = require('../controllers/boardController')
const phaseController = require('../controllers/phaseController')
const tileController = require('../controllers/tileController')
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/boards', catchErrors(boardController.getBoards))
router.post('/board', boardController.validateNew, catchErrors(boardController.addBoard))
router.get('/board/:id', catchErrors(boardController.getBoard))
router.patch('/board/:id', catchErrors(boardController.updateBoard))
router.delete('/board/:id', catchErrors(boardController.deleteBoard))

router.post('/phase', phaseController.validateNew, catchErrors(phaseController.addPhase))
router.get('/phase/:id', catchErrors(phaseController.getPhase))
router.patch('/phase/:id', catchErrors(phaseController.updatePhase))
router.delete('/phase/:id', catchErrors(phaseController.deletePhase))

router.post('/tile', catchErrors(tileController.addTile))
router.get('/tile/:id', catchErrors(tileController.getTile))
router.patch('/tile/:id', catchErrors(tileController.updateTile))
router.delete('/tile/:id', catchErrors(tileController.deleteTile))

module.exports = router
