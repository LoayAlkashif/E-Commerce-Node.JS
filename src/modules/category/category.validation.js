import Joi from "joi";

export const categoryValidation = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string(),
  image: Joi.string(),
  createdBy: Joi.string(),
});
