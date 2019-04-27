const app = require('../app')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const Phase = require('../models/Phase')
const Board = require('../models/Board')

let id, board
beforeEach(async () => {
  board = await Board.create({
    name: 'Spring 2019',
    description: 'Projects for spring-time'
  })
  .then(board => board)
  .catch(err => console.error(err))

  id = await Phase.create({
    name: 'Review',
    board: board._id
  })
  .then(phase => phase._id)
  .catch(err => console.error(err))
})

describe('/phase', () => {
  describe('POST /', () => {
    describe('with incorrect request body', () => {
      it('returns an error', () => {
        chai.request(app)
          .post('/phase')
          .end((err, res) => {
            if (err) console.error(err)
            expect(res.status).to.equal(400)
          })
      })
    })
    describe('with correct request body', () => {
      it('creates a phase', () => {
        chai.request(app)
          .post('/phase')
          .send({
            name: 'Testing',
            board: board._id
          })
          .end((err, res) => {
            if (err) console.error(err)
            expect(res.status).to.equal(201)
          })
      })
    })
  })
  describe('GET /:id', () => {
    it('fetches the specified phase', () => {
      chai.request(app)
        .get(`/phase/${id}`)
        .end((err, res) => {
          if (err) console.error(err)
          expect(res.status).to.equal(200)
        })
    })
  })
  describe('PATCH /:id', () => {
    it('updates a phase', () => {
      chai.request(app)
        .patch(`/phase/${id}`)
        .send({
          name: 'Even more testing'
        })
        .end((err, res) => {
          if (err) console.error(err)
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal('Even more testing')
        })
    })
  })
  describe('DELETE /:id', () => {
    it('deletes a phase', () => {
      chai.request(app)
        .delete(`/phase/${id}`)
        .end((err, res) => {
          if (err) console.error(err)
          expect(res.status).to.equal(204)
        })
    })
  })
})
