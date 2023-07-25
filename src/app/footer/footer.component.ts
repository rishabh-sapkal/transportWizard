import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnchorNavigationService } from '../anchor-navigation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  @ViewChild('contactUs') contactUs! : ElementRef;
  
  constructor(  private anchorNavigationService: AnchorNavigationService){

  }
  
  ngOnInit(): void {
    this.anchorNavigationService.navigation$.subscribe((navigateTo: string)=>{
      if(navigateTo === 'contactUs'){
        this.contactUs.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
      }
    })
  }
}
