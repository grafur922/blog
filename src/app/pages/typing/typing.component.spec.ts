import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TypingComponent } from './typing.component';

describe('TypingComponent', () => {
  let component: TypingComponent;
  let fixture: ComponentFixture<TypingComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypingComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    // 覆盖原始文本以进行可预测的测试
    component.originalText = 'test text.';
    component.initChars = 10;
    fixture.detectChanges(); // 触发 ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize lines and cursor on ngOnInit', fakeAsync(() => {
    // ngOnInit 中有 setTimeout, 所以使用 fakeAsync
    tick(100); // 快进 100ms 以执行 setTimeout 中的代码
    fixture.detectChanges();

    expect(component.line.length).toBe(1);
    expect(component.line[0].length).toBe(10);
    expect(component.line[0][0].char).toBe('t');
    const firstCharSpan = compiled.querySelector('.each-char');
    expect(firstCharSpan?.classList.contains('curChar')).toBeTrue();
  }));

  it('should ignore modifier keys', () => {
    const initialPos = component.inputState.curPos;
    const keyEvent = new KeyboardEvent('keydown', { key: 'Shift' });
    component.handleKeyDown(keyEvent);
    expect(component.inputState.curPos).toBe(initialPos);
  });

  it('should advance cursor on correct key press', () => {
    const keyEvent = new KeyboardEvent('keydown', { key: 't' });
    component.handleKeyDown(keyEvent);
    expect(component.inputState.curPos).toBe(1);
    expect(component.inputState.col).toBe(1);
    expect(component.inputState.incorrect).toBe(0);
  });

  it('should increment incorrect count on wrong key press', () => {
    const keyEvent = new KeyboardEvent('keydown', { key: 'w' }); // 'w' 是错误按键
    component.handleKeyDown(keyEvent);
    
    expect(component.inputState.curPos).toBe(0); // 位置不移动
    expect(component.inputState.incorrect).toBe(1);
    expect(component.stats.errors).toBe(1);
    expect(component.line[0][0].state).toBe('incorrect');
  });

  it('should start timer on first valid key press', () => {
    expect(component.stats.startTime).toBeNull();
    const keyEvent = new KeyboardEvent('keydown', { key: 't' });
    component.handleKeyDown(keyEvent);
    expect(component.stats.startTime).not.toBeNull();
  });

  it('should update time and CPM after starting', fakeAsync(() => {
    const keyEvent = new KeyboardEvent('keydown', { key: 't' });
    component.handleKeyDown(keyEvent); // 启动计时器

    expect(component.elapsedTime).toBe(0);
    expect(component.stats.cpm).toBe(0);
    
    tick(1000); // 快进1秒
    expect(component.elapsedTime).toBe(1);
    
    // 此时输入1个字符，用时1秒
    // 正确字符 = curPos(1) - incorrect(0) = 1
    // 分钟数 = 1 / 60
    // CPM = 1 / (1/60) = 60
    expect(component.stats.cpm).toBe(60);
    
    // 清理计时器
    component.ngOnDestroy();
  }));
  
  it('should calculate accuracy correctly', () => {
    expect(component.accuracy).toBe(100); // 初始正确率

    component.inputState.curPos = 10;
    component.inputState.incorrect = 2;
    // (10 - 2) / 10 * 100 = 80
    expect(component.accuracy).toBe(80);

    component.inputState.curPos = 0;
    expect(component.accuracy).toBe(100); // 除以0的情况
  });

  it('should reset all states when reset() is called', fakeAsync(() => {
    // 1. 模拟一些操作
    const keyEvent = new KeyboardEvent('keydown', { key: 't' });
    component.handleKeyDown(keyEvent);
    tick(2000); // 运行2秒
    fixture.detectChanges();
    
    expect(component.inputState.curPos).toBe(1);
    expect(component.elapsedTime).toBe(2);
    expect(component.stats.startTime).not.toBeNull();

    // 2. 调用 reset
    component.reset();
    tick(100); // 等待 reset 里的 setTimeout
    fixture.detectChanges();

    // 3. 验证状态是否已重置
    expect(component.inputState.curPos).toBe(0);
    expect(component.inputState.incorrect).toBe(0);
    expect(component.elapsedTime).toBe(0);
    expect(component.stats.cpm).toBe(0);
    expect(component.stats.startTime).toBeNull();
    const firstCharSpan = compiled.querySelector('.each-char');
    expect(firstCharSpan?.classList.contains('curChar')).toBeTrue();
  }));

});