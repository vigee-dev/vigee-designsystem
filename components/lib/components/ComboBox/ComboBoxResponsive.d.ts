type Status = {
    value: string;
    label: string;
};
interface ComboBoxProps {
    label: string;
    items: Status[];
    text: string;
    selectedStatus: Status | null;
    setSelectedStatus: (status: Status | null) => void;
}
export declare function ComboBoxResponsive({ label, items, text, selectedStatus, setSelectedStatus, }: ComboBoxProps): import("react/jsx-runtime").JSX.Element;
export {};
