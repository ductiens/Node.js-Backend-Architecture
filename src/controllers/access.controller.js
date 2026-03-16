import { CREATED } from "../core/success.response.js";
import { signup } from "../services/access.service.js";

export const signUp = async (req, res, next) => {
  // try {
  //  const result = await signup(req.body);
  //  return res.status(201).json(result);
  // } catch (error) {
  //   next(error);
  // }

  new CREATED({
    message: "Registered OK!",
    metadata: await signup(req.body),
    // options: {
    //   limit: 10,
    //   page: 1,
    // },
  }).send(res);
};

export const login = async (req, res, next) => {
  // code login...
};
