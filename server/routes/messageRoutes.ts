
import express, { Router } from 'express';
import { deleteMessage, getAllMessages, userSendMessage } from '../controllers/messagesController';
import { isMessageValidated } from '../middlewares/messageValidation';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/adminValidation';
import { isIdValid } from '../middlewares/idValidation';


const messageRoute: Router = express.Router()

messageRoute.get("/", isMessageValidated,isAuthenticated,isAdmin, getAllMessages)
messageRoute.post("/", isMessageValidated, userSendMessage)
messageRoute.delete("/:id",isIdValid, isMessageValidated,isAuthenticated,isAdmin,deleteMessage)


export default messageRoute;