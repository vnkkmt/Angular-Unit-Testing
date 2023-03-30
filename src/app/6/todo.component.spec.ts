
import { TodoService } from './todo.service'; 
import { Observable, of } from 'rxjs';
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

});