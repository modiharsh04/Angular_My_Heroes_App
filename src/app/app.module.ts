import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app-component/app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroModule } from './hero-app/hero.module';
import { FooterComponent } from './shared/common/footer/footer.component';
import { HeaderComponent } from './shared/common/header/header.component';
import { SnackBarHelper } from './shared/helpers/snackBar.service'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    HeroModule,
    BrowserAnimationsModule
  ],
  providers: [SnackBarHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
