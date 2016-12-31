import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { NavController ,NavParams,Platform,AlertController} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class infoPage {
    public id:any;
    public place:any;
  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams,private alertCtrl: AlertController ,public http: Http) {
    this.id = navParams.get("id");
    this.get_info(this.id)
  }
  loadBrowser(url){
    let browser = new InAppBrowser(url, '_blank','location=no');
  }
  get_info(id){
    this.http.get("http://api/"+id).subscribe(data => {

         this.place = data.json();
         console.log(this.place[0]);

         }, error => {
             console.log(error);
    });
  }
}
