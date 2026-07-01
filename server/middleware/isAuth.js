import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);

    const token = req.cookies.token;

    console.log("Token:", token);
    console.log("Type:", typeof token);

    if (!token) {
      return res.status(401).json({
        message: "Token not found"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded Token:", decoded);

    req.userId = decoded.userId;

    console.log("req.userId:", req.userId);

    next();

  } catch (error) {
    console.log("Auth Error:", error);

    return res.status(401).json({
      message: error.message
    });
  }
};

export default isAuth;