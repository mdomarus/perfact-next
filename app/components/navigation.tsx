import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { forwardRef } from "react";

const GRAPHIQL = process.env.GRAPHIQL;

const projektySection: NavigationSection = {
  title: "Projekty",
  items: [
    {
      title: "Aktualne",
      href: "/projekty/aktualne",
    },
    {
      title: "Zrealizowane",
      href: "/projekty/zrealizowane",
    },
  ],
};

const fundacjaSection: NavigationSection = {
  title: "Fundacja",
  items: [
    {
      title: "Statut",
      href: "/fundacja/statut-fundacji",
    },
    {
      title: "Dane urzędowe",
      href: "/fundacja/dane-urzedowe",
    },
  ],
};

interface NavigationItem {
  title?: string;
  href?: Url;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

const NavigationLink = ({ item }: { item: NavigationItem }) => {
  if (!item?.href) {
    return null;
  }

  return (
    <li>
      <Link
        href={item.href}
        prefetch
        className="block my-1 hover:underline font-medium"
      >
        {item.title}
      </Link>
    </li>
  );
};

const Section = ({ section }: { section: NavigationSection }) => {
  return (
    <div className="flex flex-col">
      <div className="peer pb-1 mt-1">{section.title}</div>
      <ul className="md:invisible md:peer-hover:visible hover:visible">
        {section.items.map((item) => (
          <NavigationLink key={item.title} item={item} />
        ))}
      </ul>
    </div>
  );
};

const Navigation = () => {
  return (
    <nav>
      <MenuIcon className="block md:hidden" />
      <ul className="bg-white md:bg-transparent absolute md:relative flex flex-col md:flex-row gap-6 p-6 md:p-0">
        <NavigationLink item={{ title: "Aktualności", href: "/aktualnosci" }} />
        <Section section={fundacjaSection} />
        <Section section={projektySection} />
        <NavigationLink item={{ title: "GraphiQL", href: GRAPHIQL }} />
      </ul>
    </nav>
  );
};

export default Navigation;

const ListItem = forwardRef<
  React.ComponentRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  if (!props.href) return null;

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
