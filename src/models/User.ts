import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  taluka: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
