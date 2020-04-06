import Joi from '@hapi/joi'

export const validateUser = (data) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().required().min(2).label('Username is too short'),
    email: Joi.string().required().email().label('Not a valid email'),
    password: Joi.string().required().min(6).label('Password is too short'),
  })

  return schema.validate(data)
}
