import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VentaService } from 'src/app/services/venta.service';
import { faEye, faGear, faPrint} from '@fortawesome/free-solid-svg-icons';
import { DetalleComponent } from './detalle/detalle.component';
import { Transaccion } from 'src/app/models/transaccion';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/models/sucursal';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  faEye=faEye
  faGear=faGear
  faPrint=faPrint
  ventas=[];
  usuarioForm:Usuario={apellido:'',id:0,imagen:'',nombre:'',password:'',rol:0,username:''}
  sucursal:Sucursal
  sucursales:Sucursal[]
  constructor(
    private venta:VentaService,
    private dialog:MatDialog,
    private authServicio:AuthService,
    private sucursalServicio:SucursalService
  ) {  }
  buscar=new FormGroup({
    id:new FormControl('',),
    fechaInicio: new FormControl('',),
    fechaFin: new FormControl('',),
    cliente: new FormControl('',),
    usuario: new FormControl('',),
  })
  get id(){return this.buscar.get('id'); }
  get fechaInicio(){return this.buscar.get('fechaInicio'); }
  get fechaFin(){return this.buscar.get('fechaFin'); }
  get usuario(){return this.buscar.get('usuario'); }
  get cliente(){return this.buscar.get('cliente'); }

  inicio:string
  fin:string
  formatoFecha(fecha:Date):string{
    return `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)}`;
  }
  ngOnInit(): void {
    this.usuarioForm=this.authServicio.usuarioActualValue
    if((this.usuarioForm.rol==2||this.usuarioForm.rol==3) && this.usuarioForm.sucursal_id!=undefined)
      this.sucursalServicio.buscar(this.usuarioForm.sucursal_id).subscribe(data=>{
        this.sucursal={
          id:data.id,
          direccion:data.direccion,
          imagen:data.imagen,
          numero:data.numero
        }
        this.id?.setValue(data.id+"")
        this.buscarVentas()
      })
    else
    this.sucursalServicio.listar().subscribe(data=>{
      this.sucursales=data
    })
  }
  historial:Transaccion[]=[]
  seleccionarSucursal(item:Sucursal){
    this.id?.setValue(item.id+"")
    this.buscarVentas()
    this.sucursal=item
  }
  buscarVentas(){
    console.log(this.buscar.value)
    this.venta.listarRango(this.buscar.value).subscribe(data=>{
      this.historial=data;
    })
  }

  verDetalle(item:Transaccion) {
    const dialogo1 = this.dialog.open(DetalleComponent, {data:item});
  }
  total():number{
    let s=0
    this.historial.forEach(item=>{
      s+= item.total
    })
    return s
  }
  imprimir(item:Transaccion){
    let datos=[]
    let total=0
    let c=1
    item.historial.forEach(item => {
      let t=[]
      t.push(c++)
      t.push(item.nombre)
      t.push(item.cantidad)
      t.push(item.precio.toFixed(2))
      t.push((item.cantidad*item.precio).toFixed(2))
      datos.push(t)
      total+=(item.cantidad*item.precio)
    });
    let t=["TOTAL","","","",total.toFixed(2)]
    datos.push(t)
    let fecha=new Date();
    const titulo="venta "+fecha;
    const doc = new jsPDF('p', 'pt', 'letter');
    doc.setFont('helvetica','bold')
    doc.setFontSize(15);
    doc.text("COMPROBANTE DE VENTA",225,45);
    doc.setFontSize(10);
    doc.text("Comercial:",40,70);
    doc.text("Sucursal:      #",40,85);
    doc.text("NIT/CI:",40,100);
    doc.text("Direccion:",150,85);
    doc.text("Fecha:",440,100);
    doc.text("Nombre:",150,100);
    doc.setFont('helvetica','normal')
    doc.text("Belen",100,70);
    doc.text(this.sucursal.numero+"",110,85);
    doc.text(item.nit,100,100)
    doc.text(this.sucursal.direccion+"",210,85);
    doc.text(item.nombre,210,100)
    doc.text(item.fecha+"",480,100);
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
}
