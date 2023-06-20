import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface StarRating{
  rate: number;
  isActive: boolean;
}

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StarRatingComponent
    }
  ]
})
export class StarRatingComponent implements ControlValueAccessor {

  rate!: number;

  list: StarRating[] = [
    {
      rate: 5,
      isActive: false
    },
    {
      rate: 4,
      isActive: false
    },
    {
      rate: 3,
      isActive: false
    },
    {
      rate: 2,
      isActive: false
    },
    {
      rate: 1,
      isActive: false
    },
  ];

  onChange = (rate: number) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  writeValue(obj: number): void {
    this.rate = obj;
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

  select(item: StarRating) {
    this.markAsTouched();
    if (!this.disabled) {
      this.list.forEach((element) => {
        element.isActive = false;
      });
      item.isActive = true;
      this.rate = item.rate;
      this.onChange(this.rate);
    }
  }
  
  timerId: any;
  handleTouchMove(event: TouchEvent, container: HTMLElement) {
    event.preventDefault();
    const containerRect = container.getBoundingClientRect();
    const diff = event.touches[0].clientX - containerRect.left;
    const clientX = (diff > 149) ? 149 : (diff < 0) ? 0 : diff;
    const rating = Math.floor(clientX / 30) + 1;
    this.list.forEach((element) => {
      element.isActive = false;
    });
    const item = this.list[Math.abs(rating - 5)];
    item.isActive = true;
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.rate = item.rate;
      this.onChange(this.rate);
    }, 500);
  }

}
