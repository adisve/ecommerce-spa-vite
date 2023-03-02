export function renderHeader () {
  return `
  <header class="hero">
    <div class="justify-content-start align-items-start h-100">
      <div class="hero-header">
        <div>
          <h1 class="mb-3">TO SUCCEED YOU MUST READ</h1>
        </div>
        <div class="header-text-box">
          <p>
            <span id='header-question' class='text-decoration-underline bold'>Not sure what to read next?</span> 
            Explore our catalog of books, with a focus on web development and UX design.
          </p>
        </div>
        <div className='hr-overlay'>
          <hr></hr>
        </div>
      </div>
    </div>
  </header>
  `;
}