// import { Component, Input, OnInit } from '@angular/core';
// import { LoaderService } from '../../services/loader.service';
// import { EndPointInterface } from './loader.interface';
//
// @Component({
//   selector: 'app-loader',
//   templateUrl: './loader.component.html',
//   styleUrls: ['./loader.component.scss']
// })
// export class LoaderComponent implements OnInit {
//
//   @Input() htmlType = 'block';
//   @Input() color = 'text-primary';
//   @Input() name: string = undefined;
//   @Input() endPoint: EndPointInterface = undefined;
//   @Input() once = false;
//   @Input() align: 'start' | 'center' | 'end' = 'start';
//
//   show = true;
//   type = 'spinner-grow';
//   blockClasses = '';
//   inlineClasses = '';
//
//   constructor(private readonly loaderService: LoaderService) {}
//
//   ngOnInit(): void {
//     this.subscribeToLoaderService();
//     this.setBlockClasses();
//     this.setInlineClasses();
//     this.display();
//   }
//
//   private display(): void {
//     this.loaderService.isLoading.subscribe(loaderName => this.show = (this.name === loaderName));
//   }
//
//   private setBlockClasses(): void {
//     this.blockClasses = `${this.type} ${this.color}`;
//   }
//
//   private setInlineClasses(): void {
//     this.inlineClasses = `${this.type} ${this.color} spinner-grow-sm`;
//   }
//
//   private subscribeToLoaderService(): void {
//     if (this.name && this.endPoint) {
//       let url = this.endPoint.url;
//
//       if (this.endPoint.param) {
//         const json = JSON.stringify(this.endPoint.param.value);
//         const param = encodeURI(`${this.endPoint.param.key}=${json}`);
//         url = `${this.endPoint.url}?${param}`;
//       }
//
//       this.loaderService.loaders.set(url, this.name);
//       if (this.once) {
//         this.loaderService.once.set(this.name, false);
//       }
//     }
//   }
// }
