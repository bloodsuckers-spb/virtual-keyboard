export default function createDomNode(el, classes = '', content = '') {
  let element = null;
  try {
    element = document.createElement(el);
  } catch (error) {
    throw new Error('Unable to create new DOM node');
  }
  element.classList.add(classes);
  element.textContent = content;
  return element;
}
