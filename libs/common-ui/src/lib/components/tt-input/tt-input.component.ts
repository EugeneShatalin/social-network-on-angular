import {Component, forwardRef, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '@tt/auth';

@Component({
  selector: 'tt-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInputComponent)
    }
  ]
})
export class TtInputComponent implements ControlValueAccessor{
  type=input<'text' | 'password'>('text')
  placeholder=input<string>()

  onChange: any
  onTouched: any

  value: string | null = null

  writeValue(val: string | null) {
    this.value = val
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
  }

  ngModelChange(val: string | null): void {
    this.onChange(val)
  }

}
