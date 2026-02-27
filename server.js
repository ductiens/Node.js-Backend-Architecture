import app from "./src/app.js";
// Khởi động và tắt server Express

const PORT = process.env.PORT || 3056;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start with ${PORT}`);
});

process.on('SIGINT', () => {
  // console.log('Received SIGINT signal');
  server.close(() => console.log('Exit Server Express'));
  // notify.send(ping...);
});