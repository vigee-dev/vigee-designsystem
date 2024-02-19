"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TextArea from "../Forms/TextArea";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";

type Note = {
  urgent: string;
  important: string;
  other: string;
};

type Props = {
  // form: UseFormReturn<Note>;
  initialContent: Note;
};

export default function Notes({ initialContent }: Props) {
  const form = useForm<Note>({
    defaultValues: {
      ...initialContent,
    },
  });

  const [content, setContent] = useState<Note>({
    urgent: initialContent?.urgent,
    important: initialContent?.important,
    other: initialContent?.other,
  });

  const handleBlur = async (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  type Category = {
    label: string;
    key: "urgent" | "important" | "other";
  };

  const noteCategories: Category[] = [
    { label: "Urgent", key: "urgent" },
    { label: "Important", key: "important" },
    { label: "Autres", key: "other" },
  ];

  const onSubmit = async (data: Note) => {
    console.log(data);
  };

  return (
    <div className="col-span-1 bg-white rounded-md h-fit">
      <Tabs defaultValue="urgent">
        <div className="flex justify-between items-center">
          <TabsList>
            {noteCategories.map(category => (
              <TabsTrigger key={category.key} value={category.key}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <Form {...form}>
          <form className="space-y-4 " id="form">
            {noteCategories.map(category => (
              <TabsContent key={category.key} value={category.key}>
                <TextArea
                  form={form}
                  name={category.key}
                  onBlur={handleBlur}
                  onChange={event =>
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
