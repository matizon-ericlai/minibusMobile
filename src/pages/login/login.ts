import { Component } from '@angular/core';
import { NavController, MenuController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';

import { DashboardPage } from '../dashboard/dashboard';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {

    data:any = {};

    constructor(public navCtrl: NavController, private menu: MenuController, public toastCtrl: ToastController, public http: HttpClient) {
        this.data.username = '';
        this.data.password = '';

        this.http = http;

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'my-auth-token'
            })
        };
    }

    ionViewDidEnter() {
        this.menu.swipeEnable(false);

        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(false, 'menu1');
    }

    ionViewWillLeave() {
        // Don't forget to return the swipe to normal, otherwise
        // the rest of the pages won't be able to swipe to open menu
        this.menu.swipeEnable(true);

        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(true, 'menu1');
    }

    login() {
        var apiUrl = "http://localhost:8880/api/Users/login";
        var isValid = true;
        var passwordHash = "";

        if(!validation.required(this.data.username)) {
            isValid = false;
            let toast = this.toastCtrl.create({
                message: 'Please input Username.',
                duration: 3000,
                position: 'top',
                cssClass: "alert-warning"
            });
            toast.present();
        }

        if(!validation.required(this.data.password)) {
            isValid = false;
            let toast = this.toastCtrl.create({
                message: 'Please input Password.',
                duration: 3000,
                position: 'top',
                cssClass: "alert-warning"
            });
            toast.present();
        }

        if(isValid) {
            passwordHash = Md5.hashStr(this.data.password);
            var postData = JSON.stringify({"username":this.data.username, "password":passwordHash});

            this.http.post(apiUrl, postData, this.httpOptions).subscribe(data => {
                console.log(data);
                //this.navCtrl.setRoot(DashboardPage);
            }, error => {
               console.log(error);
            });
        }
    }

}
