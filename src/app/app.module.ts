import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ContactDialogComponent } from './shared/contact-dialog/contact-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { JwtserviceService } from './interceptors/jwtservice.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { EditRoomDialogComponent } from './shared/edit-room-dialog/edit-room-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EditRoomieDialogComponent } from './shared/edit-roomie-dialog/edit-roomie-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactDialogComponent,
    ConfirmationDialogComponent,
    EditRoomDialogComponent,
    EditRoomieDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [
    JwtserviceService,
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
