import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { classHelper } from 'src/app/helpers/helper';
import { authorI } from 'src/app/interfaces/author.interface';
import { booksI } from 'src/app/interfaces/books.interface';
import { editorialI } from 'src/app/interfaces/editorial.interface';
import { employeeI } from 'src/app/interfaces/employee.interface';
import { genreI } from 'src/app/interfaces/genre.interface';
import { rackI } from 'src/app/interfaces/rack.interface';
import { userI } from 'src/app/interfaces/user.interface';
import { AuthorService } from 'src/app/services/author/author.service';
import { BooksService } from 'src/app/services/books/books.service';
import { EditorialService } from 'src/app/services/editorial/editorial.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { GenreService } from 'src/app/services/genre/genre.service';
import { RackService } from 'src/app/services/rack/rack.service';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public books: booksI[] = [];
  public dataBookReserve: booksI[] = [];
  public dataBook: booksI;
  public p: number = 1;
  public filterName: string = "";
  public authors: authorI[] = [];
  public genres: genreI[] = [];
  public editorials: editorialI[] = [];
  public employees: employeeI[] =[];
  public racks: rackI[] = [];
  public formBook: FormGroup;
  public carnet: number;
  public cbEmployees: number;
  public userData: userI[] = [];
  public previsualizacion?: string;
  public idBook: number = 0;
  public archivos: any = [];
  public img: string = "";
  public base64:any;
  public idEmploye: number = 0;
  public reserve: FormGroup;

  constructor(private reserveS:ReserveService,private employeeS:EmployeeService,private userS:UserService,private helper:classHelper,private rackS:RackService,private editorialS:EditorialService,private sanitizer: DomSanitizer, private bookS:BooksService,private authorS:AuthorService,private genreS:GenreService) {
    this.reserve = new FormGroup({
      idEmployee: new FormControl()
    });

    this.formBook = new FormGroup({
      bookName: new FormControl(),
      publicationDate: new FormControl(),
      totalPague: new FormControl(),
      quantityStock: new FormControl(),
      idAuthor: new FormControl(),
      idEditorial: new FormControl(),
      idGenre: new FormControl(),
      idRack: new FormControl()
    });
  }

  sendReserve(idUser:number,idBook:number,idEmployee:number):void {
    let array = {'idUser':idUser, 'idBook':idBook, 'idEmployee':idEmployee};
    this.reserveS.postReserve(array).subscribe(data=>{
      this.helper.messageAlert('Successfully',data.response,'success','Accepted');
    });
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(){
    this.bookS.getBooks().subscribe(data=>{
      this.books = data
    });
  }

  getDataBookReservate(idBook:number){
    this.bookS.getBookById(idBook).subscribe(data=>{
      this.dataBookReserve  = data;
      this.idBook = data[0].idBook;
    });
  }

  getAllEmployees(){
    this.employeeS.getEmployees().subscribe(data=>{
        this.employees = data;
    });
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

  sendForm(form:object){
    if (this.idBook != 0) {
      this.bookS.putBook(this.idBook,form).subscribe(data=>{
        this.helper.messageAlert('Successfully',data.response,'success','Accepted');
        this.getAllBooks();
      });
    } else {
      this.bookS.postBook(form).subscribe(data=>{
        this.helper.messageAlert('Successfully',data.response,'success','Accepted');
        this.getAllBooks();
      });
    }
  }

  searchUser(){
    this.userS.getUserById(this.carnet).subscribe(data=>{
      this.userData = data;
      this.getAllEmployees();
    });
  }

  inactivateAuthor(idBook: number) {
    this.bookS.deleteBook(idBook).subscribe(()=>{
      this.getAllBooks();
    });
  }

  activateAuthor(idBook: number){
    this.bookS.putBookActivate(idBook).subscribe(()=>{
      this.getAllBooks();
    });
  }

  getDataBook(idBook:number){
    this.bookS.getBookById(idBook).subscribe(data=>{
       this.dataBook = data[0];
       this.getCombox();
       this.idBook = this.dataBook.idBook;
       this.formBook.setValue({
        'bookName': this.dataBook.bookName,
        'publicationDate': this.dataBook.publicationDate,
        'totalPague': this.dataBook.totalPague,
        'quantityStock': this.dataBook.quantityStock,
        'idAuthor': this.dataBook.idAuthor,
        'idEditorial': this.dataBook.idEditorial,
        'idGenre': this.dataBook.idGenre,
        'idRack': this.dataBook.idRack
       });
    });
  }

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
