import { async, ComponentFixture, TestBed, fakeAsync, inject, flushMicrotasks } from '@angular/core/testing';

import { PopUpComponent } from './pop-up.component';
import { MatToolbarModule, MatDialogModule, MatButtonModule, MatGridListModule, MatFormFieldModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { TaskManagementService } from '../../common/services/task-management.service';
import { of } from 'rxjs';

describe('PopUpComponent', () => {
  let component: PopUpComponent;
  let fixture: ComponentFixture<PopUpComponent>;
  let dialog: MatDialog;

  beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [ 
      MatToolbarModule,
      FormsModule,
      MatDialogModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatGridListModule,
      MatFormFieldModule,
      MatSlideToggleModule],
    declarations: [ PopUpComponent ],
    providers: [
      {
        provide: MatDialogRef,
        useValue: {}
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      },
      { 
        provide: TaskManagementService, 
        useValue: {
        getAllList: () => of([{
          "listName": "To-Do Tasks",
          "listId" : "toDoTasks",
          "values" : [{
            "name" : "Pay Electricity Bill",
            "description" : "Test card"
          }]
        }])
      }
    }]
  }).compileComponents()

}));

  beforeEach(() => { });

  it('should create', () => {
    fixture = TestBed.createComponent(PopUpComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


  it('add task button should not be shown', fakeAsync(() => {
    fixture = TestBed.createComponent(PopUpComponent);
    component = fixture.componentInstance;
    const addTaskP = fixture.debugElement.query(By.css('#addNewTaskP'));

    expect(addTaskP).toBeNull();
  }));

  it('should assign isDuplicate Name to true', fakeAsync(inject ([TaskManagementService], (taskService) => {
    fixture = TestBed.createComponent(PopUpComponent);
    component = fixture.componentInstance;
    
    component.ngOnInit();
    flushMicrotasks();

    fixture.whenStable().then(() => {
    component.checkDuplicateName([{
      "listName": "To-Do Tasks",
      "listId" : "toDoTasks",
      "values" : [{
        "name" : "Pay Electricity Bill",
        "description" : "Test card"
      }]
    }],'Pay Electricity Bill');
    return fixture.whenStable();
    }).then(() => {
      expect(component.isDuplicateName).toEqual(true);
    });

  })));

  it('should assign isDuplicate task to true', fakeAsync(inject ([TaskManagementService], (taskService) => {
    fixture = TestBed.createComponent(PopUpComponent);
    component = fixture.componentInstance;
    
    component.ngOnInit();
    flushMicrotasks();

    fixture.whenStable().then(() => {
    
    component.checkDuplicateTask([{
      "listName": "To-Do Tasks",
      "listId" : "toDoTasks",
      "values" : [{
        "name" : "Pay Electricity Bill",
        "description" : "Test card"
      }]
    }],'To-Do Tasks');
    return fixture.whenStable();
    }).then(() => {
      expect(component.isDuplicateTask).toEqual(true);
    });

  })));

});
