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

  // Variáveis para injeção
  private route = inject(ActivatedRoute);
  private animeService = inject(AnimeService);

  // Propriedades do componente
  public anime: Anime | null = null;
  public loading: boolean = true;
  public userRating: number | null = null;

  constructor() { }

  // Deve haver apenas UMA definição desta função no componente
async ngOnInit() {
  // 1. Pega o 'id' da URL
  const animeId = this.route.snapshot.paramMap.get('id');

  if (!animeId) {
    console.error('ID do anime não encontrado na rota!');
    this.loading = false;
    return;
  }
  
  // 2. Chama o serviço para CARREGAR A NOTA ANTES DE TUDO
  // Usamos 'await' porque getUserRating é uma Promise (função async)
  this.userRating = await this.animeService.getUserRating(Number(animeId));

  // 3. Chama o serviço para buscar os detalhes do anime (Observable)
  // Usamos '.subscribe()' porque getAnimeById retorna um Observable
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
        newRating = 0; // Se clicar na estrela atual, desmarca (nota 0)
    }

    this.userRating = newRating;
    
    // Salva a nova nota no Storage
    if (this.anime) {
      // O ID do anime é um número, então garantimos que seja Number
      await this.animeService.saveUserRating(this.anime.mal_id, newRating);
      console.log(`Nota ${newRating} salva para o anime ${this.anime.title}`);
    }
  }
}
