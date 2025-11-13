import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs'; // <--- IMPORTANTE
import { Anime, JikanApiResponse } from '../interface/jikan.interf';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  // URL da API Jikan v4 para o Top de Animes
  private apiUrl = 'https://api.jikan.moe/v4/top/anime';

  constructor(private http: HttpClient) { }

  // Método para buscar os animes
  getTopAnime(): Observable<Anime[]> {
    return this.http.get<JikanApiResponse>(this.apiUrl).pipe(
      // Nós queremos apenas o array 'data' que vem na resposta
      map(response => response.data)
    );
  }
}