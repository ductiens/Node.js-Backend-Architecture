import bcrypt from "bcrypt";
import crypto from "crypto";
import { createTokenPair } from "../auth/authUtils.js";
import shopModel from "../models/shop.model.js";
import { getInfoData } from "../utils/index.js";
import { createKeyToken } from "./keyToken.service.js";

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

export const signup = async ({ name, email, password }) => {
  try {
    // step 1: check email exists??
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      return {
        code: "xxx",
        message: "Email already registered",
      };
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // step 2: create new shop
    const newShop = await shopModel.create({
      name,
      email,
      password: hashedPassword,
      role: [RoleShop.SHOP], // default role is SHOP
    });

    if (newShop) {
      // created privateKey, publicKey
      // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: "pkcs1", // pkcs8  -  Public key CryptoGraphy Standards
      //     format: "pem",
      //   },
      //   privateKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      // });

      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      console.log({ privateKey, publicKey }); // save collection KeyStore

      const keyStore = await createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        return {
          code: "xxx",
          message: "keyStore failed",
        };
      }

      // const publicKeyObject = crypto.createPublicKey(publicKeyString);
      // console.log("publicKeyObject", publicKeyObject);

      // created token pair
      const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);
      console.log("create token success", tokens);
      return {
        code: 201,
        metadata: {
          shop: getInfoData({ fields: ["_id", "name", "email"], object: newShop }),
          tokens,
        },
      };
    }

    return {
      code: 200,
      metadata: null,
    };
  } catch (error) {
    return {
      code: "xxx",
      message: error.message,
      status: "error",
    };
  }
};

export const login = async ({ email, password }) => {
  // ... logic đăng nhập
};
