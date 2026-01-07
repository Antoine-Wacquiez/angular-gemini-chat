import { Component, signal} from '@angular/core';
import { ChatContainerComponent } from './components/chat-container/chat-container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  prenom = signal('Thomas');
  compteur = signal(200); 
  estActif = signal(true);
} 