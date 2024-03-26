import * as jwtService from "../server/services/jwtServices.service"
import * as subscriberService from "../server/services/subscriber.service"
import Subscriber from "../server/model/subscribersModel";
import request from "supertest"
import { jest,describe,test,expect,beforeAll,afterAll } from "@jest/globals"
import createServer from "../server/utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const app = createServer()

const testUser ={
    email:"dummy100",
    password:"dummy100",
    username:"dummy100"
  }

  const dummySub= {
    email: 'dummy@example.com',
    name: 'Dummy Subscriber'
}
  

  const dummyAdmin ={
    email:"admin90",
    password:"admin90",
    username:"admin90",
    isAdmin: true
  }


  describe("Testing subscribers routes",()=>{

    let token:string;
    let dummyToken:string;
    let dummySubscriberId:string;

    beforeAll(async()=>{

      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());

      const dummySubscriber = await Subscriber.create(dummySub);
      dummySubscriberId = dummySubscriber._id;

      //register dummy user
      const dummyUser = await request(app).post("/api/v1/users/auth/register").send(testUser)

      dummyToken = jwtService.generateUserToken(dummyUser.body.data)

      //register dummy admin
      const registerDummyAdmin= await request(app).post("/api/v1/users/auth/register").send(dummyAdmin)

      token = jwtService.generateUserToken(registerDummyAdmin.body.data)


    },20000)

    test('Get all subscribers - Admin', async () => {
       
        const response = await request(app)
            .get('/api/v1/subscribers')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200)
    });

    test('Get all subscribers - Unauthorized', async () => {
        const response = await request(app)
            .get('/api/v1/subscribers')
            .set('Authorization', `Bearer ${dummyToken}`);
        expect(response.status).toBe(401);
    });

    test('Delete subscriber - Unauthorized', async () => {
        const response = await request(app)
            .delete(`/api/v1/subscribers/${dummySubscriberId}`)
            .set('Authorization', `Bearer ${dummyToken}`);
        expect(response.status).toBe(401);
    });

    test('Delete subscriber - Invalid ID', async () => {
        const response = await request(app)
            .delete('/api/v1/subscribers/invalid_id')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(400);
    });

    test('Delete subscriber - not found', async () => {
        const response = await request(app)
            .delete('/api/v1/subscribers/66029da52ae81ab714271759')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(404);
    });


    test('Delete subscriber - Admin', async () => {
        const spy = jest.spyOn(Subscriber,"findByIdAndDelete")
        const response = await request(app)
            .delete(`/api/v1/subscribers/${dummySubscriberId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);

        expect(spy).toHaveBeenCalled()
    });


  })
  


