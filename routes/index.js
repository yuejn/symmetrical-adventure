const express = require('express')
const passport = require('passport')
const router = express.Router()
const boardController = require('../controllers/boardController')
const phaseController = require('../controllers/phaseController')
const tileController = require('../controllers/tileController')
const userController = require('../controllers/userController')
const { catchErrors } = require('../handlers/errorHandlers')

router.get('/boards', catchErrors(boardController.getBoards))
router.post('/board', passport.authenticate('jwt', { session: false, failWithError: true }), boardController.validateNew, catchErrors(boardController.addBoard))
router.get('/board/:id', catchErrors(boardController.getBoard))
router.patch('/board/:id', passport.authenticate('jwt', { session: false, failWithError: true }), catchErrors(boardController.updateBoard))
router.delete('/board/:id', passport.authenticate('jwt', { session: false, failWithError: true }),catchErrors(boardController.deleteBoard))

router.post('/phase', passport.authenticate('jwt', { session: false, failWithError: true }),phaseController.validateNew, catchErrors(phaseController.addPhase))
router.get('/phase/:id', catchErrors(phaseController.getPhase))
router.patch('/phase/:id', passport.authenticate('jwt', { session: false, failWithError: true }), catchErrors(phaseController.updatePhase))
router.delete('/phase/:id', passport.authenticate('jwt', { session: false, failWithError: true }), catchErrors(phaseController.deletePhase))

router.post('/tile', passport.authenticate('jwt', { session: false, failWithError: true }), catchErrors(tileController.addTile))
router.get('/tile/:id', catchErrors(tileController.getTile))
router.patch('/tile/:id', passport.authenticate('jwt', { session: false, failWithError: true }), catchErrors(tileController.updateTile))
router.delete('/tile/:id', passport.authenticate('jwt', { session: false, failWithError: true }), catchErrors(tileController.deleteTile))

router.post('/register', userController.register)
router.get('/users', passport.authenticate('jwt', { session: false, failWithError: true }), catchErrors(userController.getUsers))
router.post('/login', userController.login)

module.exports = router
