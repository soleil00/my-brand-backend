import request from "supertest"
import app from "../server/app"
import { jest,describe,test,expect,beforeAll,afterAll } from "@jest/globals"
import { after } from "node:test"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVlZTllMTZjYTMzOWM4ZWI4ZWE2MjIiLCJpYXQiOjE3MTEwOTk5OTksImV4cCI6MTcxMzY5MTk5OX0.f6UVPOwqBO21O8he31vGgfwChNVrlDjO0CjVQAPTA_Y"
const dummyToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWViMzllMWY1MTBmNDdhYjZmNjkyOTEiLCJpYXQiOjE3MTExMDEzNzIsImV4cCI6MTcxMzY5MzM3Mn0.9YQZz9PBtfJkKihoQMSOuI67jyMSQckHgFaDmbzOg95'


describe("Test users routes",()=>{

  let testUserId:string='65eb39e1f510f47ab6f69291';
  let nonExistingUserId:string ='123456789098765432123456'
  let newCreatedUserId:string;

  beforeAll(async()=>{
    const response = await request(app).post("/api/v1/users/auth/login").send({
      email:"soleil000",
      password:"asdd"
    })

    testUserId = response.body.data._id
  },10000)

  afterAll(async()=>{

  })

   test("GET /api/users (Get all users - Unauthorized access no token)",async()=>{

    const response = await request(app).get("/api/v1/users")

    expect(response.status).toBe(400);

   },10000)


   test("GET /api/users (Get all users - Authenticated non-admin access)",async()=>{

    const response = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.status).toBe(401);

   },10000)


   test("GET /api/users (Get all users - Authenticated admin access)",async()=>{

    const response = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${token}`})

    expect(response.status).toBe(200);

   },10000)


   test("GET /api/users/:id (Get single user - Unauthorized access)",async()=>{

    const response = await request(app).get(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.status).toBe(401);

   },10000)


   test("GET /api/users/:id (Get single user - Authenticated access)",async()=>{

    const response = await request(app).get(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${token}`})

    expect(response.status).toBe(200);

   },10000)


   test("GET /api/users/:id (Get single user - Non-existent user)",async()=>{

    const response = await request(app).get(`/api/v1/users/${nonExistingUserId}`).set({"Authorization": `Bearer ${token}`})

    expect(response.status).toBe(404);

    // suggest invalid id lenfgth test

   },10000)


   test.skip("POST /api/users/auth/register (Register user - Valid registration)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/register").send({
      email:"dummy@gmail.com",
      password:"dummy-password",
      username:"dummy-username"
    })

    expect(response.status).toBe(201);

   },10000)

//
   test("POST /api/users/auth/register (Register user - Invalid registration data)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/register").send({
      password:"dummy-password",
      username:"dummy-username"
    })

    expect(response.status).toBe(400);

   },10000)


   test("POST /api/users/auth/login (Login user - Successful login)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/login").send({
      password:"someusername",
      email:"dummydata"
    })

    expect(response.status).toBe(200);

   },10000)

//login user here
   test("POST /api/users/auth/login (Login user - User not found)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/login").send({
      password:"someusername56",
      email:"solidity-course"
    })

    expect(response.status).toBe(404);

   },10000)

   test("POST /api/users/auth/login (Login user - Invalid credentials,password)",async()=>{

    const response = await request(app).post("/api/v1/users/auth/login").send({
      password:"someusername",
      email:"dummydatayes"
    })

    expect(response.status).toBe(400);

   },10000)


   test("PUT /api/users/:id (Update user - unauthenticated access)",async()=>{

    const response = await request(app).put(`/api/v1/users/${testUserId}`).send({
      profile:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
    })

    expect(response.status).toBe(400);

   },10000)


   test("PUT /api/users/:id (Update user - Authenticated non-admin access)",async()=>{

    const response = await request(app).put(`/api/v1/users/${testUserId}`)
    .send({
      profile:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
    })
    .set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.status).toBe(401);

   },10000)


   test("PUT /api/users/:id (Update user - Authenticated admin access)",async()=>{

    const response = await request(app).put(`/api/v1/users/${testUserId}`)
    .send({
      profile:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
    })
    .set({"Authorization": `Bearer ${token}`})

    expect(response.status).toBe(200);

   },10000)


   test("DELETE /api/users/:id (Delete user - Unauthorized access)",async()=>{

    const response = await request(app).delete(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${dummyToken}`})

    expect(response.status).toBe(401);

   },10000)


   test.skip("DELETE /api/users/:id (Delete user - Authenticated admin access)",async()=>{

    const response = await request(app).delete(`/api/v1/users/${testUserId}`).set({"Authorization": `Bearer ${token}`})

    expect(response.status).toBe(200);

   },10000)


})
