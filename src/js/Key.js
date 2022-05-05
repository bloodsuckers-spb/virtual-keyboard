import createDomNode from './helpers/createDomNode';

export default class Key {
  constructor(props, output) {
    Object.assign(this, props);
    this.key = '';
    this.output = output;
  }

  get btn() {
    return this.key;
  }

  generateKey() {
    let key = null;
    if (this.type === 'functional') {
      const arr = ['Backspace', 'Space', 'Enter', 'ShiftLeft', 'Tab', 'CapsLock'];
      key = createDomNode('div', 'key functional-btn');
      if (arr.includes(this.code)) {
        key.classList.add('wide-btn');
      }
      if (this.code.match('Arrow')) {
        key.classList.add('arrow-btn');
      }
      if (this.code === 'Enter' || this.code === 'Space') {
        key.classList.add('colored');
      }
    } else {
      key = createDomNode('div', 'key');
    }
    const firstChild = createDomNode('span', 'key__content key__content--top');
    const secondChild = createDomNode('span', 'key__content key__content--bottom');
    key.append(firstChild, secondChild);
    this.key = key;
    return this;
  }

  handleEvent() {
    if (!this.key) {
      return;
    }
    this.key.addEventListener('click', () => {
      if (this.key.textContent === 'Backspace') {
        this.output.value = this.output.value.slice(0, -1);
      } else {
        this.output.value += this.key.textContent;
      }
    });
  }

  setData(lang) {
    this.key.textContent = this.content[lang];
    return this;
  }
}
