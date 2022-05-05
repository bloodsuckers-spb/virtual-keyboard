import createDomNode from './helpers/createDomNode';
import Key from './Key';

export default class Keyboard {
  constructor(buttons, lang = 'ru') {
    this.lang = lang;
    this.buttons = buttons;
    this.keys = [];
    this.funcKeysCodes = [];
    this.keyboardRows = 5;
    this.output = '';
    this.layout = '';
    this.keyboard = '';
  }

  set rows(val) {
    this.keyboardRows = val;
  }

  get rows() {
    return this.keyboardRows;
  }

  addKeysCodes() {
    this.funcKeysCodes = [];
    this.funcKeysCodes = this.buttons.filter((el) => el.type === 'functional').map((el) => el.code);
    return this;
  }

  generateOutput() {
    const output = createDomNode('textarea', 'output');
    output.placeholder = 'Remember, be nice!';
    output.autofocus = true;
    output.cols = '40';
    output.rows = '6';
    this.output = output;
    return this;
  }

  generateKeys() {
    this.keys = [];
    while (this.keys.length < this.keyboardRows) {
      this.keys.push([]);
    }
    this.buttons.forEach((el) => {
      const item = new Key(el, this.output)
        .generateKey()
        .setData(this.lang);
      item.handleEvent();
      const key = item.btn;
      this.keys[el.row - 1].push(key);
    });
    return this;
  }

  generateLayout(classNames = 'keys-wrapper') {
    const layout = createDomNode('div', classNames);
    for (let i = 0; i < this.keyboardRows; i += 1) {
      const div = createDomNode('div', 'keyboard-row');
      div.append(...this.keys[i]);
      layout.append(div);
    }
    this.layout = layout;
    return this;
  }

  generateKeyboard(classNames = 'keyboard') {
    const keyboard = createDomNode('div', classNames);
    keyboard.append(this.output, this.layout);
    this.keyboard = keyboard;
    return this;
  }

  handleEvent() {
    document.addEventListener('keyup', (e) => {
      console.log('keyup');
    });
    document.addEventListener('keydown', (e) => {
      if (this.funcKeysCodes.includes(e.code)) {
        e.preventDefault();
        if (e.code === 'Backspace') {
          this.output.value = this.output.value.slice(0, -1);
        }
      } else {
        this.output.value += e.key;
      }
    });
    return this;
  }

  render() {
    document.body.append(this.keyboard);
    return this;
  }
}
