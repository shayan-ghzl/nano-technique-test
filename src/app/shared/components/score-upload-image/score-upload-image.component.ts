import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-score-upload-image',
  templateUrl: './score-upload-image.component.html',
  styleUrls: ['./score-upload-image.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ScoreUploadImageComponent
    }
  ]
})
export class ScoreUploadImageComponent implements ControlValueAccessor {

  toastMessage = '';
  showToastError = false;

  imagesInterface: string[] = ['', '', '', '', ''];

  images: string[] = [];

  onChange = (images: string[]) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  writeValue(obj: string[]): void {
    this.images = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  async selectImage(index: number) {
    this.markAsTouched();
    if (!this.disabled) {
      await Camera.checkPermissions()
        .then(async (response) => {
          if (response.camera == 'granted') {
            await this.captureImage(index);
          } else {
            await this.cameraRequestPermission(index);
          }
        })    
        .catch((error) => {
          this.toastMessage = 'خطایی رخ داد لطفا دوباره امتحان کنید.';
          this.showToastError = true;
          console.log('Camera check permission denied');
        });
    }
  }

  async captureImage(index: number){
    await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    })
    .then((image) => {
      if (image.webPath) {
        this.images.push(image.webPath);
        this.imagesInterface[index] = image.webPath;
        this.onChange(this.images);
      }
    })
    .catch((error) => {
      this.toastMessage = 'خطایی رخ داد لطفا دوباره امتحان کنید.';
      this.showToastError = true;
      console.log('upload photo canceled');
    });
  }

  async cameraRequestPermission(index: number) {
    await Camera.requestPermissions()
      .then(async (response) => {
        if (response.camera === 'granted') {
          await this.captureImage(index);
        } else {
          this.toastMessage = 'لطفا دسترسی لازم را بدهید.';
          this.showToastError = true;
          console.log('Camera permission not granted');
        }
      })
      .catch((error) => {
        this.toastMessage = 'خطایی رخ داد لطفا دوباره امتحان کنید.';
        this.showToastError = true;
        console.log('upload photo canceled');
      });
  }

}