import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Anime, JikanApiResponse, JikanApiSingleResponse} from '../interface/jikan.interf';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private baseUrl = 'https://api.jikan.moe/v4';
  private _storage: Storage | null = null;
  private readonly RATING_KEY = 'animeRatings';

  constructor(private http: HttpClient, private storage: Storage) {this.init();}
  
  async init() {
    this._storage = await this.storage.create();
  }

  async saveUserRating(animeId: number, rating: number): Promise<void> {
    const storedRatings = await this._storage?.get(this.RATING_KEY) || {};
    
    storedRatings[animeId] = rating;
    await this._storage?.set(this.RATING_KEY, storedRatings);
  }

  async getUserRating(animeId: number): Promise<number | null> {
    const storedRatings = await this._storage?.get(this.RATING_KEY) || {};
    return storedRatings[animeId] || null;}

  getTopAnime(): Observable<Anime[]> {
    const url = `${this.baseUrl}/top/anime`;
    return this.http.get<JikanApiResponse>(url).pipe(
      map(response => response.data)
    );
  }

  getAnimeById(id: string): Observable<Anime> {
    const url = `${this.baseUrl}/anime/${id}`;
    return this.http.get<JikanApiSingleResponse>(url).pipe(
      map(response => response.data)
    );
  }
}