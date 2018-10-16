import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
// import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-load',
  templateUrl: 'load.html',
})
export class LoadPage {

  private uname: string;
  private utoken: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    // public userProvider: UserProvider,
    public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadPage');
    this.checkLogin();
  }

  async checkLogin() {
    let loader = this.loadingCtrl.create({ spinner: 'dots', content: 'Logging...' });
    await this.storage.get('uname')
      .then((res) => {
        this.uname = res;
      });
    await this.storage.get('utoken')
      .then((res) => {
        this.utoken = res;
      });

    console.log(this.uname, this.utoken)

    if (this.uname && this.utoken) {

      loader.dismiss();
      console.log('already login');
      this.navCtrl.setRoot(TabsPage);
    } else {
      loader.dismiss();
      this.navCtrl.setRoot(LoginPage);
    }
  }

}
