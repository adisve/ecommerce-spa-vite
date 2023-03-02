export function renderNavBar () {
  return `
  <nav>
    <div class="navbar navbar-expand-lg">
      <a class="navbar-brand">books.</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-expanded="true" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul id="nav-1" class="navbar-nav flex-grow-1 justify-content-evenly">
          <li class="nav-item">
            <a class="hover-underline-animation">About</a>
          </li>
          <li class="nav-item">
            <a class="hover-underline-animation">Creator</a>
          </li>
        </ul>
        <ul id="nav-2" class="navbar-nav flex-grow-1 justify-content-evenly">
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
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas-cart" aria-labelledby="offcanvasLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">Your shopping cart</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body" id="offcanvas-body"></div>
    </div>
  </nav>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas-cart" aria-labelledby="offcanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasLabel">Your shopping cart</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body" id="offcanvas-body"></div>
  </div>
`;
}