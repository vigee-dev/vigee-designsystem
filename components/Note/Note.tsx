"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TextArea from "../Forms/TextArea";
import { UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";

type Note = {
  urgent: string;
  important: string;
  other: string;
};

type Props = {
  form: UseFormReturn<Note>;
  initialContent: Note;
  onSubmit: () => Promise<void>;
};

export default function Note({ form, initialContent, onSubmit }: Props) {
  const [content, setContent] = useState<Note>({
    urgent: initialContent?.urgent,
    important: initialContent?.important,
    other: initialContent?.other,
  });

  const handleBlur = async (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const noteCategories = [
    { label: "Urgent", key: "urgent" },
    { label: "Important", key: "important" },
    { label: "Autres", key: "other" },
  ];

  return (
    <div className="col-span-1 bg-white rounded-md h-fit">
      <Tabs defaultValue="urgent">
        <div className="flex justify-between items-center">
          <TabsList>
            {noteCategories.map((category) => (
              <TabsTrigger key={category.key} value={category.key}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 "
            id="form"
          >
            {noteCategories.map((category) => (
              <TabsContent key={category.key} value={category.key}>
                <TextArea
                  form={form}
                  name={category.key}
                  onBlur={handleBlur}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      [category.key]: event.target.value,
                    })
                  }
                  minHeight="96"
                />
              </TabsContent>
            ))}
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
