import { Component, OnInit } from '@angular/core';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-list-huesped',
  templateUrl: './list-huesped.page.html',
  styleUrls: ['./list-huesped.page.scss'],
})
export class ListHuespedPage implements OnInit {

  public huespedes: Huesped[];

  constructor(private hs: HuespedService, private ac: AlertController, private router: Router, 
    private activateroute:ActivatedRoute ) { 
    this.activateroute.queryParams.subscribe((params) => {
       this.hs.getUsers().subscribe(res=>{
        this.huespedes=res;
        console.log(this.huespedes)
       });
    });

  }

  public viewHuesped(id:string){
    console.log(id)
    this.router.navigate(['/view-huesped'],
      {
        queryParams: {id}
      }
    )

  }

  public async deleteHuesped(id:string){
    const alert = await this.ac.create({
      header: 'Confirmación',
      subHeader: '¿Está seguro que desea eliminar?',
      message: 'Confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: ()=>{}
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: ()=> {
             this.hs.deleteHuesped(id);
          }
        }
      ]
    });
    await alert.present();
  }
  
  public addHuesped():void{
    this.router.navigate(['/new-huesped'],{});
  }

  ngOnInit() {
  }

  logout(){
    this.router.navigate(['/home'], {
    });
  }

}
