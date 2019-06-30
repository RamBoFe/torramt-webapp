import { Component, OnInit } from '@angular/core';
import { FtpService } from '../../services/api/ftp/ftp.service';

@Component({
  selector: 'app-ftp',
  templateUrl: './ftp.component.html',
  styleUrls: ['./ftp.component.scss']
})
export class FtpComponent implements OnInit {
  files: Array<any>;
  breadcrumbs: Array<string> = [];

  constructor(private ftpService: FtpService) { }

  async ngOnInit(): Promise<any> {
    this.files = await this.ftpService.getList();
  }

  async move(folder = ''): Promise<any> {
    const path = this.breadcrumbs.join('/');
    this.files = await this.ftpService.getList(`/${path}/${folder}`);
    this.breadcrumbs.push(folder);
  }
}
