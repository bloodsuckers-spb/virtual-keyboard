import createDomNode from './helpers/createDomNode';
import Key from './Key';

export default class Keyboard {
  constructor(buttons, lang = 'ru') {
    this.lang = lang;
    this.buttons = buttons;
    this.keys = [];
    this.output = '';
    this.layout = '';
    this.keyboard = '';
  }

  generateOutput() {
    const output = createDomNode('textarea', 'output');
    this.output = output;
    return this.output;
  }

  generateKeys() {
    this.keys = [];
    this.buttons.forEach((el) => {
      const key = new Key(el).generateKey(el.content);
      this.keys.push(key);
    });
    return this.keys;
  }

  generateLayout() {
    const layout = createDomNode('div', 'keys-wrapper');
    for (let i = 0; i < 5; i += 1) {
      const div = createDomNode('div', 'keyboard-row');
      layout.append(div);
    }
    // тут добавляем всё из массива this.keys
    this.layout = layout;
    return this.layout;
  }

  generateKeyboard() {
    const keyboard = createDomNode('div', 'keyboard');
    keyboard.append(this.output, this.layout);
    this.keyboard = keyboard;
    return this.keyboard;
  }

  render() {
    document.body.append(this.keyboard);
  }
}
