exports.catchErrors = fn => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next)
  }
}

exports.notFound = (req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
}

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500)
  .send({
    message: err.message,
  })
}
