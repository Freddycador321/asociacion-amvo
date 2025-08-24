import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Transaccion } from 'src/app/models/transaccion';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  item:Transaccion
  constructor(public dialogRef:MatDialogRef<DetalleComponent>, @ Inject (MAT_DIALOG_DATA) public data:Transaccion){
    this.item=data
  }
  total():number{
    let s=0
    this.item.historial.forEach(item=>{
      s+= item.cantidad*item.precio
    })
    return s
  }
  cancelar():void{
    this.dialogRef.close();
  }
}
