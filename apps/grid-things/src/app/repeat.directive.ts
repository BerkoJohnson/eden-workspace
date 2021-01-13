import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[repeatTimes]'
})
export class RepeatDirective {

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  @Input('repeatTimes') set render(times: number) {
    for(let i=0; i<times; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {
        index:i
      })
    }
  }

}
