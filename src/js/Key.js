import createDomNode from './helpers/createDomNode';

export default class Key {
  constructor(props, keyboard) {
    this.key = createDomNode('div', 'key');
    this.keyboard = keyboard;
    Object.assign(this.key, props);
  }

  get btn() {
    return this.key;
  }

  generateKey(lang) {
    if (this.key.type === 'functional') {
      const arr = ['Backspace', 'Space', 'Enter', 'ShiftLeft', 'Tab', 'CapsLock'];
      this.key.classList.add('functional-btn');
      if (arr.includes(this.key.code)) {
        this.key.classList.add('wide-btn');
      }
      if (this.key.code.match('Arrow')) {
        this.key.classList.add('arrow-btn');
      }
      if (this.key.code === 'Enter' || this.key.code === 'Space') {
        this.key.classList.add('colored');
      }
    }
    this.key.textContent = this.key.content[lang];
    // const firstChild = createDomNode('span', 'key__content key__content--top');
    // const secondChild = createDomNode('span', 'key__content key__content--bottom');
    // this.key.append(firstChild, secondChild);
    return this;
  }

  handleEvent() {
    this.key.addEventListener('click', () => {
      this.keyboard.print(this.key);
    });
    return this;
  }
}
