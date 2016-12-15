import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GoogleMaps {
  googleMapsApiUrl = 'http://maps.googleapis.com/maps/api/geocode/json';
  data: any;

  constructor(public http: Http) {
  }

  load(latitude, longitude) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get(this.googleMapsApiUrl + '?latlng=' + latitude + ',' + longitude)
      // this.http.get(this.googleMapsApiUrl + '?latlng=30.2672,-97.7431') //metro test
      // this.http.get(this.googleMapsApiUrl + '?latlng=39.334297,-115.488281') //white pine county test
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
