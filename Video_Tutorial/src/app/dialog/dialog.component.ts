import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public productForm: FormGroup;
  public actionButton: string;


  constructor(private fb: FormBuilder, private productService: ProductService, private dialogref: DialogRef,
    @Inject(MAT_DIALOG_DATA) public editData: any) {
    this.actionButton = "Save";
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      price: ['', Validators.required],
      comments: ['', Validators.required]
    });
  }
  ngOnInit() {
    if (this.editData) {
      this.productForm.patchValue(this.editData);
      this.actionButton = 'Update';
    }
  }
  onSave() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.productService.postData(this.productForm.value).subscribe((result) => {
          console.log(result);
          alert("Data Entered Sucessfully");
          this.productForm.reset();
          this.dialogref.close();
        });
      }
      else {
        alert("Please Fill All The Fields")
      }
    }
    else {
      this.productService.updateData(this.editData.id, this.productForm.value).subscribe((result) => {
        console.log(result);
        this.dialogref.close();
        alert("Updated Successfully")
      })
    }
  }
}
