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


  constructor(public genreS:GenreService, private helper:classHelper){
    this.formGenre = new FormGroup({
      //idGenre: new  FormControl(),
      nameGenre: new  FormControl(),
      statusGenre: new  FormControl()
    })
  }

  ngOnInit(): void {
    this.getAllGenres();
    }

  getAllGenres():void {
    this.genreS.getGenres().subscribe(genres =>{
        this.genres = genres;
    });
  }

  getDataGenres(idGenre: number):void {
    this.genreS.getGenreById(idGenre).subscribe(genres =>{
      let data = genres[0];
      this.formGenre.setValue({
        'nameGenre': data.nameGenre,
        'statusGenre': data.statusGenre
      });
    });
  }
  sendForm(form:object): void {
    this.genreS.postGenre(form).subscribe(genres =>{
      this.helper.messageAlert('Success',genres.response, 'success', 'Accepted');
      this.getAllGenres();
    });
  }

  inactivateGenre(idGenre:number): void {
      this.genreS.deleteGenre(idGenre).subscribe(data => {
        this.helper.messageAlert('Success',data.response,'success', 'Accepted');
        this.getAllGenres();
      });
  }

  activateGenre(idGenre:number): void {
    this.genreS.putActivateGenre(idGenre).subscribe(data => {
      this.helper.messageAlert('Success',data.response,'success', 'Accepted');
      this.getAllGenres();
    });
  }
}
