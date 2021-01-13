import { Component, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'eden-workspace-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy{
  @Output() closeModal = new EventEmitter();

  constructor(private el: ElementRef) { }


  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
  }


  onClickClose() {
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }
}
