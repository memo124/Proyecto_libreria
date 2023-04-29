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

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path:'books',component: BooksComponent},
  {path:'editorial',component: EditorialComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'genre',component:GenreComponent},
  {path:'rack',component:RackComponent},
  {path:'reserve',component:ReserveComponent},
  {path:'user',component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,BooksComponent,EditorialComponent,EmployeeComponent,GenreComponent,RackComponent,ReserveComponent,UserComponent]

