import Joi from '@hapi/joi'

export const validateUser = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .required()
      .min(2)
      .label('Username is too short'),
    email: Joi.string().required().email().label('Not a valid email'),
    password: Joi.string().required().min(6).label('Password is too short'),
    user_id: Joi.number().required().label('user_id required'),
  })

  return schema.validate(data)
}

/** Module Schema Account */
export const validateCreateAccount = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().required().min(10).label('Fullname is too short'),
    email: Joi.string().required().email().label('Not a valid email'),
    password: Joi.string().required().min(6).label('Password is too short'),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('confirmPassword not match')
  })

  return schema.validate(data)
}

export const authSchema = {
  LOGIN: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}

/** Module Schema PaymentLog */
export const paymentLogSchema = {
  POST: Joi.object().keys({
    account: Joi.string().required().label('Not a valid account'),
    order: Joi.string().label('Not a valid order'),
    point: Joi.number().label('Point is not number'),
    transaction: Joi.string(),
    method: Joi.string(),
    reason: Joi.string(),
    amount_paid: Joi.number(),
    point_exchange: Joi.number(),
    ship_paid: Joi.number(),
  }),
  FIND: Joi.object().keys({
    account: Joi.string().label('Not a valid account'),
    order: Joi.string().label('Not a valid order'),
    point: Joi.number().label('Point is not number'),
    method: Joi.string(),
    transaction: Joi.string(),
    is_deleted: Joi.boolean(),
    createdAt: Joi.date().iso(), // .format('YYYY-MM-DD').options({ convert: false }),
    updatedAt: Joi.date(),
  }),
}

export const validatePaymentLogFind = (data) =>
  paymentLogSchema.FIND.validate(data)
