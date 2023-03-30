
import { TodoService } from './todo.service'; 
import { from, Observable, of, throwError } from 'rxjs';
import { TodosComponent } from './todo.component';
import { HttpClient } from '@angular/common/http';

describe('TodosComponent', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'set']);
    service = new TodoService(httpSpy);
    component = new TodosComponent(service);

  });

  it('1:- todos length to be greater than 0', () => {
    let todos = [1,2,3];
    spyOn(service, 'getTodos').and.callFake(() => {
        return of(todos);
    });
    component.ngOnInit();
    expect(component.todos.length).toBeGreaterThan(0);

  });

  it('2:- todos length to be equal to 3', () => {
    let todos = [1,2,3];
    spyOn(service, 'getTodos').and.callFake(() => {
        return of(todos);
    });
    component.ngOnInit();
    expect(component.todos.length).toBe(3);

  });


  it('3:- should set todos property with the items returned from the server and to be equal to mock', () => {
    let todos = [1,2,3];
    spyOn(service, 'getTodos').and.callFake(() => {
        return of(todos); // returnin a observable is like of({}) here
    });
    component.ngOnInit();
    expect(component.todos).toEqual(todos);
  });


  it('should call server to save the changes when a new to do item is added', () =>{
    let spy = spyOn(service, 'add').and.callFake(t =>{
      return of({});
    });

    component.add();
    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo  returned from the server', () =>{
    let todo = {id :1};
    let spy = spyOn(service, 'add').and.returnValue(from([todo]));
    
    component.add();
    //console.log(component.todos)
    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property when adding todo', ()=>{
    const error = 'error from the server';
    let spy = spyOn(service, 'add').and.returnValue(throwError(error));
    
    component.add();
    //console.log(component.todos)
    expect(component.message).toBe(error);
  });

  it('should call the server to delete a todo item if the user confirms', ()=>{
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(of());

    component.delete(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  
  it('should NOT call the server to delete a todo item if the user cancels', ()=>{
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(of());

    component.delete(1);
    expect(spy).not.toHaveBeenCalledWith(1);
  });

});