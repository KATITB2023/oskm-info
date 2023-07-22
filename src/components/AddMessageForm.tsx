/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, Flex, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Controller,
  useForm,
  type FieldErrors,
  type SubmitHandler
} from "react-hook-form";
import { P, match } from "ts-pattern";
import { z } from "zod";
import useEmit from "~/hooks/useEmit";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
}

const schema = z.object({
  text: z.string().min(1)
});

type FormValues = z.infer<typeof schema>;

const AddMessageForm: React.FC<{
  onMessagePost: () => void;
  chatHistory: ChatMessage[];
}> = ({ onMessagePost, chatHistory }) => {
  const { data: session } = useSession({ required: true });

  const messageEmit = useEmit("message", {
    onSuccess: () => {
      reset();
      onMessagePost();
      return;
    },
  });

  // Form hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: ""
    }
  });

  // React hooks
  const [enterToPostMessage, setEnterToPostMessage] = useState(true);

  // Event handlers
  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    event?.preventDefault();
    console.log("Submitting");
    const history = "";
    chatHistory.forEach((chat) => {
      history.concat(chat.message, "\n");
    });
    messageEmit.mutate({
      questionId: uuidv4(),
      message: data.text,
      chatHistory: history
    });
  };

  const onKeyDownCustom: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === "Shift") setEnterToPostMessage(false);

    if (event.key === "Enter" && enterToPostMessage)
      void handleSubmit(onSubmit)(event);
  };

  const onKeyUpCustom: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === "Shift") setEnterToPostMessage(true);
  };

  const onBlurCustom: React.FocusEventHandler<HTMLTextAreaElement> = () => {
    setEnterToPostMessage(true);
  };

  const handleFormErrors = (errors: FieldErrors<FormValues>) =>
    match(errors)
      .with({ text: P.not(undefined) }, () => (
        <p style={{ color: "red" }}>Text is required</p>
      ))
      .otherwise(() => null);

  if (!session)
    return (
      <div className='flex w-full justify-between rounded bg-gray-800 px-3 py-2 text-lg text-gray-200'>
        <p className='font-bold'>
          You have to{" "}
          <button
            className='inline font-bold underline'
            onClick={() => void signIn()}
          >
            sign in
          </button>{" "}
          to write.
        </p>
        <button
          onClick={() => void signIn()}
          data-testid='signin'
          className='h-full rounded bg-indigo-500 px-4'
        >
          Sign In
        </button>
      </div>
    );

  return (
    <Flex
      as={"form"}
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      w={"full"}
    >
      <Flex as={"fieldset"} disabled={messageEmit.isLoading} w={"full"}>
        <Flex w={"full"} grow={"1"} columnGap={"1rem"}>
          <Controller
            name='text'
            control={control}
            render={({ field }) => (
              <Textarea
                rows={1}
                bg={"white"}
                color={"black"}
                autoFocus
                onKeyDown={onKeyDownCustom}
                onKeyUp={onKeyUpCustom}
                {...field}
                onBlur={onBlurCustom}
              />
            )}
          ></Controller>
          <Button
            type='submit'
            rounded={"lg"}
            px={"1rem"}
            py={"0.25rem"}
            bg={"#6366f1"}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
      {handleFormErrors(errors)}
    </Flex>
  );
};

export default AddMessageForm;
