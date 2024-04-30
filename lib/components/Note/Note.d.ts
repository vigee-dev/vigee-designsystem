type Note = {
    urgent: string;
    important: string;
    other: string;
};
type Props = {
    initialContent: Note;
};
export default function Notes({ initialContent }: Props): import("react/jsx-runtime").JSX.Element;
export {};
