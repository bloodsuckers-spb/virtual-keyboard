import createDomNode from './helpers/createDomNode';
import Key from './Key';

export default class Keyboard {
  constructor(data, lang = 'ru') {
    this.state = {
      isCaps: false,
      isLeftShift: false,
      isRightShift: false,
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
        .bindEvent();
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
        this.state.isCaps = !this.state.isCaps;
        this.shiftPress();
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
        this.state.isCaps = !this.state.isCaps;
        this.switchCase();
        break;
      case 'ShiftLeft':
        this.state.isLeftShift = !this.state.isLeftShift;
        console.log(this.state.isRightShift);
        if (this.state.isRightShift) {
          return false;
        }
        this.state.isCaps = !this.state.isCaps;
        this.shiftPress();
        break;
      case 'ShiftRight':
        console.log(this.state.isLeftShift);
        this.state.isRightShift = !this.state.isRightShift;
        if (this.state.isLeftShift) {
          return false;
        }
        this.state.isCaps = !this.state.isCaps;
        this.shiftPress();
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
    const arr = this.keys.filter((key) => key.isAltContent);
    for (let i = 0; i < arr.length; i += 1) {
      const temp = arr[i].firstChild.textContent;
      arr[i].firstChild.textContent = arr[i].lastChild.textContent;
      arr[i].lastChild.textContent = temp;
    }
    this.switchCase();
  }

  switchLanguage() {
    this.state.isCtrlLeft = false;
    this.state.isAlt = false;
    this.lang = this.lang === 'ru' ? 'en' : 'ru';
    const arr = this.keys.filter((el) => !el.isFnKey);
    for (let i = 0; i < arr.length; i += 1) {
      arr[i].firstChild.textContent = arr[i].content[this.lang];
      if (arr[i].isAltContent) {
        arr[i].lastChild.textContent = arr[i].altContent[this.lang];
      }
    }
    this.switchCase();
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
