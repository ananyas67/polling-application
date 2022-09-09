// Middleware for Validate the Schema.
//validator having a reference of JOI Validator inside the Schema
module.exports = (validator) => {
    return (request, response, next) => {
      const { error } = validator(request.body)
      console.log('error: ', error)
      if (error) {
        return response.status(400).send(error.details[0].message)
      }
      next(); // Move to the Controller
    }
  }