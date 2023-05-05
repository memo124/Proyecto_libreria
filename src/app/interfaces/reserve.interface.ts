export interface reserveI{
  idReserve: number;
  dateReservation: string;
  statusReserve: boolean;
  idBook: number;
  Book: bookReserveI;
  idEmploye:number;
  Employee: employeeReserveI;
  idUser:number;
  User:userReserveI;
}

export interface bookReserveI{
  bookName:string;
}

export interface employeeReserveI{
  nameEmployee:string;
}

export interface userReserveI{
  nameUser:string;
}
