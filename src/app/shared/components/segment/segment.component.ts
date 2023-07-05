import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface AppSegment{
  label: string;
  value: number;
}

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SegmentComponent
    }
  ]
})
export class SegmentComponent implements ControlValueAccessor {

  activeSegmentValue!: number;
  @Input({required: true}) segment!: AppSegment[];


  onChange = (value: number) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  writeValue(obj: number): void {
    this.activeSegmentValue = obj;
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

  select(item: AppSegment) {
    this.markAsTouched();
    if (!this.disabled) {
      this.activeSegmentValue = item.value;
      this.onChange(this.activeSegmentValue);
    }
  }
}
