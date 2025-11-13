import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimeInfoPage } from './anime-info.page';

describe('AnimeInfoPage', () => {
  let component: AnimeInfoPage;
  let fixture: ComponentFixture<AnimeInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
