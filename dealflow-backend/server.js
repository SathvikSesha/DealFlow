import app from "./app.js";
import "dotenv/config";
import connectDB from "./config/db.js";

const server = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server executing on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

server();
