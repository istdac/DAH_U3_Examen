import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import { FormGroup,FormBuilder,Validators,   } from '@angular/forms';
@Component({
  selector: 'app-new-huesped',
  templateUrl: './new-huesped.page.html',
  styleUrls: ['./new-huesped.page.scss'],
})
export class NewHuespedPage implements OnInit {

  public hue!: Huesped;
  public hueForm!: FormGroup;
  public valMessage!: Object;
  public date;
  public date1:Date;
  public date2 :Date;
  public date2S;
  constructor(private hs: HuespedService, private fb: FormBuilder, private dp: DatePipe) { }

  ngOnInit() {
    
    this.date1 = new Date();
    this.date2 = new Date();
    this.date2.setDate(this.date1.getDate()+1)
    this.date = this.dp.transform(this.date1,'YYYY-MM-dd')
    this.date2S = this.dp.transform(this.date2,'YYYY-MM-dd')

    this.hueForm = this.fb.group(
      {
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
        {type:'pattern',message:'Teléfono no formateado correctamente'},
      ],
      fingreso:[
        {type:'required',message:'Teléfono obligatorio'},
        {type:'minlength',message:'Teléfono debe contener al menos 3 caracteres'},
        {type:'maxlength',message:'Teléfono debe contener no más de 12 caracteres'},
        {type:'pattern',message:'Teléfono no formateado correctamente'},
      ],
    };
  }
  public newHuesped(): void{
    //this.hs.newHuesped(this.hue);
  }
}
