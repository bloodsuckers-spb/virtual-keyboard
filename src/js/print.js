print(key, output, keyboard) {
    if (key.code === 'Backspace') {
      output.value = output.value.slice(0, -1);
    } else {
      output.value += key.content[this.lang];
    }
    return this;
  }