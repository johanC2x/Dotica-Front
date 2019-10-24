import { TOKEN_NAME } from './_shared/var.constants';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { HttpClientModule } from '@angular/common/http';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MedicoComponent } from './pages/medico/medico.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { DialogoComponent } from './pages/medico/dialogo/dialogo.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
//import { BuscarComponent } from './pages/buscar/buscar.component';
//import { DialogoDetalleComponent } from './pages/buscar/dialogo-detalle/dialogo-detalle.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { Not401Component } from './pages/not401/not401.component';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { TokenComponent } from './login/recuperar/token/token.component';

import { PersonaNaturalComponent } from './pages/persona-natural/persona-natural.component';
import { TipoentidadComponent } from './pages/tipoentidad/tipoentidad.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { TiposolicitudComponent } from './pages/tiposolicitud/tiposolicitud.component';
import { InsumoComponent } from './pages/insumo/insumo.component';
import { ProveedorinsumoComponent } from './pages/proveedorinsumo/proveedorinsumo.component';
import { ProveedorinsumoDialogoComponent } from './pages/proveedorinsumo/proveedorinsumo-dialogo/proveedorinsumo-dialogo.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { MarcaDialogoComponent } from './pages/marca/marca-dialogo/marca-dialogo.component';
import { InsumoEdicionComponent } from './pages/insumo/insumo-edicion/insumo-edicion.component';
import { MatFormFieldModule } from '@angular/material';
import { TipoproductoComponent } from './pages/tipoproducto/tipoproducto.component';
import { TipoproductoDialogoComponent } from './pages/tipoproducto/tipoproducto-dialogo/tipoproducto-dialogo.component';
import { ProveedorproductoComponent } from './pages/proveedorproducto/proveedorproducto.component';
import { ProveedorproductoDialogoComponent } from './pages/proveedorproducto/proveedorproducto-dialogo/proveedorproducto-dialogo.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { BuscarproductoComponent } from './pages/buscarproducto/buscarproducto.component';
import { DialogoProductodetalleComponent } from './pages/buscarproducto/dialogo-productodetalle/dialogo-productodetalle.component';
import { ModalComponent } from './pages/modal/modal.component';
import { HomeComponent } from './pages/home/home.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { CotizacionEditComponent } from './pages/cotizacion-edit/cotizacion-edit.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioregistroComponent } from './pages/usuarioregistro/usuarioregistro.component';
import { CotizacionModalComponent } from './pages/cotizacion/cotizacion-modal/cotizacion-modal.component';
import { UsuariorolComponent } from './pages/usuariorol/usuariorol.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common'

export function tokenGetter() {
  let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
  let token = tk != null ? tk.access_token : '';
  //console.log(token);
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    MedicoComponent,
    EspecialidadComponent,
    ExamenComponent,
    ConsultaComponent,
    ExamenEdicionComponent,
    EspecialidadEdicionComponent,
    DialogoComponent,
    EspecialComponent,
	
	PersonaNaturalComponent,
    TipoentidadComponent,
    ContactoComponent,
    TiposolicitudComponent,
    InsumoComponent,
    ProveedorinsumoComponent,
    ProveedorinsumoDialogoComponent,
    MarcaComponent,
    MarcaDialogoComponent,
    InsumoEdicionComponent,
    TipoproductoComponent,
    TipoproductoDialogoComponent,
    ProveedorproductoComponent,
    ProveedorproductoDialogoComponent,
    ProductoComponent,
    BuscarproductoComponent,
    DialogoProductodetalleComponent,
	
    //BuscarComponent,
    //DialogoDetalleComponent,
    ReporteComponent,
    LoginComponent,
    Not401Component,
    RecuperarComponent,
    TokenComponent,
    HomeComponent,
    CotizacionComponent,
    SolicitudComponent,
    CotizacionEditComponent,
    UsuarioComponent,
    UsuarioregistroComponent,
    CotizacionModalComponent,
    UsuariorolComponent,
    ModalComponent
  ],
  entryComponents: [
	DialogoComponent,
	ProveedorinsumoDialogoComponent,
    TipoproductoDialogoComponent,
    ProveedorproductoDialogoComponent,
    MarcaDialogoComponent,
    DialogoProductodetalleComponent,
    ModalComponent
  ], //DialogoDetalleComponent
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTabsModule,
    MatGridListModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter : tokenGetter,
        whitelistedDomains: ['localhost:8080'],
      }
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
