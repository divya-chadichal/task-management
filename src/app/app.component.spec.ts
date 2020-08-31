import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatCardModule, MatDialog, MatSlideToggleModule, MatSlideToggle } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { TaskManagementService } from './common/services/task-management.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import 'hammerjs';

describe('AppComponent', () => {
  let dialog: MatDialog;
  let fixture : ComponentFixture<AppComponent>;
  let appcomponent;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PopUpComponent,
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatDialogModule,
        FormsModule,
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        OverlayModule,
        MatSlideToggleModule
      ],
      providers: [
        { 
        provide: TaskManagementService, 
        useValue: {}
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [PopUpComponent]
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appcomponent = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(appcomponent).toBeTruthy();
  });

  it(`should have as title 'task-management'`, () => {
    expect(appcomponent.title).toEqual('task-management');
  });

  it('button value should be add task list', () => {
    const addTaskButton = fixture.debugElement.query(By.css('#addNewTask'));

    expect(addTaskButton.nativeElement.textContent.trim()).toBe('+ Add Task List');
  });

  it('header should contain name KARYA', () => {
    const header = fixture.nativeElement.querySelector('.headerName');
    expect(header.textContent).toBe('KARYA');    
  });

  it('should call openDialog pop-up', fakeAsync(() => {
    dialog = TestBed.get(MatDialog);
    
    spyOn(dialog, 'open').and.callThrough();

    const addTaskButton = fixture.debugElement.query(By.css('#addNewTask'));
    addTaskButton.triggerEventHandler('click', null);

    expect(dialog.open).toHaveBeenCalled();
  })
);


it('should trigger toggle onSetTheme...', () => {
  const slider = fixture.debugElement.query(By.directive(MatSlideToggle));
  spyOn(appcomponent, 'onSetTheme');

  slider.triggerEventHandler('click', null);

  expect(appcomponent.onSetTheme).toHaveBeenCalled();
});

});
