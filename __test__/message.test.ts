import request from "supertest"
import app from "../server/app"
import { jest,describe,test,expect,beforeAll,afterAll } from "@jest/globals"

// messageRoute.get("/",isAuthenticated,isAdmin, getAllMessages)
// messageRoute.post("/", validateMessage, userSendMessage)
// messageRoute.delete("/:id",isIdValid,isAuthenticated,isAdmin,deleteMessage)

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVlZTllMTZjYTMzOWM4ZWI4ZWE2MjIiLCJpYXQiOjE3MTEwOTk5OTksImV4cCI6MTcxMzY5MTk5OX0.f6UVPOwqBO21O8he31vGgfwChNVrlDjO0CjVQAPTA_Y"
const dummyToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWViMzllMWY1MTBmNDdhYjZmNjkyOTEiLCJpYXQiOjE3MTExMDEzNzIsImV4cCI6MTcxMzY5MzM3Mn0.9YQZz9PBtfJkKihoQMSOuI67jyMSQckHgFaDmbzOg90'


describe("Test message routes", () => {

    let testMessageId : string;

    beforeAll(async()=>{
        const response = await request(app).post("/api/v1/messages").
        send({
            name: "kazuba",
            message: "Hello",
            email: "dummy email",
            subject: "test"
        })

        testMessageId = response.body.data._id
    })

    test('Should get all message only admin', async () => {
        const res = await request(app).get("/api/v1/messages").set({"Authorization": `Bearer ${token}`})
        expect(res.status).toBe(200);
    },10000)

    test('Should return unauthorized 401 if not admin accesing messages', async () => {
        const res = await request(app).get("/api/v1/messages").set({"Authorization": `Bearer ${dummyToken}`})
        expect(res.status).toBe(401);
    },10000)


    test.skip("should send message",async()=>{
      const response = await request(app).post('/api/v1/messages').send({
        name:"dummy name",
        subject:"testing api",
        email:"tes@srukundo.com",
        message:"working fine"
      })

      expect(response.status).toBe(200);
    },10000)

    test("should return 401 unauthorized if some try to delete message if not admin",async()=>{
        const response = await request(app).delete(`/api/v1/messages/${testMessageId}`).set({"Authorization": `Bearer ${dummyToken}`})

      expect(response.status).toBe(401);
    },10000)

    test("should delete message if is admin",async()=>{
      const response = await request(app).delete(`/api/v1/messages/${testMessageId}`).set({"Authorization": `Bearer ${token}`})

      expect(response.status).toBe(200);
    },10000)

    

})


