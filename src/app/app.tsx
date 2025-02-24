import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Content />
    </ThemeProvider>
  );
}

function Content() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Aurora Movies</h1>
        <ModeToggle />
      </div>
      <Button>Example Button</Button>
    </div>
  );
}
