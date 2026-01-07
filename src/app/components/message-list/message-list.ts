import { Component, input, output, ElementRef, ViewChild, effect } from '@angular/core';
import { MessageItem } from '../message-item/message-item'; 
import { MessageInput } from '../message-input/message-input';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageItem, MessageInput], 
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageListComponent {
  messages = input<any[]>([]); 
  isLoading = false;
  sendMessage = output<string>();

  // On récupère le conteneur HTML pour manipuler son scroll
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor() {
    // Cet effet surveille le signal 'messages'. Dès qu'il change, il scroll.
    effect(() => {
      this.messages(); // On s'abonne au changement
      this.scrollToBottom();
    });
  }

  onNewMessage(text: string) {
    this.isLoading = true;
    this.sendMessage.emit(text);
    this.scrollToBottom(); // Scroll aussi quand l'utilisateur envoie son message

    setTimeout(() => { 
      this.isLoading = false; 
      this.scrollToBottom(); // Scroll quand Gemini a fini de répondre
    }, 2000);
  }

  private scrollToBottom(): void {
    // Le setTimeout laisse le temps au DOM de créer les nouvelles bulles de texte
    setTimeout(() => {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }
}