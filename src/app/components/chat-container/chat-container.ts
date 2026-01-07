import { Component, signal, computed, inject } from '@angular/core'; 
import { MessageListComponent } from '../message-list/message-list';
import { MessageInput } from '../message-input/message-input';
import { Message } from '../../models/message.model'; 
import { GeminiService } from '../../services/gemini';
import { firstValueFrom } from 'rxjs';

@Component({  
  selector: 'app-chat-container',
  standalone: true,
  imports: [MessageListComponent],
  templateUrl: './chat-container.html',
  styleUrl: './chat-container.css'
})
export class ChatContainerComponent {
  // Injection du service
  private geminiService = inject(GeminiService);

  // Signaux pour l'état de l'application
  messages = signal<any[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  async onSendMessage(text: string) {
    this.errorMessage.set(null);
    
    // 1. Ajouter le message utilisateur
    const userMsg = { role: 'user', text, timestamp: new Date(), id: Date.now() };
    this.messages.update(prev => [...prev, userMsg]);

    // 2. Activer le chargement
    this.isLoading.set(true);

    try {
      // 3. Appel au service
      const response = await firstValueFrom(this.geminiService.sendMessage(text));  
      console.log('Message utilisateur:', text);
      console.log('Réponse de Gemini:', response);
      
      // 4. Ajouter la réponse de l'IA
      const aiMsg = { role: 'model', text: response, timestamp: new Date(), id: Date.now() };
      this.messages.update(prev => [...prev, aiMsg]);
    } catch (err) {
      this.errorMessage.set("Désolé, une erreur est survenue lors de la connexion à Gemini.");
      console.error(err);
    } finally {
      this.isLoading.set(false);
    }
  }
}