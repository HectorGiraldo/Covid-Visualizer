import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private loader: HTMLIonLoadingElement;

  constructor(
    public loadingCtrl: LoadingController
  ) { }


  async presentLoader(loadCtrl: LoadingController, message, callback?) {
    this.loader = await loadCtrl.create({
      spinner: 'crescent',
      showBackdrop: true,
      message
    });

    await this.loader.present().then(
      () => {
        if (callback) {
          callback();
        }
      }
    );
  }

  dismissLoader() {
    if (this.loader) {
      this.loader.dismiss();
    }
  }
}
