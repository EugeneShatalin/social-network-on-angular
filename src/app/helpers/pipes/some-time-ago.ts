import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'someTimeAgo',
  standalone: true
})
export class SomeTimeAgoPipe implements PipeTransform {

  transform(value: string | null): string | null  {
    if (!value) return null;
    const now = Date.now();
    const timePost = Date.parse(value)

    const differenceInMinutes = Math.round(((now - timePost) / 1000 / 60));

    if (differenceInMinutes <= 60) {
      return `${differenceInMinutes} минут назад`;
    }

    if (differenceInMinutes <= 1440) {
      return `${Math.floor(differenceInMinutes / 60)} часов ${differenceInMinutes % 60} минут назад`
    }

    if (differenceInMinutes <= 1440) {
      return `${Math.floor(differenceInMinutes / 60)} часов ${differenceInMinutes % 60} минут назад`
    }

    if (differenceInMinutes > 1440) {
      const hours = differenceInMinutes % 1440
      return `${Math.floor(differenceInMinutes / 1440)} дней ${Math.floor(hours / 60)} часов ${hours % 60} минут назад`
    }

    return "";
  }
}
