import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../todo-item.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoItems:Array<any> = [];


  constructor(private todoService:TodoService) { }
  


  ngOnInit() {
    // console.log("todo component");
    this.todoService.fetchTodos();    

    this.todoService.getTodoStream().subscribe((todos:any)=>{
      // console.log("todo subscrption")
      // this.todoItems = this.todoService.getTodos();
      this.todoItems = todos;
    })
  }
  
  inputTodo(e){

    if(e.keyCode ===13){
      let title = e.target.value;
      e.target.value = ""
      this.todoService.addTodo(title);

    }
  
  }
  toggleAll(){
    this.todoService.toggleAll();
  }


}
