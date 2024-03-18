
import express, { Router } from 'express';
import { deleteMessage, getAllMessages, userSendMessage } from '../controllers/messagesController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/adminValidation';
import { isIdValid } from '../middlewares/idValidation';
import { validateMessage } from '../middlewares/messageValidation';


const messageRoute: Router = express.Router()

messageRoute.get("/",isAuthenticated,isAdmin, getAllMessages)
messageRoute.post("/", validateMessage, userSendMessage)
messageRoute.delete("/:id",isIdValid,isAuthenticated,isAdmin,deleteMessage)


export default messageRoute;