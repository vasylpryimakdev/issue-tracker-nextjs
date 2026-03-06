"use client";

import {
  Button,
  Callout,
  CalloutRoot,
  CalloutText,
  Text,
  TextField,
} from "@radix-ui/themes";
import SimpleMDA from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import z from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [error, serError] = useState("");
  const [isSubmit, setSubmit] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: IssueForm) => {
    setSubmit(true);
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      serError("An unexpected error occured!");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <CalloutRoot color="red" className="mb-5">
          <CalloutText>{error}</CalloutText>
        </CalloutRoot>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            {...register("title")}
          ></TextField.Input>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDA placeholder="Description" {...field}></SimpleMDA>
          )}
        />
        <ErrorMessage> {errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmit}>
          Submit New Issue
          {isSubmit && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssue;
