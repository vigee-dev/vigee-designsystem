"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type Note = {
  urgent: string;
  important: string;
  other: string;
};

interface NoteProps {
  initialContent: Note;
}

const Note: React.FC<NoteProps> = ({ initialContent }) => {
  const [content, setContent] = useState({
    urgent: initialContent?.urgent,
    important: initialContent?.important,
    other: initialContent?.other,
  });

  const handleBlur = async (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const updatedContent = event.target.value;
    setContent((prev) => ({ ...prev, [event.target.name]: updatedContent }));

    // ACTION
  };

  return (
    <div className="col-span-1 bg-white p-4 rounded-md border border-slate-100 h-fit">
      <Tabs defaultValue="urgent">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-md pb-2">{"Note"}</h2>
          <TabsList>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
            <TabsTrigger value="important">Important</TabsTrigger>
            <TabsTrigger value="not-urgent">Autres</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="urgent">
          <Textarea
            className="w-full"
            value={content?.urgent || ""}
            onBlur={handleBlur}
            onChange={(event) =>
              setContent({ ...content, urgent: event.target.value })
            }
            minHeight="32"
          />
        </TabsContent>

        <TabsContent value="important">
          <Textarea
            className="w-full"
            value={content?.important || ""}
            onBlur={handleBlur}
            onChange={(event) =>
              setContent({ ...content, important: event.target.value })
            }
            minHeight="32"
          />
        </TabsContent>

        <TabsContent value="not-urgent">
          <Textarea
            className="w-full"
            value={content?.other || ""}
            onBlur={handleBlur}
            onChange={(event) =>
              setContent({ ...content, other: event.target.value })
            }
            minHeight="32"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Note;