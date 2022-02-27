import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import fs from 'fs'

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /users', () => {
    it('given registration details when proper and role is user should save in DB', (done) => {
      const register = {
        firstName: 'anuska',
        lastName: 'chowdhury',
        email: 'anu@gmail.com',
        password: 'anuska123'
      };
      request(app)
        .post('/api/v1/users/registrationUser')
        .send(register)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.message).to.be.equal('User created successfully');
          done();
        });
    });
  });

  describe('Post/login API', () => {
    it('if valid email and password sent should login', (done) => {
      const login = {
        email: 'anu@gmail.com',
        password: 'anuska123'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(login)
        .end((err, res) => {
          if (err) {
            done();
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Successfully logged in');
          done();
        });
    }),
      it('if enter wrong email or wrong password it will not logged in', (done) => {
        const login = {
          email: 'anu@gmail.com',
          password: 'anusk123'
        };
        request(app)
          .post('/api/v1/users/login')
          .send(login)
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(401);
            expect(res.body.message).to.be.equal('Login failed');
            done();
          });
      })
  })

  
});
