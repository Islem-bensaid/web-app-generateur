import { Component, OnInit } from '@angular/core';
import { CONFIG } from '@shared/constantes/config';

@Component({
  selector: 'st2i-private-layout-footer',
  templateUrl: './private-layout-footer.component.html',
  styleUrls: ['./private-layout-footer.component.css']
})
export class PrivateLayoutFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (document.querySelector(':root') as HTMLElement).style.setProperty('--footer_min_height_lt_md', CONFIG.PRIVATE_LAYOUT.footer.min_height.lt_md);
    (document.querySelector(':root') as HTMLElement).style.setProperty('--footer_min_height_gt_md', CONFIG.PRIVATE_LAYOUT.footer.min_height.gt_md);
    (document.querySelector(':root') as HTMLElement).style.setProperty('--footer_max_height', CONFIG.PRIVATE_LAYOUT.footer.max_height.lt_md);
  }

}
