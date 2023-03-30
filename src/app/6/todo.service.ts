
import { HttpClient, HttpClientModule } from '@angular/common/http';
//import 'rxjs/add/operator/map';

export class TodoService { 
  constructor(private http: HttpClient) { 
  }

  add(todo:any) {
    return this.http.post('...', todo)//.map(r => r.json());
  }

  getTodos() { 
    return this.http.get('...')//.map(r => r.json());
  }

  delete(id:number) {
    return this.http.delete('...')//.map(r => r.json());
  }
}