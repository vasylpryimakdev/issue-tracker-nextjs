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
import { ArrowDownIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

enum sortOptions {
  ASC = "asc",
  DESC = "desc",
}

interface Column {
  label: string;
  value: keyof Issue;
  className?: string;
}

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sort: sortOptions;
    page: string;
  };
}

const columns: Column[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

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
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowDownIcon className="absolute inline self-center" />
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
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
