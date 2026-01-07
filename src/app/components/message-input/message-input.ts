import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  imports: [FormsModule ],
  templateUrl: './message-input.html',
  styleUrl: './message-input.css',
})
export class MessageInput {
  // Signal pour lier le texte du textarea
  messageText = signal('');
  
  // Output pour envoyer le texte au composant parent
  sendMessage = output<string>();

  onSubmit() {
    const text = this.messageText().trim();
    if (text) {
      this.sendMessage.emit(text);
      this.messageText.set(''); // Réinitialiser le champ après l'envoi
    }
  }

  // Permettre l'envoi avec Enter (mais pas Shift+Enter)
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Empêche le saut de ligne dans le textarea
      this.onSubmit();
    }
  }
}