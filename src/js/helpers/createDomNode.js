export default function createDomNode(el, classNames = '', content = '') {
  let element = null;
  try {
    element = document.createElement(el);
  } catch (error) {
    throw new Error('Unable to create new DOM node');
  }
  element.classList.add(...classNames.split(' '));
  element.textContent = content;
  return element;
}
