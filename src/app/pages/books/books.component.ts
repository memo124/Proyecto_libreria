import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { booksI } from 'src/app/interfaces/books.interface';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public books: booksI[] = [];
  public p: number = 1;
  constructor(private sanitizer: DomSanitizer, private bookS:BooksService) {

  }

  ngOnInit(): void {
    this.bookS.getBooks().subscribe(data=>{
      this.books = data
    })
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
