import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout/layout";
import MoviesPage from "@/pages/movies/components/movies-page";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Content />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function Content() {
  return (
    <div className="px-4">
      <MoviesPage />
    </div>
  );
}
