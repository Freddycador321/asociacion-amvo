import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-sucursal',
  templateUrl: './producto-sucursal.component.html',
  styleUrls: ['./producto-sucursal.component.css']
})
export class ProductoSucursalComponent {
  buscar=new FormGroup({
    producto: new FormControl('',)
  })
  productos:any[]
  get producto(){return this.buscar.get('producto'); }
  constructor(private productoServicio:ProductoService){}

  buscarProducto(){
    let data={producto:this.producto?.value+""}
    this.productoServicio.buscarTodo(data).subscribe(ans=>{
      this.productos=ans
    })
  }
}
