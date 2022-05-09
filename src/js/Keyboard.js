import createDomNode from './helpers/createDomNode';
import Key from './Key';
import { set } from './storage';

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
    this.title = '';
    this.desk = '';
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
      placeholder: 'Hello! Thanx for for checking my work! All the best to you!',
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

  generateLayout() {
    const layout = createDomNode('div', 'keys-wrapper');
    const title = createDomNode('h1', 'title', 'Virtual Keyboard');
    const desk = createDomNode('p', 'desk', 'Created in Windows. Press Ctrl+Alt to switch language.');
    for (let i = 0; i < this.keyboardRows; i += 1) {
      const div = createDomNode('div', 'keyboard-row');
      div.append(...this.keys[i]);
      layout.append(div);
    }
    this.keys = this.keys.flat();
    this.title = title;
    this.desk = desk;
    this.layout = layout;
    return this;
  }

  generateKeyboard(classNames = 'keyboard') {
    const keyboard = createDomNode('div', classNames);
    keyboard.append(this.title, this.desk, this.output, this.layout);
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
      key.classList.add('key-pressed');
      if (key.isFnKey) {
        this.defineBtnFunctionality(e, key);
      } else {
        this.print(key);
      }
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      const key = this.keys.find((el) => el.code === e.code);
      if (!key) {
        return;
      }
      key.classList.remove('key-pressed');
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
    if (key.code.match(/caps/gi)) {
      key.classList.toggle('active');
    }
    switch (key.code) {
      case 'CapsLock':
        this.state.isCaps = !this.state.isCaps;
        this.switchCase();
        break;
      case 'ShiftLeft':
        this.state.isLeftShift = !this.state.isLeftShift;
        if (this.state.isRightShift) {
          return false;
        }
        this.state.isCaps = !this.state.isCaps;
        this.shiftPress();
        break;
      case 'ShiftRight':
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
      case 'AltRight':
        break;
      case 'MetaLeft':
        break;
      case 'ControlRight':
        break;
      default:
        this.print(key);
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
    set('kbLang', this.lang);
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
    let val = '';
    this.output.focus();
    const start = this.output.selectionStart;
    const end = this.output.selectionEnd;
    const str1 = this.output.value.slice(0, start);
    const str2 = this.output.value.slice(
      end,

      this.output.value.length,
    );
    switch (key.code) {
      case 'Backspace':
        if (start === end) {
          val = str1.slice(0, -1) + str2;
          this.output.value = val;
          this.output.setSelectionRange(str1.length - 1, str1.length - 1);
        } else {
          val = str1 + str2;
          this.output.value = val;
          this.output.setSelectionRange(str1.length, str1.length);
        }
        break;
      case 'Delete':
        val = str1;
        this.output.value = val;
        break;
      case 'Tab':
        this.output.value = `${str1}\t${str2}`;
        break;
      case 'Enter':
        this.output.value = `${str1}\n${str2}`;
        break;

      default:
        this.output.value = str1 + key.firstChild.textContent + str2;
        this.output.setSelectionRange(start, end);
        this.output.selectionStart = start + 1;
    }

    return this;
  }

  render() {
    document.body.append(this.keyboard);
    return this;
  }
}
