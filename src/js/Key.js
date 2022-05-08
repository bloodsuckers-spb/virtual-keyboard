import createDomNode from './helpers/createDomNode';

export default class Key {
  constructor(props, keyboard) {
    this.key = createDomNode('div', 'key');
    this.keyboard = keyboard;
    Object.assign(this.key, props);
    this.key.isFnKey = Boolean(this.key.type === 'functional');
  }

  generateKey() {
    const btn = this.key;

    if (btn.isFnKey) {
      btn.classList.add('functional-btn');
    }

    if (btn.code.match(/Space|Enter|Tab|Shift|Caps/gi)) {
      btn.classList.add('wide-btn');
    }

    if (btn.code.match(/Enter|Space/)) {
      btn.classList.add('colored');
    }

    if (btn.code.match(/Enter/)) {
      btn.classList.add('btn-enter');
    }

    if (btn.code.match(/Backspace/)) {
      btn.classList.add('btn-backspace');
    }

    if (btn.code.match(/Caps/)) {
      btn.classList.add('btn-caps-lock');
    }

    if (btn.code.match(/ShiftRight/)) {
      btn.classList.add('btn-shift-right');
    }

    const firstChild = createDomNode('span', 'top');
    const secondChild = createDomNode('span', 'bottom');
    btn.append(firstChild, secondChild);
    firstChild.textContent = this.key.content[this.keyboard.lang];
    if (this.key.content[this.keyboard.lang] !== this.key.altContent[this.keyboard.lang]) {
      this.key.isAltContent = true;
      secondChild.textContent = this.key.altContent[this.keyboard.lang];
    }
    this.key = btn;
    return this;
  }

  bindEvent() {
    const handleEvent = (e) => {
      if (this.keyboard.state.isLeftShift && this.keyboard.state.isRightShift && !this.key.code.match(/Shift/)) {
        return false;
      }

      if (this.key.isFnKey) {
        this.keyboard.defineBtnFunctionality(e, this.key);
      } else {
        this.keyboard.print(this.key);
      }
      return true;
    };
    this.key.onclick = (e) => {
      handleEvent(e);
    };
    return this;
  }
}
