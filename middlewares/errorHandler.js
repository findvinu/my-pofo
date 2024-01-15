module.exports.notFound = (req, res, next) => {
  res.status(404).send("Page not Found");
};

module.exports.handleError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong.");
};
