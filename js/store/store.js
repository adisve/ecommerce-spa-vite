import { FilterSearchType, SortType } from "../utils/enums";

class Store {
  #state = {
    shoppingCart: [],
    filterSearchType: FilterSearchType.None,
    filterSearchValue: '',
    sortType: SortType.PriceAscending,
    filterPriceMinMax: [0, 75]
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
