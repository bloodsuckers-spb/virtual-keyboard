export function set(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function get(name, substr = null) {
  return JSON.parse(window.localStorage.getItem(name) || substr);
}