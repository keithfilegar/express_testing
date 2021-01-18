const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Frequency test', () => {
    it('should return correct values for a string containing no numbers', () => {
        const query = { s: "aaaAAABBbb" }

        const expected = {
            average: 5,
            unique: 2,
            highest: "a",
            "a": 6,
            "b": 4,
        }
        return supertest(app)
            .get('/frequency')
            .query(query)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.have.all.keys('unique', 'average', 'highest', 'a', 'b')
                expect(res.body).to.eql(expected)
            })
    })

    it('should return 400 if there is no query', () => {
        return supertest(app)
            .get('/frequency')
            .expect(400, 'Invalid request')
    })
})