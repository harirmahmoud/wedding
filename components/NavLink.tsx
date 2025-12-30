// ./components/NavLink.tsx
"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string; // pending can be used for custom logic
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName, href, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href.toString();

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          className,
          isActive && activeClassName
          // pendingClassName logic can be implemented if you want
        )}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
