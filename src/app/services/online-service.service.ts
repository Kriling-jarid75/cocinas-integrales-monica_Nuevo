import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlineServiceService {

/* ESTE SERVICE ES CREADO CON LA FINALIDAD DE OBTNER EL ESTATUS ACTUAL SI LA APP CUENTA CON O SIN INTERNET */
  
 private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  online$ = this.onlineSubject.asObservable();
  get isOnline() { return this.onlineSubject.value; }

  constructor() {
    const online$ = fromEvent(window, 'online').pipe(mapTo(true));
    const offline$ = fromEvent(window, 'offline').pipe(mapTo(false));

    merge(online$, offline$, of(navigator.onLine))
      .subscribe(status => {
        console.log('🌐 Estado de red detectado:', status);
        this.onlineSubject.next(status);
      });
  }
}

