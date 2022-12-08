import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Huesped } from '../models/huesped';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HuespedService {
  private huespedes: Huesped[] = [];
  private lang: string
  private habsOcupadas:string
  private concatenaHabsOcupadas:string
  constructor(private firestore: AngularFirestore) {
    this.habsOcupadas="";
    this.huespedes = [
      {
        nombre: 'Diego Cadena',
        codigo: undefined,
        tel: '3111568742',
        habitacion: "undefined",
        token: '2222',
        admin: true
      },
      {
        nombre: 'Adrian Valentin',
        codigo: undefined,
        tel: '31134584216',
        habitacion: "undefined",
        token: '0000',
        admin: true
      },
      {
        nombre: 'Ana Bertha',
        codigo: undefined,
        tel: '31113451647',
        habitacion: "undefined",
        token: '1111',
        admin: true
      },
      {
        nombre: 'Diego2',
        codigo: undefined,
        tel: '31113451647',
        habitacion: "undefined",
        token: '123456',
        admin: false
      },
    ];
    this.lang = "es"
   }//const

   public getHuespedById(id: string){
    let result = this.firestore.collection('huespedes').doc(id).valueChanges();
    return result;
  }
   public addHuesped(newHuesped: Huesped){
    this.firestore.collection('huespedes').add(newHuesped)
  }
 
   //getters
   public getHabsOcupadas():string{
    return this.habsOcupadas;
   }
   public getConcatenacionHabsOcupadas():string{
    return this.concatenaHabsOcupadas;
   }
   public getUsers(): Observable<Huesped[]>{
    return this.firestore.collection('huespedes') //Obtner conexion
      .snapshotChanges() //Obtener snapshot con datos observables y si hay cambios se vuelve a ejecutar. Hace que no tengamos que refrescar la página
      .pipe( //Pipe da el formato para nuestros datos que obtenemos
        map(actions=> {
          return actions.map(a=>{ //a es un objeto que contiene el payload que tiene un doc, el cual tiene data que nos trae la información
            //Firestore separa datos de id
            const data = a.payload.doc.data() as Huesped;
            const id = a.payload.doc.id;
            //Formato
            return {id, ...data};
          });
        })
      );
      
   }
  
   public deleteHuesped(id:string){
    this.firestore.collection('huespedes').doc(id).delete();
   }

   public setLang(l: string){
    this.lang = l
  }

  public getLang(): string{
    return this.lang
  }

  public isRoomAbaliable(room:string): boolean { 
    this.habsOcupadas='';
    this.concatenaHabsOcupadas='';
    for(let i = 0 ; i < this.huespedes.length ; i++){
      if(this.huespedes[i].habitacion!='undefined'){
        console.log("ENTRA AL UNDEFINED");
      this.concatenaHabsOcupadas=this.concatenaHabsOcupadas+this.huespedes[i].habitacion+", "
      }
      if(this.huespedes[i].habitacion===room){//si alguna de las habitaciones ya esta ocupada, mandar falso
          
          this.habsOcupadas=this.habsOcupadas+this.huespedes[i].habitacion+", "
          
      }
      //console.log(this.huespedes[i].habitacion);
    }
    console.log(this.concatenaHabsOcupadas);

    if(this.habsOcupadas===''){
      return true
    }
    return false
  }
}//huespedService
