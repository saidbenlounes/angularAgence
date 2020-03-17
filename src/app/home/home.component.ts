import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertiesService } from '../services/properties.service';
import { error } from 'protractor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  properties = [];
  propertesSubscription: Subscription;
  constructor(
    private propertiesService : PropertiesService
  ) { }

  ngOnInit() {
    this.propertesSubscription = this.propertiesService.propertiesSubject.subscribe(

      (data: any) => {
        this.properties = data;
      }
      );
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  getSoldValue(index) {
    if (this.properties[index].sold) {
      return 'red';
    } else {
      return 'green';
    }
  }

  ngOnDestroy() {

    this.propertesSubscription.unsubscribe();
  }

}
