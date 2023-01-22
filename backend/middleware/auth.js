

const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const ErrorHandler = require("../utils/erroHandler");
const catchErrorMiddleware = require("./catchError.middleware");

const isAuthenticatedUser = catchErrorMiddleware(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await UserModel.findById(decodedData.id);

  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};

module.exports={
    isAuthenticatedUser,
    authorizeRoles
}