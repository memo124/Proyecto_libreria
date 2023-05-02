import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  constructor(private sanitizer: DomSanitizer) {

  }

  public menus: object = [
    {option:"book"},
    {option:"author"},
    {option:"editorial"},
    {option:"employee"},
    {option:"genre"},
    {option:"rack"},
    {option:"reserve"},
    {option:"user"}
  ];

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
