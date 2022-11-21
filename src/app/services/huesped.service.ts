import { Injectable } from '@angular/core';
import { Huesped } from '../models/huesped';
@Injectable({
  providedIn: 'root'
})
export class HuespedService {
  private huespedes: Huesped[] = [];
  private lang: string
  constructor() {
    this.huespedes = [
      {
        nombre: 'Diego Cadena',
        codigo: undefined,
        tel: '3111568742',
        habitacion: undefined,
        token: '2222',
        admin: true
      },
      {
        nombre: 'Adrian Valentin',
        codigo: undefined,
        tel: '31134584216',
        habitacion: undefined,
        token: '0000',
        admin: true
      },
      {
        nombre: 'Ana Bertha',
        codigo: undefined,
        tel: '31113451647',
        token: '1111',
        admin: true
      },
      {
        nombre: 'Diego2',
        codigo: undefined,
        tel: '31113451647',
        token: '123456',
        admin: false
      },
    ];
    this.lang = "es"
   }//const

   public getHuespedByNombre(nombre: String): Huesped {
    let item: Huesped;
    item = this.huespedes.find( huesped =>{
      return huesped.nombre===nombre;
    })
     return item;
  }
   public addHuesped(newHuesped: Huesped){
    this.huespedes.push(newHuesped);
  }
 
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
  
   public deleteHuesped(pos:number):Huesped[]{
    this.huespedes.splice(pos,1);
    return this.huespedes;
   }

   public setLang(l: string){
    this.lang = l
  }

  public getLang(): string{
    return this.lang
  }
}//huespedService
