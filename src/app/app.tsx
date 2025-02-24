import { ThemeProvider } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import Layout from "./layout/layout";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <Content />
      </Layout>
    </ThemeProvider>
  );
}

function Content() {
  return (
    <div className="px-4">
      <Button>Example Button</Button>
    </div>
  );
}
