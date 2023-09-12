import formService from "../services/form.service.js";

export async function handlePostForm(req, res, next) {
try {
  console.log(req.body.message);
  const result = await formService.handleMessage(req.body);
  console.log(result);
  res.json(result);
} catch (error) {
  console.log(error.details);
  res.status(400).json(error.details)
}
}