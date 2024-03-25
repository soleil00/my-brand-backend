import request from "supertest"
import app from "../server/app"
import { jest,describe,test,expect,beforeAll,afterAll } from "@jest/globals"



let token :string;
let dummyToken:string ;



describe("Test message routes", () => {

    let testMessageId : string;
    let messageIdToBeDeleted : string;

    beforeAll(async()=>{
        const response = await request(app).post("/api/v1/messages").
        send({
            name: "kazuba",
            message: "Hello",
            email: "dummy email",
            subject: "test"
        })

        testMessageId = response.body.data._id

            //register dummy user
        const response1 = await request(app).post("/api/v1/users/auth/register").send({
          email:"dummy1",
          password:"dummy1",
          username:"dummy1"
        })

        //login dummy user
        const response2 = await request(app).post("/api/v1/users/auth/login").send({
          email:"dummy1",
          password:"dummy1",
        })

        dummyToken = response2.body.token

        //login admin
        const response3 = await request(app).post("/api/v1/users/auth/login").send({
          email:"admin",
          password:"admin",
        })

        token = response3.body.token

    },20000)


    afterAll(async()=>{

      await request(app).delete(`/api/v1/messages/${messageIdToBeDeleted}`).set({"Authorization": `Bearer ${token}`})

    },20000)

    test('Should get all message only admin', async () => {
        const res = await request(app).get("/api/v1/messages").set({"Authorization": `Bearer ${token}`})
        expect(res.status).toBe(200);
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

    

})


