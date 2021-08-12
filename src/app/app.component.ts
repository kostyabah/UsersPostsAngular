import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormArray, FormGroup, AbstractControl} from '@angular/forms';
import {users} from "./userData"

let builderSkill = (fb: FormBuilder, data: any):FormArray | FormGroup => {
  if(Array.isArray(data)){
    return <FormArray>fb.array(data.map(item => builderSkill(fb, item)))
  }else{
    return <FormGroup>fb.group(Object.entries(data).reduce(
      (acc, [key, value]) =>({
        ...acc,
        [key]: typeof value === "object" ? builderSkill(fb, value) : value
      }),
      {}
    ))
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  usersForm : FormGroup;
  constructor(private fb: FormBuilder){
    this.usersForm = this.fb.group({
      users: builderSkill(this.fb, users)
    });
    console.log(this.usersForm.value)
    console.log(this.usersForm.get('users'))
    console.log(this.usersForm.get("users.0.posts"))//.get("firstName"))
  }
  ngOnInit(){

  }
  getUsers() : FormArray {
    return <FormArray>this.usersForm.controls.users
    //this.usersForm.controls.users
  }
  getPosts(i:number){
    return <FormArray>this.usersForm.get(`users.${i}.posts`)
  }
  toogleTitle(post: AbstractControl):boolean{
    return !(post as FormGroup).controls.canEditTitle.value
  }
  getBody(post: AbstractControl){
    return (post as FormGroup).controls.body.value
  }
  deletePost(userId: number, postId: number): void{
    //let postId : number = post.value.id;
    console.log(postId);
    ((this.getUsers() as FormArray)
      .get(`${userId}.posts`) as FormArray).removeAt(postId)
  }
}
