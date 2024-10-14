import React from "react";

export const Card = ({
  title,
  children,
  className,
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <div className={`${className} border p-4 overflow-hidden`}>
      <h1 className="text-xl border-b">{title}</h1>
      <div className="h-full">{children}</div>
    </div>
  );
};
