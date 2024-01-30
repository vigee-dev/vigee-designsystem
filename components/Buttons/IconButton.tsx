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
    "w-8 h-8 text-gray-400  cursor-pointer cursor-pointer transform ease-in-out duration-200";
  const iconHoverClasses =
    " w-8 h-8 text-primary cursor-pointer cursor-pointer transform ease-in-out duration-200";

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex items-center justify-center  rounded-full  "
    >
      {isHover
        ? getStyledIcon(iconHover, iconHoverClasses)
        : getStyledIcon(icon, iconClasses)}
    </div>
  );
};
