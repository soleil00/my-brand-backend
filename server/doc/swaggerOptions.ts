import { Router } from "express";
import dotenv from "dotenv"
import { setup,serve } from "swagger-ui-express";

dotenv.config()

const docRouter = Router()

const options = {
    openapi:"3.0.1",
    info:{
        title:"My brand api documentation",
        version:"1.0.0",
        description:"her is my barand bakend api documentation using swagger ui"
    },
    servers:[
        {
            url: 'https://my-brand-backend-1-cqku.onrender.com',
        },
        {
            url: `http://localhost:${process.env.PORT}`,
        }
    ],
    basePath:"/api/v1",
    security:[
        {
            bearToken:[]
        }
    ],
    tags:["User", "Comment","Message"],
    paths: {
       "/":  {
          get: {
            tags: ["Home"],
            description: "Welcome message",
            responses: {
              200: {
                description: "successfully",
              },
              500: {
                description: "Internal server error",
              },
            },
          },
          post:{
            
          }
        },
        "/api/v1/users": {
          get: {
            tags: ["User"],
            description: "Get all from db",
            responses: {
              200: {
                description: "successfully",
              },
              401: {
                description: "Unauthorized",
              },
              404: {
                description: "Not found",
              }
            },
          }
        },
        "/api/v1/users/auth/register" : {
            post: {
                tags: ["User"],
                description: "Register a new user",
                requestBody:{
                    required: true,
                    content:{
                        "application/json":{
                            schema: {
                                "$ref":"#/components/schemas/RegisterSchema"
                            },
                        }
                    },
                   
                },
                responses: {
                    201: {
                        description: "Successfully created",
                    },
                    400: {
                        description: "Bad request",
                    },
                    
                },
            }
        },

        "/api/v1/users/auth/login" :{
            post: {
                tags: ["User"],
                description: "User login",
                requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            "$ref": "#/components/schemas/LoginSchema",
                        }
                    },
                },
                },
                responses: {
                    200: {
                        description: "Successfully created",
                    },
                    400: {
                        description: "Bad request",
                    },
                    
                },
            }
        },

        "/api/v1/users/{id}": {
          get: {
            tags: ["User"],
            description: "Get single user",
            parameters: [{ in: "path", name: "id", required: true }],
            responses: {
              200: {
                description: "successfully",
              },
              401: {
                description: "Unauthorized",
              },
            },
          },
          delete: {
            tags: ["User"],
            description: "Delete a user from db",
            parameters: [{ in: "path", name: "id", required: true }],
            responses: {
              201: {
                description: "successfully",
              },
              401: {
                description: "Unauthorized",
              }
            },
          },

          patch:{
            tags: ["User"],
            description: "Update a user from db",
            parameters: [{ in: "path", name: "id", required: true }],
            responses: {
              201: {
                description: "successfully",
              },
              401: {
                description: "Unauthorized",
              }
            },
          }
        },
        "/api/v1/blogs":{
            get:{
                tags:["Blogs"],
                description:"Get all blogs",
                responses:{
                    200:{
                        description:"successfully"
                    },
                    401:{
                        description:"Unauthorized"
                    }
                }
            },
            post:{
                tags: ["Blogs"],
                summary: "Create a new blog",
                requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/Blog",
                    },
                    },
                },
                },
                responses:{
                    201:{
                        description:"successfully"
                    },
                    401:{
                        description:"Unauthorized"
                    }
                }
            },
            delete :{
                tags:["Blogs"],
                description:"Delete all blogs",
                responses:{
                    201:{
                        description:"successfully"
                    },
                    401:{
                        description:"Unauthorized"
                    },
                    404:{
                        description:"No Blogs found"
                    }
                }
            }
        },
        "/api/v1/blogs/{id}":{
            get:{
                tags:["Blogs"],
                description:"Get single blog",
                parameters:[{
                    in: "path",
                    name: "id",
                    required: true
                }],
                responses:{
                    200:{
                        description:"successfully"
                    },
                    400:{
                        description:"Bad request"
                    },
                    401:{
                        description:"Unauthorized"
                    },
                    404:{
                        description:"Blog not found"
                    },
                }
            },
            put:{
                tags:["Blogs"],
                description:"Update a blog",
                parameters: [
                    {
                      name: "id",
                      in: "path",
                      required: true,
                      schema: {
                        type: "string",
                      },
                    },
                  ],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/Blog",
                        },
                        },
                    },
                    },
                responses:{
                    201:{
                        description:"successfully"
                    },
                    400:{
                        description:"Bad request"
                    },
                    401:{
                        description:"Unauthorized"
                    },
                    404:{
                        description:"Blog not found"
                    },
                }
            },
            delete:{
                tags:["Blogs"],
                description:"Delete a blog",
                parameters:[{
                    in: "path",
                    name: "id",
                    required: true
                }],
                responses:{
                    201:{
                        description:"successfully"
                    },
                    400:{
                        description:"Bad request"
                    },
                    401:{
                        description:"Unauthorized"
                    },
                    404:{
                        description:"Blog not found"
                    },
                }
            }
        },
        "/api/v1/blogs/{id}/comment":{
            post:{
                tags:["Blogs"],
                description:"Add a comment to a blog",
                parameters: [
                    {
                      name: "id",
                      in: "path",
                      required: true,
                      schema: {
                        type: "string",
                      },
                    },
                  ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Comment",
                        },
                        },
                    },
                    },
                responses:{
                    201:{
                        description:"successfully"
                    },
                    400:{
                        description:"Bad request"
                    },
                    401:{
                        description:"Unauthorized"
                    },
                    404:{
                        description:"Blog not found"
                    },
                }
            }
        },
        "/api/v1/blogs/{id}/like":{
            post:{
                tags:["Blogs"],
                description:"Add a like to a blog",
                parameters:[{
                    in: "path",
                    name: "id",
                    required: true
                }],
                responses:{
                    201:{
                        description:"successfully"
                    },
                    400:{
                        description:"Bad request"
                    },
                    401:{
                        description:"Unauthorized"
                    },
                    404:{
                        description:"Blog not found"
                    },
                }
            }
        },
        "/api/v1/messages":{
            get:{
                tags:["Messages"],
                description:"Get all messages from db",
                responses:{
                    200:{
                        description:"successfully"
                    },
                    401:{
                        description:"Unauthorized"
                    }
                }
            },
            post:{
                tags:["Messages"],
                description:"Sending messages",
                requestBody:{
                    required:true,
                    content:{
                        "application/json":{
                            schema: {
                                "$ref": "#/components/schemas/Message",
                            }
                        }
                    }
                },
                responses:{
                    201:{
                        description:"successfully"
                    },
                    400:{
                        description:"Bad request"
                    }
                }
            }
        },
        "/api/v1/messages/{id}":{
            get:{
                tags:["Messages"],
                description:"Get single message from db",
                parameters:[{
                    in: "path",
                    name: "id",
                    required: true
                }],
                responses:{
                    200:{
                        description:"successfully"
                    },
                    400:{
                        description:"Bad request"
                    },
                    401:{
                        description:"Unauthorized"
                    },
                    404:{
                        description:"Message not found"
                    },
                }
            },
            delete:{
                tags:["Messages"],
                description:"Delete Single message",
                parameters:[{
                    in: "path",
                    name: "id",
                    required: true
                }],
                responses:{
                    201:{
                        description:"successfully"
                    },
                    400:{
                        description:"Bad request"
                    },
                    401:{
                        description:"Unauthorized"
                    },
                    404:{
                        description:"Message not found"
                    },
                }
            }
        },
        "/api/v1/subscribers":{
            get:{
                tags:["Subscribers"],
                description:"Get all subscribers from db",
                responses:{
                    200:{
                        description:"successfully"
                    },
                    401:{
                        description:"Unauthorized"
                    },
                    404:{
                        description:"Subscribers not found"
                    }
                }
            },
        },
        "/api/v1/subscribers/{id}":{
            delete:{
                tags:["Subscribers"],
                description:"Delete Single subscriber",
                parameters:[{
                    in: "path",
                    name: "id",
                    required: true
                }],
                responses:{
                    201:{
                        description:"successfully"
                    },
                    400:{
                        description:"Bad request"
                    },
                    401:{
                        description:"Unauthorized"
                    },
                    404:{
                        description:"Subscriber not found"
                    },
                }
            }
        },
        
    },
    components: {
        securitySchemes: {
            bearToken: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
          UserSchema:{
            type: "object",
            properties:{
                profile:{
                    type:"string",
                    default:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115"
                },
                username: {
                    type: "string",
                    description: "User's username"
                },
                email: {
                    type: "string",
                    description: "User's email address"
                },
                password: {
                    type: "string",
                    description: "password of the user"
                }
            },
            example : {
                profile:"https://up.yimg.com/ib/th?id=OIP.52T8HHBWh6b0dwrG6tSpVQHaFe&%3Bpid=Api&rs=1&c=1&qlt=95&w=156&h=115",
                username: "soleil00",
                email: "soleil00@admin.com",
                password: "1234"
            },
            required: ["username", "email", "password"]
          },
          Blog: {
            type: "object",
            properties: {
              title: {
                type: "string",
              },
              content: {
                type: "string",
              },
              image: {
                type: "string",
                format: "binary",
              },
            },
          },
          Message:{
            type: "object",
            properties:{
                name: {
                    type: "string",
                    description: "Name of the user who is sending message"
                },
                subject: {
                    type: "string",
                    description: "Subject of the message"
                },
                email: {
                    type: "string",
                    description: "Email of the user"
                },
                message: {
                    type: "string",
                    description: "Message of the user"
                },
                subscribed:{
                    type: "boolean",
                    description: "Is the user subscribed to newsletter"
                }
            },
            example : {
                name: "john Does",
                subject: "Job Offer",
                email: "johndoes@gmail.com",
                message: "Hello",
                subscribed: true
            },
            required: ["name", "subject", "email", "message"]
          },
          Comment:{
            type: "object",
            properties:{
                content: {
                    type: "string",
                    description: "actual comment from user"
                },
            },

            examples: {
                content:"Wow nice job john doe",

            },

            required: ["content"]
        
          },
          LoginSchema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                required: true,
                description: "email of user",
              },
              password: {
                type: "string",
                description: "password of user",
              },
            },
            example: {
              email: "test@email.yours",
              password: "janedoel250",
            },
          },
          RegisterSchema :{
            type: "object",
            properties: {
              username: {
                type: "string",
                required: true,
                description: "username of user",
              },
              email: {
                type: "string",
                required: true,
                description: "email of user",
              },
              password: {
                type: "string",
                required: true,
                description: "password of user",
              },
            },
            example: {
              username: "test",
              email: "test@email.yours",
              password: "pass123",
            },
          },
        },
    },

}

docRouter.use("/", serve);
docRouter.get("/",setup(options))

export default docRouter;






// post: {
//     tags: ["Blogs"],
//     summary: "Create a new blog",
//     requestBody: {
//       required: true,
//       content: {
//         "multipart/form-data": {
//           schema: {
//             $ref: "#/components/schemas/Blog",
//           },
//         },
//       },
//     },
//   }
