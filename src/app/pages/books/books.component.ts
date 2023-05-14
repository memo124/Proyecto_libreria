import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { authorI } from 'src/app/interfaces/author.interface';
import { booksI } from 'src/app/interfaces/books.interface';
import { editorialI } from 'src/app/interfaces/editorial.interface';
import { genreI } from 'src/app/interfaces/genre.interface';
import { rackI } from 'src/app/interfaces/rack.interface';
import { AuthorService } from 'src/app/services/author/author.service';
import { BooksService } from 'src/app/services/books/books.service';
import { EditorialService } from 'src/app/services/editorial/editorial.service';
import { GenreService } from 'src/app/services/genre/genre.service';
import { RackService } from 'src/app/services/rack/rack.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public books: booksI[] = [];
  public p: number = 1;
  public filterName: string = "";
  public authors: authorI[] = [];
  public genres: genreI[] = [];
  public editorials: editorialI[] = [];
  public racks: rackI[] = [];

  constructor(private rackS:RackService,private editorialS:EditorialService,private sanitizer: DomSanitizer, private bookS:BooksService,private authorS:AuthorService,private genreS:GenreService) {

  }

  ngOnInit(): void {
    this.bookS.getBooks().subscribe(data=>{
      this.books = data
    })
  }

  getCombox(){
    this.authorS.getAuthor().subscribe(data=>{
      this.authors = data;
    });

    this.genreS.getGenres().subscribe(data=>{
      this.genres = data;
    });

    this.editorialS.getEditorial().subscribe(data=>{
      this.editorials = data;
    });

    this.rackS.getRacks().subscribe(data=>{
      this.racks = data;
    });
  }

  public previsualizacion?: string;
  public archivos: any = [];
  public img: string = "";
  public base64:any;
  capturarFile(event:any):any{
    this.img = event.target.files[0].name;
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    })
    this.archivos.push(archivoCapturado)
  }

  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        this.base64 = reader.result;
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

      return ;

    } catch (e) {
      return null;
    }
  })

}
