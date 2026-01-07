import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { GeminiResponse } from '../../environments/gemini-response.model';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  ask(text: string) {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);
  private apiUrl = environment.geminiApiUrl;
  private apiKey = environment.geminiApiKey;
  
  sendMessage(prompt: string): Observable<string> {
    const url = `${this.apiUrl}?key=${this.apiKey}`;
    
    const body = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };
    
    return this.http.post<GeminiResponse>(url, body).pipe(
      map(response => response.candidates[0].content.parts[0].text)
    );
    

  }
}