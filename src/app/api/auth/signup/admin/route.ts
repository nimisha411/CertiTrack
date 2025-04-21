import dbConfig from "@/middlewares/db.config";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { formData } = await req.json();
  try {
    const user = await Admin.findOne({ email: formData.email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const admin = await Admin.findOne({
      state: "Maharashtra",
    });
    if (admin) {
      return NextResponse.json(
        { message: "Admin already exists for this District" },
        { status: 400 }
      );
    }
    // Encrypt Password
    const encryptedPassword = await bcrypt.hash(formData.password, 10);
    const newUser = new Admin({
      ...formData,
      state: "Maharashtra",
      password: encryptedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
