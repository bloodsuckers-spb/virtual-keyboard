import createDomNode from './helpers/createDomNode';

export default class Key {
  constructor({ type, content, altContent, code, width, row }) {
    this.type = type;
    this.content = content;
    this.altContent = altContent;
    this.code = code;
    this.width = width;
    this.row = row;
  }

  generateKey(content) {
    const key = createDomNode('div', 'key', content);
    this.key = key;
    return this.key;
  }
}
