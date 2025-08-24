import { model, Schema } from "mongoose";
import { TAuth } from "./auth.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const authSchema = new Schema<TAuth>({
  name: {
    type: String,
    required: [true, "Name is required to create a User!"],
  },
  email: {
    type: String,
    required: [true, "Email is required to create a User!"],
    unique: [true, "User with this Email is already Exists!"],
  },
  password: {
    type: String,
    required: [true, "Password is required to create a User!"],
  },
  role: {
    type: String,
    enum: ["admin", "hr", "employee"],
    default: "employee",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

//Pre middleware to encrypt password
authSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//removing password from document for security
authSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

// Remove passwords from results
authSchema.post("find", function (docs, next) {
  docs.forEach((doc: any) => {
    if (doc && doc.password) {
      doc.password = "";
    }
  });
  next();
});

export const AuthModel = model<TAuth>("user", authSchema);
