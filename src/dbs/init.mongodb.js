import mongoose from "mongoose";
import { countConnect } from "../helpers/check.connect.js";

const connectString = process.env.MONGODB_URI || "mongodb://localhost:27017/shopDEV";

class Database {
  constructor() {
    this.connect();
  }

  // Connect to MongoDB
  connect(type = "mongodb") {
    if (1 == 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then(() => console.log("Connected to MongoDB", countConnect()))
      .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        // process.exit(1);
      });
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
export default instanceMongodb;
