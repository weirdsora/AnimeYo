import { Component, OnInit, inject } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonLabel, IonAvatar, IonSkeletonText,
  IonBadge // <--- Importado
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../services/anime.s'; // <--- Mudou
import { Anime } from '../interface/jikan.interf.js'; // <--- Mudou

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonAvatar, IonSkeletonText,
    IonBadge, // <--- Adicionado
    CommonModule
  ],
})
export class HomePage implements OnInit {
  
  topAnime: Anime[] = []; // <--- Mudou
  loading: boolean = true;

  // Injeção do novo Serviço
  private animeService = inject(AnimeService); // <--- Mudou

  constructor() {}

  ngOnInit() {
    this.carregarTopAnime();
  }

  carregarTopAnime() {
    this.loading = true;
    this.animeService.getTopAnime().subscribe({ // <--- Mudou
      next: (data: Anime[]) => {
        this.topAnime = data; // <--- Mudou
        this.loading = false;
      },
      error: (erro: any) => {
        console.error('Erro ao buscar animes', erro);
        this.loading = false;
      }
    });
  }
}