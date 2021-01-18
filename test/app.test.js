const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express app', () => {
    it('should return a message from GET /', () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Hello Express!')
    })
})

describe('GET /quotient', () => {
    it('8/4 should be 2', () => {
        return supertest(app)
            .get('/quotient')
            .query({ a:8, b:4 })
            .expect(200, '8 divided by 4 is 2')
    })

    it('should return 400 if "a" is missing', () =>{
        return supertest(app)
            .get('/quotient')
            .query({b: 4})
            .expect(400, 'Value for a is needed')
    })

    it('should return 400 if "b" is missing', () =>{
        return supertest(app)
            .get('/quotient')
            .query({a: 4})
            .expect(400, 'Value for b is needed')
    })

    it('should return 400 if a is non-numeric', () => {
        return supertest(app)
            .get('/quotient')
            .query({ a: "a", b: 4 })
            .expect(400, 'Value for a must be numeric')
    })

    it('should return 400 if b is non-numeric', () => {
        return supertest(app)
            .get('/quotient')
            .query({ a: 8, b: "b" })
            .expect(400, 'Value for b must be numeric')
    })
})

describe('GET /generate endpoint', () => {
    it('should generate an array of 5', () => {
        return supertest(app)
            .get('/generate')
            .query({ n: 5 })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                expect(res.body).to.have.members([1,2,3,4,5])
            })
    })
})
