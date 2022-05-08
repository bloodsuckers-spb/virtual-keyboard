import createDomNode from './helpers/createDomNode';
import Key from './Key';

export default class Keyboard {
  constructor(data, lang = 'ru') {
    this.state = {
      isCaps: false,
      isShift: false,
      isAlt: false,
      isCtrlLeft: false,
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
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = this.keys.find((el) => el.code === e.code);
      if (!key) {
        return;
      }
      if (key.isFnKey) {
        this.defineBtnFunctionality(e, key);
      } else {
        this.print(key);
      }
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (e.code.match(/Shift/)) {
        this.state.isShift = false;
        this.shiftPress();
      }
      if (e.code.match(/ControlLeft/)) {
        this.state.isCtrlLeft = false;
      }
      if (e.code.match(/AltLeft/)) {
        this.state.isAlt = false;
      }
    });
    return this;
  }

  defineBtnFunctionality(e, key) {
    if (e.repeat) {
      return false;
    }
    key.classList.toggle('active');
    switch (key.code) {
      case 'CapsLock':
        this.switchCase();
        break;
      case 'ShiftLeft':

        this.shiftPress();
        this.state.isShift = true;
        break;
      case 'ShiftRight':

        this.shiftPress();
        this.state.isShift = true;
        break;
      case 'ControlLeft':
        this.state.isCtrlLeft = true;
        if (this.state.isAlt) {
          this.switchLanguage();
        }
        break;

      case 'AltLeft':
        this.state.isAlt = true;
        if (this.state.isCtrlLeft) {
          this.switchLanguage();
        }
        break;

      default:
        break;
    }
    return this;
  }

  switchCase() {
    this.state.isCaps = !this.state.isCaps;
    const letters = this.keys.filter((key) => key.type === 'letter');
    for (let i = 0; i < letters.length; i += 1) {
      const el = letters[i];
      if (!this.state.isCaps) {
        el.content[this.lang] = el.content[this.lang].toLowerCase();
        el.firstChild.textContent = el.content[this.lang];
      } else {
        el.content[this.lang] = el.content[this.lang].toUpperCase();
        el.firstChild.textContent = el.content[this.lang];
      }
    }
  }

  shiftPress() {
    if (this.state.isShift) {
      return;
    }
    const arr = this.keys.filter((key) => key.isAltContent);
    for (let i = 0; i < arr.length; i += 1) {
      const temp = arr[i].firstChild.textContent;
      arr[i].firstChild.textContent = arr[i].lastChild.textContent;
      arr[i].lastChild.textContent = temp;
    }
    this.switchCase();
  }

  switchLanguage() {
    this.lang = this.lang === 'ru' ? 'en' : 'ru';
    const arr = this.keys.filter((el) => !el.isFnKey);
    for (let i = 0; i < arr.length; i += 1) {
      if (this.state.isCaps) {
        arr[i].content[this.lang] = arr[i].content[this.lang].toUpperCase();
        arr[i].altContent[this.lang] = arr[i].altContent[this.lang].toUpperCase();
      } else {
        arr[i].content[this.lang] = arr[i].content[this.lang].toLowerCase();
        arr[i].altContent[this.lang] = arr[i].altContent[this.lang].toLowerCase();
      }
      arr[i].firstChild.textContent = arr[i].content[this.lang];
      if (arr[i].isAltContent) {
        arr[i].lastChild.textContent = arr[i].altContent[this.lang];
      }
    }
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

  render() {
    document.body.append(this.keyboard);
    return this;
  }
}
