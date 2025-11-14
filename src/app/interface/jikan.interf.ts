export interface Anime {
  mal_id: number;
  title: string;
  score: number;
  rank: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
}

export interface JikanApiResponse {
  data: Anime[];
}

export interface JikanApiSingleResponse {
  data: Anime;
}