import { DetailedHTMLProps, HTMLAttributes } from "react";

interface LogoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Logo(props: LogoProps) {
  return (
    <div {...props} className="">
      <img
        className="h-10 w-40 object-cover object-center"
        src="/assets/LOGO_CAPBAY_HORIZONTAL.png"
      />
    </div>
  );
}
