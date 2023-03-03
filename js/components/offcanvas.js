import { convertBooksToCartItems } from "../utils/book_utils";

export function renderOffcanvasBody(state) {
  const offcanvasBody = document.querySelector('#offcanvas-body');
  offcanvasBody.innerHTML = state.shoppingCart.length > 0 ? convertBooksToCartItems(state.shoppingCart).map(cartItem => `
    <div class="row cart-item-container mb-4">
      <div class="col-4 cart-item-title"> ${cartItem.title}</div>
      <div class="col-4 cart-item-quantity"><i class="fas fa-hashtag"></i> ${cartItem.numberOfBooksWithTitle}</div>
      <div class="col-4 cart-item-total"><i class="fas fa-dollar-sign"></i> ${cartItem.sum}</div>
    </div>
  `).join('') : `<h5>You don't have any items in your shopping cart</h5>`;

  const cartItemContainers = offcanvasBody.querySelectorAll('.cart-item-container');
}

