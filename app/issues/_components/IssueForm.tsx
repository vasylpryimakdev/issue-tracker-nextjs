"use client";

import {
  Button,
  CalloutRoot,
  CalloutText,
  TextField,
  Checkbox,
} from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import z from "zod";
import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@prisma/client";
import { statusMap } from "@/app/components/IssueStatusBadge";
import { CheckIcon } from "@radix-ui/react-icons";

const SimpleMDA = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });

  const [error, serError] = useState("");
  const [isSubmit, setSubmit] = useState(false);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data: IssueForm) => {
    setSubmit(true);
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }

      router.push("/issues");
    } catch (error) {
      serError("An unexpected error occured!");
    } finally {
      setSubmit(false);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <CalloutRoot color="red" className="mb-5">
          <CalloutText>{error}</CalloutText>
        </CalloutRoot>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          ></TextField.Input>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDA placeholder="Description" {...field}></SimpleMDA>
          )}
        />
        <ErrorMessage> {errors.description?.message}</ErrorMessage>
        {issue && (
          <div className="flex gap-4">
            {Object.keys(statusMap).map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Controller
                  name="status"
                  control={control}
                  defaultValue={issue.status}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value === status}
                      onCheckedChange={() => field.onChange(status)}
                    />
                  )}
                />

                <span>{status}</span>
              </label>
            ))}
          </div>
        )}
        <Button disabled={isSubmit}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {isSubmit && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
