import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ClienteService} from '../Servicios/cliente.service';
//1804782801
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
  estado:string='';
  constructor(public modalController: ModalController,public cliService:ClienteService) { }

  ngOnInit() {
    console.log('det',this.detalle);
    this.cargarEstado();

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
