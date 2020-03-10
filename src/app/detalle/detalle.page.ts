import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ClienteService} from '../Servicios/cliente.service';
import { Busqueda } from '../modelos/busqueda';
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
  listaFueraCaja:any=[];
  img1:string='';
  img2:string='';
  img3:string='';
  estado:string='';
  constructor(public modalController: ModalController,public cliService:ClienteService) { }

  ngOnInit() {
    console.log('det',this.detalle);
    this.cargarEstado();
    this.cargarFueraCaja();
    this.cargarImagenes();

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
  cargarImagenes(){
    this.cliService.getImagenes(this.detalle[0].codpaquete).subscribe(res => {
      this.img1=res[0].image_paq;
      this.img2=res[0].image_paq2;
      this.img3=res[0].image_paq3;
    },
    err => {
      console.log(err);
    });
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
