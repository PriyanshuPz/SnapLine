import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const aiservices = await prisma.aIService.findMany({
      where: {
        status: "APPROVED",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(aiservices);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
