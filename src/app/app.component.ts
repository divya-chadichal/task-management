import { Component, EventEmitter, Output, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskManagementService } from './common/services/task-management.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LocalStorageService } from './common/services/local-storage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task-management';
  @Output() public emitEvent= new EventEmitter();
  public allTasksList = [];
  public showMessage = false;

  public connectedList=[];
  constructor(private localStorageService: LocalStorageService, private _taskList: TaskManagementService,  private popup : MatDialog, public overlay: OverlayContainer) { }
  
  @HostBinding('class') componentCssClass;

  ngOnInit() {
    this.allTasksList = this._taskList.getAllList();
    this.emitEvent.emit(this.allTasksList);

     this.connectedList = this._taskList.getConnectedList();

    document.body.classList.add("light-theme", "mat-app-background");
    this.overlay.getContainerElement().classList.add("light-theme");
  }

  dropSide(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allTasksList, event.previousIndex, event.currentIndex);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  openDialog(category, action, item) {
    const dialogRef = this.popup.open(PopUpComponent, {data : {category: category, item : item, action : action}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Resultthis.export: ${result}`);
    });
  }

  onSetTheme() {
    if (this.overlay.getContainerElement().classList.contains("dark-theme")) {
    this.overlay.getContainerElement().classList.remove("dark-theme");
    this.overlay.getContainerElement().classList.add("light-theme");
  } else if (this.overlay.getContainerElement().classList.contains("light-theme")) {
    this.overlay.getContainerElement().classList.remove("light-theme");
    this.overlay.getContainerElement().classList.add("dark-theme");
  } else {
    this.overlay.getContainerElement().classList.add("light-theme");
  }

  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  } else if (document.body.classList.contains("light-theme")) {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.add("light-theme");
  }
  }

  ngOnDestroy() {
    this.localStorageService.remove('allTskList');
  }
}

