import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BooksComponent } from './pages/books/books.component';
import { EditorialComponent } from './pages/editorial/editorial.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { GenreComponent } from './pages/genre/genre.component';
import { RackComponent } from './pages/rack/rack.component';
import { ReserveComponent } from './pages/reserve/reserve.component';
import { UserComponent } from './pages/user/user.component';
import { AuthorComponent } from './pages/author/author.component';
import { CommonModule } from '@angular/common';
import { GenrePipe } from './pipes/genre/genre.pipe';
import { AuthorPipe } from './pipes/author/author.pipe';
import { BookPipe } from './pipes/book/book.pipe';
import { EditorialPipe } from './pipes/editorial/editorial.pipe';
import { EmployeePipe } from './pipes/employee/employee.pipe';
import { RackPipe } from './pipes/rack/rack.pipe';
import { ReservePipe } from './pipes/reserve/reserve.pipe';
import { UserPipe } from './pipes/user/user.pipe';
import { LoginGuard } from './pages/login/login.guard';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component: LoginComponent, canActivate:[LoginGuard]},
  {path:'book',component: BooksComponent,canActivate:[LoginGuard]},
  {path:'editorial',component: EditorialComponent,canActivate:[LoginGuard]},
  {path:'employee',component:EmployeeComponent,canActivate:[LoginGuard]},
  {path:'genre',component:GenreComponent,canActivate:[LoginGuard]},
  {path:'rack',component:RackComponent,canActivate:[LoginGuard]},
  {path:'reserve',component:ReserveComponent,canActivate:[LoginGuard]},
  {path:'user',component:UserComponent,canActivate:[LoginGuard]},
  {path:'author',component:AuthorComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,BooksComponent,AuthorComponent,EditorialComponent,EmployeeComponent,GenreComponent,RackComponent,ReserveComponent,UserComponent]
export const pipes = [GenrePipe,AuthorPipe,BookPipe,EditorialPipe,EmployeePipe,RackPipe,ReservePipe,UserPipe]
