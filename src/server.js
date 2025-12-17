const app = require(".");
const connectDB = require("./config/db");
const port = process.env.PORT
app.listen(port, async() => {
  await connectDB()
  console.log(`E-commerce api listening on port ${port}!`)
}
);
