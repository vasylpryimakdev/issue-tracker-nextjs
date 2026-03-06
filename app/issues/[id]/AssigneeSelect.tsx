"use client";

import { Issue, User } from "@prisma/client";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: [],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 10 * 60,
    retry: 3,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <SelectRoot
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) =>
          axios
            .patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId || null,
            })
            .catch(() => {
              toast.error("Changes could not be saved");
            })
        }
      >
        <SelectTrigger placeholder="Assing..."></SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Suggestions</SelectLabel>
            <SelectItem value="">Unassigned</SelectItem>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
