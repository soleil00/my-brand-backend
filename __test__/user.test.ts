import request from "supertest"
import app from "../server/app"
import { jest,describe,test,expect,beforeAll,afterAll } from "@jest/globals"
import { after } from "node:test"


let token :string;
let dummyToken:string;


describe("Test users routes",()=>{

  

  beforeAll(async()=>{

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
    testUserId = response2.body.data._id

    //login admin
    const response3 = await request(app).post("/api/v1/users/auth/login").send({
      email:"admin",
      password:"admin",
    })

    token = response3.body.token

   
  },20000)

  afterAll(async()=>{

    await request(app).delete(`/api/v1/users/${dummyUserIdToBeDeleted}`).set({"Authorization": `Bearer ${token}`})

  },20000)

  let testUserId:string;
  let nonExistingUserId:string ='123456789098765432123456'
  // let newCreatedUserId:string;
  let dummyUserIdToBeDeleted:string;

   test("GET /api/users (Get all users - Unauthorized access no token)",async()=>{

    const response = await request(app).get("/api/v1/users")

    expect(response.status).toBe(400);

   },20000)


   test("GET /api/users (Get all users - Authenticated non-admin access)",async()=>{

    const response = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.status).toBe(401);

   },20000)


   test("GET /api/users (Get all users - Authenticated admin access)",async()=>{

    const response = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${token}`})

    expect(response.status).toBe(200);

   },20000)



   test("GET /api/users/:id (Get single user - Unauthorized access)",async()=>{

    const response = await request(app).get(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.status).toBe(401);

   },20000)


   test("GET /api/users/:id (Get single user - Authenticated access)",async()=>{

    const response = await request(app).get(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${token}`})

    expect(response.status).toBe(200);

   },20000)


   test("GET /api/users/:id (Get single user - Non-existent user)",async()=>{

    const response = await request(app).get(`/api/v1/users/${nonExistingUserId}`).set({"Authorization": `Bearer ${token}`})

    expect(response.status).toBe(404);

   },20000)


   test("POST /api/users/auth/register (Register user - Valid registration)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/register").send({
      email:"dummy@gmail.com",
      password:"dummy-password",
      username:"dummy-username"
    })

    dummyUserIdToBeDeleted = response.body.data._id

    expect(response.status).toBe(201);

   },20000)

//
   test("POST /api/users/auth/register (Register user - Invalid registration data)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/register").send({
      password:"dummy-password",
      username:"dummy-username"
    })

    expect(response.status).toBe(400);

   },20000)


   test("POST /api/users/auth/login (Login user - Successful login)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/login").send({
      password:"someusername",
      email:"dummydata"
    })

    expect(response.status).toBe(200);

   },20000)

//login user here
   test("POST /api/users/auth/login (Login user - User not found)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/login").send({
      password:"someusername56",
      email:"solidity-course"
    })

    expect(response.status).toBe(404);

   },20000)

   test("POST /api/users/auth/login (Login user - Invalid credentials,password)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/login").send({
      password:"someusername",
      email:"dummydatayes"
    })

    expect(response.status).toBe(400);

   },20000)


   test("PUT /api/users/:id (Update user - unauthenticated access)",async()=>{

    const response = await request(app).put(`/api/v1/users/${testUserId}`).send({
      profile:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
    })

    expect(response.status).toBe(400);

   },20000)


   test("PUT /api/users/:id (Update user - Authenticated non-admin access)",async()=>{

    const response = await request(app).put(`/api/v1/users/${testUserId}`)
    .send({
      profile:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
    })
    .set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.status).toBe(401);

   },20000)


   test("PUT /api/users/:id (Update user - Authenticated admin access)",async()=>{

    const response = await request(app).put(`/api/v1/users/${testUserId}`)
    .send({
      profile:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
    })
    .set({"Authorization": `Bearer ${token}`})

    expect(response.status).toBe(200);

   },20000)


   test("DELETE /api/users/:id (Delete user - Unauthorized access)",async()=>{

    const response = await request(app).delete(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.status).toBe(401);

   },20000)


   test("DELETE /api/users/:id (Delete user - Authenticated admin access)",async()=>{

    const response = await request(app).delete(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${token}`})

    expect(response.status).toBe(200);

   },20000)


})
