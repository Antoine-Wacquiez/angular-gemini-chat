import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [DatePipe], 
  templateUrl: './message-item.html',
  styleUrl: './message-item.css',
})
export class MessageItem {
  message = input.required<any>(); 
}