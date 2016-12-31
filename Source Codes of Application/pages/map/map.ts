import { Component } from '@angular/core';
import {Http} from '@angular/http';
import { NavController,Platform,AlertController} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {infoPage} from '../info/info';
import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker,
 GoogleMapsAnimation
} from 'ionic-native';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class mapPage {
  infoPage=infoPage;
  map: GoogleMap;
  public site_id:any;
  constructor(public navCtrl: NavController, public platform: Platform,private alertCtrl: AlertController,public http: Http) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }
    loadBrowser(url){
      let browser = new InAppBrowser(url, '_blank','location=no');
    }
    loadMap(){
        let newyork = new GoogleMapsLatLng(42.9229020904,-75.8656999617);
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': newyork,
            'tilt': 30,
            'zoom': 7,
            'bearing': 35
          }
        });
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
            this.http.get("http://api/historic_sites").subscribe(data => {
                let sites = data.json(); //or data
                console.log(sites[0]);
                for(var i=0;i<sites.length;i++){
                  localStorage.setItem(sites[i]['name'],sites[i]['id'])
                  let markerOptions: GoogleMapsMarkerOptions = {
                      position: new GoogleMapsLatLng(sites[i]['latitude'],sites[i]['longitude']),
                      title: sites[i]['name'],
                      snippet:"Tap for Information",
                      styles : {
                         'text-align': 'center',
                         'font-style': 'italic',
                         'font-weight': 'bold'
                       },
                      animation: GoogleMapsAnimation.DROP
                    };
                  this.map.addMarker(markerOptions)
                    .then((marker: GoogleMapsMarker) => {
                       marker.addEventListener(GoogleMapsEvent.INFO_CLICK).subscribe(
                                (data) => {
                                  this.moreInfo(localStorage.getItem(markerOptions.title))
                       });
                     });
                }
            }, error => {
                  console.log(error);
            });
        });
    }
    moreInfo(id){
        this.navCtrl.push(infoPage,{
        id:id
      });
    }
}
