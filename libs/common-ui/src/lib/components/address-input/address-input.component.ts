import {Component, forwardRef, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {TtInputComponent} from '../tt-input/tt-input.component';
import {DadataServices} from '../../data';
import {debounceTime, switchMap, tap} from 'rxjs';
import {DadataSuggestion} from '../../data/interfaces/dadata.interface';

@Component({
  selector: 'tt-address-input',
  standalone: true,
  imports: [CommonModule, TtInputComponent, ReactiveFormsModule],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    }
  ]
})
export class AddressInputComponent implements ControlValueAccessor {
  innerSearchControl = new FormControl();
  #dadataService = inject(DadataServices)
  console = console;

  isDropdownOpened = signal<boolean>(true)

  addressForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    house: new FormControl(''),
  })

  suggestions$ = this.innerSearchControl.valueChanges
    .pipe(
      debounceTime(1000),
      switchMap(val => {
        return this.#dadataService.getSuggestion(val)
          .pipe(
            tap(res => {
              this.isDropdownOpened.set(!!res.length)
            })
          )
      })
    )

  writeValue(city: string): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
  }

  onChange(value: any) {
    this.onChange(value)
  }

  onTouched() {
  }

  onSuggestionPick(suggest: DadataSuggestion) {
    this.isDropdownOpened.set(false)
    let address = `${suggest.data.city || ''} ${suggest.data.street || ''} ${suggest.data.house || ''}`
    this.addressForm.patchValue({
      city: suggest.data.city,
      street: suggest.data.street,
      house: suggest.data.house,
    })
    this.innerSearchControl.patchValue(address, {
      emitEvent: false
    })
    this.onChange(address)
  }

  /*onSuggestionPick(city: string) {
    this.isDropdownOpened.set(false)
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    })
    this.onChange(city)
  }*/
}
