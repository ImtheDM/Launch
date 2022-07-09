const request = require('supertest');
const { c } = require('tar');
const app = require('../../app')
describe('Test Get /launches', ()=>{
    test('It should respond with 200 success', async  ()=>{
        const response = await request(app).get('/launches').expect('Content-Type', /json/).expect(200);
        //expect(response.statusCode).toBe(200);
    })
})
describe('Test POST /launches',()=>{

    const completeLaunchData = {
        mission: 'USS Enter',
        rocket: 'XS2',
        target: ' Kepler-186 f',
        launchDate: 'January 4, 2028',
    }
    const launchDataWithInvalidDate = {
        mission: 'USS Enter',
        rocket: 'XS2',
        target: ' Kepler-186 f',
        launchDate: 'zoot',
    }

    const LaunchDataWithoutDate = {
        mission: 'USS Enter',
        rocket: 'XS2',
        target: ' Kepler-186 f',
    }

    test('It should respond with 201 created', async ()=>{
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type',/json/)
        .expect(201)

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(LaunchDataWithoutDate)
    });


    test('It should catch missing required properties',async ()=>{
        const response = await request(app)
        .post('/launches')
        .send(LaunchDataWithoutDate)
        .expect('Content-Type',/json/)
        .expect(400)
        
        expect(response.body).toStrictEqual({
            error:'Missing required launch property',
        })
    });
    test('It should catch invalid dates',async ()=>{
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type',/json/)
        .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Invalid Date',
        })
    });
})