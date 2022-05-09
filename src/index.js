import './index.scss';

import Keyboard from './js/Keyboard';
import { get } from './js/storage';
import buttons from './js/buttons';

const lang = get('kbLang', '"ru"');

new Keyboard(buttons, lang)
  .generateOutput()
  .generateKeys()
  .generateLayout()
  .generateKeyboard()
  .handleEvent()
  .render();
