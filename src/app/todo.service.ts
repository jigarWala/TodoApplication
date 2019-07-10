import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  
  todos = {}

  todoStream: Subject<any> = new Subject();

  // count: number;

  constructor(private _http:HttpClient) {
    // this.count = 10;
  }
  getTodoStream() {
    return this.todoStream;
  }
  private buildTodoMap(todoArr){
    todoArr.forEach(todo=>{
      this.todos[todo.id] = todo;
    })
  }

  fetchTodos(){
    let api="http://localhost:8080/todos"
    this._http.get(api).subscribe((e:any)=>{
      this.todoStream.next(e);
      this.buildTodoMap(e)
      // console.log(e)
    })
  }
  
  getTodosFromMap() {
    return Object.values(this.todos);
  }


  addTodo(title: string) {
    let api="http://localhost:8080/todos"
    
    let todo = new TodoItem()
    todo.title = title;
    todo.isCompleted = false;
    todo.createdOn = new Date()
    // this.todos[]
    this._http.post(api,todo).subscribe((e:any)=>{  
      this.todos[e.id] = e;
      this.todoStream.next(this.getTodosFromMap());

    })
  }
  updateTodo(todo){

    this.todos = {...this.todos,[todo.id]:todo}
    let api=`http://localhost:8080/todos`
    this._http.put(api,todo).subscribe((response)=>{
      // console.log("updated todo from backend",response)
    },
    (error)=>{
      console.log(error)
    })

  }
  deleteTodo(todo) {
    delete this.todos[todo.id];
    let api=`http://localhost:8080/todos/${todo.id}`
    this._http.delete(api).subscribe(()=>{

    },
    (error)=>{
      console.log(error)
    })
    this.todoStream.next(this.getTodosFromMap());
    
  }
  toggleComplete(todo) {
    todo.isCompleted = !todo.isCompleted;

    
    this.updateTodo(todo)
    // this.todos = {...this.todos,[todo.id]:todo}

    
    // this.todoStream.next(this.getTodosFromMap());

  }
  
  toggleAll() {
    let todos = Object.values(this.todos);

    let completed = todos.filter((todo: any) => todo.isCompleted).length;
    if (completed === todos.length)
      todos.forEach((todo: any) => {
        todo.isCompleted = false;
        this.updateTodo(todo);
      })
    else
      todos.forEach((todo: any) => {
        if (!todo.isCompleted) {
          todo.isCompleted = true;
          this.updateTodo(todo);
        }
      })
      
  }

}
