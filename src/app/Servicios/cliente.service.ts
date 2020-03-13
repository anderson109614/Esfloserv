import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Busqueda} from '../modelos/busqueda';
import {Log} from '../modelos/log';
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
  getFueraCaja(bus:Busqueda){
    return this.http.get(this.url + 'Cliente/FueraCaja.php?CI='+bus.cedula+'&campania='+bus.campania+'&anio='+bus.anio)
  }
  getImagenes(Codigo:string){
    return this.http.get(this.url + 'Cliente/Fotos.php?cod='+Codigo)
  }
  getPorteador(Codigo:string){
    return this.http.get(this.url + 'Cliente/Porteador.php?cod='+Codigo)
  }
  postLog(lo:Log){
    return this.http.post<Log>(this.url + 'Cliente/Paquete.php',lo)
  }
}
