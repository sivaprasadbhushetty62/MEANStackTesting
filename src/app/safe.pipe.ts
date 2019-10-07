import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer : DomSanitizer){}
  transform(url: any): any {
    url = url.replace("watch?v=", "embed/");
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
