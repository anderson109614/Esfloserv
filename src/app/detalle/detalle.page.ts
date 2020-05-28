import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ClienteService} from '../Servicios/cliente.service';
import { Busqueda } from '../modelos/busqueda';
import { CallNumber } from '@ionic-native/call-number/ngx';
//1804782801;0926515529
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  @Input() detalle: any;
  @Input() camp: string;
  @Input() ani: string;
  listaEstados:any=[];
  listaPor:any=[];
  listaFueraCaja:any=[];
  img1:string='';
  img2:string='';
  img3:string='';
  estado:string='';
  constructor(private callNumber: CallNumber,public modalController: ModalController,public cliService:ClienteService) { }

  ngOnInit() {
    console.log('det',this.detalle);
    
    this.cargarEstado();
    this.cargarFueraCaja();
    this.cargarImagenes();
    this.cargarProteador();
    if(this.detalle[0].status10 != '02'){
      (<HTMLDivElement>document.getElementById("divEstados")).style.display="block";
      console.log('activado');
    }

  }
  cargarFueraCaja(){
    let bus:Busqueda={
      cedula:this.detalle[0].codigo,
      anio:this.ani,
      campania:this.camp
    }
    console.log('bus det',bus);
    this.cliService.getFueraCaja(bus).subscribe(res => {
      this.listaFueraCaja=res;
      console.log('FyeraCaja',this.listaFueraCaja);
    },
    err => {
      console.log(err);
    });
  }
  cargarProteador(){
   if(this.detalle[0].status10=='02'){
    this.cliService.getPorteadorZona(this.detalle[0].zona,this.detalle[0].seccion).subscribe(res => {
      this.listaPor=res;
      console.log('porteador',this.listaPor);
     },
     err => {
       console.log(err);
     });
   }else{
    this.cliService.getPorteador(this.detalle[0].codpaquete).subscribe(res => {
      this.listaPor=res;
      console.log('porteador',this.listaPor);
     },
     err => {
       console.log(err);
     });
   }
    
  }
  cargarImagenes(){
    this.cliService.getImagenes(this.detalle[0].codpaquete).subscribe(res => {
     try {
      if(res[0].image_paq.length>45){
        
        this.img1=res[0].image_paq;
        (<HTMLDivElement>document.getElementById("divimg1")).style.display="block";
         
      }

      if(res[0].image_paq2.length>45){
        (<HTMLDivElement>document.getElementById("divimg2")).style.display="block";
        this.img2=res[0].image_paq2;
      }
      if(res[0].image_paq3.length>45){
        (<HTMLDivElement>document.getElementById("divimg3")).style.display="block";
        this.img3=res[0].image_paq3;
      }
     } catch (error) {
       
     }
      
      
      
      
      
    },
    err => {
      console.log(err);
    });
  }
  callNow(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  cargarEstado(){
    this.cliService.getEstadosPquetes().subscribe(
      res => {
        this.listaEstados=res;
        for(var i=0;i<this.listaEstados.length;i++){
          //console.log(this.listaEstados[i].codigo);
          if(this.detalle[0].status10==this.listaEstados[i].codigo){
            this.estado=this.listaEstados[i].NombreEstado;
          }
          if(this.detalle[0].status10=='04'){
            (<HTMLDivElement>document.getElementById("divListo")).style.display="block";
          }else{
            (<HTMLDivElement>document.getElementById("divEspera")).style.display="block";
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  regresarBTN() {
    this.modalController.dismiss({
      guardado: 0
    });
  }
}
