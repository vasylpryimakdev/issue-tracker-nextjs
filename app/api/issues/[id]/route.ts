import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/auth/AuthOptions";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return NextResponse.json({}, { status: 401 });
  // }

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { title, description, assignedToUserId, status } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found!" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
      status,
    },
  });

  return NextResponse.json(updatedIssue);
}
export async function DELETE(req: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found!" }, { status: 404 });
  }

  await prisma.issue.delete({ where: { id: issue.id } });

  return NextResponse.json({}, { status: 200 });
}
