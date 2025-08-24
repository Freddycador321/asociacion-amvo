import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  titulo=""
  tipo=0
  constructor(
    public dialogRef: MatDialogRef<RegistrarComponent>,
    @ Inject(MAT_DIALOG_DATA) public data:any)
   { }
  agregar=new FormGroup({
      id: new FormControl(''),
      stock: new FormControl('',[Validators.min(1),Validators.max(2000)]),
      precio_compra: new FormControl('',[Validators.min(1),Validators.max(1000)]),
      precio_venta: new FormControl('',[Validators.min(1),Validators.max(1000)])
    })
  get stock(){return this.agregar.get('stock'); }
  get precio_compra(){return this.agregar.get('precio_compra'); }
  get precio_venta(){return this.agregar.get('precio_venta'); }

  ngOnInit(): void {
    let x=this.data.tipo
    let v=this.data.producto
    this.titulo = (x==1)?"Agregar al Stock":((x==2)?"Precio Compra":"Precio Venta")
    this.tipo =x
    this.agregar.controls['id'].setValue(v.id);
    // this.agregar.controls['stock'].setValue(v.stock);
    this.agregar.controls['precio_compra'].setValue(v.precio_compra);
    this.agregar.controls['precio_venta'].setValue(v.precio_venta);
  }
  cancelar() {
    this.dialogRef.close();
  }
  nuevo(){
  }
  error_stock():string{
    if(this.stock?.hasError('min'))
      return "Ingrese un numero mayor a 0"
    if(this.stock?.hasError('max'))
      return "Ingrese un numero menor a 2000"
    return ""
  }
  error_precio_compra():string{
    if(this.precio_compra?.hasError('min'))
      return "Ingrese un numero mayor a 0"
    if(this.precio_compra?.hasError('max'))
      return "Ingrese un numero menor a 1000"
    return ""
  }
  error_precio_venta():string{
    if(this.precio_venta?.hasError('min'))
      return "Ingrese un numero mayor a 0"
    if(this.precio_venta?.hasError('max'))
      return "Ingrese un numero menor a 1000"
    return ""
  }
}
