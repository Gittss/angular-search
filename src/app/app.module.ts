import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { historyReducer } from './state/history.reducers';

@NgModule({
  imports: [BrowserModule, StoreModule.forRoot({ app: historyReducer })],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
