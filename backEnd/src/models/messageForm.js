import Joi from "joi";
import { ValidationError } from "./errors.js";

function validatedName(name) {
  const { error, value } = Joi
    .string()
    .min(3)
    .required()
    .validate(name);
  if (error) {
    throw new ValidationError(
      error.message,
      "Revisa el nombre. debe contener solo letras y un minímo de 3."
    );
  }
  return value
}

function validatedEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    const errorInstance = new ValidationError(
      "Invalid Email. Please check it"
    );
    errorInstance.logError();
    throw errorInstance;
  }
  return email;
}

function validatedMessage(message) {

    const { error, value } = Joi.string().min(10).required().validate(message);
    console.log(`value: ${value}`);
    console.log(`error: ${error}`);

  if (error) {
    throw new ValidationError(error.message, "El mensaje es muy corto. Cuentame un poco más de tu propuesta.");
  }
  return value;
}


export class FormMessage {
  constructor(name, email, message) {
    this.name = validatedName(name),
    this.email = validatedEmail(email),
    this.message = validatedMessage(message);
    this.timeStamp = Date().toString();
  }
}
