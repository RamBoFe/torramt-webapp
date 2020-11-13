import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { EndPointInterface } from './loader.interface';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() htmlType = 'block';
  @Input() color = 'text-primary';
  @Input() name: string = undefined;
  @Input() endPoint: EndPointInterface = undefined;
  // @Input() endPointParams: { key: string, value: string | object, keyId: string } = undefined;

  show = false;
  type = 'spinner-grow';
  blockClasses = '';
  inlineClasses = '';

  constructor(private readonly loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscribeToLoaderService();
    this.setBlockClasses();
    this.setInlineClasses();
    this.display();
  }

  private display(): void {
    this.loaderService.isLoading.subscribe(loaderName => this.show = (this.name === loaderName));
  }

  private setBlockClasses(): void {
    this.blockClasses = `${this.type} ${this.color}`;
  }

  private setInlineClasses(): void {
    this.inlineClasses = `${this.type} ${this.color} spinner-grow-sm`;
  }

  private subscribeToLoaderService(): void {
    this.loaderService.loadersList.set(this.name, this.endPoint);
  }
}
