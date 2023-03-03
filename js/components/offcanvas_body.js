import { convertBooksToCartItems, getTotalPrice } from "../utils/book_utils";

export function renderOffcanvasBody(state) {
  const offcanvasBody = document.querySelector('#offcanvas-body');

  if (state.shoppingCart.length > 0) {
    const cartItemsHtml = convertBooksToCartItems(state.shoppingCart).map(cartItem => `
      <div class="d-flex align-items-center justify-content-between cart-item-container mb-3">
        <div class="d-flex align-items-center">
          <div>
            <h5 class="mb-0">${cartItem.title}</h6>
            <p style="font-size: 17px;" class="mb-1">${cartItem.author}</p>
            <div class="d-flex align-items-center">
              <i class="fas fa-hashtag me-1"></i>
              <span class="me-3">${cartItem.numberOfBooksWithTitle}</span>
              <i class="fas fa-dollar-sign me-1"></i>
              <span>${cartItem.sum}</span>
            </div>
          </div>
        </div>
      </div>
      <hr>
    `).join('');

    const totalPrice = getTotalPrice(state.shoppingCart);

    offcanvasBody.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Total price:</h5>
        <span class="ms-3">$${totalPrice.toFixed(2)}</span>
      </div>
      <hr/>
      ${cartItemsHtml}
      <div class="d-flex align-items-center">
        <button type="button" class="btn btn-primary checkout-btn d-flex align-items-center">
          <i class="fas fa-credit-card me-2"></i>Checkout
        </button>
      </div>
    `;
  } else {
    offcanvasBody.innerHTML = `
      <h5>You don't have any items in your shopping cart</h5>
      <div class="d-flex align-items-center">
        <button type="button" class="btn btn-primary checkout-btn d-flex align-items-center">
          <i class="fas fa-credit-card me-2"></i>Checkout
        </button>
      </div>
    `;
  }
}
