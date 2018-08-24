import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  classroom: any = {};

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.getClassroom();
  }

  async getClassroom() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    
    await this.api.getClassroomById(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.classroom = res.doc;
        console.log(this.classroom);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async delete(_id) {
    const loading = await this.loadingController.create({
      content: 'Deleting'
    });
    await loading.present();
    await this.api.deleteClassroom(_id)
      .subscribe(res => {
        loading.dismiss();
        this.router.navigate(['/list']);
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  edit(_id) {
    this.router.navigate(['/edit', _id]);
  }

}