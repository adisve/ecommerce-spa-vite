import { store } from "../store/store";
import { convertBooksToCartItems } from "../utils/book_utils";

export function renderOffcanvasBody() {
  const state = store.getState();
  const offcanvasBody = document.querySelector('#offcanvas-body');
  offcanvasBody.innerHTML = state.shoppingCart.length > 0 ? convertBooksToCartItems(state.shoppingCart).map(cartItem => `
    <div class="d-flex cart-item-container justify-content-between">
      <p id="title" class="cart-item-title"><i class="fas fa-book"></i> ${cartItem.title}</p>
      <p class="cart-item-quantity"><i class="fas fa-hashtag"></i> ${cartItem.numberOfBooksWithTitle}</p>
      <p class="cart-item-total"><i class="fas fa-dollar-sign"></i> ${cartItem.sum}</p>
    </div>
  `).join('') : `<h4>You don't have any items in your shopping cart</h4>`;
}