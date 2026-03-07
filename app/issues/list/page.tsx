import prisma from "@/prisma/client";
import {
  Link,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";
import IssueActions from "./IssueActions";
import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; sort: "asc" | "desc" };
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const validStatuses = Object.values(Status);
  const statusToFilter = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const sortBy = ["asc", "desc"].includes(searchParams.sort)
    ? searchParams.sort
    : "asc";
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: sortBy }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: statusToFilter },
    orderBy: orderBy,
  });

  return (
    <div>
      <IssueActions />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableColumnHeaderCell
                key={column.value}
                className={`${column.className} relative`}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      sort: searchParams.sort === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline absolute self-center" />
                )}
              </TableColumnHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
