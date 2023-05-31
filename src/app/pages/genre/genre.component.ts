import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { classHelper } from 'src/app/helpers/helper';
import { genreI } from 'src/app/interfaces/genre.interface';
import { GenreService } from 'src/app/services/genre/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  public genres: genreI[] = [];
  public filterName: string = "";
  public formGenre: FormGroup;
  public dataGenre: genreI;
  public idGenre: number = 0;
  public p: number = 1;


  constructor(public genreS:GenreService, private helper:classHelper){
    this.formGenre = new FormGroup({
      nameGenre: new FormControl(),
      statusGenre: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getAllGenres();
  }

  getDataGenres(idGenre: number):void {
    this.genreS.getGenreById(idGenre).subscribe(genres =>{
      let data = genres;
      this.idGenre = data.idGenre;
      this.formGenre.setValue({
        'nameGenre': data.nameGenre,
        'statusGenre': data.statusGenre
      });
    });
  }

  viewStatus(status:boolean){
    return this.helper.viewStatus(status)
  }

  activateGenre(idGenre:number): void {
    this.genreS.putActivateGenre(idGenre).subscribe(data => {
      this.helper.messageAlert('Success',data.response,'success', 'Accepted');
      this.getAllGenres();
    });
  }

  getAllGenres(): void {
    this.genreS.getGenres().subscribe(genres =>{
      this.genres = genres;
    });
  }

  sendForm(form:object):void {
    this.genreS.postGenre(form).subscribe(genres =>{
      this.helper.messageAlert('Success',genres.response,'success','Accepted');
      this.getAllGenres();
    });
  }

  inactivateGenre(idGenre:number): void {
    this.genreS.deleteGenre(idGenre).subscribe(data => {
      this.helper.messageAlert('Success',data.response,'success', 'Accepted');
      this.getAllGenres();
    });
}
}
