
import express, { Router } from 'express';
import userRoutes from './userRoutes';
import blogRoutes from './blogRoutes';
import messageRoute from './messageRoutes';
import subscriberRoutes from './subscribersRoutes';

const appRoutes: Router = express.Router();

appRoutes.use("/users", userRoutes)
appRoutes.use("/blogs", blogRoutes)
appRoutes.use("/messages", messageRoute)
appRoutes.use("/subscribers",subscriberRoutes)


export default appRoutes;