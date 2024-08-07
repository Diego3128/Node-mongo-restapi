import { connectToDb } from "./utils/mongoose.js";
import app from "./app.js";

async function main() {
  try {
    await connectToDb();
    app.listen(3000, () => {
      console.log("server started");
    });
  } catch (e) {
    console.error(e);
  }
}

main();
  