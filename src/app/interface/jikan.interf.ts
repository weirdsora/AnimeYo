// Interface para o item de anime individual
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

// Interface para a resposta completa da API
// A API Jikan v4 retorna os resultados dentro de um campo "data"
export interface JikanApiResponse {
  data: Anime[];
}

export interface JikanApiSingleResponse {
  data: Anime;
}