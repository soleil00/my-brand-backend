import request from "supertest"
import { jest,describe,test,expect,beforeAll,afterAll } from "@jest/globals"
import createServer from "../server/utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import * as messageService from "../server/services/message.service"
import * as jwtService from "../server/services/jwtServices.service"
import * as emailService from "../server/services/email.service"
import Subscriber from "../server/model/subscribersModel";


const app = createServer()



let token :string;
let dummyToken:string ;

const dummyMessage={
  name: "kazuba",
  message: "Hello",
  email: "dummy email",
  subject: "test"
}
const dummySubscribedMessage={
  name: "kazuba",
  message: "Hello",
  email: "dummy@gmail.com",
  subject: "test",
  subscribed: true
}

const dummyUser ={
  email:"dummy12",
  password:"dumm12",
  username:"dummy12"
}

const dummyUserInput = {
  email:"dummy12",
  password:"dummy12",
}

const dummyAdmin2 ={
  email:"admin123",
  password:"admin123",
  username:"admin123",
  isAdmin: true
}


describe("Test message routes", () => {

    let testMessageId : string;
    let messageIdToBeDeleted : string;
    let messageIdToBeDeleted2 : string;

    beforeAll(async()=>{

      const mongoServer = await MongoMemoryServer.create();
  
      await mongoose.connect("mongodb+srv://user1:user1@cluster0.q3w70mq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
      // await mongoose.connect(mongoServer.getUri());
    

      //send dummy message
      const response = await request(app).post("/api/v1/messages").send(dummyMessage)

      testMessageId = response.body.data._id

      //register dummy user
      const response1 = await request(app).post("/api/v1/users/auth/register").send(dummyUser)

      dummyToken = jwtService.generateUserToken(response1.body.data)

      const registerDummyAdmin= await request(app).post("/api/v1/users/auth/register").send(dummyAdmin2)

      token = jwtService.generateUserToken(registerDummyAdmin.body.data)

      // console.log("dummy admin created token here :",token)

    },20000)


    afterAll(async()=>{

    await request(app).delete(`/api/v1/messages/${messageIdToBeDeleted}`).set({"Authorization": `Bearer ${token}`})
    await request(app).delete(`/api/v1/messages/${messageIdToBeDeleted2}`).set({"Authorization": `Bearer ${token}`})
    await mongoose.disconnect();
    await mongoose.connection.close();

    },20000)

    test('Should get all message only admin', async () => {
      
      const spy = jest.spyOn(messageService,"getAllMessages")
      const res = await request(app).get("/api/v1/messages").set({"Authorization": `Bearer ${token}`})
      expect(res.status).toBe(200);
      expect(spy).toHaveBeenCalled();

    },20000)

    test('Should return unauthorized 401 if not admin accesing messages', async () => {
        const res = await request(app).get("/api/v1/messages").set({"Authorization": `Bearer ${dummyToken}`})
        expect(res.status).toBe(401);
    },20000)


    test("should send message",async()=>{
      const response = await request(app).post('/api/v1/messages').send({
        name:"dummy name",
        subject:"testing api",
        email:"tes@srukundo.com",
        message:"working fine"
      })

      messageIdToBeDeleted = response.body.data._id

      expect(response.status).toBe(200);
    },20000)

    

    test("should return 401 unauthorized if some try to delete message if not admin",async()=>{
        const response = await request(app).delete(`/api/v1/messages/${testMessageId}`).set({"Authorization": `Bearer ${dummyToken}`})

      expect(response.status).toBe(401);
    },20000)

    test("should delete message if is admin",async()=>{
      const response = await request(app).delete(`/api/v1/messages/${testMessageId}`).set({"Authorization": `Bearer ${token}`})

      expect(response.status).toBe(200);
    },20000)

    test("spy on subsriber model and if user added on newsletter list",async()=>{

      const spy = jest.spyOn(Subscriber,"create")
      const response = await request(app).post('/api/v1/messages').send(dummySubscribedMessage)


      expect(spy).toHaveBeenCalled()

    },20000)

  

})


