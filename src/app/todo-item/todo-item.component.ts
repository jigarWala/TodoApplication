import { Component, OnInit, Input, ChangeDetectorRef, HostListener, ElementRef, ViewChild } from '@angular/core';
import { TodoItem } from '../todo-item.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input("value")
  todoItem: TodoItem;
  readonly: boolean = true;
  og: string = ""

  @ViewChild("inputRef",null) inputRef: ElementRef;
  
  constructor(private todoService: TodoService, ) { }

  ngOnInit() {
    this.og = this.todoItem.title;
  }

  toggleComplete() {
    this.todoService.toggleComplete(this.todoItem);
    this.readonly = true;
    this.og = this.todoItem.title;
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.todoItem);
  }
  handleEdit(e) {
    this.og = this.todoItem.title;
    this.inputRef.nativeElement.focus();
    this.readonly = false;
  }
  handleBlur(e){
    e.code="Enter";
    this.inputTodo(e);
  }
  inputTodo(e) {

    if (e.code === "Enter") {
      let title = e.target.value;
      this.todoItem.title = title;
      this.todoService.updateTodo(this.todoItem);
      this.readonly = true;
    }
    else if (e.code === "Escape") {
      e.target.value = this.og;
      this.readonly = true;
    }

  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {

    if (e.code === "Escape") {

      this.todoItem.title = this.og;
      // this.elRef.nativeElement.findElementBy
      this.inputRef.nativeElement.value = this.og;
      // console.log(this.inputRef);
      
      this.readonly = true;
    }
  }




}
