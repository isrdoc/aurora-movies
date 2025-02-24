import { ModeToggle } from "@/components/theme/mode-toggle";
import { useTheme } from "@/components/theme/theme-provider";
import logoDark from "./logo.svg";
import logoLight from "./logo-light.svg";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Header />
      {children}
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between w-full p-4">
      <div className="flex items-baseline gap-2 pl-2 pt-1">
        <Logo />
        <h1 className="text-2xl font-bold leading-none">Movies</h1>
      </div>
      <ModeToggle />
    </div>
  );
}

function Logo() {
  const { theme } = useTheme();
  return (
    <img
      src={theme === "dark" ? logoDark : logoLight}
      alt="Aurora Movies"
      className="h-10"
    />
  );
}
