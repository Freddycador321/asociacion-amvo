import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inventario } from 'src/app/models/inventario';
import { Producto } from 'src/app/models/producto';
import { Sucursal } from 'src/app/models/sucursal';
import { ProductoService } from 'src/app/services/producto.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { RegistrarComponent } from './registrar/registrar.component';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { faFilePdf,faEdit,faLongArrowAltRight, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environments.prod';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  faLongArrowAltRight=faLongArrowAltRight
  faFilePdf=faFilePdf
  faPlus=faPlus
  faEye=faEye
  title = 'Producto';
  f_productos ={id:null,nombre:null,imagen:null};
  f_tipos ={id:null,id_producto:null,descripcion:null};
  productos:Inventario[]=[]
  sucursales:Sucursal[]=[]
  sucursal:Sucursal={direccion:'',id:0,imagen:'',numero:0}
  tipos =[];
  detalles=[];
  user:Usuario
  base=environment.base+'producto/imagen/';

  llenar_imagen(img:string){
    return this.base+img;
  }
  constructor(
    private authServicio:AuthService,
    private productoServicio:ProductoService,
    private sucursalServicio:SucursalService,
    private route:Router,
    private toastr: ToastrService,
    private dialog:MatDialog,
    private dialogo:MatDialog,
    // private detalle:DetalleService,
    // private tipo:TipoService
  ) {}
  fecha=new Date()
  ngOnInit(): void {
    this.user=this.authServicio.usuarioActualValue
    if(this.user.rol==2 && this.user.sucursal_id!=undefined)
      this.sucursalServicio.buscar(this.user.sucursal_id).subscribe(data=>{
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
  mostrarProductos(item:Sucursal):void{
    this.sucursal=item
    this.productoServicio.listarPorSucursal(item.id).subscribe(data=>{
      this.productos=data
    })
  }
  flat=false;
  flat2=false;
  alerta(d:Producto):number{
    if(d.stock==d.cantidad_minima)
      return 0
    return (d.stock<d.cantidad_minima?-1:1)
  }
  modificar(d:Producto,t:number,i:number,j:number){
    const dialogo1 = this.dialog.open(RegistrarComponent, {data:{producto:d,tipo:t}});
    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined){
        let prod:Producto={
          id:d.id,
          descripcion:d.descripcion,
          cantidad_minima:d.cantidad_minima,
          categoria_id:d.categoria_id,
          codigo:d.codigo,
          imagen:d.imagen,
          precio_compra:art.value.precio_compra,
          precio_venta:art.value.precio_venta,
          stock:art.value.stock
        }
        console.log(prod)
        this.productoServicio.actualizarstok(prod.id,prod).subscribe((data:any)=>{
          this.productos[i].productos[j].stock=data.stock
          this.productos[i].productos[j].precio_compra=data.precio_compra
          this.productos[i].productos[j].precio_venta=data.precio_venta
          this.toastr.success("exito")
        })
      }
      else
        this.toastr.info('Operacion Cancelda');
      }
    );
  }
  mostrar_detalle(t:any){
    this.flat2=true;
    this.f_tipos=t;
  }
  filterpost=[];
  public form={id:null,codigo:null,id_tipo:null,descripcion:null,cantidad:null,precio_compra:null,precio_venta:null,stock_minimo:null,created_at:null,updated_at:null};
  suma(valor:Producto[],tipo:number):number{
    let s=0
    valor.forEach(item=>{
      if(tipo==1)
        s+=(item.precio_compra*item.stock)
      else
        s+=(item.precio_venta*item.stock)
    })
    return s
  }
  capital():number{
    let s=0
    this.productos.forEach(item=>{
      item.productos.forEach(value=>{
        s+=value.precio_compra*value.stock
      })
    })
    return s
  }

  pdf(){
      let datos:any=[]
      let c=1
      let fecha=new Date();
      let imagenes:string[]=[];
      this.productos.forEach(items => {
        items.productos.forEach(item=>{
          let t=[]
          t.push(c++)
          t.push(item.codigo)
          t.push(item.categoriaGrupo+" "+item.descripcion)
          t.push(" ")
          t.push(item.stock)
          t.push(item.cantidad_minima)
          t.push(item.precio_compra.toFixed(2))
          t.push(item.precio_venta.toFixed(2))
          datos.push(t)
          imagenes.push(item.imagen)
        })
      });
      const titulo="inventario "+fecha;
      const doc = new jsPDF('p', 'pt', 'letter');
      const imagen= new Image();
      // imagen.src="assets/images/logo.jpg";
      // doc.addImage(imagen,"jpg",20,20,550,80);
      doc.setFont('helvetica','bold')
      doc.setFontSize(15);
      doc.text("COMERCIAL BELEN",220,40);
      doc.text("INVENTARIO",260,130);
      doc.setFontSize(10);
      doc.text("SUCURSAL:",40,80);
      doc.text("DIRECCION:",40,100);
      doc.text("FECHA:",400,80);
      doc.setFont('helvetica','normal')
      doc.text("# "+this.sucursal.numero,110,80);
      doc.text(this.sucursal.direccion,110,100);
      doc.text(""+fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear(),450,80);
      doc.setFont('helvetica','normal')
      doc.setFontSize(10);
      let imag= new Image();
      let cabeza=['#','CODIGO','DESCRIPCION','IMAGEN','STOCK','REQ. MINIMA','COMPRA [Bs]','VENTA [Bs]']
      const styles = {
        fontSize: 10,
        rowHeight: 35 // Cambia el tamaño de la fila aquí
      };
      autoTable(doc,{
        columns:cabeza,
        bodyStyles:styles,
        body:datos,
        theme:'grid',
        pageBreak:'auto',
        headStyles:{
          fillColor:[0,0,0],textColor:[255,255,255],fontSize:7
        },
        startY:150,
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 3) {
            imag.src=this.base+imagenes[data.row.index];
            doc.addImage(imag, 'JPEG', data.cell.x + 4, data.cell.y + 2, 30, 30)
          }
        },
        didParseCell: (data)=> {
          if (data.column.index == 4 && data.cell.section === 'body') {
            let x=data.row.index
            let y=data.column.index
            if(datos[x][y]<datos[x][y+1]){
              data.cell.styles.textColor="#ff0000"
            }
            else
              if(datos[x][y]==datos[x][y+1]){
                data.cell.styles.textColor="#ffa000"
              }
            else
              data.cell.styles.textColor="#006400"
          }
        }
      })
      const pageCount = doc.getNumberOfPages()
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8)
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.text('Usuario: ' + localStorage.getItem('nombre')+" "+localStorage.getItem('apellido'), 40, doc.internal.pageSize.height-10, {align:'left'})
        doc.text('Página ' + String(i) + ' de ' + String(pageCount), 550, doc.internal.pageSize.height-10, {align:'right'})
      }
    doc.save(titulo+'.pdf')
  }
  verLog(item:Producto){

  }
}
