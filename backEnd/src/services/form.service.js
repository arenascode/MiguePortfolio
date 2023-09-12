import joi from "joi";
import { ValidationError } from "../models/errors.js";
import { FormMessage } from "../models/messageForm.js";
import mailService from "./mail.service.js";

class FormService {

  async handleMessage(formData) {
    const messageContent = new FormMessage(formData.name, formData.email, formData.message)

    const result = await mailService.sendMailToNotifyMe(messageContent)
  
    return result;
      }
  }

const formService = new FormService();

export default formService;
