import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage {

  constructor(private alerta:AlertController,private menu:MenuController) { }

  //#region Fotos:

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

  //#region Crear Categoría, Color, Talle:

  nuevaCategoria: string = '';
  guardarCategoria(idEtiqueta:string) {
    // Aquí puedes poner la lógica para guardar la categoría
    console.log('Categoría guardada:', this.nuevaCategoria);
    const div=document.getElementById(idEtiqueta);
    if(div) {
      div.style.display='none';
      this.nuevaCategoria='';
    }
  }

  nuevoColor: string = '';
  guardarColor(idEtiqueta:string) {
    // Aquí puedes poner la lógica para guardar la categoría
    console.log('Color guardado:', this.nuevoColor);
    const div=document.getElementById(idEtiqueta);
    if(div) {
      div.style.display='none';
      this.nuevoColor='';
    }
  }

  nuevaTalla: string = '';
  guardarTalla(idEtiqueta:string) {
    // Aquí puedes poner la lógica para guardar la categoría
    console.log('Color guardado:', this.nuevaTalla);
    const div=document.getElementById(idEtiqueta);
    if(div) {
      div.style.display='none';
      this.nuevaTalla='';
    }
  }

  mostrarEtiqueta(idEtiqueta:string) {
    const etiqueta=document.getElementById(idEtiqueta);
    if(etiqueta) {
      etiqueta.style.display='block';
    }
  }
  //#endregion

  //#region IonChips de Categorías;

  descripcionVisible = true;
  ionChips: string[] = [];
  checkboxState: { [key: string]: boolean } = {};

  toggleCheckbox(item: string) {
    // Verificar si la categoría ya está en la lista
    if (!this.ionChips.includes(item)) {
      // Agregar la categoría a la lista de ion-chips
      this.ionChips.push(item);
      // Marcar el checkbox como presionado
      this.checkboxState[item] = true;
      this.descripcionVisible = false;
    } else {
      // Si ya está en la lista, quitarla y marcar el checkbox como no presionado
      this.eliminarIonChip(item);
    }
  }

  isCheckboxChecked(item: string): boolean {
    // Verificar el estado del checkbox
    return this.checkboxState[item] || false;
  }

  eliminarIonChip(item: string) {
    // Eliminar el ion-chip de la lista
    this.ionChips = this.ionChips.filter(c => c !== item);
    // Marcar el checkbox como no presionado
    this.checkboxState[item] = false;
    // Actualizar la visibilidad según la longitud de la lista
    this.descripcionVisible = this.ionChips.length === 0;
  }
  //#endregion

  //#region IonChips de Color y talla:

  isItemSelected: boolean = false;
  descripcionVisibleVariantes = true;
  ionChipsVariantes: string[] = [];
  checkboxStateVariantes: { [key: string]: boolean } = {};

  toggleCheckboxVariantes(item: string) {
    // Verificar si la categoría ya está en la lista
    if (!this.ionChipsVariantes.includes(item)) {
      // Agregar la categoría a la lista de ion-chips
      this.ionChipsVariantes.push(item);
      // Marcar el checkbox como presionado
      this.checkboxStateVariantes[item] = true;
      //this.descripcionVisibleVariantes = false;
    } 
    else {
      // Si ya está en la lista, quitarla y marcar el checkbox como no presionado
      this.eliminarIonChipVariantes(item);
    }
    // Verificar si hay algún elemento seleccionado en cualquiera de las listas
    this.isItemSelected = this.ionChipsVariantes.length > 0;
  }

  isCheckboxCheckedVariantes(item: string): boolean {
    // Verificar el estado del checkbox
    return this.checkboxStateVariantes[item] || false;
  }

  eliminarIonChipVariantes(item: string) {
    // Eliminar el ion-chip de la lista
    this.ionChipsVariantes = this.ionChipsVariantes.filter(c => c !== item);
    // Marcar el checkbox como no presionado
    this.checkboxStateVariantes[item] = false;
    // Actualizar la visibilidad según la longitud de la lista
    //this.descripcionVisibleVariantes = this.ionChipsVariantes.length === 0;
    // Verificar si hay algún elemento seleccionado en cualquiera de las listas
    this.isItemSelected = this.ionChipsVariantes.length > 0;
  }

  crearVariante() {
    
  }
  //#endregion

  crearProducto() {
    
  }
}
