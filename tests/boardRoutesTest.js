const app = require('../app')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const Board = require('../models/Board')

let id
beforeEach(async () => {
  id = await Board.create({
    name: 'Spring 2019',
    description: 'Projects for the spring'
  })
  .then(board => board._id)
  .catch(err => console.error(err))
})

describe('/boards', () => {
  describe('GET /', () => {
    it('expects there to be one board', async () => {
      const board = await Board.findOne({ name: 'Spring 2019'})
      expect(typeof board).to.eq('object')
      expect(board.name).to.eq('Spring 2019')
    })
    it('responds with all of the boards', () => {
      chai.request(app)
        .get('/boards')
        .end((err, res) => {
          if (err) console.error(err)
          expect(res.status).to.equal(200)
          expect(res.type).to.equal('application/json')
          expect(typeof res.body).to.equal('object')
        })
    })
  })
})

describe('/board', () => {
  describe('POST /', () => {
    describe('with incorrect request body', () => {
      it('returns an error', () => {
        chai.request(app)
          .post('/board')
          .end((err, res) => {
            if (err) console.error(err)
            expect(res.status).to.equal(400)
          })
      })
    })
    describe('with correct request body', () => {
      it('creates a board', () => {
        chai.request(app)
          .post('/board')
          .send({
            name: 'Summer 2019',
            description: 'Projects for the summer'
          })
          .end((err, res) => {
            if (err) console.error(err)
            expect(res.status).to.equal(201)
          })
      })
    })
  })
  describe('GET /:id', () => {
    it('fetches the specified board', () => {
      chai.request(app)
        .get(`/board/${id}`)
        .end((err, res) => {
          if (err) console.error(err)
          expect(res.status).to.equal(200)
        })
    })
  })
  describe('PATCH /:id', () => {
    it('updates a board', () => {
      chai.request(app)
        .patch(`/board/${id}`)
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
    it('deletes a board', () => {
      chai.request(app)
        .delete(`/board/${id}`)
        .end((err, res) => {
          if (err) console.error(err)
          expect(res.status).to.equal(204)
        })
    })
  })
})
