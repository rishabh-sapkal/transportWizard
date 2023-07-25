import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnchorNavigationService } from '../anchor-navigation.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  constructor(
    private router: Router,
    private anchorNavigationService: AnchorNavigationService
  ) {}

  navigateTo(link: string) {
    this.router.navigate([`${link}`]);
  }

  handleNavigation(navigateTo: string) {
    this.anchorNavigationService.navigateTo(navigateTo);
  }
}
