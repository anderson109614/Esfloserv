import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Busqueda} from '../modelos/busqueda';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url:string='http://192.188.46.89/API-Esfloserv/';
  constructor(private http:HttpClient) { }

  getBusquedaPaquetes(bus:Busqueda){
    return this.http.get(this.url + 'Cliente/Paquete.php?CI='+bus.cedula+'&campania='+bus.campania+'&anio='+bus.anio)
  }
  getEstadosPquetes(){
    return this.http.get(this.url + 'Estados/Estados.php')
  }
}
