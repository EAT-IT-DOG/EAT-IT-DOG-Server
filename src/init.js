import "./db";
import "./models/Food";
import app from "./server";

const PORT = 4000;

const handleListening = () => {
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);
