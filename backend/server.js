import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const PORT = 3000;

const app = express();

app.get("/test", (req, res) => {
  console.log(res.getHeaders());
  res.send("Hello from test route");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
