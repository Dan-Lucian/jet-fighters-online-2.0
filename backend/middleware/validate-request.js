module.exports = validateRequest;

function validateRequest(request, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(request.body, options);
  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
  } else {
    request.body = value;
    next();
  }
}
