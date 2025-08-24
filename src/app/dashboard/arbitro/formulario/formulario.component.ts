import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environments.prod';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  // numero:any=/[0-9]+/;
    // user:any=/[A-Za-z0-9]/;
    // letras:any=/[A-Za-z ]{3,20}/;
    // public name:string=""
    // public previsualizacion:string=""
    // texto:string=""
    // base=environment.base
    // sucursales:Sucursal[]=[]
    // constructor(public dialogRef:MatDialogRef<FormularioComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private usuarioServicio:UsuarioService){
    //   this.texto=data.texto
    //   this.sucursales=data.sucursal
    //   this.id?.setValue(data.usuario.id)
    //   this.nombre?.setValue(data.usuario.nombre)
    //   this.apellido?.setValue(data.usuario.apellido)
    //   this.username?.setValue(data.usuario.username)
    //   this.password?.setValue(data.usuario.password)
    //   this.rol?.setValue(data.usuario.rol)
    //   if(data.texto=="Editar Usuario"){
    //     this.password?.clearValidators()
    //     this.imagen?.clearValidators()
    //     if(data.usuario.imagen!="")
    //     this.previsualizacion=this.base+'usuario/imagen/'+data.usuario.imagen
    //   }
    // }
    // agregar=new FormGroup({
    //   id: new FormControl('',[]),
    //   nombre: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    //   rol: new FormControl('',[Validators.required]),
    //   apellido: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    //   username: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]),
    //   password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
    //   imagen: new FormControl('',[Validators.required]),
    //   sucursal_id: new FormControl('',[]),
    //   nombreImagen: new FormControl('',[])
    // })
    // get id(){return this.agregar.get('id'); }
    // get nombre(){return this.agregar.get('nombre'); }
    // get apellido(){return this.agregar.get('apellido'); }
    // get username(){return this.agregar.get('username'); }
    // get rol(){return this.agregar.get('rol'); }
    // get imagen(){return this.agregar.get('imagen'); }
    // get email(){return this.agregar.get('email'); }
    // get password(){return this.agregar.get('password'); }
    // get sucursal_id(){return this.agregar.get('sucursal_id'); }
    // get nombreImagen(){return this.agregar.get('nombreImagen')}
    // llenar_imagen(img:string){
    //   return this.base+'usuario/imagen/'+img;
    // }
    // cargarImagen(event:any):void{
    //   let file:File=<File>event.target.files[0]
    //   this.name=file.name
    //   this.nombreImagen?.setValue(this.name)
    //   this.previsualizar(file)
    //   this.usuarioServicio.subirImagen(file,this.name).subscribe(data=>{
    //   })
    // }
    // previsualizar(file:File):void{
    //   const reader=new FileReader()
    //   reader.onload=(e:any)=>{
    //     this.previsualizacion=e.target.result
    //   };
    //   reader.readAsDataURL(file)
    // };
  
    // nuevo():void{
    //   // this.enviarImagen();
    //   // this.agregar.controls['img'].setValue(this.nombre_i);
    // }
    // cancelar() {
    //   this.dialogRef.close();
    // }
    // error_nombre() {
    //   if (this.nombre?.hasError('required')) {
    //     return 'Este campo es obligatorio';
    //   }
    //   if(this.nombre?.hasError('minlength'))
    //     return 'Ingrese minimo 3 caracteres';
    //   if(this.nombre?.hasError('pattern'))
    //     return  'Solo se aceptan letras';
    //     return  '';
    // }
    // error_apellido() {
    //   if (this.apellido?.hasError('required')) {
    //     return 'Este campo es obligatorio';
    //   }
    //   if(this.apellido?.hasError('minlength'))
    //     return 'Ingrese minimo 3 caracteres';
    //   return this.apellido?.hasError('pattern') ? 'Solo se aceptan letras' : '';
    // }
    // error_username() {
    //   if (this.username?.hasError('required')) {
    //     return 'Este campo es obligatorio';
    //   }
    //   if(this.username?.hasError('minlength'))
    //     return 'Ingrese minimo 4 caracteres';
    //   return this.username?.hasError('pattern') ? 'Solo se aceptan numeros y letras' : '';
    // }
    // error_rol() {
    //   if (this.rol?.hasError('required')) {
    //     return 'Este campo es obligatorio';
    //   }
    //   return ""
    // }
    // error_imagen() {
    //   if (this.imagen?.hasError('required')) {
    //     return 'Este campo es obligatorio';
    //   }
    //   return "";
    // }
    // error_email() {
    //   if (this.email?.hasError('required')) {
    //     return 'Este campo es obligatorio';
    //   }
    //   if(this.email?.hasError('email'))
    //     return 'Ingrese un correo valido';
    //   return ""
    // }
    // error_password() {
    //   if (this.password?.hasError('required')) {
    //     return 'Este campo es obligatorio';
    //   }
    //   if(this.password?.hasError('minlength'))
    //     return 'Clave con minimo 8 caracteres';
    //   return ""
    // }
}
