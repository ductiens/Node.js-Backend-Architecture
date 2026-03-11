import { signup } from "../services/access.service.js";

export const signUp = async (req, res, next) => {
  try {
    const result = await signup(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  // code login...
};
