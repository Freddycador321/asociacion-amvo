import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sucursal } from 'src/app/models/sucursal';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environments.prod';

@Component({
  selector: 'app-productoformulario',
  templateUrl: './productoformulario.component.html',
  styleUrls: ['./productoformulario.component.css']
})
export class ProductoformularioComponent {
  numero:any=/[0-9]+/;
  user:any=/[A-Za-z0-9]/;
  letras:any=/[A-Za-z ]{3,20}/;
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  base=environment.base
  sucursales:Sucursal[]=[]
  constructor(
    public dialogRef:MatDialogRef<ProductoformularioComponent>,
    @ Inject(MAT_DIALOG_DATA) public data:any,
    private productoServicio:ProductoService){
    this.texto=data.texto
    this.sucursales=data.sucursal
    this.id?.setValue(data.producto.id)
    this.codigo?.setValue(data.producto.codigo)
    this.descripcion?.setValue(data.producto.descripcion)
    this.precio_compra?.setValue(data.producto.precio_compra)
    this.precio_venta?.setValue(data.producto.precio_venta)
    this.stock?.setValue(data.producto.stock)
    this.cantidad_minima?.setValue(data.producto.cantidad_minima)
    // this.imagen?.setValue(data.usuario.imagen)
    if(data.texto=="Editar Producto"){
      this.imagen?.clearValidators()
      if(data.producto.imagen!="")
      this.previsualizacion=this.base+'producto/imagen/'+data.producto.imagen
    }
    let input=document.getElementById('descripcion')
    input?.focus()
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    codigo: new FormControl({value:'',disabled: true },[Validators.required]),
    descripcion: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    stock: new FormControl('',[Validators.required,Validators.min(1),Validators.max(2000)]),
    cantidad_minima: new FormControl('',[Validators.required,Validators.min(5),Validators.max(10)]),
    precio_compra: new FormControl('',[Validators.required,Validators.min(1),Validators.max(1000)]),
    precio_venta: new FormControl('',[Validators.required,Validators.min(1),Validators.max(1000)]),
    imagen: new FormControl('',[Validators.required]),
    categoria_id: new FormControl(''),
    nombreImagen: new FormControl('',[])
  })
  get id(){return this.agregar.get('id'); }
  get codigo(){return this.agregar.get('codigo'); }
  get descripcion(){return this.agregar.get('descripcion'); }
  get stock(){return this.agregar.get('stock'); }
  get cantidad_minima(){return this.agregar.get('cantidad_minima'); }
  get precio_compra(){return this.agregar.get('precio_compra'); }
  get imagen(){return this.agregar.get('imagen'); }
  get precio_venta(){return this.agregar.get('precio_venta'); }
  get categoria_id(){return this.agregar.get('categoria_id'); }
  get nombreImagen(){return this.agregar.get('nombreImagen')}
  llenar_imagen(img:string){
    return this.base+'usuario/imagen/'+img;
  }
  cargarImagen(event:any):void{
    let file:File=<File>event.target.files[0]
    this.name=file.name
    this.nombreImagen?.setValue(this.name)
    this.previsualizar(file)
    this.productoServicio.subirImagen(file,this.name).subscribe(data=>{
    })
  }
  previsualizar(file:File):void{
    const reader=new FileReader()
    reader.onload=(e:any)=>{
      this.previsualizacion=e.target.result
    };
    reader.readAsDataURL(file)
  };

  nuevo():void{
    // this.enviarImagen();
    // this.agregar.controls['img'].setValue(this.nombre_i);
    this.codigo?.enable()
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_descripcion() {
    if (this.descripcion?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.descripcion?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.descripcion?.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }
  error_codigo() {
    if (this.codigo?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.codigo?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    return this.codigo?.hasError('pattern') ? 'Solo se aceptan letras' : '';
  }
  error_stock() {
    if (this.stock?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.stock?.hasError('min'))
      return 'Ingrese un valor mayor';
    return this.stock?.hasError('max') ? 'Ingrese un valor menor' : '';
  }
  error_cantidad_minima() {
    if (this.cantidad_minima?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.cantidad_minima?.hasError('min'))
      return 'Ingrese un valor mayor';
    return this.cantidad_minima?.hasError('max') ? 'Ingrese un valor menor' : '';
  }
  error_precio_venta() {
    if (this.precio_venta?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.precio_venta?.hasError('min'))
      return 'Ingrese un valor mayor';
    return this.precio_venta?.hasError('max') ? 'Ingrese un valor menor' : '';
  }
  error_precio_compra() {
    if (this.precio_compra?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.precio_compra?.hasError('min'))
      return 'Ingrese un valor mayor';
    return this.precio_compra?.hasError('max') ? 'Ingrese un valor menor' : '';
  }
  error_imagen() {
    if (this.imagen?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return "";
  }

}
