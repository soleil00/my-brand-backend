import User from "../server/model/userMode"; // Corrected import path
import request from "supertest";
import { describe, test, jest, expect } from "@jest/globals";
import app from "../server";
// import singleUser from "./constants/user";

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWViMmMzNTk5NDQ5NjQ4MGYzYTVkMDMiLCJpYXQiOjE3MTA3NjU2NzMsImV4cCI6MTcxMzM1NzY3M30.0dXEoZQiRv9_QImcthzR810UAWDEK3Rd2KqM0pb4d_Y"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVlZTllMTZjYTMzOWM4ZWI4ZWE2MjIiLCJpYXQiOjE3MTA3NjA0MTQsImV4cCI6MTcxMzM1MjQxNH0.7Yq6yc7U4rYMNbd3AjyOHygIcpwkr4Jq6Uz_B0ZvwS4"

const singleUser = {
    profile: "https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115",
      _id: "dummyid",
      username: "kazuba",
      email: "update",
      isAdmin: false,
      createdAt: '2024-03-08T15:23:52.134Z',
      updatedAt: '2024-03-08T16:14:14.838Z',
}
test("Test home route", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
});

test("Test non existing route", async () => {
  const res = await request(app).get("/sdsdsfds");
  expect(res.statusCode).toBe(404);
});

describe("Testing user registrations", () => {
  test("Testing if user already registered", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce({ email: "solei45l@gmail.com" });
    const user = await request(app).post("/api/v1/users/auth/register").send({
      email: "solei45l@gmail.com",
      password: "testpassword",
      username: "testuser",
    });
    expect(user.statusCode).toBe(400);
  });

  test.skip("Testing successful registered user", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce({username:"soem", password:"testpassword",email: "soem@gmail.com"});
    const user = await request(app).post("/api/v1/users/auth/register").send({
      username:"soem", password:"testpassword",email: "soem@gmail.com"
    });
    expect(user.status).toBe(201);
  });
});

describe("Test user login", () => {
  test("Test user does not exist", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(undefined);
    const user = await request(app).post("/api/v1/users/auth/login").send({
      email: "test@example.com",
      password: "testpassword",
    });
    expect(user.status).toBe(404);
  });

  test("Test incorrect password", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce({ email: "admin@admin.com", password: "testpassss" });
    const user = await request(app).post("/api/v1/users/auth/login").send({
      email: "admin@admin.com",
      password: "testpassword",
    });
    expect(user.status).toBe(401);
  });

  test("Test success", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce({ email: "admin@admin.com", password: "admin" });
    const user = await request(app).post("/api/v1/users/auth/login").send({
      email: "admin@admin.com", 
      password: "admin",
    });
    expect(user.status).toBe(200);
  });
});



describe("Test Get all users", () => {
  describe("test isAuthenticated middleware", () => {


    test("Test if no token provided in header(isAuthenticated)", async () => {
      const res = await request(app).get("/api/v1/users");
      expect(res.statusCode).toBe(401);
    });


    test("test for invalid token provided", async() => {
      const res = await request(app)
        .get("/api/v1/users")
        .set({"Authorization": "Bearer some_token"})
      
      expect(res.statusCode).toBe(401);
    })

    test("Test for is Authenticated but not is admin logged in", async() => {
      const res = await request(app)
                        .get("/api/v1/users")
                        .set({"Authorization": `Bearer ${userToken}`})
      expect(res.statusCode).toBe(401);
    })
    

    describe("Test isAdmin middleare", () => {
      

      test("Test isAuthenticated and isAdmin logged in", async () => {
        const res = await request(app)
          .get("/api/v1/users")
          .set({ "Authorization": `Bearer ${token}` })
        
        expect(res.statusCode).toBe(200);
      });


       test('Test no users', async () => {
        jest.spyOn(User, "find").mockResolvedValueOnce([]);
        const users = await request(app).get("/api/v1/users").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(404);
     },10000);
    })


  })
})


describe("Test Get single user", () => {
   test('Test user not found', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({isAdmin:false, name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"}).mockResolvedValueOnce(undefined);
        const users = await request(app).get("/api/v1/users/userId").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(404);
     })
    test('Test get user success', async () => {
        jest.spyOn(User, "findById").mockResolvedValueOnce({isAdmin:false, name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"}).mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id"});
        const users = await request(app).get("/api/v1/users/userId").set({"Authorization": `Bearer ${token}`});
        expect(users.status).toBe(200);
     })
})
