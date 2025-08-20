import { cn } from "@/util/cn";
import Link, { LinkProps } from "next/link";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  createElement,
  PropsWithChildren,
} from "react";

interface BaseButtonProps {
  as?: "button" | "a" | "div";
}

export type ButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type LinkButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & { href?: string };

export const Button = ({
  children,
  as,
  className,
  ...props
}: PropsWithChildren<ButtonProps | LinkButtonProps>) => {
  as = as ?? "button";

  const btnClass = cn(
    "h-8 px-3 rounded border border-foreground hover:bg-foreground hover:text-background transition cursor-pointer flex items-center gap-2",
    className
  );

  if (!!props.href) {
    return (
      <Link className={btnClass} {...(props as LinkButtonProps)}>
        {" "}
        {children}
      </Link>
    );
  }

  return createElement(as, { className: btnClass, ...props }, children);
};
