export function renderNavBar () {
  return `
    <nav>
      <div class="navbar navbar-expand-lg">
        <a class="navbar-brand">books.</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="fa fa-bars"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul id="nav-1" class="navbar-nav flex-grow-1 justify-content-end">
            <li class="nav-item" id="cart" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-cart">
              <a class="nav-link">
                <div style="position: relative">
                  <i class="fas fa-shopping-cart" style="display: inline-block;"></i>
                  <span id="badge-count" class="position-absolute top-0 end-0 translate-middle badge bg-primary rounded-pill">0</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr></hr>
    </nav>
    <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="offcanvas-cart" aria-labelledby="offcanvasLabel">
      <div class="offcanvas-header">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <h5 class="offcanvas-title" id="offcanvasLabel">Your shopping cart</h5>
      </div>
      <div class="offcanvas-body" id="offcanvas-body"></div>
    </div>
  `;
}


export function renderBadgeCount(state) {
  const badgeCount = state.shoppingCart.length;
  document.querySelector('#badge-count').textContent = badgeCount;
}