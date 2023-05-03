import { Component, OnInit } from '@angular/core';
import { genreI } from 'src/app/interfaces/genre.interface';
import { GenreService } from 'src/app/services/genre/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  public genres: genreI[] = [];

  constructor(public genreS:GenreService){}

  ngOnInit(): void {
    this.genreS.getGenres().subscribe(genres =>{
      this.genres = genres;
    });
  }

}
