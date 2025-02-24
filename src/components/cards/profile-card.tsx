import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Movie } from "@/pages/movies/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Card className="flex flex-col justify-between w-full max-w-xl hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-start gap-4 py-3 px-6">
        <Avatar className="h-16 w-16 mt-2">
          <AvatarImage src={movie.poster} alt={movie.title} />
          <AvatarFallback>{movie.title.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-xl">{movie.title}</CardTitle>
          <CardDescription className="mt-1 line-clamp-3">
            {movie.actor}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="@container pb-4 space-y-4 flex flex-col items-end justify-between">
        <p className="w-full @xs:width-[100px] text-sm text-gray-600 line-clamp-3">
          {movie.actor}
        </p>
      </CardContent>
    </Card>
  );
}
