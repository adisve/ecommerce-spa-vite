import { convertBooksToCartItems } from "../utils/book_utils";
import { store } from "../store/store";

export function renderOffcanvasBody(state) {
  const offcanvasBody = document.querySelector('#offcanvas-body');
  offcanvasBody.innerHTML = state.shoppingCart.length > 0 ? convertBooksToCartItems(state.shoppingCart).map(cartItem => `
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
      <button type="button" class="btn-close" aria-label="Remove item" data-book-id="${cartItem.id}"></button>
    </div>
    <hr>
  `).join('') : `<h5>You don't have any items in your shopping cart</h5>`;

  // Add event listeners to remove items from cart
  const removeBtns = offcanvasBody.querySelectorAll('.btn-close');
    removeBtns.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const bookId = parseInt(event.target.dataset.bookId);
        const newState = {
          ...state,
          shoppingCart: state.shoppingCart.filter((book) => book.id !== bookId),
        };
        store.setState(newState);
      });
    });

  // Add checkout button
  const checkoutBtn = document.createElement('button');
  checkoutBtn.classList.add('btn', 'btn-primary', 'checkout-btn');
  checkoutBtn.innerText = 'Checkout';

  const offcanvasContent = document.querySelector('.offcanvas-body');
  offcanvasContent.appendChild(checkoutBtn);
}

