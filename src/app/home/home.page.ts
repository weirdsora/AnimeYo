import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonSkeletonText, IonBadge} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../services/anime.s'; 
import { Anime } from '../interface/jikan.interf.js'; 
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonAvatar,
    IonSkeletonText, 
    IonBadge,
    CommonModule,
    RouterLink 
  ],
})
export class HomePage implements OnInit {
  
  topAnime: Anime[] = [];
  loading: boolean = true;

  private animeService = inject(AnimeService); 
  constructor() {}

  ngOnInit() {
    this.carregarTopAnime();
  }

  carregarTopAnime() {
    this.loading = true;
    this.animeService.getTopAnime().subscribe({
      next: (data: Anime[]) => {
        this.topAnime = data;
        this.loading = false;
      },
      error: (erro: any) => {
        console.error('Erro ao buscar animes', erro);
        this.loading = false;
      }
    });
  }
}