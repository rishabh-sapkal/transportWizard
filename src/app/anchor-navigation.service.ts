import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnchorNavigationService {

  private navigation = new BehaviorSubject<string>('');

  navigation$ = this.navigation.asObservable();
  
  constructor() { }

  navigateTo(destination: string){
    this.navigation.next(destination);
  }
}
