export interface booksI{
  idBook: number;
  bookName: string;
  publicationDate: string;
  totalPague: number;
  quantityStock: number;
  bookCover:string;
  statusBook: boolean;
  idAuthor:number;
  Author: authorBookI;
  idEditorial: number;
  Editorial:editorialBookI;
  idGenre: number;
  Genre:genreBookI;
  idRack: number;
  Rack:rackBookI;
}

export interface authorBookI{
  idAuthor:number;
  nameAuthor:string;
  countryBirth:string;
  dateBorn:string;
  statusAuthor:boolean;
}

export interface editorialBookI{
  idEditorial:number;
  nameEditorial:string;
  dateAdd:string;
  statusEditorial:boolean;
}

export interface genreBookI{
  idGenre:number;
  nameGenre:string;
  statusGenre:boolean;
}

export interface rackBookI{
  idRack:number;
  nameRack:string;
  levels:number;
  statusRack:boolean;
}
