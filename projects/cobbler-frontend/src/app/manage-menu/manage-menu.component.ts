import {Component} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})
export class ManageMenuComponent {

  constructor(public router: Router) {
  }
}
