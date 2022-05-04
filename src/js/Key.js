import createDomNode from './helpers/createDomNode';

export default class Key {
  constructor(props) {
    Object.assign(this, props);
  }

  generateKey() {
    const key = createDomNode('div', 'key');
    const firstChild = createDomNode('span', 'key__content key__content--top');
    const secondChild = createDomNode('span', 'key__content key__content--bottom');
    key.append(firstChild, secondChild);
    this.key = key;
    return this.key;
  }

  handleEvent() {
    if (!this.key) {
      return;
    }
    this.key.addEventListener('click', () => {
      console.log('click');
    });
  }

  setData(lang) {
    this.key.textContent = this.content[lang];
  }
}
