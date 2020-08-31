import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';

import { TaskManagementService } from './task-management.service';

describe('TaskManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskManagementService = TestBed.get(TaskManagementService);
    expect(service).toBeTruthy();
  });

  it('should call all list function', () => {
    const service: TaskManagementService = TestBed.get(TaskManagementService);

    var tasksList =  service.getAllList();

    expect(tasksList).toEqual([{
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
    }
  ]);

  });

  it('should update all list array', () => {
    const service: TaskManagementService = TestBed.get(TaskManagementService);
    const userServiceSpy = jasmine.createSpyObj<TaskManagementService>('TaskService', ['getAllList']);

    userServiceSpy.getAllList.and.returnValue([{
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
    },
    {
      "listName": "Test",
      "listId" : "test",
      "values" : [{
        "name" : "Test Task",
        "description" : "Test card"
      }]
    }]);

    service.updateAllList({
      "listName": "Test",
      "listId" : "test",
      "values" : [{
        "name" : "Test Task",
        "description" : "Test card"
      }]
    });

    var list = service.getAllList();

    expect(list).toEqual([{
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
    },
    {
      "listName": "Test",
      "listId" : "test",
      "values" : [{
        "name" : "Test Task",
        "description" : "Test card"
      }]
    }]);
  });


  it('should update all tasks array', () => {
    const service: TaskManagementService = TestBed.get(TaskManagementService);
    const userServiceSpy = jasmine.createSpyObj<TaskManagementService>('TaskService', ['getAllList']);

    userServiceSpy.getAllList.and.returnValue([{
      "listName": "To-Do Tasks",
      "listId" : "toDoTasks",
      "values" : [{
        "name" : "Pay Electricity Bill",
        "description" : "Test card"
      },
      {
        "name" : "Test Task",
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
    }]);

    service.addListitem('toDoTasks',{
        "name" : "Test Task",
        "description" : "Test card"
    });

    var list = service.getAllList();

    expect(list).toEqual([{
      "listName": "To-Do Tasks",
      "listId" : "toDoTasks",
      "values" : [{
        "name" : "Pay Electricity Bill",
        "description" : "Test card"
      },
      {
        "name" : "Test Task",
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
    }]);
  });

  it('should delete task from alllist array', () => {
    const service: TaskManagementService = TestBed.get(TaskManagementService);
    const userServiceSpy = jasmine.createSpyObj<TaskManagementService>('TaskService', ['getAllList']);

    userServiceSpy.getAllList.and.returnValue([{
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
    }]);

    service.deleteListItem('toDoTasks',{
        "name" : "Test Task",
        "description" : "Test card"
    });

    var list = service.getAllList();

    expect(list).toEqual([{
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
    }]);
  });

  it('should delete whole task list', () => {
    const service: TaskManagementService = TestBed.get(TaskManagementService);
    const userServiceSpy = jasmine.createSpyObj<TaskManagementService>('TaskService', ['getAllList']);

    userServiceSpy.getAllList.and.returnValue([{
      "listName": "In-Progress Tasks",
      "listId" : "inProgress",
      "values" : [{
        "name" : "Car Servicing",
        "description" : "Test card"
      }
      ]
    }]);

    service.deleteWholeTask('toDoTasks');

    var list = service.getAllList();

    expect(list).toEqual([{
      "listName": "In-Progress Tasks",
      "listId" : "inProgress",
      "values" : [{
        "name" : "Car Servicing",
        "description" : "Test card"
      }
      ]
    }]);
  });

});

