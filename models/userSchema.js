import Joi from "joi";


export default Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(1000).required(),
    duration: Joi.number().integer().positive().required()
});