import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  constructor(private alerta:AlertController,private menu: MenuController) { }

  ngOnInit() {
  }

  abrirMenu() {
    this.menu.toggle('tuMenuId'); // Reemplaza 'tuMenuId' con el ID de tu ion-menu
  }

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
}
