import {Component, inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MockService} from './mock.service';

import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';

import mask from './mask';

enum ReciverType {
  COAL = 'COAL',
  GAS = 'GAS',
  OIL = 'OIL',
}

interface Address {
  dateOfDispatch?: string
  dateOfReceipt?: string
  city?: string
  street?: string
  building?: number | null
  warehouse?: number | null
}

function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    dateOfDispatch: new FormControl<string>(initialValue.dateOfDispatch ?? ''),
    dateOfReceipt: new FormControl<string>(initialValue.dateOfReceipt ?? ''),
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    warehouse: new FormControl<number | null>(initialValue.warehouse ?? null)
  })
}

@Component({
  selector: 'app-forms-experiment',
  standalone: true,
  imports: [
    ReactiveFormsModule, MaskitoDirective
  ],
  templateUrl: './forms-experiment.component.html',
  styleUrl: './forms-experiment.component.scss'
})
export class FormsExperimentComponent {

  mockService = inject(MockService)

  ReciverType = ReciverType

  readonly options: MaskitoOptions = mask;

  form = new FormGroup({
    type: new FormControl<ReciverType>(ReciverType.COAL),
    ton: new FormControl<string>('', Validators.required),
    cubicMeter: new FormControl<string>('', Validators.required),
    barrel: new FormControl<string>('', Validators.required),
    company: new FormControl<string>('', Validators.required),
    addresses: new FormArray([getAddressForm()]),
  })

  constructor() {
    this.mockService.getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe(addrs => {

        this.form.controls.addresses.clear()

        for (const addr of addrs) {
          this.form.controls.addresses.push(getAddressForm(addr))
        }
      })
  }

  addAddress() {
    this.form.controls.addresses.push(getAddressForm())
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {emitEvent: false})
  }

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return
  }
}
