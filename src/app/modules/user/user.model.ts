import { Schema, model } from "mongoose";
import { possibleGenders, userRoles, userStatus } from "./user.const";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

//mongoose schema for user
const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required to create a user!"],
    },
    email: {
      type: String,
      required: [true, "Email is required to create a user!"],
      unique: [true, "User with this email already exists!"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required to create a user!"],
      minlength: [6, "Password must be at least 6 characters long!"],
    },
    role: {
      type: String,
      enum: userRoles,
      default: "customer",
    },
    gender: {
      type: String,
      enum: possibleGenders,
      default: "male",
    },
    contactNo: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: userStatus,
      default: "active",
    },
    walletPoint: {
      type: Number,
      default: 100, // Default wallet point for a user
    },
    socials: {
      type: [String],
      default: [],
    },
    cardInfo: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

//Pre middleware to encrypt password
userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//removing password from document for security
userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

// Remove passwords from results
userSchema.post("find", function (docs, next) {
  docs.forEach((doc: any) => {
    if (doc && doc.password) {
      doc.password = "";
    }
  });
  next();
});

// user model
export const UserModel = model<TUser>("user", userSchema);
