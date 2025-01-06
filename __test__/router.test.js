
'use strict';

const supertest = require('supertest');
const {app} = require('../src/server');
const request = supertest(app);


describe('API server', () => {
    it('Home page works', async () => {
      const res = await request.get('/home');
      expect(res.text).toEqual('Home page')
    });
   
  })