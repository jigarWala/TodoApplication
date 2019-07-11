import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { TodoItem } from '../todo-item.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoItems: Array<TodoItem> = [];


  constructor(private todoService: TodoService, private cd: ChangeDetectorRef) { }

  filter = "ALL"

  ngOnInit() {

    // console.log("todo component");
    
    this.todoService.fetchTodos();

    this.todoService.getTodoStream().subscribe((todos: Array<TodoItem>) => {
      console.log("todo subscrption")

      if (this.filter === "COMPLETED")
        this.todoItems = todos.filter(todo => todo.isCompleted)
      else if (this.filter === "ACTIVE")
        this.todoItems = todos.filter(todo => !todo.isCompleted)
      else if (this.filter === "ALL")
        this.todoItems = todos;

    })
  }

  inputTodo(e) {

    if (e.keyCode === 13) {

      let title = e.target.value;
      if(title !==""){
        e.target.value = ""
        this.todoService.addTodo(title);
      }
    }

  }
  toggleAll() {
    this.todoService.toggleAll();
  }
  // toggleButtonColor(currentlyClicked){
  //   this.btns.map(btn=>{
  //     if(btn===currentlyClicked)
  //       btn.nativeElement.
  //   })
  // }
  handleComplete() {
    if (this.filter === "COMPLETED")
      return;
    if (this.filter === "ACTIVE")
      this.todoService.fetchTodos();
    else
      this.todoItems = this.todoItems.filter(todo => todo.isCompleted)

    this.filter = "COMPLETED";

  }
  handleActive() {
    if (this.filter === "ACTIVE")
      return;
      if (this.filter === "COMPLETED")
      this.todoService.fetchTodos();
      else
      this.todoItems = this.todoItems.filter(todo => !todo.isCompleted)
      this.filter = "ACTIVE";
  }
  handleAll() {

    if (this.filter !== "ALL") {
      this.todoService.fetchTodos();
      this.filter = "ALL"
    }
  }

}
