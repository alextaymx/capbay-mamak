import clsx from "clsx";
import React, { DetailedHTMLProps } from "react";

interface Props extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Container({ className, ...props }: Props) {
  return <div className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}
