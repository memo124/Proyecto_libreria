import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './pages/user/user.component';
import { BooksComponent } from './pages/books/books.component';
import { ReserveComponent } from './pages/reserve/reserve.component';
import { GenreComponent } from './pages/genre/genre.component';
import { EditorialComponent } from './pages/editorial/editorial.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { RackComponent } from './pages/rack/rack.component';
import { AuthorComponent } from './pages/author/author.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    BooksComponent,
    ReserveComponent,
    GenreComponent,
    EditorialComponent,
    EmployeeComponent,
    RackComponent,
    AuthorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
