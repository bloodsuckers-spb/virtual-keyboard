import createDomNode from './helpers/createDomNode';
import Key from './Key';

export default class Keyboard {
  constructor(data, lang = 'ru') {
    this.state = {
      isCaps: false,
      isShift: false,
    };
    this.lang = lang;
    this.data = data;
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
    const options = {
      placeholder: 'Remember, be nice!',
      autofocus: true,
      cols: '40',
      rows: '6',
    };
    Object.assign(output, options);
    this.output = output;
    return this;
  }

  generateKeys() {
    this.keys = [];
    while (this.keys.length < this.keyboardRows) {
      this.keys.push([]);
    }
    this.data.forEach((el) => {
      const item = new Key(el, this)
        .generateKey()
        .handleEvent();
      const btn = item.key;
      this.keys[el.row - 1].push(btn);
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
      e.preventDefault();
      const key = this.keys.find((el) => el.code === e.code);
      if (!key) {
        return;
      }
      if (key.code === 'CapsLock') {
        this.switchCase();
      } else {
        this.print(key);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.code === 'ShiftLeft') {
        this.state.isShift = false;
      }
    });
    return this;
  }

  defineBtnFunctionality(key) {
    switch (key.code) {
      case 'CapsLock':
        // do something
        break;
      case 'ShiftLeft':
        // do something
        break;
      default:
        break;
    }
    return this;
  }

  switchCase() {
    this.state.isCaps = !this.state.isCaps;
    const caps = this.state.isCaps;
    const letters = this.keys.filter((key) => key.type === 'letter');
    for (let i = 0; i < letters.length; i += 1) {
      const el = letters[i];
      el.textContent = el.content[this.lang].toUpperCase();
    }
  }

  shiftPress() {
    // isShift;
  }

  switchLanguage() {
    this.lang = this.lang === 'ru' ? 'en' : 'ru';
  }

  print(key) {
    if (key.code === 'Backspace') {
      this.output.value = this.output.value.slice(0, -1);
    } else {
      this.output.value += key.content[this.lang];
    }
    return this;
  }

  render() {
    document.body.append(this.keyboard);
    return this;
  }
}
