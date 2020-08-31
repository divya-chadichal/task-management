import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage-service';
@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  public allList = [{
    "listName": "To-Do Tasks",
    "listId" : "toDoTasks",
    "values" : [{
      "name" : "Pay Electricity Bill",
      "description" : "Test card"
    }
    ]
  },
  {
    "listName": "In-Progress Tasks",
    "listId" : "inProgress",
    "values" : [{
      "name" : "Car Servicing",
      "description" : "Test card"
    }
    ]
  }];

  public connectList = [];

  constructor(private localStorageService: LocalStorageService) {
    if(!this.localStorageService.get('allTskList')){
      this.localStorageService.set('allTskList', this.allList);
    }

    if(!this.localStorageService.get('conList')){
      this.localStorageService.set('conList', this.connectList);
    }
  }

  getConnectedList() {
    var list = [];
    for (let item of this.allList) {
      list.push(item.listId);
    };
    this.connectList = list;
    return this.connectList;
  }

  getAllList(){
    this.allList = this.localStorageService.get('allTskList');
    return this.allList;
  }

  updateAllList(data){
    this.allList.push(data);
    this.getConnectedList();
    this.localStorageService.set('conList', this.connectList);
    this.localStorageService.set('allTskList', this.allList);
  }
 
  updateListItem(id, data){
    for( var i = 0; i < this.allList.length; i++) { 
    if(this.allList[i].listId == id){
      for(var j = 0; j< this.allList[i].values.length; j++) {
      if ( this.allList[i].values[j].name === data.name)  this.allList[i].values[j] = data;
    }
  }
  this.localStorageService.set('allTskList', this.allList);
  }
}

  addListitem(id, data){
    for(var i=0; i<this.allList.length; i++){
      if(this.allList[i].listId == id) this.allList[i].values.push(data);
    }
    this.localStorageService.set('allTskList', this.allList);
  }

  deleteListItem(id, item){
    for( var i = 0; i < this.allList.length; i++) { 
      if(this.allList[i].listId == id){
        for(var j = 0; j< this.allList[i].values.length; j++) {
        if ( this.allList[i].values[j].name === item.name)  this.allList[i].values.splice(j,1);
      }
    }
  }
  this.localStorageService.set('allTskList', this.allList);
}

  deleteWholeTask(id){
    for( var i = 0; i < this.allList.length; i++) { 
      if(this.allList[i].listId == id) this.allList.splice(i,1);
    }
    this.localStorageService.set('allTskList', this.allList);
}

}
