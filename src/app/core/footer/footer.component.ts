import { Component, Inject, OnInit, inject, signal, WritableSignal, TemplateRef } from '@angular/core';
import { LoggerService } from '../../shared/services/Logger/logger.service';
import { Logger } from '../../shared/interfaces/Logger';
import { ModalDismissReasons, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // 导入 FormsModule 用于 ngModel

@Component({
  selector: 'app-footer',
  standalone: true, // 1. 将组件设置为 standalone
  imports: [ NgbModalModule, FormsModule ], // 2. 导入 NgbModalModule 和 FormsModule
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  private modalService = inject(NgbModal);
	closeResult: WritableSignal<string> = signal('');
  message: string = ''; // 3. 添加属性以绑定留言内容

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        // 当模态框通过点击 "发送" 按钮关闭时
				this.closeResult.set(`Closed with: ${result}`);
        console.log('留言已发送:', this.message); // 您可以在这里处理留言逻辑，例如发送到后端
        this.message = ''; // 清空输入框
			},
			(reason) => {
        // 当模态框被其他方式关闭时 (例如按 ESC, 点击背景)
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
        this.message = ''; // 清空输入框
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