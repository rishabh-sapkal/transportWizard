import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnchorNavigationService } from '../anchor-navigation.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit{

  @ViewChild('faq') faq! : ElementRef;

constructor(  private anchorNavigationService: AnchorNavigationService){

}

ngOnInit(): void {
  this.anchorNavigationService.navigation$.subscribe((navigateTo: string)=>{
    if(navigateTo === 'faq'){
      this.faq.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    }
  })
}

}
