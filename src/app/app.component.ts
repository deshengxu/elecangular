import {Component} from '@angular/core';
import { HeroesComponent } from "./heroes.component";
import { Hero } from "./db/hero";
import { Router }         from '@angular/router';

import { HeroService } from "./service/hero.service";
import { remote, ipcRenderer }  from 'electron';
import { readFileSync, writeFile }  from 'fs';
//import { JSON } from 'JSON';

let {dialog}  = remote;


@Component({
    selector: 'my-app',
    templateUrl: './dist/app/app.component.html',
    styleUrls:['./dist/app/app.component.css']

})
export class AppComponent {

  constructor(
    private router:Router,
    private heroService:HeroService
  ){
      ipcRenderer.on('open-file', this.open.bind(this));
      ipcRenderer.on('save-file', this.save.bind(this));
  }

    title = "Tour of Heroes";
    
    openDialogActive: boolean = false;
    saveDialogActive: boolean = false;
    

    open() {
      if(!this.openDialogActive && !this.saveDialogActive){
        this.openDialogActive = true;
        dialog.showOpenDialog( (fileNames) => {
          this.openDialogActive = false;
          if(fileNames === undefined) return;
          let fileName = fileNames[0];
          var json = readFileSync(fileName,"utf8");
          var heroes:Hero[] = eval(json);
          this.heroService.setHeroes(heroes)
            .then(()=>{
              
            });
          
        })
      }
    }

    save() {
      if(!this.openDialogActive && !this.saveDialogActive){
        this.saveDialogActive = true;
        dialog.showSaveDialog({
          filters: [{name:'json', extensions:['json']}],
          message: 'select a file name with json extension',
          title: 'save file to local'
        }, this.saveFile.bind(this));
      }
    }

    saveFile(fileName) {
      this.saveDialogActive = false;
      if (fileName === undefined) return;

      
      this.heroService.getHeroes().then(heroes => {
        console.log(heroes);
        
        writeFile(fileName,
          JSON.stringify(heroes,null, 2), 
          this.saveFileCallback.bind(this, fileName));

      });
      
    }

    saveFileCallback(fileName, err) {
      let myNotification: Notification;
      if(err){
        console.log(err);
        myNotification = new Notification('Error', {
          body: 'There was an error happened; please try again!'
        });

      } else{
        myNotification = new Notification('Data Saved', {
          body: fileName
        });
      }
    }

}