import EmptyIllustration from "../Illustration/EmptyIllustration";
import { ComponentType, ReactNode, ReactElement } from "react";
import { Error } from "../Errors/Error";
import { TableSkeleton } from "../Skeletons/Skeletons";

type ContentGuardProps = {
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  LoadingComponent?: ReactElement | ComponentType;
  ErrorComponent?: ReactElement | ComponentType;
  EmptyComponent?: ReactElement | ComponentType;
}

export function ContentGuard({
  children,
  isLoading = false,
  isError = false,
  isEmpty = false,
  LoadingComponent = <TableSkeleton />,
  ErrorComponent = <Error />,
  EmptyComponent = <EmptyIllustration />,
}: ContentGuardProps) {
  if (isLoading) {
    return typeof LoadingComponent === 'function' ? <LoadingComponent /> : LoadingComponent;
  }

  if (isError) {
    return typeof ErrorComponent === 'function' ? <ErrorComponent /> : ErrorComponent;
  }

  if (isEmpty) return typeof EmptyComponent === 'function' ? <EmptyComponent /> : EmptyComponent;

  return children;
}
