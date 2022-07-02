import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CityResultComponent } from './components/city-result/city-result.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    CityResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
