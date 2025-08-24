import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ver-producto-log',
  templateUrl: './ver-producto-log.component.html',
  styleUrls: ['./ver-producto-log.component.css']
})
export class VerProductoLogComponent implements OnInit{
  faArrowCircleLeft=faArrowCircleLeft
  idParameter:string|null
  id:number
  producto:Producto={cantidad_minima:0,categoria_id:0,codigo:0,descripcion:'',id:0,imagen:'',precio_compra:0,precio_venta:0,stock:0,categoriaGrupo:'',direccion:'',numero:0}
  router=inject(Router)
  route=inject(ActivatedRoute)
  productos:any[]
  totalIngreso=0
  totalEgreso=0
  constructor(private productoServicio:ProductoService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idParameter = params.get('id');
    });
    this.id= +(this.idParameter==null?0:this.idParameter)
    this.productoServicio.buscar(this.id).subscribe(data=>{
      this.producto=data
    })
    this.productoServicio.verLog(this.id).subscribe(data=>{
      this.productos=data
      this.productos.forEach(data=>{
        this.totalIngreso+=data.ingreso
        this.totalEgreso+=data.egreso
      })
      console.log(data)
    })
  }
}
