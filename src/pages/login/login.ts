import { Component } from '@angular/core';
import { NavController, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';

import { MinibusListPage } from '../minibus-list/minibus-list';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {

    private apiUrl: string = "http://server.matizon.com:8080/api";
    //private apiUrl: string = "http://localhost:8880/api";
    private httpOptions: any;
    private data:any = {};
    private isValid: boolean;
    private haveError: boolean;
    private passwordHash: any;
    private loginData: any;
    private roleData: any;

    constructor(public navCtrl: NavController, private menu: MenuController, public toastCtrl: ToastController, public http: HttpClient, private storage: Storage, public loadingCtrl: LoadingController) {
        this.data.username = '';
        this.data.password = '';

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
        //this.menu.swipeEnable(true);

        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(true, 'menu1');
    }

    login() {
        this.haveError = false;
        this.isValid = true;

        var validation =  {
            required: function(input) {
                if (input == null || input == "" || input == undefined)
                    return false;
                else
                    return true;
            }
        };

        if(!validation.required(this.data.username)) {
            if(!this.haveError) {
                this.haveError = true;
                this.isValid = false;
                const toast = this.toastCtrl.create({
                    message: 'Please input Username.',
                    duration: 3000,
                    position: 'top',
                    cssClass: "alert-warning"
                });
                toast.present();
            }
        }

        if(!validation.required(this.data.password)) {
            if(!this.haveError) {
                this.haveError = true;
                this.isValid = false;
                const toast = this.toastCtrl.create({
                    message: 'Please input Password.',
                    duration: 3000,
                    position: 'top',
                    cssClass: "alert-warning"
                });
                toast.present();
            }
        }

        if(this.isValid) {
            const loader = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader.present();

            this.passwordHash = Md5.hashStr(this.data.password);
            let postData = JSON.stringify({"username":this.data.username, "password":this.passwordHash});
            let loginUrl = this.apiUrl + "/Users/login";
            this.http.post(loginUrl, postData, this.httpOptions).subscribe(loginResponse => {
                this.loginData = loginResponse;
                let roleMappingUrl = this.apiUrl + "/RoleMappings/" + this.loginData.userId;
                this.http.get(roleMappingUrl).subscribe(mappingResponse => {
                    this.roleData = mappingResponse;
                    loader.dismiss();
                    this.storage.set('access_token', this.loginData.id);
                    this.navCtrl.setRoot(MinibusListPage);
                });
            }, error => {
                const toast = this.toastCtrl.create({
                    message: 'Username or Password is not correct.',
                    duration: 3000,
                    position: 'top',
                    cssClass: "alert-error"
                });
                toast.present();
                loader.dismiss();
            });
        }
    }

}
