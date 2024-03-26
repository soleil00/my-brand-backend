import request from "supertest";
import { jest,test,expect,afterAll } from "@jest/globals";
import * as blogService from "../server/services/blogServices"
import createServer from "../server/utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import * as jwtService from "../server/services/jwtServices.service"


const app = createServer()


let token :string ;
let dummyToken :string;

const dummyBlog ={
  title:"soleil faked date",
  content:"dummy1",
}

const dummyUser2 ={
  email:"dummy2",
  password:"dummy2",
  username:"dummy2"
}

const dummyUserInput2 = {
  email:"dummy2",
  password:"dummy2",
}

const dummyAdmin2 ={
  email:"admin3",
  password:"admin3",
  username:"admin3",
  isAdmin: true
}

const dummyAdminInput2 = {
  email:"admin3",
  password:"admin3",
}


async function deleteBlogById(blogId :string) {

    await request(app)
      .delete(`/api/v1/blogs/${blogId}`).set({"Authorization": `Bearer ${token}`});
  }

  test("Test home route", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });


describe('Blog Routes', () => {
  let testBlogId:string;
  let invalidId:string ='123456789098765432123456'


  beforeAll(async () => {

    const mongoServer = await MongoMemoryServer.create();
  
      await mongoose.connect(mongoServer.getUri());
    

       //register dummy user
       const dummyUserRegister = await request(app).post("/api/v1/users/auth/register").send(dummyUser2)

      dummyToken = jwtService.generateUserToken(dummyUserRegister.body.data)

      //register dummy admin
      const registerDummyAdmin= await request(app).post("/api/v1/users/auth/register").send(dummyAdmin2)

      token = jwtService.generateUserToken(registerDummyAdmin.body.data)
 

      //register dummy blog
      const dummyBlogCreated = await request(app)
      .post('/api/v1/blogs')
      .send(dummyBlog)
      .set({"Authorization": `Bearer ${token}`});



      testBlogId = dummyBlogCreated.body.data._id;

  },20000);

  afterAll(async () => {

    await request(app)
    .delete(`/api/v1/blogs/${testBlogId}`).set({"Authorization": `Bearer ${token}`});

    await mongoose.disconnect();
    await mongoose.connection.close();
    
  
    
  });

 

  describe('GET /api/v1/blogs', () => {
    test('should get all blogs', async () => {
      const spy = jest.spyOn(blogService,"fetchAllBlogs")
      const response = await request(app)
        .get('/api/v1/blogs')
      expect(spy).toHaveBeenCalled()
    },20000);
  });


  describe('GET /api/v1/blogs/:id', () => {
    test('spying on getSingleBlog service', async () => {
      const spy = jest.spyOn(blogService,"getBlogById")
      const response = await request(app)
        .get(`/api/v1/blogs/${testBlogId}`)
      expect(spy).toHaveBeenCalled(); 
    },20000);

    test('should return 400 if blog invalid id passed', async () => {
      const spy = jest.spyOn(blogService,"getBlogById")
      const response = await request(app)
        .get(`/api/v1/blogs/someidher`)
      expect(response.status).toBe(400);
      expect(spy).not.toHaveBeenCalled(); 
    },20000);
    test('should return 404 if blog id does not exist', async () => {
      const spy = jest.spyOn(blogService,"getBlogById")
      const response = await request(app)
        .get(`/api/v1/blogs/${invalidId}`)
      expect(response.status).toBe(404);
      expect(spy).toHaveBeenCalled(); 
    },20000);


  });

  
  describe('POST /api/v1/blogs', () => {
    test('should create a new blog', async () => {
      const response = await request(app)
        .post('/api/v1/blogs')
        .send({
           title: 'Test Blog',
           content: 'This is a test blog'
 
        })
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(200);

    },20000);

    test('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/v1/blogs')
        .send({
          title:"This blog"
        })
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(400);
    },20000);
  });

  
  describe('PUT /api/v1/blogs/:id', () => {
    test('should update an existing blog', async () => {
      const spy = jest.spyOn(blogService,"updateBlog")
      const response = await request(app)
        .put(`/api/v1/blogs/${testBlogId}`)
        .send({
           title: 'Updated Test Blog',
           content: 'This is an updated test blog'
        })
        .set({"Authorization": `Bearer ${token}`});
      expect(spy).toHaveBeenCalled()
      
    },20000);

    test('should return 400 if blog id does not exist', async () => {
      const spy = jest.spyOn(blogService,"updateBlog")
      const response = await request(app)
        .put(`/api/v1/blogs/5fd2d5f6db2832f3`)
        .send({
          title: 'Updated Test Blog',
          content: 'This is an updated test blog'
        })
        .set({"Authorization": `Bearer ${token}`});
        expect(spy).not.toHaveBeenCalled()
    },20000);

    
  });

  
  describe('POST /api/v1/blogs/:id/comment', () => {
    test('should add a comment to a blog', async () => {
      const response = await request(app)
        .post(`/api/v1/blogs/${testBlogId}/comment`)
        .send({
           content: 'This is a test comment'
        })
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(200);
    
    },20000);

    test('should return 400 if u try to add commen  while u are not logged in', async () => {
      const response = await request(app)
        .post(`/api/v1/blogs/${invalidId}/comment`)
        .send({
          comment: 'This is a test comment'
        })
      expect(response.status).toBe(400);
    },20000);
  });


  describe('POST /api/v1/blogs/:id/like', () => {
    it('should add a like to a blog', async () => {
      const response = await request(app)
        .post(`/api/v1/blogs/${testBlogId}/like`)
        .set({"Authorization": `Bearer ${token}`})
        
      expect(response.status).toBe(200);
    
    },20000);

    test('should return 404 if blog id does not exist', async () => {
      const response = await request(app)
        .post(`/api/v1/blogs/${invalidId}/like`)
        .set({"Authorization": `Bearer ${token}`})

      expect(response.status).toBe(404);
    },20000);

    test('should return 400 if u try to add like to blog  while u are not logged in', async () => {
      const response = await request(app)
        .post(`/api/v1/blogs/${invalidId}/like`)
        .send({
          comment: 'This is a test comment'
        })
      expect(response.status).toBe(400);
    },20000);
  });

    test('should delete a single blog', async () => {
      const spy = jest.spyOn(blogService,"deleteBlogById")
      const response = await request(app)
        .delete(`/api/v1/blogs/${testBlogId}`)
        .set({"Authorization": `Bearer ${token}`});
      expect(spy).toHaveBeenCalled(); 
    },20000);


    describe('DELETE /api/v1/blogs', () => {
      test('should delete all blogs', async () => {
        const response = await request(app)
          .delete('/api/v1/blogs')
          .set({"Authorization": `Bearer ${token}`});
        expect(response.status).toBe(200);
      },20000);
    });
    

});
