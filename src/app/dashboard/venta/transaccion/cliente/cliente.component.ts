import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  @Output() cliente_id=new EventEmitter<string>()
  @Output() nombreCliente=new EventEmitter<string>()
  @Output() nitCliente=new EventEmitter<string>()
  nuevo=new FormGroup({
    id:new FormControl(""),
    nit: new FormControl(""),
    nombre: new FormControl("")
  });
  filtroCliente: Observable<Cliente[]> = of([]);
  filtro_clientes: any[] = [];
  clientes:Cliente[]=[];
  flat=false;
  flat2=false;
  hide=true
  get nombre(){return this.nuevo.get('nombre'); }
  get nit(){return this.nuevo.get('nit'); }
  get id(){return this.nuevo.get('id'); }
  private _filter(value: string): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.clientes.filter(option => (option.nit).toLowerCase().includes(filterValue));
  }
  NIT=new FormControl()
  constructor(private cliente:ClienteService) {
    this.cargar()
    this.filtroCliente = this.NIT.valueChanges.pipe(startWith(''),
      // map(value => this._filter(value || '')),
      map(state => (state ? this._filter(state) : this.clientes.slice())),
    );
  }

  cargar(){
    this.cliente.listar().subscribe(data=>{
      this.clientes=data;
      this.filtro_clientes = this.clientes.map(w => {
        return {id:w.id,nit:w.nit,nombre:w.nombre}
      })
    })
  }
  error_nit(){
    if(this.nit?.hasError('required'))
      return "Campo Obligatorio";
    return "";
  }
  error_nombre(){
    if(this.nombre?.hasError('required'))
      return "Campo Obligatorio";
    return "";
  }
  seleccionarCliente(s:Cliente){
    this.nuevo.controls['nombre'].setValue(s.nombre);
    this.nuevo.controls['nit'].setValue(s.nit);
    this.form.id=s.id;
    this.form.nit=s.nit;
    this.form.nombre=s.nombre;
    this.cliente_id.emit(this.form.id+"")
    this.nitCliente.emit(this.form.nit)
    this.nombreCliente.emit(this.form.nombre)
  }
  letra=""
  nuevoNit(e:Event){
    if(this.form.nombre==null||this.form.nombre==""){
      this.letra+=e
      this.nuevo.controls['nit'].setValue((e.target as HTMLInputElement).value)
      this.form.nit=(e.target as HTMLInputElement).value;
      this.form.id=0;
    }
  }
  form:Cliente={id:0,nombre:'',nit:'',celular:'',direccion:''}
  nuevoNombre(e:Event){
    this.nuevo.controls['nombre'].setValue((e.target as HTMLInputElement).value)
    this.form.nombre=(e.target as HTMLInputElement).value;
    this.form.id=0;
    // this.dataEntrante=this.form
    // this.cliente.disparador.emit({data:this.dataEntrante})
    this.cliente_id.emit(this.form.id+"")
    this.nitCliente.emit(this.form.nit)
    this.nombreCliente.emit(this.form.nombre)
  }
}
