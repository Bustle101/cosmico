import { createServer } from "./app";

const app = createServer();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`[SERVER] Listening on port ${PORT}`);
});
