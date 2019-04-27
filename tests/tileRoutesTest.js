const app = require('../app')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const Board = require('../models/Board')
const Phase = require('../models/Phase')
const User = require('../models/User')
const Tile = require('../models/Tile')

let id, board, phase, owner
beforeEach(async () => {
  board = await Board.create({
    name: 'Spring 2019',
    description: 'Projects for spring-time'
  })
  .then(board => board._id)
  .catch(err => console.error(err))

  phases = await Phase.insertMany([
    {
      name: 'Flowcharts',
      board: board
    },
    {
      name: 'Wireframes',
      board: board
    },
    {
      name: 'Prototype',
      board: board
    },
    {
      name: 'Development',
      board: board
    },
    {
      name: 'Test',
      board: board
    },
    {
      name: 'Launch',
      board: board
    }
  ])

  phase = await Phase.findOne({})
  owner = await User.create({
    name: 'Tony',
    email: 'tony@stark.com'
  })
  .then(user => user._id)
  .catch(err => console.error(err))

  id = await Tile.create({
    name: 'The Huey',
    description: 'Etsy actually VHS austin tofu, messenger bag meggings cloud bread.',
    phase: phase._id,
    board: board,
    owner: owner
  })
  .then(tile => tile._id)
  .catch(err => console.error(err))
})

describe('/tile', () => {
  describe('POST /', () => {
    describe('with incorrect request body', () => {
      it('returns an error', () => {
        chai.request(app)
          .post('/tile')
          .end((err, res) => {
            if (err) console.error(err)
            expect(res.status).to.equal(500)
          })
      })
    })
    describe.skip('with correct request body', () => {
      it('creates a tile', async () => {
        console.log(`The phase is ${phase} from ${board}`)
        chai.request(app)
          .post('/tile')
          .send({
            name: 'Jackfruit',
            description: 'Four dollar toast bushwick trust fund iceland pour-over gastropub.',
            phase: phase.name,
            board
          })
          .end((err, res) => {
            console.log(res)
            if (err) console.error(err)
            expect(res.status).to.equal(201)
          })
      })
    })
  })
  describe('GET /:id', () => {
    it('fetches the specified tile', () => {
      chai.request(app)
        .get(`/tile/${id}`)
        .end((err, res) => {
          if (err) console.error(err)
          expect(res.status).to.equal(200)
        })
    })
  })
  describe('PATCH /:id', () => {
    it('updates a tile', () => {
      chai.request(app)
        .patch(`/tile/${id}`)
        .send({
          name: 'Spring of 2019'
        })
        .end((err, res) => {
          if (err) console.error(err)
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal('Spring of 2019')
        })
    })
  })
  describe('DELETE /:id', () => {
    it('deletes a tile', () => {
      chai.request(app)
        .delete(`/tile/${id}`)
        .end((err, res) => {
          if (err) console.error(err)
          expect(res.status).to.equal(204)
        })
    })
  })
})
