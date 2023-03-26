export function renderBookModal () {
  return `
  <div class="modal fade" id="book-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body d-flex flex-column">
          <div class="row flex-grow-1">
            <div class="col-md-6 d-flex">
              <img id="modal-book-image" class="img-fluid" alt="Book cover image" style="height: 500px;">
            </div>
            <div class="col-md-6 d-flex flex-column justify-content-between">
              <div class="container">
                <div class="row align-items-start">
                  <div class="col-md-12">
                    <h4 id="modal-book-title" class="mt-3"></h4>
                    <hr style="width: 12.5%;">
                    <p id="modal-book-author"></p>
                    <p id="modal-book-description" class="text-muted"></p>
                  </div>
                </div>
              </div>
              <div class="mt-auto">
                <button type="button" class="btn btn-primary w-100"><i class="fa fa-shopping-cart me-2"></i> Add to Cart</button>
                <button type="button" class="btn btn-primary w-100 mt-2" data-bs-dismiss="modal"><i class="fa fa-times me-2"></i> Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  `;
}
