import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  classroomForm: FormGroup;
  students: FormArray;

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
    this.getClassroom(this.route.snapshot.paramMap.get('id'));
    this.classroomForm = this.formBuilder.group({
      'class_name' : [null, Validators.required],
      'students' : this.formBuilder.array([])
    });
  }

  ngOnInit() {
  }

  get studentData() {
    return <FormArray>this.classroomForm.get('students');
  }

  async getClassroom(id) {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.api.getClassroomById(id).subscribe(res => {
      this.classroomForm.controls['class_name'].setValue(res.doc.class_name);
      let controlArray = <FormArray>this.classroomForm.controls['students'];
      res.doc.students.forEach(std => {
        controlArray.push(this.formBuilder.group({
           student_name: ''
        }));
      });
      for(let i=0;i<res.doc.students.length;i++) {
        controlArray.controls[i].get('student_name').setValue(res.doc.students[i].student_name);
      }
      console.log(this.classroomForm);
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  addBlankStudent(): void {
    this.students = this.classroomForm.get('students') as FormArray;
    this.students.push(this.createStudent());
  }

  deleteStudent( index) {
    // console.log(control);
    this.students = this.classroomForm.get('students') as FormArray;
    // control.removeAt(index)
    this.students.removeAt(index);
  }

  createStudent(): FormGroup {
    return this.formBuilder.group({
      student_name: ''
    });
  }

  async updateClassroom(){
    await this.api.updateClassroom(this.route.snapshot.paramMap.get('id'), this.classroomForm.value)
    .subscribe(res => {
        let id = res.docs._id;
        console.log(res.docs._id);
        this.router.navigate(['/detail/'+id]);
      }, (err) => {
        console.log(err);
      });
  }

}
