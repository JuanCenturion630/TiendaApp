import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  constructor(private alerta:AlertController,private menu:MenuController) { }

  ngOnInit() {
  }

  //#region Fotos:

  openFileInput(id:string) {
    document.getElementById(id)?.click();
  }

  handleImageChange(event: any, idBtn:string, idIcon:string, idSpan:string, idBtnBorrar:string) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageURL = e.target.result;
        const button = document.getElementById(idBtn);
        const icon = document.getElementById(idIcon);
        const span = document.getElementById(idSpan);
        const btnBorrar = document.getElementById(idBtnBorrar);

        if (button&&icon&&span&&btnBorrar) {
          //Debido a que el botón tenía previamente un color de fondo (celeste) es necesario volverlo transparente
          //para poder insertar la imagen.
          button.setAttribute('style', '--background: transparent; height: 130px; width: 173px;');
          button.style.background = `url(${imageURL})`;
          button.style.backgroundSize = 'cover'; // Ajusta según tus necesidades
          icon.style.display='none';
          span.style.display='none';
          btnBorrar.style.display='block';
        }
      };
      reader.readAsDataURL(file);
    }
  }

  borrarFoto(idBtn:string,idIcono:string,idSpan:string,idBtnBorrar:string) {
    const button = document.getElementById(idBtn);
    const icon = document.getElementById(idIcono);
    const span = document.getElementById(idSpan);
    const btnBorrar = document.getElementById(idBtnBorrar);

    if(button&&icon&&span&&btnBorrar) {
      button.style.background = '#deeffe';
      button.style.border='2px dashed #006bc8';
      icon.style.display = 'block';
      span.style.display = 'block';
      btnBorrar.style.display = 'none';
    }
  }

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

  //#region Guardar Categoría, Color, Talle:

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
}
