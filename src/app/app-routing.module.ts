import { TokenComponent } from './login/recuperar/token/token.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { LoginComponent } from './login/login.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
//import { BuscarComponent } from './pages/buscar/buscar.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicoComponent } from './pages/medico/medico.component';
import { GuardService } from './_service/guard.service';
import { Not401Component } from './pages/not401/not401.component';

import { BuscarproductoComponent } from './pages/buscarproducto/buscarproducto.component';
import { ProveedorproductoComponent } from './pages/proveedorproducto/proveedorproducto.component';
import { TipoproductoComponent } from './pages/tipoproducto/tipoproducto.component';

import { TiposolicitudComponent } from './pages/tiposolicitud/tiposolicitud.component';

import { InsumoEdicionComponent } from './pages/insumo/insumo-edicion/insumo-edicion.component';
import { InsumoComponent } from './pages/insumo/insumo.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { ProveedorinsumoComponent } from './pages/proveedorinsumo/proveedorinsumo.component';
import { TipoentidadComponent } from './pages/tipoentidad/tipoentidad.component';
import {PersonaNaturalComponent} from "./pages/persona-natural/persona-natural.component";
import { ProductoComponent } from './pages/producto/producto.component';

import { HomeComponent } from './pages/home/home.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { CotizacionEditComponent } from './pages/cotizacion-edit/cotizacion-edit.component';

import { SolicitudComponent } from './pages/solicitud/solicitud.component';

import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioregistroComponent } from './pages/usuarioregistro/usuarioregistro.component';

const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'especialidad', component: EspecialidadComponent, children: [
      { path: 'nuevo', component: EspecialidadEdicionComponent },
      { path: 'edicion/:id', component: EspecialidadEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'examen', component: ExamenComponent, children: [
      { path: 'nuevo', component: ExamenEdicionComponent },
      { path: 'edicion/:id', component: ExamenEdicionComponent }
    ], canActivate: [GuardService]
  },
  { path: 'medico', component: MedicoComponent, canActivate: [GuardService] },
  { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService] },
  { path: 'consulta-especial', component: EspecialComponent, canActivate: [GuardService] },
  //{ path: 'buscar', component: BuscarComponent, canActivate: [GuardService] },
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
  
  {path :'personanatural',component: PersonaNaturalComponent,canActivate: [GuardService]},
  {path :'tipoentidad',component: TipoentidadComponent,canActivate: [GuardService]},
  {path :'proveedorinsumo',component:ProveedorinsumoComponent,canActivate: [GuardService]},
  {path :'marca',component:MarcaComponent,canActivate: [GuardService]},
  {path :'tipoproducto',component:TipoproductoComponent,canActivate: [GuardService]},

  {path :'tiposolicitud',component:TiposolicitudComponent,canActivate: [GuardService]},

  {path :'buscarproducto',component:BuscarproductoComponent,canActivate: [GuardService]},
  {path :'proveedorproducto',component:ProveedorproductoComponent,canActivate: [GuardService]},
  {path :'insumo',component:InsumoComponent , children:[
		{path :'nuevo',component:InsumoEdicionComponent,canActivate: [GuardService]},
		{path :'edicion/:id',component:InsumoEdicionComponent,canActivate: [GuardService]}
	]
  },
  {path :'registrar-producto',component:ProductoComponent,canActivate: [GuardService]},
  
  {path :'cotizacion',component:SolicitudComponent,children:[
    {path :'requerimientos',component:SolicitudComponent,canActivate: [GuardService]},
    {path :'ordenes',component:SolicitudComponent,canActivate: [GuardService]},
  ],canActivate: [GuardService]},
  {path :'registrar-coti',component:CotizacionComponent,canActivate: [GuardService]},
  {path :'registrar-cotizacion',component:CotizacionComponent,children:[
    {path :':id',component:CotizacionComponent,canActivate: [GuardService]},
  ],canActivate: [GuardService]},
  {path :'editar-cotizacion/:id',component:CotizacionEditComponent,canActivate: [GuardService]},
  {path :'usuario',component:UsuarioComponent,canActivate: [GuardService]},
  {path :'usuario-registro',component:UsuarioregistroComponent,children:[
    {path :':id',component:UsuarioregistroComponent,canActivate: [GuardService]},
  ],canActivate: [GuardService]},

  { path: 'not-401', component: Not401Component },
  { path: 'home', component: HomeComponent },
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },  
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
