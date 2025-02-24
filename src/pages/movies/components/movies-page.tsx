import { Separator } from "@/components/ui/separator";
import { MovieArtwork } from "./movie-artwork";
import { Sidebar } from "./sidebar";
import { watchNowMovies } from "../api/movies";

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
                    <div className="relative">
                      <div className="grid grid-cols-4 gap-4 pb-4">
                        {watchNowMovies.map((movie) => (
                          <MovieArtwork
                            key={movie.title}
                            movie={movie}
                            aspectRatio="portrait"
                          />
                        ))}
                      </div>
                    </div>
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
