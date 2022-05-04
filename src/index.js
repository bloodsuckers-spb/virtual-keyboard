import './index.scss';

import Keyboard from './js/Keyboard';
import * as storage from './js/storage';
import buttons from './js/buttons';

const keyboard = new Keyboard(buttons);
keyboard.generateOutput();
keyboard.generateLayout();
keyboard.generateKeyboard();
keyboard.render();