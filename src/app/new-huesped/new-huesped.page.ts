import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import { FormGroup,FormBuilder,Validators,   } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-new-huesped',
  templateUrl: './new-huesped.page.html',
  styleUrls: ['./new-huesped.page.scss'],
})
export class NewHuespedPage implements OnInit {
  public hoy = new Date(Date.now()).toISOString()
  public huesped: Huesped;
  public hue!: Huesped;
  public hueForm!: FormGroup;
  public valMessage!: Object;
  public date;
  public date1:Date;
  public date2 :Date;
  public date2S;
  constructor(private huespedService: HuespedService, private fb: FormBuilder, private dp: DatePipe,
    private alertController: AlertController, private toastController: ToastController) {

    this.hue = {
      nombre: "",
      codigo: "",
      tel: "",
      habitacion: "",
      token: "",
      admin: false,
      fingreso: new Date(""),
      fegreso: new Date("")
    }
   }

  ngOnInit() {
    
    this.date1 = new Date();
    this.date2 = new Date();
    this.date2.setDate(this.date1.getDate()+1)
    this.date = this.dp.transform(this.date1,'YYYY-MM-dd')
    this.date2S = this.dp.transform(this.date2,'YYYY-MM-dd')

    this.hueForm = this.fb.group(
      {
        rol: ['',Validators.compose([
          Validators.required,
        ])],
        habitacion: ['',Validators.compose([
          Validators.required,
        ])],
        nombre:['',Validators.compose([
          Validators.required,
        ])],
        telefono:['311-8675-309',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12),
          Validators.pattern('^[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9]$')
        ])],
        fingreso:['',Validators.compose([
          Validators.required,
        ])],
        fegreso:['',Validators.compose([
          Validators.required,
          
        ])],
        
      }
    );
    this.valMessage={
      nombre:[
        {type:'required',message:'Nombre obligatorio'},
      ],
      telefono:[
        {type:'required',message:'Teléfono obligatorio'},
        {type:'minlength',message:'Teléfono debe contener al menos 3 caracteres'},
        {type:'maxlength',message:'Teléfono debe contener no más de 12 caracteres'},
        {type:'pattern',message:'Teléfono no formateado correctamente 000-0000-000'},
      ],
      fingreso:[
        {type:'required',message:'Teléfono obligatorio'},
        {type:'minlength',message:'Teléfono debe contener al menos 3 caracteres'},
        {type:'maxlength',message:'Teléfono debe contener no más de 12 caracteres'},
        {type:'pattern',message:'Teléfono no formateado correctamente 000-0000-000'},
      ],
    };
  }

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Aviso: ',
      message: 'NO se guardo, ingrese todos los campos!',
      buttons: ['OK'],
    });

    await alert.present();
  }

    async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'GUARDADO CORRECTAMENTE!',
      duration: 1500,
      position,
      color:'success'
    });

    await toast.present();
  }
  public newDate(d: string): Date {
    return new Date(d)
  }

  public addHuesped(){
    if(this.hueForm.get('nombre').value!==''){
      var esadmin=false
      var tokendelhuesped;
      if(this.hueForm.get('rol').value=="1"){
        esadmin=false
      }else{
        esadmin=true
      }

      if(esadmin){
          tokendelhuesped="admin"
      }else{
        tokendelhuesped=this.hueForm.get('telefono').value+"_"+this.hueForm.get('habitacion').value;
        //el token sera compuesto por dos cosas
        //el numero de telefono mas el numero de la habitacion
        //y esta dividido por un "_"
      }
      this.hue = {
        nombre: this.hueForm.get('nombre').value,
        codigo: tokendelhuesped,

        tel: this.hueForm.get('telefono').value,
        habitacion: this.hueForm.get('habitacion').value,

        token: tokendelhuesped,

        admin: esadmin,
        fingreso: this.newDate(this.hueForm.get("fingreso").value),
        fegreso: this.newDate(this.hueForm.get("fegreso").value)
      }  
      this.huespedService.addHuesped(this.hue);
        //this.presentAlert();
        this.presentToast("top")
        console.log(this.hue);
      }else{
        console.log(this.hue);
        this.presentAlertError()
      }
    }
  

}

/*
  public addProduct() {
    this.productsService.addProduct(this.producto);
    this.producto = {
      id: "",
      img:"",
      name:"",
      price: 0,
      amount: 0
    }
  }*/

