import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert',
})
export class ConvertPipe implements PipeTransform {
  convertionRate = 1;

  transform(value: any, targetUnits: string): unknown {
    if (!value) {
      return '';
    }

    switch (targetUnits) {
      case 'cm':
        return value * 160934;
        break;
      case 'm':
        return value * 1609.34;
        break;
      case 'km':
        return value * 1.60934;
        break;
      case 'yard':
        return value * 1760;
        break;
      case 'inch':
        return value * 63360;
        break;
      case 'foot':
        return value * 5280;
        break;
      default:
        return value;
    }
  }
}
