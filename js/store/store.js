import { FilterType, SortType } from "../utils/enums";

class Store {
  #state = {
    shoppingCart: [],
    filterType: FilterType.None,
    filterValue: '',
    sortType: SortType.PriceDescending,
  };
  
  #subscribers = [];

  getState() {
    return { ...this.#state };
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#notifySubscribers();
  }

  subscribe(callback) {
    this.#subscribers.push(callback);
  }

  #notifySubscribers() {
    for (const callback of this.#subscribers) {
      callback(this.getState());
    }
  }
}

const store = new Store();

export { store };
