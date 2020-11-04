import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() htmlType = 'block';
  @Input() color = 'text-primary';
  @Input() name: string = undefined;

  show = false;
  type = 'spinner-grow';
  blockClasses = '';
  inlineClasses = '';

  constructor(private readonly loaderService: LoaderService) {}

  ngOnInit(): void {
    this.display();
    this.getBlockClasses();
    this.getInlineClasses();
  }

  private display(): void {
    this.loaderService.isLoading.subscribe(loaderName => this.show = (this.name === loaderName));
  }

  private getBlockClasses(): void {
    this.blockClasses = `${this.type} ${this.color}`;
  }

  private getInlineClasses(): void {
    this.inlineClasses = `${this.type} ${this.color} spinner-grow-sm`;
  }
}
