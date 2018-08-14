import { Component } from '@angular/core';
import { NavController, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';

import { MinibusHistoryDetailsPage } from '../minibus-history-details/minibus-history-details';

@Component({
    selector: 'page-minibus-details',
    templateUrl: 'minibus-details.html'
})

export class MinibusDetailsPage {

    private apiUrl: string = "http://server.matizon.com:8080/api";
    //private apiUrl: string = "http://localhost:8880/api";
    private httpOptions: any;
    private accessToken: string;
    private showView: string;
    private noRecord: string = "table-row";
    private havePagination: string = "none";
    private TODAY: any;
    private ONE_MONTH: any;
    private carPlateId: string;
    private carPlate: string;
    private search_create_date: any;
    private receiveDataList: any;
    private receiveCurrentDataList: any;
    private receiveCurrentData: any;
    private receiveTime: string;
    private speed: string;
    private batteryActualCurrent: string;
    private batteryVoltage: string;
    private cellTemperature: string;
    private hvilFault: string;
    private isolationFaultState: string;
    private bmsActualSoc: string;
    private statusOfHealth: string;
    private isolationResistance: string;
    private batteryState: string;
    private severityIndicator: string;
    private doorStatus: string;
    private gear: string;
    private gearboxFault: string;
    private motorTemperature: string;
    private ipuTemperature: string;
    private ipuFailGrade: string;
    private motorFailGrade: string;
    private coolingSystemFault: string;
    private seatStatus1: string;
    private seatStatus2: string;
    private seatStatus3: string;
    private seatStatus4: string;
    private seatStatus5: string;
    private seatStatus6: string;
    private seatStatus7: string;
    private seatStatus8: string;
    private seatStatus9: string;
    private seatStatus10: string;
    private seatStatus11: string;
    private seatStatus12: string;
    private seatStatus13: string;
    private seatStatus14: string;
    private seatStatus15: string;
    private seatStatus16: string;
    private seatStatus17: string;
    private seatStatus18: string;
    private seatStatus19: string;
    private seatStatus20: string;
    private pageLimit: number = 10;
    private skipLimit: number = 0;
    private currentItem: number;
    private totalItems: number = 0;
    private currentPage: number = 1;
    private previous: string;
    private next: string;

    constructor(public navCtrl: NavController, private menu: MenuController, public toastCtrl: ToastController, public http: HttpClient, private storage: Storage, public loadingCtrl: LoadingController) {

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'my-auth-token'
            })
        };
    }

    ionViewDidLoad() {
        const loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

        this.showView = "current";

        this.storage.get('access_token').then((val => {
            this.accessToken = val;
            this.storage.get('car_plate_id').then((val => {
                this.carPlateId = val;
                this.storage.get('car_plate').then((val => {
                    this.carPlate = val;
                }));
                this.TODAY = new Date();
                this.ONE_MONTH = 30 * 24 * 60 * 60 * 1000;  // Month in milliseconds
                this.search_create_date = this.TODAY - this.ONE_MONTH;
                let receiveDataUrl = this.apiUrl + "/ReceiveData";
                let filter = "filter=" + encodeURI('{"where":{"car_details_id":'+this.carPlateId+'}, "order":"id DESC", "limit":1, "include":["CarDetails"]}');
                let accessToken = "access_token=" + this.accessToken;

                this.http.get(receiveDataUrl + "?" + filter + "&" + accessToken).subscribe(receiveCurrentDataResponse => {
                    this.receiveCurrentDataList = receiveCurrentDataResponse;
                    if(this.receiveCurrentDataList.length > 0) {
                        this.receiveCurrentData = this.receiveCurrentDataList[0];
                        this.receiveTime = this.receiveCurrentData.create_date;
                        this.speed = this.receiveCurrentData.speed;
                        this.batteryActualCurrent = this.receiveCurrentData.battery_actual_current;
                        this.batteryVoltage = this.receiveCurrentData.battery_voltage;
                        this.cellTemperature = this.receiveCurrentData.cell_temperature;
                        this.hvilFault = this.receiveCurrentData.hvil_fault;
                        this.isolationFaultState = this.receiveCurrentData.Isolation_fault_state;
                        this.bmsActualSoc = this.receiveCurrentData.bms_actual_soc;
                        this.statusOfHealth = this.receiveCurrentData.status_of_health;
                        this.isolationResistance = this.receiveCurrentData.Isolation_resistance;
                        this.batteryState = this.receiveCurrentData.battery_state;
                        this.severityIndicator = this.receiveCurrentData.severity_indicator;
                        this.doorStatus = this.receiveCurrentData.door_status;
                        this.gear = this.receiveCurrentData.gear;
                        this.gearboxFault = this.receiveCurrentData.gearbox_fault;
                        this.motorTemperature = this.receiveCurrentData.motor_temperature;
                        this.ipuTemperature = this.receiveCurrentData.ipu_temperature;
                        this.ipuFailGrade = this.receiveCurrentData.ipu_fail_grade;
                        this.motorFailGrade = this.receiveCurrentData.motor_fail_grade;
                        this.coolingSystemFault = this.receiveCurrentData.cooling_system_fault;

                        var seat_status_1_1 = this.receiveCurrentData.seat_status_1.substring(0,1);
                        var seat_status_2_1 = this.receiveCurrentData.seat_status_2.substring(0,1);

                        if(seat_status_2_1 == "0") {
                            if(seat_status_1_1 == "1") {
                                this.seatStatus1 = "";
                            } else if(seat_status_1_1 == "0") {
                                this.seatStatus1 = "seat-status-warning";
                            }
                        } else if(seat_status_2_1 == "1") {
                            if(seat_status_1_1 == "1") {
                                this.seatStatus1 = "seat-status-danger";
                            } else if(seat_status_1_1 == "0") {
                                this.seatStatus1 = "seat-status-success";
                            }
                        }

                        var seat_status_1_2 = this.receiveCurrentData.seat_status_1.substring(1,2);
                        var seat_status_2_2 = this.receiveCurrentData.seat_status_2.substring(1,2);

                        if(seat_status_2_2 == "0") {
                            if(seat_status_1_2 == "1") {
                                this.seatStatus2 = "";
                            } else if(seat_status_1_2 == "0") {
                                this.seatStatus2 = "seat-status-warning";
                            }
                        } else if(seat_status_2_2 == "1") {
                            if(seat_status_1_2 == "1") {
                                this.seatStatus2 = "seat-status-danger";
                            } else if(seat_status_1_2 == "0") {
                                this.seatStatus2 = "seat-status-success";
                            }
                        }

                        var seat_status_1_3 = this.receiveCurrentData.seat_status_1.substring(2,3);
                        var seat_status_2_3 = this.receiveCurrentData.seat_status_2.substring(2,3);

                        if(seat_status_2_3 == "0") {
                            if(seat_status_1_3 == "1") {
                                this.seatStatus3 = "";
                            } else if(seat_status_1_3 == "0") {
                                this.seatStatus3 = "seat-status-warning";
                            }
                        } else if(seat_status_2_3 == "1") {
                            if(seat_status_1_3 == "1") {
                                this.seatStatus3 = "seat-status-danger";
                            } else if(seat_status_1_3 == "0") {
                                this.seatStatus3 = "seat-status-success";
                            }
                        }

                        var seat_status_1_4 = this.receiveCurrentData.seat_status_1.substring(3,4);
                        var seat_status_2_4 = this.receiveCurrentData.seat_status_2.substring(3,4);

                        if(seat_status_2_4 == "0") {
                            if(seat_status_1_4 == "1") {
                                this.seatStatus4 = "";
                            } else if(seat_status_1_4 == "0") {
                                this.seatStatus4 = "seat-status-warning";
                            }
                        } else if(seat_status_2_4 == "1") {
                            if(seat_status_1_4 == "1") {
                                this.seatStatus4 = "seat-status-danger";
                            } else if(seat_status_1_4 == "0") {
                                this.seatStatus4 = "seat-status-success";
                            }
                        }

                        var seat_status_1_5 = this.receiveCurrentData.seat_status_1.substring(4,5);
                        var seat_status_2_5 = this.receiveCurrentData.seat_status_2.substring(4,5);

                        if(seat_status_2_5 == "0") {
                            if(seat_status_1_5 == "1") {
                                this.seatStatus5 = "";
                            } else if(seat_status_1_5 == "0") {
                                this.seatStatus5 = "seat-status-warning";
                            }
                        } else if(seat_status_2_5 == "1") {
                            if(seat_status_1_5 == "1") {
                                this.seatStatus5 = "seat-status-danger";
                            } else if(seat_status_1_5 == "0") {
                                this.seatStatus5 = "seat-status-success";
                            }
                        }

                        var seat_status_1_6 = this.receiveCurrentData.seat_status_1.substring(5,6);
                        var seat_status_2_6 = this.receiveCurrentData.seat_status_2.substring(5,6);

                        if(seat_status_2_6 == "0") {
                            if(seat_status_1_6 == "1") {
                                this.seatStatus6 = "";
                            } else if(seat_status_1_6 == "0") {
                                this.seatStatus6 = "seat-status-warning";
                            }
                        } else if(seat_status_2_6 == "1") {
                            if(seat_status_1_6 == "1") {
                                this.seatStatus6 = "seat-status-danger";
                            } else if(seat_status_1_6 == "0") {
                                this.seatStatus6 = "seat-status-success";
                            }
                        }

                        var seat_status_1_7 = this.receiveCurrentData.seat_status_1.substring(6,7);
                        var seat_status_2_7 = this.receiveCurrentData.seat_status_2.substring(6,7);

                        if(seat_status_2_7 == "0") {
                            if(seat_status_1_7 == "1") {
                                this.seatStatus7 = "";
                            } else if(seat_status_1_7 == "0") {
                                this.seatStatus7 = "seat-status-warning";
                            }
                        } else if(seat_status_2_7 == "1") {
                            if(seat_status_1_7 == "1") {
                                this.seatStatus7 = "seat-status-danger";
                            } else if(seat_status_1_7 == "0") {
                                this.seatStatus7 = "seat-status-success";
                            }
                        }

                        var seat_status_1_8 = this.receiveCurrentData.seat_status_1.substring(7,8);
                        var seat_status_2_8 = this.receiveCurrentData.seat_status_2.substring(7,8);

                        if(seat_status_2_8 == "0") {
                            if(seat_status_1_8 == "1") {
                                this.seatStatus8 = "";
                            } else if(seat_status_1_8 == "0") {
                                this.seatStatus8 = "seat-status-warning";
                            }
                        } else if(seat_status_2_8 == "1") {
                            if(seat_status_1_8 == "1") {
                                this.seatStatus8 = "seat-status-danger";
                            } else if(seat_status_1_8 == "0") {
                                this.seatStatus8 = "seat-status-success";
                            }
                        }

                        var seat_status_1_9 = this.receiveCurrentData.seat_status_1.substring(8,9);
                        var seat_status_2_9 = this.receiveCurrentData.seat_status_2.substring(8,9);

                        if(seat_status_2_9 == "0") {
                            if(seat_status_1_9 == "1") {
                                this.seatStatus9 = "";
                            } else if(seat_status_1_9 == "0") {
                                this.seatStatus9 = "seat-status-warning";
                            }
                        } else if(seat_status_2_9 == "1") {
                            if(seat_status_1_9 == "1") {
                                this.seatStatus9 = "seat-status-danger";
                            } else if(seat_status_1_9 == "0") {
                                this.seatStatus9 = "seat-status-success";
                            }
                        }

                        var seat_status_1_10 = this.receiveCurrentData.seat_status_1.substring(9,10);
                        var seat_status_2_10 = this.receiveCurrentData.seat_status_2.substring(9,10);

                        if(seat_status_2_10 == "0") {
                            if(seat_status_1_10 == "1") {
                                this.seatStatus10 = "";
                            } else if(seat_status_1_10 == "0") {
                                this.seatStatus10 = "seat-status-warning";
                            }
                        } else if(seat_status_2_10 == "1") {
                            if(seat_status_1_10 == "1") {
                                this.seatStatus10 = "seat-status-danger";
                            } else if(seat_status_1_10 == "0") {
                                this.seatStatus10 = "seat-status-success";
                            }
                        }

                        var seat_status_1_11 = this.receiveCurrentData.seat_status_1.substring(10,11);
                        var seat_status_2_11 = this.receiveCurrentData.seat_status_2.substring(10,11);

                        if(seat_status_2_11 == "0") {
                            if(seat_status_1_11 == "1") {
                                this.seatStatus11 = "";
                            } else if(seat_status_1_11 == "0") {
                                this.seatStatus11 = "seat-status-warning";
                            }
                        } else if(seat_status_2_11 == "1") {
                            if(seat_status_1_11 == "1") {
                                this.seatStatus11 = "seat-status-danger";
                            } else if(seat_status_1_11 == "0") {
                                this.seatStatus11 = "seat-status-success";
                            }
                        }

                        var seat_status_1_12 = this.receiveCurrentData.seat_status_1.substring(11,12);
                        var seat_status_2_12 = this.receiveCurrentData.seat_status_2.substring(11,12);

                        if(seat_status_2_12 == "0") {
                            if(seat_status_1_12 == "1") {
                                this.seatStatus12 = "";
                            } else if(seat_status_1_12 == "0") {
                                this.seatStatus12 = "seat-status-warning";
                            }
                        } else if(seat_status_2_12 == "1") {
                            if(seat_status_1_12 == "1") {
                                this.seatStatus12 = "seat-status-danger";
                            } else if(seat_status_1_12 == "0") {
                                this.seatStatus12 = "seat-status-success";
                            }
                        }

                        var seat_status_1_13 = this.receiveCurrentData.seat_status_1.substring(12,13);
                        var seat_status_2_13 = this.receiveCurrentData.seat_status_2.substring(12,13);

                        if(seat_status_2_13 == "0") {
                            if(seat_status_1_13 == "1") {
                                this.seatStatus13 = "";
                            } else if(seat_status_1_13 == "0") {
                                this.seatStatus13 = "seat-status-warning";
                            }
                        } else if(seat_status_2_13 == "1") {
                            if(seat_status_1_13 == "1") {
                                this.seatStatus13 = "seat-status-danger";
                            } else if(seat_status_1_13 == "0") {
                                this.seatStatus13 = "seat-status-success";
                            }
                        }

                        var seat_status_1_14 = this.receiveCurrentData.seat_status_1.substring(13,14);
                        var seat_status_2_14 = this.receiveCurrentData.seat_status_2.substring(13,14);

                        if(seat_status_2_14 == "0") {
                            if(seat_status_1_14 == "1") {
                                this.seatStatus14 = "";
                            } else if(seat_status_1_14 == "0") {
                                this.seatStatus14 = "seat-status-warning";
                            }
                        } else if(seat_status_2_14 == "1") {
                            if(seat_status_1_14 == "1") {
                                this.seatStatus14 = "seat-status-danger";
                            } else if(seat_status_1_14 == "0") {
                                this.seatStatus14 = "seat-status-success";
                            }
                        }

                        var seat_status_1_15 = this.receiveCurrentData.seat_status_1.substring(14,15);
                        var seat_status_2_15 = this.receiveCurrentData.seat_status_2.substring(14,15);

                        if(seat_status_2_15 == "0") {
                            if(seat_status_1_15 == "1") {
                                this.seatStatus15 = "";
                            } else if(seat_status_1_15 == "0") {
                                this.seatStatus15 = "seat-status-warning";
                            }
                        } else if(seat_status_2_15 == "1") {
                            if(seat_status_1_15 == "1") {
                                this.seatStatus15 = "seat-status-danger";
                            } else if(seat_status_1_15 == "0") {
                                this.seatStatus15 = "seat-status-success";
                            }
                        }

                        var seat_status_1_16 = this.receiveCurrentData.seat_status_1.substring(15,16);
                        var seat_status_2_16 = this.receiveCurrentData.seat_status_2.substring(15,16);

                        if(seat_status_2_16 == "0") {
                            if(seat_status_1_16 == "1") {
                                this.seatStatus16 = "";
                            } else if(seat_status_1_16 == "0") {
                                this.seatStatus16 = "seat-status-warning";
                            }
                        } else if(seat_status_2_16 == "1") {
                            if(seat_status_1_16 == "1") {
                                this.seatStatus16 = "seat-status-danger";
                            } else if(seat_status_1_16 == "0") {
                                this.seatStatus16 = "seat-status-success";
                            }
                        }

                        var seat_status_1_17 = this.receiveCurrentData.seat_status_1.substring(16,17);
                        var seat_status_2_17 = this.receiveCurrentData.seat_status_2.substring(16,17);

                        if(seat_status_2_17 == "0") {
                            if(seat_status_1_17 == "1") {
                                this.seatStatus17 = "";
                            } else if(seat_status_1_17 == "0") {
                                this.seatStatus17 = "seat-status-warning";
                            }
                        } else if(seat_status_2_17 == "1") {
                            if(seat_status_1_17 == "1") {
                                this.seatStatus17 = "seat-status-danger";
                            } else if(seat_status_1_17 == "0") {
                                this.seatStatus17 = "seat-status-success";
                            }
                        }

                        var seat_status_1_18 = this.receiveCurrentData.seat_status_1.substring(17,18);
                        var seat_status_2_18 = this.receiveCurrentData.seat_status_2.substring(17,18);

                        if(seat_status_2_18 == "0") {
                            if(seat_status_1_18 == "1") {
                                this.seatStatus18 = "";
                            } else if(seat_status_1_18 == "0") {
                                this.seatStatus18 = "seat-status-warning";
                            }
                        } else if(seat_status_2_18 == "1") {
                            if(seat_status_1_18 == "1") {
                                this.seatStatus18 = "seat-status-danger";
                            } else if(seat_status_1_18 == "0") {
                                this.seatStatus18 = "seat-status-success";
                            }
                        }

                        var seat_status_1_19 = this.receiveCurrentData.seat_status_1.substring(18,19);
                        var seat_status_2_19 = this.receiveCurrentData.seat_status_2.substring(18,19);

                        if(seat_status_2_19 == "0") {
                            if(seat_status_1_19 == "1") {
                                this.seatStatus19 = "";
                            } else if(seat_status_1_19 == "0") {
                                this.seatStatus19 = "seat-status-warning";
                            }
                        } else if(seat_status_2_19 == "1") {
                            if(seat_status_1_19 == "1") {
                                this.seatStatus19 = "seat-status-danger";
                            } else if(seat_status_1_19 == "0") {
                                this.seatStatus19 = "seat-status-success";
                            }
                        }

                        var seat_status_1_20 = this.receiveCurrentData.seat_status_1.substring(19,20);
                        var seat_status_2_20 = this.receiveCurrentData.seat_status_2.substring(19,20);

                        if(seat_status_2_20 == "0") {
                            if(seat_status_1_20 == "1") {
                                this.seatStatus20 = "";
                            } else if(seat_status_1_20 == "0") {
                                this.seatStatus20 = "seat-status-warning";
                            }
                        } else if(seat_status_2_20 == "1") {
                            if(seat_status_1_20 == "1") {
                                this.seatStatus20 = "seat-status-danger";
                            } else if(seat_status_1_20 == "0") {
                                this.seatStatus20 = "seat-status-success";
                            }
                        }
                        console.log("here");
                        loader.dismiss();
                        this.getReceiveDataList(this.pageLimit, this.skipLimit);
                    } else {
                        loader.dismiss();
                    }
                }, error => {
                    console.log("error");
                    console.log(error);
                    loader.dismiss();
                });
            }));
        }));
    }

    getReceiveDataList(limit, skip) {
        const loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

        this.currentPage = skip / limit + 1;

        if(this.currentPage > 1) {
            this.previous = "showButton";
        } else {
            this.previous = "hideButton";
        }

        let receiveDataUrl = this.apiUrl + "/ReceiveData";
        let filter = "filter=" + encodeURI('{"where":{"car_details_id":'+this.carPlateId+', "create_date":{"gt":'+this.search_create_date+'}}, "order":"id DESC", "include":["CarDetails"]}');
        let accessToken = "access_token=" + this.accessToken;
        this.http.get(receiveDataUrl + "?" + filter + "&" + accessToken).subscribe(receiveDataResponse => {
            this.receiveDataList = receiveDataResponse;
            if(this.receiveDataList.length > 0) {
                this.havePagination = "block";
                this.totalItems = this.receiveDataList.length;
                if(this.totalItems > (limit + skip)) {
                    this.currentItem = limit + skip;
                } else {
                    this.currentItem = this.totalItems;
                }
                let haveNextPage = this.totalItems - (limit + skip);
                if(haveNextPage > 0) {
                    this.next = "showButton";
                } else {
                    this.next = "hideButton";
                }
                filter = "filter=" + encodeURI('{"where":{"car_details_id":'+this.carPlateId+', "create_date":{"gt":'+this.search_create_date+'}}, "order":"id DESC", "limit":'+limit+', "skip":'+skip+', "include":["CarDetails"]}');
                this.http.get(receiveDataUrl + "?" + filter + "&" + accessToken).subscribe(receiveDataResponse => {
                    this.receiveDataList = receiveDataResponse;
                    if(this.receiveDataList.length > 0) {
                        this.noRecord = "none";
                        for(let receiveData of this.receiveDataList) {
                            receiveData.battery_actual_current = receiveData.battery_actual_current + "A";
                            receiveData.battery_voltage = receiveData.battery_voltage.toFixed(1) + "V";
                            receiveData.cell_temperature = receiveData.cell_temperature;
                            if(receiveData.hvil_fault) {
                                receiveData.hvil_fault = "Error"
                            } else {
                                receiveData.hvil_fault = "No Fault";
                            }
                            switch(receiveData.Isolation_fault_state) {
                                case 0:
                                    receiveData.Isolation_fault_state = "No fault";
                                    break;
                                case 1:
                                    receiveData.Isolation_fault_state = "1st level";
                                    break;
                                case 2:
                                    receiveData.Isolation_fault_state = "2nd level";
                                    break;
                            }
                            receiveData.bms_actual_soc = receiveData.bms_actual_soc + "%";
                            receiveData.status_of_health = receiveData.status_of_health + "%";
                            receiveData.Isolation_resistance = receiveData.Isolation_resistance.toFixed(1) + " kΩ";
                            if(receiveData.door_status) {
                                receiveData.door_status = "At least one door is opened";
                            } else {
                                receiveData.door_status = "doors are all closed";
                            }
                            switch(receiveData.gear) {
                                case 0:
                                    receiveData.gear = "N";
                                    break;
                                case 1:
                                    receiveData.gear = "D";
                                    break;
                                case 2:
                                    receiveData.gear = "R";
                                    break;
                                case 3:
                                    receiveData.gear = "N/A";
                                    break;

                            }
                            switch(receiveData.gearbox_fault) {
                                case 0:
                                    receiveData.gearbox_fault = "No fault";
                                    break;
                                case 1:
                                    receiveData.gearbox_fault = "Imminent failure, vehicle should be stopped";
                                    break;
                                case 2:
                                    receiveData.gearbox_fault = "Minor failure, gear change not allowed";
                                    break;
                            }
                            receiveData.speed = receiveData.speed + " km/h";
                            receiveData.motor_temperature = receiveData.motor_temperature;
                            receiveData.ipu_temperature = receiveData.ipu_temperature + " Celcius";
                            switch(receiveData.ipu_fail_grade) {
                                case 0:
                                    receiveData.ipu_fail_grade = "No error";
                                    break;
                                case 1:
                                    receiveData.ipu_fail_grade = "Warning error(need to decrease power)";
                                    break;
                                case 2:
                                    receiveData.ipu_fail_grade = "Hard error(need to shut down)";
                                    break;
                                case 3:
                                    receiveData.ipu_fail_grade = "Serious error(need to stop vehicle)";
                                    break;
                            }
                        }
                        loader.dismiss();
                    } else {
                        loader.dismiss();
                    }
                });
            } else {
                loader.dismiss();
            }
        }, error => {
            console.log(error);
            loader.dismiss();
        });
    }

    getCurrentDetails() {
        this.ionViewDidLoad();
    }

    showDetails(receiveDataId) {
        this.storage.set('receive_data_id', receiveDataId);
        this.navCtrl.push(MinibusHistoryDetailsPage);
    }

    goNext() {
        this.skipLimit = this.skipLimit + this.pageLimit;
        this.getReceiveDataList(this.pageLimit, this.skipLimit);
    }

    goPrevious() {
        if(this.skipLimit > 0) {
            this.skipLimit = this.skipLimit - this.pageLimit;
            this.getReceiveDataList(this.pageLimit, this.skipLimit);
        }
    }

    goFullNext() {
        this.skipLimit = this.totalItems - (this.totalItems % this.pageLimit);
        this.getReceiveDataList(this.pageLimit, this.skipLimit);
    }

    goFullPrevious() {
        if(this.skipLimit > 0) {
            this.skipLimit = 0;
            this.getReceiveDataList(this.pageLimit, this.skipLimit);
        }
    }
}
