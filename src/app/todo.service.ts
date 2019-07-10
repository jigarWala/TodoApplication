import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos = {}

  todoStream: Subject<TodoItem | string> = new Subject();

  count: number;

  constructor() {
    this.count = 10;
  }
  getTodoStream() {
    return this.todoStream;
  }
  getTodos() {

    return Object.values(this.todos);
  }


  addTodo(title: string) {
    let todo = new TodoItem()
    todo.id = this.count++;
    todo.title = title;
    todo.isCompleted = false;
    todo.createdOn = new Date()
    this.todos = {...this.todos,[todo.id]:todo}
    
    this.todoStream.next(todo);
  }
  updateTodo(todo){
    this.todos = {...this.todos,[todo.id]:todo}
  }
  deleteTodo(todo) {
    delete this.todos[todo.id];

    this.todoStream.next("updation");
  }
  toggleComplete(todo) {
    todo.isCompleted = !todo.isCompleted;

    this.todos = {...this.todos,[todo.id]:todo}
    
    this.todoStream.next("updation")
  }

  toggleAll() {
    let todos = Object.values(this.todos);

    let completed = todos.filter((todo: any) => todo.isCompleted).length;
    if (completed === todos.length)
      todos.forEach((todo: any) => {
        todo.isCompleted = false;
        todo[todo.id] = todo;
      })
    else
      todos.forEach((todo: any) => {
        if (!todo.isCompleted) {
          todo.isCompleted = true;
          todo[todo.id] = todo;
        }
      })
      
  }

}
