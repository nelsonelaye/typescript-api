import mongoose from "mongoose";

const url: string = "mongodb://localhost/ejsTypescript";

mongoose
  .connect(url)
  .then(() => {
    console.log("connected!");
  })
  .catch((err) => {
    console.log(err.message);
  });

export default mongoose;
