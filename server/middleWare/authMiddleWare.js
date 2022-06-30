import { validateAccessToken } from "../jwt/jwtVerifive.js";



export const auth = async (req, res, next) => {
  try {
    const authorizationHeaders = req.headers.authorization;

    if (!authorizationHeaders) {
      throw new Error("Пользователь не авторизован!");
    }

    const accessToken = authorizationHeaders.split(" ")[1];

    if (!accessToken) {
      throw new Error("Пользователь не авторизован!");
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      throw new Error("Пользователь не авторизован!");
    }
    next();
  } catch (e) {
    res.status(401).json(e.message);
   
  }
};