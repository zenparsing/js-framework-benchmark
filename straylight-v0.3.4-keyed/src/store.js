import Store from 'storelax';

const timer = {
  name: null,
  startTime: null,
  time(name, fn) {
    this.start(name);
    fn();
    this.stop();
  },
  start(name) {
    this.name = name;
    this.startTime = performance.now();
  },
  stop() {
    if (this.name) {
      window.setTimeout(() => {
        console.log(`${this.name} took ${performance.now() - this.startTime}`);
        this.name = null;
      }, 0);
    }
  },
};

export const store = new Store({
  data: [],
  selected: undefined,
  id: 1,
});

export const actions = {
  run() {
    timer.time('run', () => {
      store.update(({ id }) => {
        const obj = buildData(id, 1000);
        return {
          data: obj.data,
          id: obj.id,
          selected: undefined,
        };
      });
    });
  },

  add() {
    timer.time('add', () => {
      store.update(({ id, data }) => {
        const obj = buildData(id, 1000);
        return {
          data: [...data, ...obj.data],
          id: obj.id,
        };
      });
    });
  },

  update() {
    timer.time('update', () => {
      store.update(({ data }) => {
        for (let i = 0; i < data.length; i += 10) {
          data[i].label = data[i].label + ' !!!';
        }
        return { data };
      });
    });
  },

  select(id) {
    timer.time('select', () => {
      store.update({ selected: id });
    });
  },

  delete(id) {
    timer.time('delete', () => {
      store.update(({ data }) => {
        return { data: data.filter(d => d.id != id) };
      });
    });
  },

  runLots() {
    timer.time('runLots', () => {
      store.update(({ id, data }) => {
        const obj = buildData(id, 10000);
        return {
          data: obj.data,
          id: obj.id,
          selected: undefined,
        };
      });
    });
  },

  clear() {
    timer.time('clear', () => {
      store.update({
        data: [],
        selected: undefined,
      });
    });
  },

  swapRows() {
    timer.time('swapRows', () => {
      store.update(({ data }) => {
        if (data.length > 998) {
          let temp = data[1];
          data[1] = data[998];
          data[998] = temp;
        }
        return { data };
      });
    });
  },
};

function random(max) {
  return Math.round(Math.random() * 1000) % max;
}

const adjectives = [
  'pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain',
  'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd',
  'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy',
];

const colours = [
  'red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white',
  'black', 'orange',
];

const nouns = [
  'table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich',
  'burger', 'pizza', 'mouse', 'keyboard',
];

export function buildData(id, count = 1000) {
  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: id++,
      label:
        adjectives[random(adjectives.length)] + ' ' +
        colours[random(colours.length)] + ' ' +
        nouns[random(nouns.length)],
    });
  }
  return { data, id };
}
