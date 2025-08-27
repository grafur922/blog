import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { ArticleFormData } from '../interfaces/articleFormData';
import { computed } from '@angular/core';
interface Month{
  [k:number]:string
}
@Component({
  selector: 'app-recent-card',
  imports: [],
  templateUrl: './recent-card.component.html',
  styleUrl: './recent-card.component.less',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RecentCardComponent {
  constructor() {}

  recentData = input<ArticleFormData>()
  
  public day = computed(() => {
    const data = this.recentData();
    if (!data || !data.createTime) {
      return '1';
    }
    const pattern = /\d{4}-(\d{2})-(\d{2})/;
    const match = data.createTime.match(pattern);
    if (match) {
      return match[2]
    } else {
      return '1'; 
    }
  });

  public month=computed(() =>{
    const data = this.recentData();
    if (!data || !data.createTime) {
      return 'JAN';
    }
    if (data.createTime === null || data.createTime === "null") {
        return 'JAN'; 
    }
    
    const pattern = /\d{4}-(\d{2})-\d{2}/;
    const match = data.createTime.match(pattern);
    
    if (match) {
        const monthNumber = parseInt(match[1], 10); 
        
        const monthMap:Month = {
            1: 'JAN', 2: 'FEB', 3: 'MAR', 4: 'APR',
            5: 'MAY', 6: 'JUN', 7: 'JUL', 8: 'AUG',
            9: 'SEP', 10: 'OCT', 11: 'NOV', 12: 'DEC'
        };
        
        return monthMap[monthNumber] || '';
    }
    
    return 'JAN'; 
})
  // public day = () => {
  //   const data = this.recentData();
  //   if (!data || !data.createTime) {
  //     return '1';
  //   }

  //   const pattern = /\d{4}-(\d{2})-(\d{2})/;
  //   const match = data.createTime.match(pattern);
  //   console.log(match);
    
  //   if (match) {
  //     let dayValue = match[2]; 
  //     dayValue = dayValue.replace(/^0+/, '');
  //     return dayValue === '' ? '0' : dayValue;
  //   } else {
  //     return '1';
  //   }
  // };
}
