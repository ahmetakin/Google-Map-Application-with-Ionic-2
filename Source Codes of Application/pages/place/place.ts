import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { NavController } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {infoPage} from '../info/info';

@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class placePage {
  sites: any;
  infoPage=infoPage;
  constructor(public navCtrl: NavController,public http: Http) {

    this.http.get("http://api/historic_sites").subscribe(data => {

         this.sites = data.json();
         console.log(this.sites);
         }, error => {
             console.log(error);
    });
  }
  loadBrowser(url){
    let browser = new InAppBrowser(url, '_blank','location=no');
  }
  moreInfo(id){
      this.navCtrl.push(infoPage,{
      id:id
    });
  }
}
