import { Component,ElementRef, OnInit } from '@angular/core';
import { Huesped } from '../models/huesped';
import { HuespedService } from '../services/huesped.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public leng: string;
  public hoy = new Date(Date.now())
  public huesped:Huesped;
  public show:boolean;
  public index: number;
  public ingresoAT :string;
  public ingresoA :string;
  public hotelUT :string;
  public hotelU :string;
  public horarioHT :string;
  public horarioH :string;
  public cajaST :string;
  public cajaS :string;
  public expH:string;
  public expB: string;
  public codigo: string;
  public act: string;
  public aporteRemain: string;
  public id:string
  public filePickerRef: ElementRef<HTMLInputElement>;
  public photo: SafeResourceUrl;
  isDesktop: boolean;
  public src=''
  public putblob;
  public filelist = []

  public pagototal: number;

  daydiff(first, second):number {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  constructor(private platform: Platform, private firestore: AngularFirestore, private storage:AngularFireStorage,
    private sanitizer: DomSanitizer,private huespedService: HuespedService, private aroute: ActivatedRoute) {
    this.huesped={
      nombre: '',
      codigo: "",
      tel: '',
      habitacion: "",
      token: '',
      admin: false

    }
    this.src=''

  }

  ngOnInit() {  
    this.filelist=[]
    this.getFileList()
    console.log(this.filelist)

    if ((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.isDesktop = true;}
    this.checkLanguage()

    this.aroute.queryParams.subscribe(
      (params)=>{
        this.huespedService.getHuespedById(params.id).subscribe(item=>{
          this.huesped=item as Huesped;
          console.log(this.huesped)
          let f = this.huesped.fegreso as object
          //console.log(f)
          let v = Object.values(f)
          //console.log(v)
          for(var n in v){
            //console.log(v[n])
            if(v[n]!=0){
              this.huesped.fegreso= new Date(v[n]*1000)
            }
          }
          f = this.huesped.fingreso as object
          //console.log(f)
          v = Object.values(f)
          //console.log(v)
          for(var n in v){
            //console.log(v[n])
            if(v[n]!=0){
              this.huesped.fingreso= new Date(v[n]*1000)
            }
          }
  
          if ((this.huesped.fingreso.getDate() <= this.hoy.getDate()) && (this.huesped.fegreso.getDate() >= this.hoy.getDate())) {
            this.show=true
            this.leng='es'
            this.pagototal=this.daydiff(this.huesped.fingreso,this.huesped.fegreso);
            //console.log("lo de daydiff pago total"+this.pagototal);
            this.checkLanguage()
          } else {
            this.show=false
          }
        })
      }
    );
    /*console.log('index '+this.index)
    this.huesped = this.huespedService.getUsers()[this.index]
    console.log(this.huesped) 
    console.log(this.huesped.fingreso.getDate())
    console.log(this.hoy.getDate())
    console.log(this.huesped.fegreso.getDate())*/


  }//ngOnInit
  public changeLang(l:string){
    this.leng=l
    this.checkLanguage()
  }

  async getPicture() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt
    });
    //console.log(image)
    var imageUrl = image.webPath;
    //console.log(imageUrl)
    const savedImageFile = await this.savePicture(image);
    //console.log(savedImageFile)
  }

  private getFileList() {
    this.filelist=[]
    const pre ='/uploads/'
    const ref = this.storage.ref(pre);
    let myurlsubscription = ref.listAll().subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.storage.ref(pre+data.items[i].name);
        let url = newref.getDownloadURL().subscribe((data) => {
          this.filelist.push(data)
        });
      }
      console.log(this.filelist)
    });
  }

  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);
    // Write the file to the data directory
    const fileName ="" + new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    
    const ref = this.storage.ref('/uploads/'+fileName)
    ref.put(this.putblob).then( ()=> this.getFileList())
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }  
  
  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    this.putblob=blob
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public checkLanguage(){
    let max: number 
    switch(this.huesped.habitacion){
      case '1': {
        this.codigo = '1234'
        max=500
        break;}
      case '2': {
        this.codigo = '5469'
        max=250
        break;}
      case '3': {
        this.codigo = '2354'
        max=100
        break;}
      case '4': {
        this.codigo = '8520'
        max=1500
        break;}
      case '5': {
        this.codigo = '3460'
        max=2000
        break;}
      case '6': {
        this.codigo = '1287'
        max=500
        break;}
      case '7': {
        this.codigo = '1693'
        max=2500
        break;}
      case '8': {
        this.codigo = '1263'
        max=750
        break;}
      case '9': {
        this.codigo = '9851'
        max=800
        break;
      }
      default:{
        this.codigo='1111'
        max=800
        break;
      }
    }
    switch(this.leng){
      case 'es':
        this.act='Instucciones de Habitación'
        this.ingresoAT='Ingreso Autónomo';
        this.ingresoA='Para poder ingresar a su habitación, en la recepción principal, a su izquierda encuentra un pasillo que lo lleva a un elevador.\n En el piso 1 se encuentran las habitaciones 1-4, en el piso 2 5-8 y en el piso 3 9-10.\n Al salir del elevador puede encontrar señalamientos indicando en qué lado del piso están las habitaciones';
        this.hotelUT='Ubicación del Hotel';
        this.hotelU='Este hotel está ubicado sobre la laguna de Santa María del Oro';
        this.horarioHT='Horario del Hotel';
        this.horarioH='Este hotel está abierto de las 03:00 a las 00:00';
        this.cajaST='Caja de Seguridad';
        this.cajaS='Hay una caja de seguridad debajo de la cama principal, como está en la ubicación '+this.huesped.habitacion+ ' su caja tiene un código de acceso '+this.codigo ;
        if(this.huesped.aporte-max==0){
          this.aporteRemain="Ha pagado su habitación, disfrute su tiempo"
        }else{
          this.aporteRemain="Ha pagado de aporte $"+this.huesped.aporte+" con saldo restante de $"+((max*this.pagototal)-(this.huesped.aporte))+" ; Asegure pagar antes de acabar su visita"
        }
        break;
      case 'en':
        this.act='Room Instructions'
        this.ingresoAT='Autonomous Access';
        this.ingresoA='In order to enter your room, head to the reception desk and turn to your left. Continue on until you find an elevator. \n In the first floor you´ll find rooms 1-4, on the second floor rooms 5-8 and on the third floor rooms 9 and 10. \n Leaving the elevator you´ll find indications in order to find your room.';
        this.hotelUT='Hotel Location';
        this.hotelU='This hotel is located over the Santa María del Oro lake.';
        this.horarioHT='Hotel Working Hours';
        this.horarioH='This hotel is open from 3 am until midnight';
        this.cajaST='Security Safe';
        this.cajaS='Located underneath the main bed is a safe with a passcode. The passcode for room '+this.huesped.habitacion+ ' is '+ this.codigo;
        if(this.huesped.aporte-max==0){
          this.aporteRemain="Your room has been paid, enjoy your stay"
        }else{
          this.aporteRemain="You have paid $"+this.huesped.aporte+" out of a total of $"+((max*this.pagototal)-(this.huesped.aporte))+" ; Make sure to pay the remainder before checking out"
        }
        break;
      case 'fr':
        this.act='Instructions de la chambre'
        this.ingresoAT='Accès autonome';
        this.ingresoA='Pour entrer dans votre chambre, dirigez-vous vers la réception et tournez à gauche. Continuez jusqu\'à ce que vous trouviez un ascenseur. \n Au premier étage, vous trouverez les chambres 1-4, au deuxième étage les chambres 5-8 et au troisième étage les chambres 9 et 10. \n En sortant de l\'ascenseur, vous trouverez des indications pour trouver votre chambre.';
        this.hotelUT='Emplacement de l\'hôtel';
        this.hotelU='Cet hôtel est situé au-dessus du lac Santa María del Oro.';
        this.horarioHT='Heures d\'ouverture de l\'hôtel';
        this.horarioH='Cet hôtel est ouvert de 3h à minuit';
        this.cajaST='Coffre-fort de sécurité';
        this.cajaS='Situé sous le lit principal est un coffre-fort avec un mot de passe. Le code d\'accès pour la chambre '+this.huesped.habitacion+ ' est '+ this.codigo;
        if(this.huesped.aporte-max==0){
          this.aporteRemain="Votre chambre a été payée, profitez de votre séjour"
        }else{
          this.aporteRemain="Vous avez payé $"+this.huesped.aporte+" sur un total de $"+((max*this.pagototal)-(this.huesped.aporte))+" ; Assurez-vous de payer le reste avant de partir"
        }
        break;
    }
  }

}//
