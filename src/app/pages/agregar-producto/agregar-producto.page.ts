import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ColorService } from 'src/app/services/color.service';
import { TalleService } from 'src/app/services/talle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage {

  formProducto: FormGroup; //Formulario reactivo.
  constructor(private parametrosForm:FormBuilder, private alerta:AlertController,private menu:MenuController,private categoria:CategoriaService, private color:ColorService, private talla:TalleService, private producto:ProductoService, auth:AuthService) {
    this.formProducto = this.parametrosForm.group({
      nombreProducto: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{1,50}$/)], Validators.maxLength(100)], //Valida que el campo sea obligatorio, solo acepte alfanumérico y máximo 100 caracteres.
      descripcionProducto: ['', [Validators.required, Validators.maxLength(500)]], //Valida que el campo sea obligatorio y tenga máximo 500 caracteres.
      fotoProducto1: [''],
      fotoProducto2: [''],
      fotoProducto3: [''],
      fotoProducto4: [''],
      precioProducto: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], //Valida que el campo sea obligatorio, que solo acepte números y tenga máximo 10 caracteres.
      stockProducto: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]], //Valida que el campo sea obligatorio y que solo acepte números..
    });

    this.cargarCategorias();
    this.cargarColores();
    this.cargarTallas();
  }

  //#region Subir Fotos:

  /**
   * @function ventanaSubirImagen - sube una imagen al formulario a través de la etiqueta HTML input que abre una ventana emergente para seleccionar fotos.
   * @param id - ID de la etiqueta input.
   */
  ventanaSubirImagen(id:string) {
    document.getElementById(id)?.click(); //Crea un click automático en la etiqueta input para activarla desde un botón.
  }

  /**
   * @function leerImagen - lee la imagen seleccionada por la venta emergente y la vuelve fondo de pantalla del botón.
   * @param event - representa a la imagen seleccionada. 
   * @param idBtn - ID de la etiqueta HTML ion-button que sube la imagen.
   * @param idIcon - ID de la etiqueta HTML ion-icon del botón que sube imágenes.
   * @param idSpan - ID de la etiqueta HTML span (texto) del botón que sube imágenes.
   * @param idBtnBorrar - ID de la etiquea HTML ion-button que borra la imagen.
   */
  leerImagen(event: any, idBtn:string, idIcon:string, idSpan:string, idBtnBorrar:string) {
    const imagen = event.target.files[0];
    if (imagen) {
      const leerImagen = new FileReader();
      leerImagen.onload = (e: any) => {
        const rutaImagen = e.target.result;
        const btnSubir = document.getElementById(idBtn);
        const icono = document.getElementById(idIcon);
        const span = document.getElementById(idSpan);
        const btnBorrar = document.getElementById(idBtnBorrar);

        if (btnSubir&&icono&&span&&btnBorrar) { //Verifica que las etiquetas referenciadas existan.
          /** Debido a que el botón tenía previamente un color de fondo (celeste) es necesario volverlo 
           * transparente para poder insertar la imagen.
           */
          btnSubir.setAttribute('style', '--background: transparent; height: 130px; width: 173px;');
          btnSubir.style.background = `url(${rutaImagen})`;
          btnSubir.style.backgroundSize = 'cover'; //Ajusta el tamaño de la imagen.
          icono.style.display='none'; //Vuelve invisible el icono de subir imagen al ya estar subida.
          span.style.display='none'; //Vuelve invisible el texto de subir imagen al ya estar subida.
          btnBorrar.style.display='block'; //Vuelve visible el botón de borrar imagen subida.
        }
      };
      leerImagen.readAsDataURL(imagen);
    }
  }

  /**
   * @function borrarFoto
   * @param idBtn - ID de la etiqueta HTML ion-button que sube la imagen.
   * @param idIcono - ID de la etiqueta HTML ion-icon del botón que sube imágenes.
   * @param idSpan - ID de la etiqueta HTML span (texto) del botón que sube imágenes.
   * @param idBtnBorrar - ID de la etiqueta HTML ion-button que borra la imagen.
   */
  borrarFoto(idBtn:string,idIcono:string,idSpan:string,idBtnBorrar:string) {
    const btnSubir = document.getElementById(idBtn);
    const icono = document.getElementById(idIcono);
    const span = document.getElementById(idSpan);
    const btnBorrar = document.getElementById(idBtnBorrar);

    if(btnSubir&&icono&&span&&btnBorrar) {
      btnSubir.style.background = '#deeffe'; //Regresa al fondo de pantalla celeste para el botón.
      btnSubir.style.border='2px dashed #006bc8'; //Regresa al borde azul punteado.
      icono.style.display = 'block'; //Vuelve visible el icono de subir imagen.
      span.style.display = 'block'; //Vuelve visible el texto de subir imagen.
      btnBorrar.style.display = 'none'; //Oculta el botón de borrar imagen porque ya no hay una.
    }
  }

  /**
   * @function confirmarBorrarFoto - pregunta al usuario si desea borrar la foto subida.
   * @param idBtn - ID del ion-button que subió la foto.
   * @param idIcono - ID del icono de dicho botón.
   * @param idSpan - ID del texto de dicho botón.
   * @param idBtnBorrar - ID del botón que borra la foto.
   */
  async confirmarBorrarFoto(idBtn:string,idIcono:string,idSpan:string,idBtnBorrar:string) {
    const alert = await this.alerta.create({
      header: '¿Querés eliminar esta foto?',
      message: 'Al hacerlo, se va a dejar de mostrar en tu tienda.',
      backdropDismiss: true, //Cierra la alerta al hacer click fuera de ella.
      cssClass: 'fondo',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnCancelar',
        },
        {
          text: 'Eliminar',
          cssClass: 'btnEliminar',
          handler: () => {
            this.borrarFoto(idBtn,idIcono,idSpan,idBtnBorrar);
          },
        },
      ],
    });
    await alert.present();
  }
  //#endregion

  //#region Menú:

  abrirMenu(idMenu:string) {
    this.menu.open(idMenu);
  }

  cerrarMenu(idMenu:string) {
    this.menu.close(idMenu);
  }
  //#endregion

  //#region Menú Categoría

  listaCategoriasPreBusqueda:any []=[]; //Debido a que la lista original filtrada no regresa a su estado original, sus datos se reemplazan con los datos de la lista pre-búsqueda.
  /**
   * @function buscarCategoria - Según el texto en el ion-searchbar filtra entre la lista de categorías.
   * @param evento - El evento IonInput registra las teclas presionadas dentro del ion-searchbar.
   */
  buscarCategoria(evento: any) {
    const buscado = evento.target.value.toLowerCase();
    if (!buscado.trim()) { //Si no se esta buscando nada entonces...
      this.listaCategorias = this.listaCategoriasPreBusqueda;
    } else {
      this.listaCategorias = this.listaCategoriasPreBusqueda.filter((c) => c.name.toLowerCase().includes(buscado));
    }
  }

  nuevaCategoria: string = ''; //Nueva categoría ingresada por el usuario.
  cartelBugCategoria: boolean = false; //En función de su estado se muestra o no el mensaje de error.
  /**
   * @function crearCategoria - crea una nueva categoría en la base de datos.
   * @param idEtiqueta - ID de la etiqueta div que representa al cuadro que crea categorías.
   */
  crearCategoria(idEtiqueta:string) {
    this.categoria.crearCategoria(this.nuevaCategoria).subscribe({
      next: (r) => {
        const div=document.getElementById(idEtiqueta);
        if(div) {
          div.style.display='none'; //Oculta el cuadro de crear categoría.
          this.nuevaCategoria=''; //Borra el texto ingresado por usuario (la categoría recién creada).
          this.cargarCategorias(); //Actualiza la lista de categorías.
        }
      },
      error: (e) => {
        this.cartelBugCategoria=true; //Sino cargan las categorías, muestra un cuadro notificándolo.
      }
    });
  }

  listaCategorias:any [] = []; //Listado de categorías.
  errorCargarCategorias:boolean=false; //Según el estado se vuelve visible un div en HTML notificando un error de carga.
  /**
   * @function cargarCategorias - obtiene las categorías del usuario logeado.
   */
  cargarCategorias() {
    this.categoria.obtenerCategorias().subscribe({
      next: (r) => {
        this.listaCategorias=r; //Rellena la lista de categorías.
        this.listaCategoriasPreBusqueda = this.listaCategorias; //Rellena una lista adicional para las búsquedas.
      },
      error: (e) => {
        this.errorCargarCategorias=true;
      }
    })
  }

  descripcionCategoria = true; //Descripción del cuadro que agrega categorías.
  ionChipCategoria: { [id: string]: string } = {}; //ion-chips (ID y nombre) que se crean en función de las categorías seleccionadas.
  checkboxCategoria: { [key: string]: boolean } = {}; //Estado de los checkBox que están en la lista de categorías.

  /**
   * @function crearIonChipCategoria - crea un ion-chip según la categoría seleccionada.
   * @param categoriaSeleccionada - categoría seleccionada de la lista. 
   */
  /*crearIonChipCategoria(categoriaSeleccionada: string, categoriaSeleccionadaID:string) {
    if (!this.ionChipCategoria.includes(categoriaSeleccionada)) { //Verificar si la categoría seleccionada está en la lista de ion-chips.
      this.ionChipCategoria.push(categoriaSeleccionada); //Agregar la categoría a los ion-chips.
      this.checkboxCategoria[categoriaSeleccionada] = true; //Marcar el checkbox de la categoría seleccionada como presionado.
      this.descripcionCategoria = false; //La descripción del cuadro categorías se oculta. 
    } else { //Si la categoría seleccionada ya está en los ion-chips, quitarla y marcar el checkbox como no presionado.
      this.eliminarIonChipCategoria(categoriaSeleccionada);
    }
  }*/
  crearIonChipCategoria(categoriaSeleccionadaID: string, categoriaSeleccionada: string) {
    if (!this.ionChipCategoria[categoriaSeleccionadaID]) { //Verificar si la categoría seleccionada está en la lista de ion-chips.
      this.ionChipCategoria[categoriaSeleccionadaID] = categoriaSeleccionada; //Agregar categoría a la lista de ion-chips usando el ID como clave y el nombre como valor.
      this.checkboxCategoria[categoriaSeleccionadaID] = true; //Marcar el checkbox de la categoría seleccionada como presionado.
      this.descripcionCategoria = false; //Ocultar la descripción del cuadro de categorías.
    } else { //Si la categoría seleccionada ya está en los ion-chips, quitarla y marcar el checkbox como no presionado.
      this.eliminarIonChipCategoria(categoriaSeleccionadaID);
    }
  }

  /**
   * @function checkboxCategoriaEstado - guarda el estado del checkbox presionado.
   * @param categoriaSeleccionada - categoría a la que esta asociada el checkbox. 
   * @returns - devuelve un checkbox en true con su categoría asociada, o un false.
   */
  checkboxCategoriaEstado(categoriaSeleccionada: string): boolean {
    return this.checkboxCategoria[categoriaSeleccionada] || false; //Verificar el estado del checkbox.
  }

  /**
   * @function eliminarIonChipCategoria - elimina los ion-chips creados.
   * @param categoriaSeleccionada
   */
  /*eliminarIonChipCategoria(categoriaSeleccionada: string) {
    this.ionChipCategoria = this.ionChipCategoria.filter(c => c != categoriaSeleccionada); //Borra el ion-chip de una categoría.
    this.checkboxCategoria[categoriaSeleccionada] = false; //Marcar el checkbox como no presionado.
    this.descripcionCategoria = this.ionChipCategoria.length == 0; //Si todos los ion-chips son borrados, devolver la visibilidad a la descripción.
  }*/
  eliminarIonChipCategoria(categoriaSeleccionadaID: string) {
    delete this.ionChipCategoria[categoriaSeleccionadaID]; //Borra el ion-chip de una categoría por ID.
    this.checkboxCategoria[categoriaSeleccionadaID] = false; //Marcar el checkbox como no presionado.
    this.descripcionCategoria = Object.keys(this.ionChipCategoria).length === 0; //Devolver la visibilidad a la descripción si no hay ion-chips.
  }
  //#endregion

  //#region Menú Variante.Color:

  listaColorPreBusqueda:any []=[]; //Debido a que la lista original filtrada no regresa a su estado original, sus datos se reemplazan con los datos de la lista pre-búsqueda.
  /**
   * @function buscarColor - Según el texto en el ion-searchbar filtra entre la lista de colores.
   * @param evento - El evento IonInput registra las teclas presionadas dentro del ion-searchbar.
   */
  buscarColor(evento: any) {
    const buscado = evento.target.value.toLowerCase();
    if (!buscado.trim()) { //Si no se esta buscando nada entonces...
      this.listaColores = this.listaColorPreBusqueda;
    } else {
      this.listaColores = this.listaColorPreBusqueda.filter((c) => c.name.toLowerCase().includes(buscado));
    }
  }

  nuevoColor: string = ''; //Nuevo color ingresada por el usuario.
  nuevoCodColor: string = ''; //Nuevo color en código hexadecimal ingresado por el usuario. 
  cartelBugColor: boolean = false; //En función de su estado se muestra o no el mensaje de error.
  /**
   * @function crearColor - crea un nuevo color en la base de datos.
   * @param idEtiqueta - ID de la etiqueta div que representa al cuadro que crea colores.
   */
  crearColor(idEtiqueta:string) {
    this.color.crearColor(this.nuevoColor,this.nuevoCodColor).subscribe({
      next: (r) => {
        const div=document.getElementById(idEtiqueta);
        if(div) {
          div.style.display='none'; //Oculta el cuadro de crear color.
          this.nuevoColor=''; //Borra el texto ingresado por usuario (el color recién creado).
          this.nuevoCodColor=''; //Borra el texto ingresado por usuario (el código color recién creado).
          this.cargarColores(); //Actualiza la lista de colores.
        }
      },
      error: (e) => {
        this.cartelBugColor=true; //Sino cargan los colores, muestra un cuadro notificándolo.
      }
    });
  }

  listaColores:any [] = []; //Listado de colores.
  errorCargarColores:boolean=false; //Según el estado se vuelve visible un div en HTML notificando un error de carga.
  /**
   * @function cargarColores - obtiene los colores del usuario logeado.
   */
  cargarColores() {
    this.color.obtenerColores().subscribe({
      next: (r) => {
        this.listaColores=r; //Rellena la lista de colores.
        this.listaColorPreBusqueda = this.listaColores; //Rellena una lista adicional para las búsquedas.
      },
      error: (e) => {
        this.errorCargarColores=true;
      }
    })
  }

  descripcionColor = true; //Descripción del cuadro que agrega colores.
  ionChipColor: string = ''; //Un solo ion-chip.
  ionChipColores: string[]=[] //Lista de ion-chips que se crean en función de los colores seleccionados.
  checkboxColores: { [key: string]: boolean } = {}; //Estado de los checkBox que están en la lista de colores.

  /**
   * @function crearIonChipColor - crea un ion-chip según el color seleccionado.
   * @param colorSeleccionado - categoría seleccionada de la lista. 
   */
  crearIonChipColor(colorSeleccionado: string) {
    this.ionChipColores.forEach(color => { //Deselecciona todos los colores previos para dar la ilusión de que solo se puede elegir uno.
      this.checkboxColores[color] = false;
    });

    if (!this.ionChipColores.includes(colorSeleccionado)) { //Verificar si el color seleccionada está en la lista de ion-chips.
      this.ionChipColor=colorSeleccionado; //Agrega el color al ion-chip que se mostrará en pantalla.
      this.ionChipColores.push(colorSeleccionado); //Agregar el color a la lista de ion-chips.
      this.checkboxColores[colorSeleccionado] = true; //Marcar el checkbox del color seleccionada como presionado.
      this.descripcionColor = false; //La descripción del cuadro colores se oculta.
      this.estaSeleccionado=true;
    } else { //Si el color seleccionado ya está en los ion-chips, quitarlo y marcar el checkbox como no presionado.
      this.eliminarIonChipColor(colorSeleccionado);
    }
  }

  /**
   * @function checkboxColorEstado - guarda el estado del checkbox presionado.
   * @param colorSeleccionado - color al que esta asociado el checkbox. 
   * @returns - devuelve un checkbox en true con su color asociado, o un false.
   */
  checkboxColorEstado(colorSeleccionado: string): boolean {
    return this.checkboxColores[colorSeleccionado] || false;
  }

  /**
   * @function eliminarIonChipColor - elimina los ion-chips creados.
   * @param colorSeleccionado
   */
  eliminarIonChipColor(colorSeleccionado: string) {
    this.ionChipColor='';
    this.ionChipColores = this.ionChipColores.filter(c => c != colorSeleccionado); //Borra el ion-chip de un color.
    this.checkboxColores[colorSeleccionado] = false; //Marcar el checkbox como no presionado.
    this.descripcionColor = this.ionChipColores.length == 0; //Si todos los ion-chips son borrados, devolver la visibilidad a la descripción.
    if(this.ionChipTallas.length==0) {
      this.estaSeleccionado=false;
    }
  }
  //#endregion

  //#region Menú Variante.Talla:

  listaTallaPreBusqueda:any []=[]; //Debido a que la lista original filtrada no regresa a su estado original, sus datos se reemplazan con los datos de la lista pre-búsqueda.
  /**
   * @function buscarTalla - Según el texto en el ion-searchbar filtra entre la lista de tallas.
   * @param evento - El evento IonInput registra las teclas presionadas dentro del ion-searchbar.
   */
  buscarTalla(evento: any) {
    const buscado = evento.target.value.toLowerCase();
    if (!buscado.trim()) { //Si no se esta buscando nada entonces...
      this.listaTallas = this.listaTallaPreBusqueda;
    } else {
      this.listaTallas = this.listaTallaPreBusqueda.filter((c) => c.name.toLowerCase().includes(buscado));
    }
  }

  nuevaTalla: string = ''; //Nueva talla ingresada por el usuario.
  nuevoCatTalla: string = ''; //Nueva categoría de la talla ingresado por el usuario. 
  cartelBugTalla: boolean = false; //En función de su estado se muestra o no el mensaje de error.
  /**
   * @function crearTalla - crea una nueva talla en la base de datos.
   * @param idEtiqueta - ID de la etiqueta div que representa al cuadro que crea tallas.
   */
  crearTalla(idEtiqueta:string) {
    this.talla.crearTalle(this.nuevaTalla).subscribe({
      next: (r) => {
        const div=document.getElementById(idEtiqueta);
        if(div) {
          div.style.display='none'; //Oculta el cuadro de crear talla.
          this.nuevaTalla=''; //Borra el texto ingresado por usuario (la talla recién creada).
          this.cargarTallas(); //Actualiza la lista de tallas.
        }
      },
      error: (e) => {
        this.cartelBugTalla=true; //Sino cargan los colores, muestra un cuadro notificándolo.
      }
    });
  }

  listaTallas:any [] = []; //Listado de colores.
  errorCargarTallas:boolean=false; //Según el estado se vuelve visible un div en HTML notificando un error de carga.
  /**
   * @function cargarTallas - obtiene las tallas del usuario logeado.
   */
  cargarTallas() {
    this.talla.obtenerTalles().subscribe({
      next: (r) => {
        this.listaTallas=r; //Rellena la lista de tallas.
        this.listaTallaPreBusqueda = this.listaTallas; //Rellena una lista adicional para las búsquedas.
      },
      error: (e) => {
        this.errorCargarTallas=true;
      }
    })
  }

  descripcionTalla = true; //Descripción del cuadro que agrega tallas.
  ionChipTalla: string = ''; //Ion-chip individual de talla.
  ionChipTallas: string[] = []; //Lista de ion-chips que se crean en función de las tallas seleccionadas.
  checkboxTallas: { [key: string]: boolean } = {}; //Estado de los checkBox que están en la lista de tallas.

  /**
   * @function crearIonChipTalla - crea un ion-chip según la talla seleccionada.
   * @param tallaSeleccionada - talla seleccionada de la lista. 
   */
  crearIonChipTalla(tallaSeleccionada: string) {
    this.ionChipTallas.forEach(talla => { //Deselecciona todos las tallas previas para dar la ilusión de que solo se puede elegir uno.
      this.checkboxTallas[talla] = false;
    });

    if (!this.ionChipTallas.includes(tallaSeleccionada)) { //Verificar si la talla seleccionada está en la lista de ion-chips.
      this.ionChipTalla=tallaSeleccionada; //Agrega la talla al ion-chip que se mostrará en pantalla.
      this.ionChipTallas.push(tallaSeleccionada); //Agregar la talla a la lista de ion-chips.
      this.checkboxTallas[tallaSeleccionada] = true; //Marcar el checkbox de talla seleccionada como presionado.
      this.descripcionTalla = false; //La descripción del cuadro tallas se oculta.
      this.estaSeleccionado=true;
    } else { //Si la talla seleccionada ya está en los ion-chips, quitarlo y marcar el checkbox como no presionado.
      this.eliminarIonChipTalla(tallaSeleccionada);
    }
  }

  /**
   * @function checkboxTallaEstadoo - guarda el estado del checkbox presionado.
   * @param tallaSeleccionada - talla que esta asociado el checkbox. 
   * @returns - devuelve un checkbox en true con su talla asociada, o un false.
   */
  checkboxTallaEstado(tallaSeleccionada: string): boolean {
    return this.checkboxTallas[tallaSeleccionada] || false;
  }

  /**
   * @function eliminarIonChipTalla - elimina los ion-chips creados.
   * @param tallaSeleccionada
   */
  eliminarIonChipTalla(tallaSeleccionada: string) {
    this.ionChipTalla='';
    this.ionChipTallas = this.ionChipTallas.filter(c => c != tallaSeleccionada); //Borra el ion-chip de una talla.
    this.checkboxTallas[tallaSeleccionada] = false; //Marcar el checkbox como no presionado.
    this.descripcionTalla = this.ionChipTallas.length == 0; //Si todos los ion-chips son borrados, devolver la visibilidad a la descripción.
    if(this.ionChipColores.length==0) {
      this.estaSeleccionado=false;
    }
  }
  //#endregion

  estaSeleccionado:boolean=false; //Verifica si color o talle está seleccionado en el menú variantes.
  productoVarianteCreado:boolean=false; //Verifica si se creó o no un producto con variante.
  /**
   * @function crearVariante - crea un producto con color y/o talla.
   */
  crearVariante() {
    this.productoVarianteCreado=true;
    var productosVariantes:any[]=[];
  }

  /**
   * @function mostrarEtiquetaOculta - vuelve visible las etiquetas ocultas.
   * @param idEtiqueta - ID de la etiqueta a visibilizar.
   */
  mostrarEtiquetaOculta(idEtiqueta:string) {
    const etiqueta=document.getElementById(idEtiqueta);
    if(etiqueta) {
      etiqueta.style.display='block';
    }
  }

  /**
   * @function crearProducto - inserta un producto en la base de datos.
   */
  crearProducto() {
    if (this.formProducto.valid) { //Si el formulario está validado entonces...
      const datos=this.formProducto.value; //Guardo los datos validados.
      var fotos:File[]=[];
      fotos.push(datos.fotoProducto1);
      fotos.push(datos.fotoProducto2);
      fotos.push(datos.fotoProducto3);
      fotos.push(datos.fotoProducto4);
      /*this.producto.crearProducto(datos.nombreProducto,datos.descripcionProducto,datos.precioProducto,this.idUsuario,fotos,).subscribe({
        next: (e) => {

        },
        error: (e) => {

        }
      })*/
    }
  }
}
