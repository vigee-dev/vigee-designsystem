import React from 'react';
import { motion } from 'framer-motion';
import { ColumnDef } from '@tanstack/react-table';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    reversed?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
    ring?: string;
    href?: string;
    className?: string;
    pending?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}
declare function Button({ children, onClick, variant, type, disabled, href, className, pending, }: ButtonProps): React.JSX.Element;

interface ButtonLoadingProps {
    children?: React.ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    text?: string;
}
declare function LoadingButton({ variant, children, text, }: ButtonLoadingProps): React.JSX.Element;

declare function FadeIn(props: React.ComponentPropsWithoutRef<typeof motion.div>): React.JSX.Element;

interface TooltipProps {
    message: string;
    children: React.ReactNode;
}
declare function Tooltip({ message, children }: TooltipProps): React.JSX.Element;

declare function CardSkeleton(): React.JSX.Element;

interface DataTableProps<TData, TValue> {
    title?: string;
    info?: string;
    search?: boolean;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageSize?: number;
    onNewClientClick?: (id: string) => void;
}
declare function TableSkeleton<TData, TValue>({ title, info, columns, data, search, pageSize, onNewClientClick, }: DataTableProps<TData, TValue>): React.JSX.Element;

interface PageHeaderProps {
    title: string;
    children?: React.ReactNode;
}
declare function PageHeader({ title, children }: PageHeaderProps): React.JSX.Element;

interface Props$1 {
    children: React.ReactNode;
}
declare function Container({ children }: Props$1): React.JSX.Element;

interface Props {
    children: React.ReactNode;
}
declare function RoundedContainer({ children }: Props): React.JSX.Element;

export { Button, CardSkeleton, Container, FadeIn, LoadingButton, PageHeader, RoundedContainer, TableSkeleton, Tooltip };
