import { Component, OnInit, Input, ChangeDetectorRef, HostListener, ElementRef } from '@angular/core';
import { TodoItem } from '../todo-item.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input("value")
  todoItem:TodoItem;
  readonly:boolean = true;
  og:string=""

  constructor(private todoService:TodoService,private elRef:ElementRef) { }

  ngOnInit() {
  }

  toggleComplete(){
    this.todoService.toggleComplete(this.todoItem);
    this.readonly = true;
    this.og = this.todoItem.title;
  }

  deleteTodo(){
    this.todoService.deleteTodo(this.todoItem);
  }
  handleEdit(e){
    this.og = this.todoItem.title;
    this.readonly = false;
  }
  inputTodo(e){

    
    if(e.code ==="Enter"){  
      let title = e.target.value;
      this.todoItem.title = title;
      this.todoService.updateTodo(this.todoItem);
      this.readonly = true;
    }
    else if(e.code==="Escape"){
      e.target.value = this.og;
      this.readonly = true;
    }

  }

  @HostListener('document:click', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) { 
    if(e.target!==this.elRef.nativeElement.target)
      this.readonly = true;
  }


}
