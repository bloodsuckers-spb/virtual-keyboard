import createDomNode from './helpers/createDomNode';
import Key from './Key';

export default class Keyboard {
  constructor(buttons, lang = 'ru') {
    this.lang = lang;
    this.buttons = buttons;
    this.keys = [];
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
      const item = new Key(el, this)
        .generateKey(this.lang)
        .handleEvent();
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
    this.keys = this.keys.flat();
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
      e.preventDefault();
      const key = this.keys.find((el) => el.code === e.code);
      this.print(key);
    });
    return this;
  }

  render() {
    document.body.append(this.keyboard);
    return this;
  }

  print(key) {
    if (key.code === 'Backspace') {
      this.output.value = this.output.value.slice(0, -1);
    } else {
      this.output.value += key.content[this.lang];
    }
    return this;
  }
}
