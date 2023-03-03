export function renderBookModal () {
  return `
    <div data-book="" class="modal fade" id="book-modal" tabindex="-1" aria-labelledby="book-modal-label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="row">
              <div class="col-4">
                <img id="modal-book-image" class="img-fluid rounded" alt="Book Cover">
              </div>
              <div class="col-8">
                <h5 id="modal-book-title" class="fw-bold"></h5>
                <p id="modal-book-author"></p>
                <p id="modal-book-price"></p>
                <hr>
                <p id="modal-book-description"></p>
                <p id="modal-book-category"></p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="d-flex btn">
              <i class="fas fa-shopping-cart mr-2" style="padding-top: 4px; padding-right: 10px;"></i>
              <p>Add to cart</p>
            </button>
            <button class="d-flex btn" data-bs-dismiss="modal">
              <i class="fas fa-times mr-2" style="padding-top: 4px; padding-right: 10px;"></i>
              <p>Close</p>
            </button>
          </div>
        </div>
      </div>
    </div>

  `;
}