import request from "supertest";
import { jest,test,expect,afterAll } from "@jest/globals";
import app from "../server/app";
import http from 'http'


const server = http.createServer(app);


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVlZTllMTZjYTMzOWM4ZWI4ZWE2MjIiLCJpYXQiOjE3MTA5MzA0NDEsImV4cCI6MTcxMzUyMjQ0MX0.r6pv4leZKAo3wSQr1tp_k20EjRENwi01BB2-B9RxhOU"
async function deleteBlogById(blogId :string) {

    await request(app)
      .delete(`/api/v1/blogs/${blogId}`).set({"Authorization": `Bearer ${token}`});
  }

  test("Test home route", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });


// describe('Blog Routes', () => {
//   let testBlogId:string;
//   let invalidId:string ='123456789098765432123456'


//   beforeAll(async () => {
//     const response : any = await request(app)
//       .post('/api/v1/blogs')
//       .send({
//         title: 'Test Blog',
//         content: 'This is a test blog'
//       })
//       .set({"Authorization": `Bearer ${token}`});

//     testBlogId = response.body.data._id;

//     console.log('from created blog : ',testBlogId)
//   });

//   afterAll(async () => {
  
//     if (testBlogId) {
//       await deleteBlogById(testBlogId);
      
//       await server.close();
//     }
//   });

//   test("Test home route", async () => {
//     const res = await request(app).get("/");
//     expect(res.statusCode).toBe(200);
//   });

//   describe('GET /api/v1/blogs', () => {
//     test('should get all blogs', async () => {
//       const response = await request(app)
//         .get('/api/v1/blogs')
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(200);
//     //   expect(response.body).toBeDefined(); 
//     },10000);
//   });


//   describe('GET /api/v1/blogs/:id', () => {
//     test('should get a single blog', async () => {
//       const response = await request(app)
//         .get(`/api/v1/blogs/65fd2d5f6db2832f3b22124f`)
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(200);
//     //   expect(response.body).toBeDefined(); 
//     },10000);

//     test('should return 404 if blog id does not exist', async () => {
//       const response = await request(app)
//         .get(`/api/v1/blogs/65fd442562b368b07d060cd2`)
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(404);
//     },10000);
//   });


//   describe('DELETE /api/v1/blogs/:id', () => {
//     test('should delete a single blog', async () => {
//       const response = await request(app)
//         .delete(`/api/v1/blogs/${testBlogId}`)
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(200);
//     },10000);

//     test('should return 404 if blog id does not exist', async () => {
//       const response = await request(app)
//         .delete(`/api/v1/blogs/${invalidId}`)
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(404);
//     },10000);
//   });

  
//   describe('POST /api/v1/blogs', () => {
//     test.skip('should create a new blog', async () => {
//       const response = await request(app)
//         .post('/api/v1/blogs')
//         .send({
//            title: 'Test Blog',
//            content: 'This is a test blog'
 
//         })
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(200);

//     },10000);

//     test('should return 400 if required fields are missing', async () => {
//       const response = await request(app)
//         .post('/api/v1/blogs')
//         .send({
//           title:"This blog"
//         })
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(400);
//     },10000);
//   });

  
//   describe('PUT /api/v1/blogs/:id', () => {
//     test('should update an existing blog', async () => {
//       const response = await request(app)
//         .put(`/api/v1/blogs/65fd2d946db2832f3b221252`)
//         .send({
//            title: 'Updated Test Blog',
//            content: 'This is an updated test blog'
//         })
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(200);
//       expect(response.body.data).toHaveProperty('_id');
//     },10000);

//     test('should return 400 if blog id does not exist', async () => {
//       const response = await request(app)
//         .put(`/api/v1/blogs/5fd2d5f6db2832f3b22124m`)
//         .send({
//           title: 'Updated Test Blog',
//           content: 'This is an updated test blog'
//         })
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(400);
//     },10000);

    
//   });


//   describe('DELETE /api/v1/blogs', () => {
//     test.skip('should delete all blogs', async () => {
//       const response = await request(app)
//         .delete('/api/v1/blogs')
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(200);
//     },10000);
//   });

//   // Test POST /api/v1/blogs/:id/comment
//   describe('POST /api/v1/blogs/:id/comment', () => {
//     test('should add a comment to a blog', async () => {
//       const response = await request(app)
//         .post(`/api/v1/blogs/${testBlogId}/comment`)
//         .send({
//            content: 'This is a test comment'
//         })
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(200);
//     //   expect(response.body).toHaveProperty('commentId');
//     },10000);

//     test('should return 404 if blog id does not exist', async () => {
//       const response = await request(app)
//         .post(`/api/v1/blogs/${invalidId}/comment`)
//         .send({
//           comment: 'This is a test comment'
//         })
//         .set({"Authorization": `Bearer ${token}`});
//       expect(response.status).toBe(404);
//     },10000);
//   });

//   // Test POST /api/v1/blogs/:id/like
//   describe('POST /api/v1/blogs/:id/like', () => {
//     it('should add a like to a blog', async () => {
//       const response = await request(app)
//         .post(`/api/v1/blogs/${testBlogId}/like`)
//         .set({"Authorization": `Bearer ${token}`})
        
//       expect(response.status).toBe(200);
//     //   expect(response.body).toHaveProperty('likes');
//     },10000);

//     test('should return 404 if blog id does not exist', async () => {
//       const response = await request(app)
//         .post(`/api/v1/blogs/${invalidId}/like`)
//         .set({"Authorization": `Bearer ${token}`})

//       expect(response.status).toBe(404);
//     },10000);
//   });


// });
