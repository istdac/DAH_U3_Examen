import { Component } from '@angular/core';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public leng: string;
  public hoy = new Date(Date.now())
  constructor(private huespedService: HuespedService, private huesped: Huesped) {}

  public fechaActual() {
    if ((this.huesped.fingreso.getDate() <= this.hoy.getDate()) && (this.huesped.fingreso.getDate() >= this.hoy.getDate())) {
      return true
    } else {
      return false
    }
  }
}
