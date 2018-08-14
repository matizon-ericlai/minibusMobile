import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { MinibusListPage } from '../pages/minibus-list/minibus-list';
import { MinibusDetailsPage } from '../pages/minibus-details/minibus-details';
import { MinibusHistoryDetailsPage } from '../pages/minibus-history-details/minibus-history-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
      MyApp,
      LoginPage,
      MinibusListPage,
      MinibusDetailsPage,
      MinibusHistoryDetailsPage
  ],
  imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot(),
      HttpClientModule,
      NgxDatatableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      LoginPage,
      MinibusListPage,
      MinibusDetailsPage,
      MinibusHistoryDetailsPage
  ],
  providers: [
      StatusBar,
      SplashScreen,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
