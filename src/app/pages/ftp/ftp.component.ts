import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { FtpService } from '../../services/api/ftp/ftp.service';
import { NasService } from '../../services/api/nas/nas.service';

@Component({
  selector: 'app-ftp',
  templateUrl: './ftp.component.html',
  styleUrls: ['./ftp.component.scss']
})
export class FtpComponent implements OnInit {
  files: Array<any>;
  breadcrumbs: Array<string> = [];
  modalRef: MDBModalRef;

  constructor(private ftpService: FtpService,
              private nasService: NasService,
              private modalService: MDBModalService) { }

  async ngOnInit(): Promise<any> {
    this.files = await this.ftpService.getList();
  }

  async move(folder = ''): Promise<any> {
    const path = this.breadcrumbs.join('/');
    this.files = await this.ftpService.getList(`/${path}/${folder}`);
    this.breadcrumbs.push(folder);
  }

  async transfertToNas(folder: string, type: string): Promise<any> {
    const path = this.breadcrumbs.join('/');
    const ok = await this.nasService.transferToNas(`/${path}/${folder}`, type);
    console.log(ok);
  }
}
