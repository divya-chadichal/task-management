import { Component, OnInit, Inject, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { TaskManagementService } from '../../common/services/task-management.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from '../../common/services/local-storage-service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  @Output() public emitConnectedList = new EventEmitter();
  public taskName = "";
  category = "";
  item = "";
  action = "";
  listName = "";
  newList = {};
  description = "";
  updateValueData = {};
  isDuplicateName = false;
  isDuplicateTask = false;
  editList={};
  isVisible = false;
  clickAdd = false;
  clickAddTask = false;
  connectedList = [];
  @Input() allPList = [];

  constructor(private localStorageService: LocalStorageService, private _taskList : TaskManagementService, private dialogRef: MatDialogRef<PopUpComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.category = data.category;
    this.item = data.item;
    this.action = data.action;
   }

  ngOnInit() {
    this.editList = this.item;
  }

  addList(validName) {
    this.clickAdd = true;
    if(validName){
    this.updateValueData = { "name" : this.taskName, "description" : this.description};
    this._taskList.addListitem(this.category, this.updateValueData);

    if (this.isVisible) { 
      return;
    } 
    this.isVisible = true;
    
    setTimeout(()=> {
      this.dialogRef.close();
      this.isVisible = false;
    },1200);
    }
  }

  deleteList() {
    this._taskList.deleteListItem(this.category, this.item);
    this.dialogRef.close();
  }

  addTask(validName) {
    this.newList = {
      "listName": this.listName,
      "listId" : this.listName,
      "values" : []
    };
    this.clickAddTask = true;

    if(validName) {
      this._taskList.updateAllList(this.newList);
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      
      setTimeout(()=> {
        this.dialogRef.close();
        this.isVisible = false;
      },1200);
    }

    this.connectedList.push(this.listName);
    this.emitConnectedList.emit(this.connectedList);
  
  }

  editListValue(){
    this._taskList.updateListItem(this.category, this.editList);
    if (this.isVisible) { 
      return;
    } 
    this.isVisible = true;
    
    setTimeout(()=> {
      this.dialogRef.close();
      this.isVisible = false;
    },1200);
  }

  deleteTask() {
    this._taskList.deleteWholeTask(this.category);
    this.dialogRef.close();
  }

  checkDuplicateName(tasks, name) {
    var items=[];
    var names=[];
    for(var i=0; i<tasks.length;i++){
      for(var j = 0; j< tasks[i].values.length; j++) {
        items.push(tasks[i].values[j]);
      } 
    }
    for(var j=0;j<items.length;j++) {
      names.push(items[j].name);
    }

    if(names.indexOf(name) !== -1) {
      this.isDuplicateName = true;
    }
    else this.isDuplicateName = false;
  }

  checkDuplicateTask(tasks, name) {
    var items=[];
    for(var i=0; i<tasks.length;i++){
      items.push(tasks[i].listName);
    } 

    if(items.indexOf(name) !== -1) {
      this.isDuplicateTask = true;
    }
    else this.isDuplicateTask = false;
  }
}
