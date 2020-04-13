import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  @Input() htmlType = 'block';
  @Input() color = 'text-primary';

  type = 'spinner-grow';

  getBlockClasses(): string {
    return `${this.type} ${this.color}`;
  }

  getInlineClasses(): string {
    return `${this.type} ${this.color} spinner-grow-sm`;
  }
}
