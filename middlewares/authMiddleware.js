import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    console.log("Req.Header.Auth", req.headers.authorization);
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    console.log("Decode: ", decode);

    req.user = decode;
    next();
  } catch (error) {
    console.log("Requires Sign In", error);
  }
};
