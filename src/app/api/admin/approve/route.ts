import Admin from "@/models/Admin";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const searchparams = req.nextUrl.searchParams;
  const adminId = searchparams.get("id");
  const status = searchparams.get("status");
  if (!adminId || !status) {
    return NextResponse.json(
      { message: "Admin ID and status are required" },
      { status: 400 }
    );
  }
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }
    await Admin.findByIdAndUpdate(adminId, { isApproved: status });
    return NextResponse.json(
      { message: "Admin status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
