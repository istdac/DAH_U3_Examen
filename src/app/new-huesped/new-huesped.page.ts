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
  constructor(private hs: HuespedService, private fb: FormBuilder) { }

  ngOnInit() {
    this.hueForm = this.fb.group(
      {
        nombre:['John Doe',Validators.compose([
          Validators.required,
          Validators.minLength(1)
        ])],
        telefono:['311-8675-309',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12),
          Validators.pattern('^[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9]$')
        ])],

      }
    );
  }
  public newHuesped(): void{
    //this.hs.newHuesped(this.hue);
  }
}
