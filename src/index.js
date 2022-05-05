import './index.scss';

import Keyboard from './js/Keyboard';
import * as storage from './js/storage';
import buttons from './js/buttons';

new Keyboard(buttons)
  .generateOutput()
  .generateKeys()
  .generateLayout()
  .generateKeyboard()
  .handleEvent()
  .render();
