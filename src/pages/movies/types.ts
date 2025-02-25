export interface Movie {
  id: string;
  title: string;
  description: string;
  image_url: string;
  rating: number;
}

export interface MovieResponse {
  items: Movie[];
  total: number;
}
