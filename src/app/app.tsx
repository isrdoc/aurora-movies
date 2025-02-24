import { ThemeProvider } from "@/components/theme/theme-provider";
import Layout from "./layout/layout";
import MoviesPage from "@/pages/movies/components/movies-page";

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
      <MoviesPage />
    </div>
  );
}
