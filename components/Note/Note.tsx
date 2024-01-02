"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TextArea from "../Forms/TextArea";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { z } from "zod";

type Note = {
  urgent: string;
  important: string;
  other: string;
};

type Props = {
  form: UseFormReturn<Note>;
  initialContent: Note;
};

export default function Note({ form, initialContent }: Props) {
  const [content, setContent] = useState<Note>({
    urgent: initialContent?.urgent,
    important: initialContent?.important,
    other: initialContent?.other,
  });

  const handleBlur = async (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setContent((prev) => ({ ...prev, [name]: value }));
    // ACTION
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

        {noteCategories.map((category) => (
          <TabsContent key={category.key} value={category.key}>
            <TextArea
              form={form}
              name={category.key}
              onBlur={handleBlur}
              onChange={(event) =>
                setContent({ ...content, [category.key]: event.target.value })
              }
              minHeight="96"
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
