import { Component,OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { EstadoConeccionService } from '../Servicios/estado-coneccion.service';
import {Busqueda} from '../modelos/busqueda'
import {ClienteService} from '../Servicios/cliente.service';
import { ModalController } from '@ionic/angular';
import { DetallePage } from '../detalle/detalle.page';
import {Log} from '../modelos/log';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaAnios:any=[];
  listaCampanias:any=[];
  Campania:string='';
  anio:string='';
  termino:boolean=false;
  isConnected = false;
  Resultado:any=[];
  constructor(public toastController: ToastController,
    private network: Network,
    private networkService: EstadoConeccionService,
    public loadingCtrl: LoadingController,
    public cliService:ClienteService,
    public modalController: ModalController) {}
  ngOnInit() {
    var date = new Date(); 
    
    var year = date.getFullYear();
    this.listaAnios.push(year);
    this.listaAnios.push(year-1);
    this.listaAnios.push(year-2);
    for(var i=1;i<=20;i++){
      this.listaCampanias.push(i);
    }
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
    });
  }
  CampaniaSelected(){
    this.Campania = (<HTMLSelectElement>document.getElementById("selCamnia")).value;
    
  }
  AnioSelected(){
    this.anio = (<HTMLSelectElement>document.getElementById("selAnio")).value;
   
  }
  TerminosSelected(){
    this.termino= (<HTMLIonCheckboxElement>document.getElementById("checkTerminos")).checked;
       
  }
  clickBuscar(){
    if(this.termino){
      if(this.isConnected){
        var ced=(<HTMLInputElement>document.getElementById("txtCI")).value;
        if(ced.length==0 || this.Campania.length==0 || this.anio.length==0){
          this.presentToast('Ingrese toda la información');
        }else{
        let bus:Busqueda={cedula:(<HTMLInputElement>document.getElementById("txtCI")).value,
                          anio:this.anio,
                        campania:this.Campania}
        this.buscar(bus);
      }
      }else{
        this.presentToast('Mantenga una coneccion estable');
      }
    }else{
      this.presentToast('Acepte los términos y condiciones');
    }
  }

 async buscar(bus:Busqueda){
    const loadings = await this.loadingCtrl.create({
      message: 'Buscando',
      duration: 15000
    });

    loadings.present();
    this.cliService.getBusquedaPaquetes(bus).subscribe(
      res => {
        this.Resultado = res;
        console.log('resultado', res);
        if (this.Resultado.length == 0) {
          this.presentToast('No se a encontrado ningun paquete');
          this.Guargar(bus,false);
        } else {
          console.log('Resultado',this.Resultado);
          this.Guargar(bus,true);
          this.MostrarDetalle(this.Resultado);
          this.Limpiar();
        }
        loadings.dismiss();
      },
      err => {
        this.presentToast('Error en la coneccion');
        
        loadings.dismiss();
      }
    );
  }
  Limpiar(){
    (<HTMLInputElement>document.getElementById("txtCI")).value='';
    (<HTMLIonSelectElement>document.getElementById("selCamnia")).value='';
    (<HTMLIonSelectElement>document.getElementById("selAnio")).value='';
  }
  Guargar(bus:Busqueda,exi:Boolean){
    let exit:string='0';
    if(exi){
      exit='1';
    }
    let lo:Log={
      idcliente:'1'+bus.cedula,
      anio:bus.anio,
      campania:bus.campania,
      exitosa:exit
    
    }
    this.cliService.postLog(lo).subscribe(res => {
      
    },
    err => {
      console.log(err);
    });
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 5000
    });
    toast.present();
  }
  async MostrarDetalle(det:any){
    const modal = await this.modalController.create({
      component: DetallePage,
      componentProps:{
        detalle:det,
        camp:this.Campania,
        ani:this.anio
      }

    });
    await modal.present();
  }

}
