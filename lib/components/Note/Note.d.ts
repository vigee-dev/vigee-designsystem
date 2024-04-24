import React from "react";
type Note = {
    urgent: string;
    important: string;
    other: string;
};
type Props = {
    initialContent: Note;
};
export default function Notes({ initialContent }: Props): React.JSX.Element;
export {};
