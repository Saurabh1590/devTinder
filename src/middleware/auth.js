const adminAuth = (req, res, next) => {
  console.log("user try to access");
  const token = "xyzhddj";
  const isUserAuthorized = token === "xyz";
  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized Access by User");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyzdjdh";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized Access");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};