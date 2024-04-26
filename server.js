import app from "./app.js";
import { connectDB } from "./db/connect.js";

const { PORT } = process.env;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();
