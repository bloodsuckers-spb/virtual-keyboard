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
    this.output = output;
    return this;
  }

  generateKeys() {
    this.keys = [];
    while (this.keys.length < this.keyboardRows) {
      this.keys.push([]);
    }
    this.buttons.forEach((el) => {
      const key = new Key(el).generateKey();
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

  render() {
    document.body.append(this.keyboard);
    return this;
  }
}
