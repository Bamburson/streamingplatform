// script.js — nowoczesny, animowany frontend ModernFlix

document.addEventListener('DOMContentLoaded', () => {
    const popularRow = document.getElementById('popular-row');
    const newRow = document.getElementById('new-row');
    const recommendedRow = document.getElementById('recommended-row');
    const modal = document.getElementById('modal');
    const modalClose = modal.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalSub = document.getElementById('modal-sub');
    const modalDesc = document.getElementById('modal-desc');
  
    const movies = [
      { title: 'Film A', sub: 'Przygodowy', desc: 'Opis filmu A'},
      { title: 'Film B', sub: 'Akcja', desc: 'Opis filmu B'},
      { title: 'Film C', sub: 'Dramat', desc: 'Opis filmu C'},
      { title: 'Film D', sub: 'Sci-Fi', desc: 'Opis filmu D'},
      { title: 'Film E', sub: 'Horror', desc: 'Opis filmu E'}
    ];
  
    function createCard(movie) {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.innerHTML = `<div class='meta'><div class='title'>${movie.title}</div><div class='sub'>${movie.sub}</div></div>`;
  
      card.addEventListener('click', () => {
        modal.classList.add('open');
        modalTitle.textContent = movie.title;
        modalSub.textContent = movie.sub;
        modalDesc.textContent = movie.desc;
      });
  
      return card;
    }
  
    [popularRow, newRow, recommendedRow].forEach(row => {
      movies.forEach(movie => row.appendChild(createCard(movie)));
    });
  
    modalClose.addEventListener('click', () => modal.classList.remove('open'));
  
    // Strzałki przewijania
    document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
      const slider = wrapper.querySelector('.slider');
      const left = wrapper.querySelector('.arrow-left');
      const right = wrapper.querySelector('.arrow-right');
  
      left.addEventListener('click', () => slider.scrollBy({ left: -400, behavior: 'smooth' }));
      right.addEventListener('click', () => slider.scrollBy({ left: 400, behavior: 'smooth' }));
    });
  
    // Wyszukiwarka
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', e => {
      const term = e.target.value.toLowerCase();
      [popularRow, newRow, recommendedRow].forEach(row => {
        Array.from(row.children).forEach(card => {
          const title = card.querySelector('.title').textContent.toLowerCase();
          card.style.display = title.includes(term) ? 'flex' : 'none';
        });
      });
    });
  });
  