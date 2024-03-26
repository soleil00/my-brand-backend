import request from "supertest"
import { jest,describe,test,expect,beforeAll,afterAll } from "@jest/globals"
import createServer from "../server/utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import * as jwtService from "../server/services/jwtServices.service"
import * as userService from "../server/services/userServices"
import User from "../server/model/userMode";


const app = createServer()


let token :string;
let dummyToken:string;

const dummyUser ={
  email:"dummy1",
  password:"dummy1",
  username:"dummy1"
}



const dummyAdmin ={
  email:"admin",
  password:"admin",
  username:"admin",
  isAdmin: true
}


const testUser1 = {
  email:"user2",
  password:"user2",
  username:"user2"
}

const testUserInput = {
  email:"user2",
  password:"user2",
}



describe("Test users routes",()=>{

  

  beforeAll(async()=>{

      const mongoServer = await MongoMemoryServer.create();
  
      await mongoose.connect("mongodb+srv://user1:user1@cluster0.q3w70mq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
      // await mongoose.connect(mongoServer.getUri());
    
  

    //register dummy user
    const testUser = await request(app).post("/api/v1/users/auth/register").send(dummyUser)

    dummyToken = jwtService.generateUserToken(testUser.body.data)
    testUserId = testUser.body.data._id

    //register dummy admin user
    const registerDummyAdmin= await request(app).post("/api/v1/users/auth/register").send(dummyAdmin)

    token = jwtService.generateUserToken(registerDummyAdmin.body.data)

    //register second dummy user

    const testUser2 = await request(app).post("/api/v1/users/auth/register").send(testUser1)

   
  },20000)

  afterAll(async()=>{

    

    await User.deleteMany()

    await mongoose.disconnect();
    await mongoose.connection.close();

  },20000)

  let testUserId:string;
  let nonExistingUserId:string ='123456789098765432123456'
  // let newCreatedUserId:string;
  let dummyUserIdToBeDeleted:string;

   test("GET /api/users (Get all users - Unauthorized access no token)",async()=>{

    const response = await request(app).get("/api/v1/users")

    expect(response.statusCode).toBe(400);

   },20000)


   test("GET /api/users (Get all users - Authenticated non-admin access)",async()=>{

    const response = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.statusCode).toBe(401);

   },20000)


   test("GET /api/users (Get all users - Authenticated admin access)",async()=>{

    const response = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${token}`})

    expect(response.statusCode).toBe(200);

   },20000)



   test("GET /api/users/:id (Get single user - Unauthorized access)",async()=>{

    const response = await request(app).get(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.statusCode).toBe(401);

   },20000)


   test("GET /api/users/:id (Get single user - Authenticated access)",async()=>{

    const response = await request(app).get(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${token}`})

    expect(response.statusCode).toBe(200);

   },20000)


   test("GET /api/users/:id (Get single user - Non-existent user no token provided)",async()=>{

    const response = await request(app).get(`/api/v1/users/${nonExistingUserId}`)

    expect(response.statusCode).toBe(400);

   },20000)

   test("GET /api/users/:id (Get single user - Non-existent user,non admin access)",async()=>{

    const response = await request(app).get(`/api/v1/users/${nonExistingUserId}`).set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.statusCode).toBe(401);

   },20000)

  //  test("GET /api/users/:id (Get single user - Non-existent user,admin access)",async()=>{

  //   const response = await request(app).get(`/api/v1/users/${nonExistingUserId}`).set({"Authorization": `Bearer ${token}`})

  //   expect(response.statusCode).toBe(401);

  //  },20000)


   test("POST /api/users/auth/register (Register user - Valid registration)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/register").send({
      email:"dummy@gmail.com",
      password:"dummy-password",
      username:"dummy-username"
    })

    dummyUserIdToBeDeleted = response.body.data._id

    expect(response.statusCode).toBe(201);

   },20000)

//
   test("POST /api/users/auth/register (Register user - Invalid registration data)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/register").send({
      password:"dummy-password",
      username:"dummy-username"
    })

    expect(response.statusCode).toBe(400);

   },20000)


   test("POST /api/users/auth/login (Login user - Successful login)",async()=>{

    const spy = jest.spyOn(userService,"loginUser")
    const response = await request(app).post("/api/v1/users/auth/login").send(testUserInput)

    expect(spy).toHaveBeenCalled()

   },20000)

//login user here
   test("POST /api/users/auth/login (Login user - User not found)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/login").send({
      password:"someusername56",
      email:"solidity-course"
    })

    expect(response.statusCode).toBe(404);

   },20000)

   test("POST /api/users/auth/login (Login user - Invalid credentials,password)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/login").send({
      password:"invalidpassword",
      email:"user2"
    })

    expect(response.statusCode).toBe(400);

   },20000)


   test("PUT /api/users/:id (Update user - unauthenticated access)",async()=>{

    const response = await request(app).put(`/api/v1/users/${testUserId}`).send({
      profile:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
    })

    expect(response.statusCode).toBe(400);

   },20000)


   test("PUT /api/users/:id (Update user - Authenticated non-admin access)",async()=>{

    const response = await request(app).put(`/api/v1/users/${testUserId}`)
    .send({
      profile:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
    })
    .set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.statusCode).toBe(401);

   },20000)


   test("PUT /api/users/:id (Update user - Authenticated admin access)",async()=>{

    const response = await request(app).put(`/api/v1/users/${testUserId}`)
    .send({
      profile:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
    })
    .set({"Authorization": `Bearer ${token}`})

    expect(response.statusCode).toBe(200);

   },20000)


   test("DELETE /api/users/:id (Delete user - Unauthorized access)",async()=>{

    const response = await request(app).delete(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.statusCode).toBe(401);

   },20000)


   test("DELETE /api/users/:id (Delete user - Authenticated admin access)",async()=>{

    const response = await request(app).delete(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${token}`})

    expect(response.statusCode).toBe(200);

   },20000)


})
