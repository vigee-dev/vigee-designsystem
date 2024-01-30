"use client";
import React, { useState, ReactElement } from "react";
interface IconProps {
  className?: string;
}

interface Props {
  icon?: ReactElement<IconProps>;
  iconHover?: ReactElement<IconProps>;
}

export const IconButton = ({ icon, iconHover }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const getStyledIcon = (
    iconElement: ReactElement<IconProps> | undefined,
    additionalClasses: string
  ) => {
    if (iconElement && React.isValidElement<IconProps>(iconElement)) {
      return React.cloneElement(iconElement, {
        className: `${iconElement.props.className || ""} ${additionalClasses}`,
      });
    }
    return iconElement;
  };

  const iconClasses =
    "text-gray-400 hover:bg-primary cursor-pointercursor-pointer";
  const iconHoverClasses =
    "text-primary hover:bg-primary cursor-pointercursor-pointer";

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex items-center justify-center w-8 h-8 p-2 rounded-full  transform ease-in-out duration-200"
    >
      {isHover
        ? getStyledIcon(iconHover, iconHoverClasses)
        : getStyledIcon(icon, iconClasses)}
    </div>
  );
};
