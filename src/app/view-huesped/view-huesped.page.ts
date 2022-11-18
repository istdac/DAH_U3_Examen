import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Huesped } from './../models/huesped';
import { HuespedService } from './../services/huesped.service';

@Component({
  selector: 'app-view-huesped',
  templateUrl: './view-huesped.page.html',
  styleUrls: ['./view-huesped.page.scss'],
})
export class ViewHuespedPage implements OnInit {
  huesped: Huesped
  constructor(
    private activatedRoute: ActivatedRoute,
    private huespedservice: HuespedService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const res = paramMap.get('nombre');
      this.huesped = this.huespedservice.getHuespedByNombre(res);
    })
  }

}
