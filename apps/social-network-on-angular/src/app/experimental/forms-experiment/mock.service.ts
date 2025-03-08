import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Feature {
  code: string;
  label: string;
  value: boolean;
}

@Injectable({ providedIn: 'root' })
export class MockService {
  getAddresses() {
    return of([
      {
        dateOfDispatch: '2024-12-25',
        dateOfReceipt: '2024-12-28',
        city: 'Москва',
        street: 'Тверская',
        building: 14,
        warehouse: 32,
      },
      {
        dateOfDispatch: '2024-12-25',
        dateOfReceipt: '2024-12-28',
        city: 'Санкт-Петербург',
        street: 'Ленина',
        building: 100,
        warehouse: 30,
      },
    ]);
  }

  getFeatures(): Observable<Feature[]> {
    return of([
      {
        code: 'lift',
        label: 'Подъем на этаж',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true,
      },
      {
        code: 'fast',
        label: 'Ускоренная доставка',
        value: false,
      },
    ]);
  }
}
