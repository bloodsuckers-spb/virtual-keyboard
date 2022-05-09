import './index.scss';

import Keyboard from './js/Keyboard';
// import { get } from './storage.js';
import buttons from './js/buttons';

// const lang = get('kbLang', '"ru"')

new Keyboard(buttons)
  .generateOutput()
  .generateKeys()
  .generateLayout()
  .generateKeyboard()
  .handleEvent()
  .render();
