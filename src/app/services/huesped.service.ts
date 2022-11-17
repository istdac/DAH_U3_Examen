import { Injectable } from '@angular/core';
import { Huesped } from '../models/huesped';
@Injectable({
  providedIn: 'root'
})
export class HuespedService {
  private huespedes: Huesped[] = [];

  constructor() {
    this.huespedes = [
      {
        nombre: 'Diego Cadena',
        codigo: undefined,
        tel: '3111568742',
        habitacion: undefined,
        token: '8675309',
        admin: true
      },
      {
        nombre: 'Adrian Valentin',
        codigo: undefined,
        tel: '31134584216',
        habitacion: undefined,
        token: '1800711',
        admin: true
      },
      {
        nombre: 'Ana Bertha',
        codigo: undefined,
        tel: '31113451647',
        habitacion: undefined,
        token: '42057',
        admin: true
      },
    ];
   }//const

   //getters
   public getUsers(): Huesped[]{
    return this.huespedes;
   }
   public getClients():Huesped[]{
    return this.huespedes.filter(h=>!h.admin);
   }
   public getAdmins():Huesped[]{
    return this.huespedes.filter(h=>h.admin);
   }
   
   public addHuesped(hues:Huesped){
    this.huespedes.push(hues);
   }
   public deleteHuesped(pos:number):Huesped[]{
    this.huespedes.splice(pos,1);
    return this.huespedes;
   }
}//huespedService
