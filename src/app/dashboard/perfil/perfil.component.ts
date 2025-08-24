import { Component } from '@angular/core';
import { Permisos } from 'src/app/core/permisos';
import { environment } from 'src/environments/environments.prod';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  permisos = new Permisos()
  base= environment.base+'usuario/imagen/';
  getImage():string{
    return this.base+this.permisos.user.imagen
  }
  getRol():string{
    let role=this.permisos.getRole()
    return (role==1?'Administrador':role==2?'Encargado Sucursal':'Vendedor')
  }
  getName():string{
    return this.permisos.user.nombre
  }
  getLastName():string{
    return this.permisos.user.apellido
  }
  description():string{
    let role=this.permisos.getRole()
    let data=role==1?this.admin:role==2?this.encargado:this.vendedor
    return data
  }
  admin='ENCARGADO DE ADMINISTRAR EL SISTEMA DE COMERCIAL BELEN<br><br>ADMINISTRACION DE USUARIOS, CLIENTES, PROVEEDORES<br><br>ENCARGADO DE CONTROLAR LAS VENTAS REALIZADAS, VISUALIZAR LAS VENTAS MEDIANTE LISTAS O GRAFICOS'
  encargado='ENCARGADO DE ADMINISTRAR LA SUCURSAL ASIGNADA DE COMERCIAL BELEN<br><br>ADMINISTRACION DE USUARIOS, CLIENTES<br><br>ENCARGADO DE CONTROLAR LAS VENTAS REALIZADAS POR SU PERSONAL ASIGNADO, VISUALIZAR LAS VENTAS MEDIANTE LISTAS O GRAFICOS'
  vendedor='ENCARGADO DE REALIZAR LAS VENTAS DE COMERCIAL BELEN EN LA SUCURSAL ASIGNADA<br><br>ADMINISTRACION DE CLIENTES<br>'
}
