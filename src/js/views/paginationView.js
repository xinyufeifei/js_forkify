import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextButton(curPage + 1);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePrevButton(curPage - 1);
    }
    // Other page
    if (curPage < numPages) {
      return (
        this._generatePrevButton(curPage - 1) +
        this._generateNextButton(curPage + 1)
      );
    }
    // Page 1, and there are NO other pages
    return '';
  }
  _generatePrevButton(pageNum) {
    return `
    <button data-goto="${pageNum}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${pageNum}</span>
    </button>
  `;
  }
  _generateNextButton(pageNum) {
    return `
    <button data-goto="${pageNum}" class="btn--inline pagination__btn--next">
      <span>Page ${pageNum}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>      
    `;
  }
}

export default new PaginationView();
