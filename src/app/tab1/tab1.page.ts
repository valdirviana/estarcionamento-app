import { Infration } from './IInfration';
import { Component, Input, ViewChild } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  infrations: Array<Infration>;
  @Input() plate: string;

  constructor(private http: Http, public toastController: ToastController) {
    this.plate = '';
  }

  searchInfrations() {
    if (this.plate.length !== 7) {
      this.presentToast('Informe uma placa válida para realizar a busca', true);
      return;
    }

    const retorno = this.http.get(`http://18.228.207.173:5000/api/checkplate/${this.plate}`)
      .subscribe(
        resp => {
          const infrations = JSON.parse(resp.text());

          if (infrations.length > 0) {
            this.infrations = Array.from(infrations);
          } else {
            this.presentToast('Não foram encontrados infrações para a placa informada!', false);
          }
        },
        error => {
          this.presentToast('Ocorreu algum erro em sua solicitação tente novamente mais tarde', true);
        });
  }

  async presentToast(msg: string, showCloseBtn: boolean) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      showCloseButton: showCloseBtn,
      closeButtonText: 'Ok',
      animated: true,
      color: 'dark'
    });
    toast.present();
  }
}
