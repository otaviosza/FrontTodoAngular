import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://127.0.0.1:8000/todolist/';

  constructor(private http: HttpClient) {}

  getTodoList() {
    return this.http.get(this.apiUrl);
  }

  deleteTodoItem(todoId: number) {
    const url = `${this.apiUrl}${todoId}`;
    return this.http.delete(url);
  }

  addTodoItem(newItem: any) {
    return this.http.post(this.apiUrl, newItem);
  }
  
  editarTodoItem(itemEditado: any) {
    const url = `${this.apiUrl}${itemEditado.TodolistaId}`;
    return this.http.put(url, itemEditado);
  }
  
  

}
