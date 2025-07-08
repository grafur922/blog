import { Component, Inject, OnInit, inject, signal, WritableSignal, TemplateRef } from '@angular/core';
import { LoggerService } from '../../shared/services/Logger/logger.service';
import { Logger } from '../../shared/interfaces/Logger';
import { ModalDismissReasons, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [ NgbModalModule, FormsModule ], 
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');
  message: string = ''; 

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
        console.log('留言已发送:', this.message); 
        this.message = ''; 
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
        this.message = '';
			},
		);
	}

  constructor(@Inject(LoggerService) private Logger:Logger){

  }

  ngOnInit(): void {
    this.Logger.log('footer works!')
  }

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}