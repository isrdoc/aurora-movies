import { Separator } from "@/components/ui/separator";
import { MovieCard } from "./movies-table/movie-card";
import { Sidebar } from "./sidebar";
import { mockMovies } from "../api/movies";
import MoviesTable from "./movies-table/movies-table";

export default function MoviesPage() {
  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <img
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="h-full space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Browse
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Top picks for you. Updated daily
                        </p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <MoviesTable />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
