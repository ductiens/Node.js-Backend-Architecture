import keytokenModel from "../models/keytoken.model.js";

export const createKeyToken = async ({ userId, publicKey, privateKey }) => {
  try {
    // const publicKeyString = publicKey.toString(); // dịch cục Buffer nhị phân kia thành một chuỗi văn bản (String) theo chuẩn PEM
    const tokens = await keytokenModel.create({
      user: userId,
      publicKey,
      privateKey,
    });

    return tokens ? tokens.publicKey : null;
  } catch (error) {
    return error;
  }
};
