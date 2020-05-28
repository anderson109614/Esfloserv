import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { Network } from '@ionic-native/network/ngx';
import {DetallePageModule} from './detalle/detalle.module';
import {DetallePage} from './detalle/detalle.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
@NgModule({
  
  declarations: [AppComponent],
  entryComponents: [DetallePage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,DetallePageModule],
  providers: [
    StatusBar,
    Network,
    CallNumber ,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
