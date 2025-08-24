import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, of, startWith } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Historial } from 'src/app/models/historial';
import { Producto } from 'src/app/models/producto';
import { Sucursal } from 'src/app/models/sucursal';
import { Usuario } from 'src/app/models/usuario';
import { Venta } from 'src/app/models/venta';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { VentaService } from 'src/app/services/venta.service';
import { faCancel, faLeftLong,faRightLong, faDollar,faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environments.prod';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit{
  //iconos
  faCancel=faCancel
  faLeftLong=faLeftLong
  faRightLong=faRightLong
  faDollar=faDollar
  faPlusCircle=faPlusCircle
  title = 'Producto';
  // formularios
  nombreProducto = new FormControl('');
  sucursales:Sucursal[]=[]
  filtroProducto:Observable<any[]> = of([]);
  filtro_productos: any[] = [];
  ventas:any[] =[];
  productos:Producto[]=[]
  matriz:Historial[]=[]
  usuario:Usuario={apellido:'',id:0,imagen:'',nombre:'',password:'',rol:0,username:''}
  formProducto:Producto
  formCliente:Cliente
  formVenta:Venta
  sucursal:Sucursal={id:0,direccion:'',imagen:'',numero:0}
  total=0
  vender=0
  sig=0
  base=environment.base
  constructor(
    private authServicio:AuthService,
    private toastr: ToastrService,
    private sucursalServicio:SucursalService,
    private productoServicio:ProductoService,
    private ventaServicio:VentaService
  ) {
    this.formProducto={} as Producto
    this.formCliente={} as Cliente
    this.formVenta={} as Venta
    this.filtroProducto = this.nombreProducto.valueChanges.pipe(startWith(''),
      map(state => (state ? this._filter_producto(state) : this.productos.slice())),
    );
  }
  nuevo= new FormGroup({
    nit: new FormControl(""),
    cantidad:new FormControl('',[Validators.required,Validators.min(1)]),
    producto_id:new FormControl('',Validators.required),
    producto: new FormControl(""),
    precio: new FormControl("",Validators.required),
    nombre: new FormControl("")    ,
  });
  get producto(){return this.nuevo.get('producto'); }
  get cantidad(){return this.nuevo.get('cantidad'); }
  get precio(){return this.nuevo.get('precio'); }
  get producto_id(){return this.nuevo.get('producto_id'); }
  ngOnInit(): void {
    this.usuario=this.authServicio.usuarioActualValue
    console.log(this.usuario.rol)
    console.log(this.usuario.sucursal_id)
    if(this.usuario.rol==3){
      this.precio?.disable()
    }
    if((this.usuario.rol==2||this.usuario.rol==3) && this.usuario.sucursal_id!=undefined)
      this.sucursalServicio.buscar(this.usuario.sucursal_id).subscribe(data=>{
        this.sucursal={
          id:data.id,
          direccion:data.direccion,
          imagen:data.imagen,
          numero:data.numero
        }
        this.mostrarProductos(this.sucursal)
      })
    else
    this.sucursalServicio.listar().subscribe(data=>{
      this.sucursales=data
    })
  }
  llenar_imagen(img:string){
    return this.base+img;
  }
  mostrarProductos(item:Sucursal):void{
    this.matriz.splice(0,this.matriz.length)
    this.ventas.splice(0,this.ventas.length)
    this.sucursal=item
    this.productoServicio.listarPorVenta(item.id).subscribe(data=>{
      this.productos=data
    })
  }
  private _filter_producto(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.productos.filter(option =>
      (option.descripcion).toLowerCase().includes(filterValue) ||
      (option.categoriaGrupo+'').toLowerCase().includes(filterValue)
    );
  }
  get nombre(){return this.nuevo.get('nombre'); }
  get nit(){return this.nuevo.get('nit'); }

  seleccionarProducto(s:Producto){
    this.cantidad?.setValidators([Validators.required,Validators.min(1),Validators.max(s.stock)])
    this.cantidad?.updateValueAndValidity()
    this.formProducto.id=s.id;
    this.formProducto.descripcion=s.categoriaGrupo+' '+s.descripcion;
    this.formProducto.codigo=s.codigo;
    this.formProducto.stock=s.stock;
    this.formProducto.precio_compra=s.precio_compra;
    this.formProducto.precio_venta=s.precio_venta;
    this.nuevo.controls['producto_id'].setValue(s.id+"")
    this.nuevo.controls['producto'].setValue(s.descripcion)
    this.nuevo.controls['precio'].setValue(s.precio_venta+"")
    this.nuevo.controls['cantidad'].setValue(s.stock+"")
  }
  nuevo_producto(e:string){
      this.nuevo.controls['producto'].setValue(e)
  }
  carrito(){
    let formHistorial:Historial = {
      cantidad:0,
      precio:0,
      producto_id:0,
      venta_id:0
    }
    formHistorial.cantidad= (this.cantidad?.value!= undefined)?(+(this.cantidad?.value)):0
    formHistorial.precio=(this.precio?.value!= undefined)?+(this.precio?.value):0
    formHistorial.subTotal=formHistorial.precio*formHistorial.cantidad;
    formHistorial.producto_id=(this.producto_id?.value!=undefined)?+(this.producto_id.value):0
    let cantidad_validacion= this.formProducto.stock
    let validacion=false
    this.matriz.forEach(data=>{
      if(formHistorial.producto_id==data.producto_id){
        if(formHistorial.cantidad+data.cantidad > cantidad_validacion){
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se puede vender mas del stock actual",
            showConfirmButton: false,
            timer: 1500
          })
          validacion=true
          return
        }
      }
    })
    if(validacion)
      return
    this.vender++
    this.total+=formHistorial.subTotal
    let v=[];
    v.push(this.formProducto.codigo)
    v.push(this.formProducto.descripcion)
    v.push(formHistorial.cantidad)
    v.push(formHistorial.precio)
    v.push(formHistorial.subTotal)
    this.ventas.push(v);
    this.cantidad?.setValue('')
    this.precio?.setValue('')
    this.producto?.setValue('')
    this.nombreProducto.setValue('')
    this.matriz.push(formHistorial)
    console.log(this.matriz)
  }
  validar(e:number){
    // if(this.form.cantidad<e)
    //   this.nuevo.get('cantidad').setErrors({'max':this.form.cantidad})
  }
  error_cantidad(){
    if(this.cantidad?.hasError('required'))
      return "Campo Obligatorio";
    if(this.cantidad?.hasError("min"))
      return "Cantidad Invalida"
    if(this.cantidad?.hasError('max'))
      return "Cantidad insuficiente en almacen";
    return "";
  }
  error_precio(){
    if(this.precio?.hasError('required'))
      return "Campo Obligatorio";
    return "";
  }
  error_producto(){
    if(this.producto?.hasError('required'))
      return "Campo Obligatorio";
    return "";
  }

  eliminar(pos:number):void{
    Swal.fire({
      title: 'Desea quitar este Item?',
      text: this.matriz[pos].nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor:'#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor:'#d33'
    }).then((result) => {
      if (result.value) {
        this.total-=this.ventas[pos][4]
        this.ventas.splice(pos,1);
        this.matriz.splice(pos,1);
        this.toastr.warning('Item Removido')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.info('Operacion Cancelada');
      }
    });
  }
  realizar_venta(){
    let fecha:Date;
    fecha = new Date;
    this.formVenta={
      id:0,
      cliente_id:this.formCliente.id,
      fecha:fecha,
      total:this.total,
      user_id:0,
    }
    let form={
      cliente:this.formCliente,
      venta:this.formVenta,
      historial:this.matriz
    }
    this.ventaServicio.nuevo(form).subscribe(
      data=>{
        this.toastr.success("Venta Realizada","Exito");
        this.pdf(data);
        location.reload();
      },
      error=>{
        let e=error.status;
        console.log(error)
        this.toastr.error("error","No se pudo realizar la venta")
      }
    )
  }
  pdf(data:any){
      let venta:any=data['venta']
      let historial:Historial[]=data['historial']
      let datos=[]
      let c=1
      historial.forEach(item => {
        let t=[]
        t.push(c++)
        t.push(item.nombre)
        t.push(item.cantidad)
        t.push(item.precio.toFixed(2))
        t.push((item.cantidad*item.precio).toFixed(2))
        datos.push(t)
      });
      let t=["TOTAL","","","",venta.total.toFixed(2)]
      datos.push(t)
      let fecha=new Date();
      const titulo="venta "+fecha;
      const doc = new jsPDF('p', 'pt', 'letter');
      doc.setFont('helvetica','bold')
      doc.setFontSize(15);
      doc.text("COMERCIAL BELEN",220,45);
      doc.setFont('helvetica','normal')
      doc.setFontSize(10);
      doc.text("Sucursal:  #",40,80);
      doc.text(this.sucursal.numero+"",95,80);
      doc.text("Direccion:",150,80);
      doc.text(this.sucursal.direccion+"",220,80);
      doc.text("Fecha:",400,80);
      doc.text(venta.fecha+"",450,80);
      doc.text("NIT/CI:",40,100);
      doc.text(venta.nit,80,100)
      doc.text("Nombre:",150,100);
      doc.text(venta.nombre,200,100)
      doc.setFontSize(9);
      let cabeza=['Nº','DESCRIPCION','CANTIDAD','PRECIO','SUB TOTAL']
      autoTable(
        doc,
        {
          columns:cabeza,
          bodyStyles:{fontSize:8},
          body:datos,
          theme:'grid',
          pageBreak:'auto',
          headStyles:{fillColor:[100,100,100],textColor:[255,255,255],fontSize:7},
          startY:115,
          columnStyles: {
            0: { halign: 'right' },
            2: { halign: 'right' },
            3: { halign: 'right' },
            4: { halign: 'right' },
          }
        }
      )
      // addFooters(doc);
    doc.save(titulo+'.pdf')
    // doc.autoPrint();
    // window.open(doc.output('bloburl'), '_blank');
  }
  recibirClienteId(datos:string){
    this.formCliente.id=+datos
  }
  recibirClienteNombre(datos:string){
    this.formCliente.nombre=datos
  }
  recibirClienteNit(datos:string){
    this.formCliente.nit=datos
  }
}
