import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { Observable, Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import * as firebase from 'firebase';
import { error } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  properties: Property[] = [];
  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  saveProperties(){
    firebase.database().ref('/properties').set(this.properties);
  }

  createProperty(property: Property){
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }

  deletProperty(index){
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
  }
  updateProperty(property:Property, index){
    // this.properties[index] = property;
    // this.saveProperties();
    // this.emitProperties();
    firebase.database().ref('/properties/' + index).update(property).catch(
      (error)=>{
        console.error(error);
      }
    );
  }
  getProperties(){
    // return new Promise(
    //  (resolve,reject)=>{
    //    if(this.properties && this.properties.length >0){
    //      resolve(this.properties);
    //    } else {
    //      const error = new Error('properties does not exist or is empty');
    //     reject(error);
    //    }
    //  }
    //);
    //return new Observable((observer) =>{
      //if(this.properties && this.properties.length >0){
      // observer.next(this.properties);
       //observer.complete();


     // } else {
     // const error = new Error('properties does not exist or is empty');
     // observer.error(error);
     // }
   // });,
   firebase.database().ref('/properties').on('value', (data)=>{
     this.properties = data.val() ? data.val():[];
     this.emitProperties();
   });
  }

  getSingleProperty(id){
    return new Promise(
      (resolve, reject)=>{
        firebase.database().ref('/properties/'+id).once('value').then(
          (data)=>{
            resolve(data.val());
          }
        ).catch(
          (error)=>{
            reject(error);
          }
        );
      }
    );
  }

  uploadFile(file: File){
    return new Promise(
      (resolve,reject)=>{
        const uniqueId = Date.now().toString();
        const upload = firebase.storage().ref().child('images/properties/' + uniqueId + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            console.log('chargement');
          },
          (error)=>{
            console.error(error);
            reject(error);
          },
          ()=>{
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl)=>{
                resolve(downloadUrl);
              }
            );
          }
          );
      });
  }

  removeFile(fileLink: string) {
    if (fileLink) {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('File deleted');
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }
  }

}
