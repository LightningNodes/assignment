"use client";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useAuthContext } from "@/store/auth";
import { Button } from "./ui/button";
import logout from "@/lib/firebase/logout";

const options: { title: string; href: string; description: string }[] = [
  {
    title: "Sign in",
    href: "/auth/signin",
    description: "Login to existing account",
  },
  {
    title: "Sign up",
    href: "/auth/signup",
    description: "Create new account",
  },
];

export function Navigation() {
  const { user } = useAuthContext();
  return (
    <NavigationMenu className="border-b">
      <NavigationMenuList>
        {!user ? (
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[250px] gap-3 p-4 md:grid-cols-1">
                {options.map((option) => (
                  <ListItem
                    key={option.title}
                    title={option.title}
                    href={option.href}
                  >
                    {option.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Button variant="ghost" onClick={logout}>
              Log out
            </Button>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
