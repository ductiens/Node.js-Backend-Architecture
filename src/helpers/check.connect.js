import mongoose from "mongoose";
import os from "os";
import process from "process";

const _SECONDS = 5000;

// count number of connections
export const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections::${numConnection}`);
};

// check over load
export const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;  // số nhân CPU
    const memoryUsage = process.memoryUsage().rss;  // số nhân CPU
    // Example maximum number of connections based on number ost cores
    const maxConnections = numCores * 5;  // mỗi nhân CPU cho phép 5 kết nối

    console.log(`Active connections:${numConnection}`);
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);

    if (numConnection > maxConnections) {
      console.log("Connection overload detected!");
      // notify.send(...)
    }
  }, _SECONDS); // Monitor every 5 seconds
};
