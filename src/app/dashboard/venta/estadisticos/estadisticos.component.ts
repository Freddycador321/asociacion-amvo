import { Component, OnInit, ViewChild,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Grafico } from 'src/app/models/grafico';
import {HttpClient} from '@angular/common/http';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import { Sucursal } from 'src/app/models/sucursal';
import { Color, LegendPosition, LegendType, ScaleType } from '@swimlane/ngx-charts';
import { Colores } from 'src/app/colores';
import { AuthService } from 'src/app/services/auth.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Usuario } from 'src/app/models/usuario';
@Component({
  selector: 'app-estadisticos',
  templateUrl: './estadisticos.component.html',
  styleUrls: ['./estadisticos.component.css']
})
export class EstadisticosComponent  implements OnInit {
@ViewChild(MatPaginator) paginator: MatPaginator;
obs: Observable<any>;
categorias:any[]=[];
sucursal:Sucursal
sucursales:Sucursal[]
meses=['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE']
dataSource: MatTableDataSource<any>
pie=0;
fecha:Date
gestion:number[]=[]
mostrar=false;
view: any[] = [700, 300];
single:Grafico[] = [];
cate=[];
user:Usuario
// options
gradient: boolean = true;
showLegend: boolean = true;
showLabels: boolean = true;
isDoughnut: boolean = false;
legendType: LegendType.ScaleLegend
// colorScheme:string = ''
colorScheme: Color = {
  name: 'colores',
  selectable:true,
  domain:[],
  group:ScaleType.Linear
}
colores(cantidad:number):void{
  let color:Colores= new Colores()
  let i=0
  while(i<cantidad)
    this.colorScheme.domain.push(color.get(i++))
}
showXAxis = true;
showYAxis = true;
showXAxisLabel = true;
xAxisLabel = 'Colegios';
showYAxisLabel = true;
yAxisLabel = 'Cantidad';
constructor(
  private authServicio:AuthService,
  private sucursalServicio:SucursalService,
  private venta:VentaService,
  private changeDetectorRef: ChangeDetectorRef
) { }
explodeSlices = [false, true, false,false, true, false,false, true, false,true];
  seleccionarGestion(gestion:number){
    this.colores(20)
    this.mostrar=true
    this.categorias=[];
    // this.sucursal={id:1,direccion:'',imagen:'',numero:0}
    this.venta.meses(this.sucursal.id,gestion).subscribe(data=>{
      let t=0
      data.forEach(fila => {
        this.single=[];
        fila.forEach(value=>{
          this.single.push(value);
        })
        let valorMeses={'valor':this.single,'mes':this.meses[t]}
        t++
        this.categorias.push(valorMeses)
      });
      this.dataSource= new MatTableDataSource<any>(this.categorias);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }
  seleccionarSucursal(item:Sucursal):void{
    this.sucursal={
      id:item.id,
      direccion:item.direccion,
      imagen:item.imagen,
      numero:item.numero
    }
    this.colores(20)
    this.mostrar=true
    this.obs=of([])
  }
  ngOnInit(): void {
    let i=2022
    while(i<2029){
      this.gestion.push(i++)
    }
    this.user=this.authServicio.usuarioActualValue
    if(this.user.rol==2 && this.user.sucursal_id!=undefined)
      this.sucursalServicio.buscar(this.user.sucursal_id).subscribe(data=>{
        this.sucursal={
          id:data.id,
          direccion:data.direccion,
          imagen:data.imagen,
          numero:data.numero
        }
      })
    else

    this.sucursalServicio.listar().subscribe(data=>{
      this.sucursales=data
    })
  }

}

