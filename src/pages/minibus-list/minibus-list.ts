import { Component } from '@angular/core';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';

import { LoginPage } from '../login/login';
import { MinibusDetailsPage } from '../minibus-details/minibus-details';

@Component({
    selector: 'page-minibus-list',
    templateUrl: 'minibus-list.html'
})

export class MinibusListPage {

    private apiUrl: string = "http://server.matizon.com:8080/api";
    //private apiUrl: string = "http://localhost:8880/api";
    private httpOptions: any;
    private accessToken: string;
    private minibusList: any;
    private receiveDataList: any;

    constructor(public navCtrl: NavController, private menu: MenuController, public toastCtrl: ToastController, public http: HttpClient, private storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'my-auth-token'
            })
        };
    }

    ionViewDidEnter() {
        const loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

        this.storage.get('access_token').then((val => {
            this.accessToken = val;
            let carDetailsUrl = this.apiUrl + "/CarDetails";
            let filter = "filter=" + encodeURI('{"where":{"active":true}, "order":"id ASC"}');
            let accessToken = "access_token=" + this.accessToken;
            this.http.get(carDetailsUrl + "?" + filter + "&" + accessToken).subscribe(carDetailsResponse => {
                this.minibusList = carDetailsResponse;
                if(this.minibusList.length > 0) {
                    let receiveDataUrl = this.apiUrl + "/ReceiveData";
                    for(let minibusData of this.minibusList) {
                        filter = "filter=" + encodeURI('{"where":{"car_details_id":'+minibusData.id+', "active":true}}');
                        this.http.get(receiveDataUrl + "?" + filter + "&" + accessToken).subscribe(receiveDataResponse => {
                            this.receiveDataList = receiveDataResponse;
                            if(this.receiveDataList.length > 0) {
                                for(let receiveData of this.receiveDataList) {
                                    minibusData.receive_date = receiveData.create_date;
                                }
                            }
                        });
                    }
                }
                loader.dismiss();
            }, error => {
                console.log(error);
                loader.dismiss();
            });
        }));
    }

    getItems(ev: any) {
        //const loader = this.loadingCtrl.create({
        //    content: "Please wait..."
        //});
        //loader.present();
        // Reset items back to all of the items
        let carDetailsUrl = this.apiUrl + "/CarDetails";
        let filter = "filter=" + encodeURI('{"where":{"active":true}, "order":"id ASC"}');
        let accessToken = "access_token=" + this.accessToken;
        this.http.get(carDetailsUrl + "?" + filter + "&" + accessToken).subscribe(carDetailsResponse => {
            this.minibusList = carDetailsResponse;
            if(this.minibusList.length > 0) {
                let receiveDataUrl = this.apiUrl + "/ReceiveData";
                for(let minibusData of this.minibusList) {
                    filter = "filter=" + encodeURI('{"where":{"car_details_id":'+minibusData.id+', "active":true}}');
                    this.http.get(receiveDataUrl + "?" + filter + "&" + accessToken).subscribe(receiveDataResponse => {
                        this.receiveDataList = receiveDataResponse;
                        if(this.receiveDataList.length > 0) {
                            for(let receiveData of this.receiveDataList) {
                                minibusData.receive_date = receiveData.create_date;
                            }
                        }
                    }, error => {
                        console.log(error);
                        //loader.dismiss();
                    });
                }
            }
            // set val to the value of the searchbar
            const val = ev.target.value;

            // if the value is an empty string don't filter the items
            if (val && val.trim() != '') {
                this.minibusList = this.minibusList.filter((item) => {
                    return (item.car_plate.toLowerCase().indexOf(val.toLowerCase()) > -1);
                })
            }
            //loader.dismiss();
        }, error => {
            console.log(error);
            //loader.dismiss();
        });
    }

    showDetails(carPlateId, carPlate) {
        this.storage.set('car_plate_id', carPlateId);
        this.storage.set('car_plate', carPlate);
        this.navCtrl.push(MinibusDetailsPage);
    }


    logout() {
        const prompt = this.alertCtrl.create({
            title: 'Logout',
            message: "Are you sure?",
            buttons: [
                {
                    text: 'No'
                },
                {
                    text: 'Yes',
                    handler: data => {
                        this.menu.close();
                        this.navCtrl.setRoot(LoginPage);
                    }
                }
            ]
        });
        prompt.present();
    }

}
