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
    let value = btn.code;
    value = value.toLowerCase();
    btn.classList.add(`key-${value}`);
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
        if (this.key.code.match(/shift|ControlLeft|AltLeft/gi)) {
          this.key.classList.toggle('active');
        }
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
