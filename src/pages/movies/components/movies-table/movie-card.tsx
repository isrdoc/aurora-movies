import { cn } from "@/utils/style-utils";
import { Movie } from "../../types";
import { StarIcon } from "lucide-react";

interface MovieCardProps extends React.HTMLAttributes<HTMLDivElement> {
  movie: Movie;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="overflow-hidden rounded-md">
        <img
          src={movie.image_url}
          alt={movie.title}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            "aspect-[3/4]"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-2">
          <h3 className="font-medium leading-none">{movie.title}</h3>
          <div className="flex items-center gap-2">
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <p className="text-xs text-muted-foreground">{movie.rating}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{movie.description}</p>
      </div>
    </div>
  );
}
