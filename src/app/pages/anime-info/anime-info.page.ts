import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonImg, IonButtons, IonBackButton, IonLabel, IonIcon
} from '@ionic/angular/standalone';
import { AnimeService } from '../../services/anime.s';
import { Anime } from '../../interface/jikan.interf';


@Component({
  selector: 'app-anime-info',
  templateUrl: './anime-info.page.html',
  styleUrls: ['./anime-info.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner,
    IonImg, IonButtons, IonBackButton, IonIcon, IonLabel
  ]
})
export class AnimeInfoPage implements OnInit {

  private route = inject(ActivatedRoute);
  private animeService = inject(AnimeService);

  public anime: Anime | null = null;
  public loading: boolean = true;
  public userRating: number | null = null;

  constructor() { }

async ngOnInit() {
  const animeId = this.route.snapshot.paramMap.get('id');

  if (!animeId) {
    console.error('ID do anime não encontrado na rota!');
    this.loading = false;
    return;
  }
  
  this.userRating = await this.animeService.getUserRating(Number(animeId));

  this.animeService.getAnimeById(animeId).subscribe({
    next: (data) => {
      this.anime = data;
      this.loading = false;
    },
    error: (err) => {
      console.error('Erro ao buscar detalhes do anime:', err);
      this.loading = false;
    }
  });
}

  async onStarClick(rating: number) {
    let newRating = rating;

    if (this.userRating === rating) {
        newRating = 0;
    }

    this.userRating = newRating;
    if (this.anime) {
      await this.animeService.saveUserRating(this.anime.mal_id, newRating);
      console.log(`Nota ${newRating} salva para o anime ${this.anime.title}`);
    }
  }
}
