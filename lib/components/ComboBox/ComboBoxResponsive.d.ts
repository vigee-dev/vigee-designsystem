import * as React from "react";
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
export declare function ComboBoxResponsive({ label, items, text, selectedStatus, setSelectedStatus, }: ComboBoxProps): React.JSX.Element;
export {};
