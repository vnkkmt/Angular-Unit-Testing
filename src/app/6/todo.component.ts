
import { TodoService } from './todo.service'

export class TodosComponent { 
  todos: any[] = [];
  message:any; 

  constructor(private service: TodoService) {}

  ngOnInit() { 
    this.service.getTodos().subscribe((t:any) => {
        this.todos = t.map((r:any) => r)
    });
  }

  add() { 
    var newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(
      (t:any) => {
      this.todos.push(t)},
      (err:any) => {this.message = err;}
    );
  }

  delete(id:number) {
    if (confirm('Are you sure?'))
      this.service.delete(id).subscribe();
  }  
}
