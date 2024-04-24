import React from "react";
interface Item {
    value: string;
}
interface FilterableSelectProps {
    items: Item[];
    placeholder: string;
    query: string;
    preselected?: string;
}
declare const FilterableSelect: React.FC<FilterableSelectProps>;
export default FilterableSelect;
