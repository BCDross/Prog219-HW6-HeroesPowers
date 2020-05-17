import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  //Angular will inject the singleton MessageService into that property when it creates the MessagesComponent.
  // The messageService property must be public because you're going to bind to it in the template.
  //Angular only binds (the linking of a JS varaible to a displayed variable on HTML page)to public component properties.
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
  }

}
