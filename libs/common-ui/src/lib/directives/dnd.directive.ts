import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[dnd]',
  standalone: true,
})
export class DndDirective {
  @Output() fileDropped = new EventEmitter<File>();

  //HostBinding добавляет класс fileover элементу на котором используется эта деректива, если fileover = true
  @HostBinding('class.fileover')
  fileover = false;

  //HostListener слушатель событий
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileover = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileover = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false;

    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }
}
