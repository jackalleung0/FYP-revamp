module.exports = {
  logs: (req, res, next) => {
    console.log(`got request to ${req.path}, ${JSON.stringify(req.params)}`);
    return next();
  },
};
