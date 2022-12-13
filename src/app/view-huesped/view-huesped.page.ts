import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'rxjs';
import { Huesped } from './../models/huesped';
import { HuespedService } from './../services/huesped.service';

@Component({
  selector: 'app-view-huesped',
  templateUrl: './view-huesped.page.html',
  styleUrls: ['./view-huesped.page.scss'],
})
export class ViewHuespedPage implements OnInit {
  huesped: Huesped
  conuntrycode: string="52";
  wpnumber= ""
  id:string
  url:string
  public fechaI:string
  public fechaF:string
  constructor(
    private activatedRoute: ActivatedRoute,
    private huespedservice: HuespedService,
    private dp: DatePipe
  ) {
    this.huesped={
      nombre: '',
      codigo: "",
      tel: '',
      habitacion: "",
      token: '',
      admin: false

    }
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params.id)
      this.huespedservice.getHuespedById(params.id).subscribe(item=>{
        this.huesped= item as Huesped;
        let f = this.huesped.fegreso as object
        console.log(f)
        let v = Object.values(f)
        console.log(v)
        for(var n in v){
          console.log(v[n])
          if(v[n]!=0){
            this.huesped.fegreso= new Date(v[n]*1000)
          }
        }
        f = this.huesped.fingreso as object
        console.log(f)
        v = Object.values(f)
        console.log(v)
        for(var n in v){
          console.log(v[n])
          if(v[n]!=0){
            this.huesped.fingreso= new Date(v[n]*1000)
          }
        }

        this.fechaF=this.dp.transform(this.huesped.fegreso,'YYYY-MM-dd')
        this.fechaI=this.dp.transform(this.huesped.fingreso,'YYYY-MM-dd')

        this.wpnumber= this.huesped.tel;
        this.wpnumber=this.wpnumber.replace("-","");
        this.wpnumber=this.wpnumber.replace("-","");
        console.log(this.wpnumber+" HOLA NUMERO DE TELEFONO")
        this.url="https://wa.me/"+this.conuntrycode+this.wpnumber+"?text=Hola Estimado Usuario tu Token de acceso es: "+this.huesped.token;
      });
    });
  }

}
