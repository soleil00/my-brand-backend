import request from "supertest";
import { jest,test,expect,afterAll } from "@jest/globals";
import app from "../server/app";
import http from 'http'


const server = http.createServer(app);


let token :string ;
let dummyToken :string;


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
    

       //register dummy user
       const response1 = await request(app).post("/api/v1/users/auth/auth/register").send({
        email:"dummy1",
        password:"dummy1",
        username:"dummy1"
      })

      //login dummy user
      const response2 = await request(app).post("/api/v1/users/auth/auth/login").send({
        email:"dummy1",
        password:"dummy1",
      })

      dummyToken = response2.body.token

      //login admin
      const response3 = await request(app).post("/api/v1/users/auth/auth/login").send({
        email:"admin",
        password:"admin",
      })

      token = response3.body.token

      const response4 : any = await request(app)
      .post('/api/v1/blogs')
      .send({
        title: 'test db data',
        content: 'This is a test blog'
      })
      .set({"Authorization": `Bearer ${token}`});

      testBlogId = response4.body.data._id;
  },20000);

  afterAll(async () => {

    await request(app)
    .delete(`/api/v1/blogs/${testBlogId}`).set({"Authorization": `Bearer ${token}`});
    
    server.close();
  
    
  });

  test("Test home route", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  describe('GET /api/v1/blogs', () => {
    test('should get all blogs', async () => {
      const response = await request(app)
        .get('/api/v1/blogs')
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(200);
    //   expect(response.body).toBeDefined(); 
    },20000);
  });


  describe('GET /api/v1/blogs/:id', () => {
    test('should get a single blog', async () => {
      const response = await request(app)
        .get(`/api/v1/blogs/65fd2d5f6db2832f3b22124f`)
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(200);
    //   expect(response.body).toBeDefined(); 
    },20000);

    test('should return 404 if blog id does not exist', async () => {
      const response = await request(app)
        .get(`/api/v1/blogs/65fd442562b368b07d060cd2`)
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(404);
    },20000);
  });


  describe('DELETE /api/v1/blogs/:id', () => {
    test('should delete a single blog', async () => {
      const response = await request(app)
        .delete(`/api/v1/blogs/${testBlogId}`)
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(200);
    },20000);

    test('should return 404 if blog id does not exist', async () => {
      const response = await request(app)
        .delete(`/api/v1/blogs/${invalidId}`)
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(404);
    },20000);
  });

  
  describe('POST /api/v1/blogs', () => {
    test.skip('should create a new blog', async () => {
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
      const response = await request(app)
        .put(`/api/v1/blogs/65fd2d946db2832f3b221252`)
        .send({
           title: 'Updated Test Blog',
           content: 'This is an updated test blog'
        })
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('_id');
    },20000);

    test('should return 400 if blog id does not exist', async () => {
      const response = await request(app)
        .put(`/api/v1/blogs/5fd2d5f6db2832f3b22124m`)
        .send({
          title: 'Updated Test Blog',
          content: 'This is an updated test blog'
        })
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(400);
    },20000);

    
  });


  describe('DELETE /api/v1/blogs', () => {
    test.skip('should delete all blogs', async () => {
      const response = await request(app)
        .delete('/api/v1/blogs')
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(200);
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

    test('should return 404 if blog id does not exist', async () => {
      const response = await request(app)
        .post(`/api/v1/blogs/${invalidId}/comment`)
        .send({
          comment: 'This is a test comment'
        })
        .set({"Authorization": `Bearer ${token}`});
      expect(response.status).toBe(404);
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
  });


});
