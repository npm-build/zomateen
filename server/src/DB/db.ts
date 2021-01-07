import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const DBURI = "mongodb://localhost:27017/users";

mongoose.connect(DBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.set("useFindAndModify", false);

export const db = mongoose.connection;
autoIncrement.initialize(db);

db.on("error", (err) => {
  console.error(err);
  console.log("database is not connected");
});
