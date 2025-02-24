import { cn } from "@/lib/utils";
import { Movie } from "../api/movies";

interface MovieArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  movie: Movie;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function MovieArtwork({
  movie,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: MovieArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <img
          src={movie.poster}
          alt={movie.title}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm pt-2">
        <h3 className="font-medium leading-none">{movie.title}</h3>
        <p className="text-xs text-muted-foreground">{movie.actor}</p>
      </div>
    </div>
  );
}
