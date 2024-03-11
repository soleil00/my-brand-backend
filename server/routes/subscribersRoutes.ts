
import express, { Router } from 'express';
import { deleteSubscriber, getAllSubscribers } from '../services/subscriber.service';
import { isIdValid } from '../middlewares/idValidation';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/adminValidation';


const subscriberRoutes: Router = express.Router();

subscriberRoutes.get("/",isAuthenticated,isAdmin, getAllSubscribers);
subscriberRoutes.delete("/:id",isIdValid,isAuthenticated,isAdmin,deleteSubscriber)



export default subscriberRoutes;