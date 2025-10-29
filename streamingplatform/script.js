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
    const modalVideo = modal.querySelector('.modal-video');
    const watchlistList = document.getElementById('watchlist');
    const watchlistEmpty = document.getElementById('watchlist-empty');
    const searchWrapper = document.querySelector('.search-wrapper');
    const searchToggle = document.querySelector('.search-toggle');
    const accountWrapper = document.querySelector('.account-wrapper');
    const accountToggle = document.querySelector('.account-toggle');
    const accountPanel = document.getElementById('account-panel');
    const navLinks = document.querySelectorAll('.nav-link');

    const sliderWrappers = Array.from(document.querySelectorAll('.slider-wrapper'));
    const EXPAND_ICON_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const sectionMap = sliderWrappers.reduce((acc, wrapper) => {
      const section = wrapper.closest('.section');
      const key = wrapper.dataset.row;
      if (section && key) {
        acc[key] = section;
      }
      return acc;
    }, {});
    const wrapperMap = sliderWrappers.reduce((acc, wrapper) => {
      const key = wrapper.dataset.row;
      if (key) acc[key] = wrapper;
      return acc;
    }, {});
    const sliderMap = {
      popular: popularRow,
      new: newRow,
      recommended: recommendedRow
    };
    const detailContainers = sliderWrappers.reduce((acc, wrapper) => {
      const key = wrapper.dataset.row;
      if (key) {
        acc[key] = wrapper.querySelector('.slider-detail');
      }
      return acc;
    }, {});

    const catalog = {
      popular: [
        {
          id: 'dune-part-two',
          title: 'Diuna: Część Druga',
          type: 'movie',
          genre: 'Sci-Fi',
          sub: 'Film · 2024 · 2h 46m',
          year: '2024',
          maturity: '13+',
          duration: '2h 46m',
          tags: ['Sci-Fi', 'Epika', 'IMAX'],
          desc: 'Paul Atryda jednoczy się z Fremenami, by pomścić rodzinę i stanąć przeciwko Harkonnenom w widowiskowej kontynuacji sagi.',
          backdrop: 'https://images.unsplash.com/photo-1526314116281-977cc23e6a11?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'oppenheimer',
          title: 'Oppenheimer',
          type: 'movie',
          genre: 'Biograficzny',
          sub: 'Film · 2023 · 3h 1m',
          year: '2023',
          maturity: '16+',
          duration: '3h 1m',
          tags: ['Biografia', 'Historia', 'Nagrodzony Oscarem'],
          desc: 'Christopher Nolan przedstawia historię twórcy bomby atomowej w intensywnym thrillerze politycznym.',
          backdrop: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'mission-impossible',
          title: 'Mission: Impossible – Dead Reckoning',
          type: 'movie',
          genre: 'Akcja',
          sub: 'Film · 2023 · 2h 43m',
          year: '2023',
          maturity: '13+',
          duration: '2h 43m',
          tags: ['Akcja', 'Szpiegowski', 'Blockbuster'],
          desc: 'Ethan Hunt i drużyna IMF stają w obliczu najgroźniejszej misji, ścigając się o kontrolę nad sztuczną inteligencją.',
          backdrop: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'john-wick-4',
          title: 'John Wick 4',
          type: 'movie',
          genre: 'Akcja',
          sub: 'Film · 2023 · 2h 49m',
          year: '2023',
          maturity: '18+',
          duration: '2h 49m',
          tags: ['Neo-noir', 'Akcja', 'Kultowy'],
          desc: 'John Wick kontynuuje walkę z Wysokim Stołem, przemierzając glob, by odzyskać wolność.',
          backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'barbie',
          title: 'Barbie',
          type: 'movie',
          genre: 'Komedia',
          sub: 'Film · 2023 · 1h 54m',
          year: '2023',
          maturity: '12+',
          duration: '1h 54m',
          tags: ['Komedia', 'Satyra', 'Hit 2023'],
          desc: 'Barbie i Ken opuszczają Barbieland, by odkryć rzeczywisty świat w kolorowej satyrze grety Gerwig.',
          backdrop: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'top-gun-maverick',
          title: 'Top Gun: Maverick',
          type: 'movie',
          genre: 'Akcja',
          sub: 'Film · 2022 · 2h 11m',
          year: '2022',
          maturity: '12+',
          duration: '2h 11m',
          tags: ['Lotnictwo', 'IMAX', 'Akcja'],
          desc: 'Maverick wraca jako instruktor elitarnej jednostki, stawiając czoła przeszłości i niemożliwej misji.',
          backdrop: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=900&q=80'
        }
      ],
      new: [
        {
          id: 'avatar-frontiers',
          title: 'Avatar: Frontiers of Pandora',
          type: 'movie',
          genre: 'Przygodowy',
          sub: 'Film · 2025 · 2h 58m',
          year: '2025',
          maturity: '12+',
          duration: '2h 58m',
          tags: ['Przygodowy', 'Sci-Fi', 'Rodzinny'],
          desc: 'Nowa podróż na Pandorę, gdzie Na’vi odkrywają zachodnią granicę planety, walcząc o przyszłość swojego świata.',
          backdrop: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'arcane',
          title: 'Arcane',
          type: 'series',
          genre: 'Animacja',
          sub: 'Serial · 2024 · 2 sezony',
          year: '2024',
          maturity: '16+',
          duration: '45 min na odcinek',
          tags: ['Fantasy', 'Steampunk', 'League of Legends'],
          desc: 'Historia dwóch sióstr ze skonfliktowanych miast Piltover i Zaun, których przeznaczenie zmieni świat.',
          backdrop: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 1',
              episodes: [
                { title: 'Odcinek 1 — Zawirowania', duration: '44 min' },
                { title: 'Odcinek 2 — Niepokój', duration: '41 min' }
              ]
            },
            {
              name: 'Sezon 2',
              episodes: [
                { title: 'Odcinek 1 — Echo', duration: '43 min' },
                { title: 'Odcinek 2 — Runy', duration: '45 min' }
              ]
            }
          ]
        },
        {
          id: 'the-marvels',
          title: 'The Marvels',
          type: 'movie',
          genre: 'Superbohaterski',
          sub: 'Film · 2023 · 1h 45m',
          year: '2023',
          maturity: '12+',
          duration: '1h 45m',
          tags: ['Marvel', 'Kosmos', 'Akcja'],
          desc: 'Kapitan Marvel łączy siły z Kamalą Khan i Monicą Rambeau, by uratować galaktykę przed nowym zagrożeniem.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'damsel',
          title: 'Damsel',
          type: 'movie',
          genre: 'Fantasy',
          sub: 'Film · 2024 · 1h 50m',
          year: '2024',
          maturity: '13+',
          duration: '1h 50m',
          tags: ['Fantasy', 'Przygoda', 'Netflix'],
          desc: 'Księżniczka odkrywa, że jej królewskie wesele to intryga mająca złożyć ją w ofierze smokowi.',
          backdrop: 'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'fallout',
          title: 'Fallout',
          type: 'series',
          genre: 'Postapokaliptyczny',
          sub: 'Serial · 2024 · 1 sezon',
          year: '2024',
          maturity: '18+',
          duration: '55 min na odcinek',
          tags: ['Amazon', 'Adaptacja gry', 'Postapo'],
          desc: 'Mieszkańcy krypty muszą przystosować się do brutalnego świata po wojnie nuklearnej.',
          backdrop: 'https://images.unsplash.com/photo-1529927066849-18d5ea81f542?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 1',
              episodes: [
                { title: 'Odcinek 1 — The End', duration: '1h 2 min' },
                { title: 'Odcinek 2 — Ghouls', duration: '52 min' }
              ]
            }
          ]
        },
        {
          id: 'ghostbusters-frozen-empire',
          title: 'Pogromcy duchów: Imperium lodu',
          type: 'movie',
          genre: 'Przygodowy',
          sub: 'Film · 2024 · 1h 49m',
          year: '2024',
          maturity: '10+',
          duration: '1h 49m',
          tags: ['Komedia', 'Nostalgia', 'Rodzinny'],
          desc: 'Rodzina Spenglerów i oryginalna ekipa Ghostbusters ponownie bronią Nowego Jorku przed pradawnym chłodem.',
          backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80'
        }
      ],
      recommended: [
        {
          id: 'stranger-things',
          title: 'Stranger Things',
          type: 'series',
          genre: 'Sci-Fi',
          sub: 'Serial · 2016 · 4 sezony',
          year: '2016',
          maturity: '16+',
          duration: '50 min na odcinek',
          tags: ['Lata 80.', 'Horror', 'Kultowy'],
          desc: 'Paczkę dzieciaków z Hawkins czeka spotkanie z tajemniczym światem Upside Down w kultowej serii Netflix.',
          backdrop: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 4',
              episodes: [
                { title: 'Rozdział Jeden: Klub Ognia Piekielnego', duration: '1h 18 min' },
                { title: 'Rozdział Dwa: Klątwa Vecny', duration: '1h 20 min' }
              ]
            }
          ]
        },
        {
          id: 'witcher',
          title: 'Wiedźmin',
          type: 'series',
          genre: 'Fantasy',
          sub: 'Serial · 2019 · 3 sezony',
          year: '2019',
          maturity: '18+',
          duration: '60 min na odcinek',
          tags: ['Fantasy', 'Przygoda', 'Kultowe książki'],
          desc: 'Geralt z Rivii przemierza Kontynent, mierząc się z potworami i moralnymi dylematami.',
          backdrop: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 3',
              episodes: [
                { title: 'Ep. 1 — Shaerrawedd', duration: '52 min' },
                { title: 'Ep. 2 — Niezgoda', duration: '1h 2 min' }
              ]
            }
          ]
        },
        {
          id: 'blade-runner',
          title: 'Blade Runner 2049',
          type: 'movie',
          genre: 'Neo-noir',
          sub: 'Film · 2017 · 2h 44m',
          year: '2017',
          maturity: '16+',
          duration: '2h 44m',
          tags: ['Sci-Fi', 'Neo-noir', 'Kultowy'],
          desc: 'Nowy łowca androidów odkrywa dawno skrywaną tajemnicę, która może pogrążyć to, co pozostało z cywilizacji.',
          backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'dark',
          title: 'Dark',
          type: 'series',
          genre: 'Thriller',
          sub: 'Serial · 2017 · 3 sezony',
          year: '2017',
          maturity: '16+',
          duration: '60 min na odcinek',
          tags: ['Thriller', 'Sci-Fi', 'Mind-bending'],
          desc: 'Zniknięcia dzieci w miasteczku Winden odsłaniają wielopokoleniową tajemnicę podróży w czasie.',
          backdrop: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 2',
              episodes: [
                { title: 'Odcinek 1 — Zacznijmy od końca', duration: '53 min' },
                { title: 'Odcinek 2 — Mroczny materiał', duration: '55 min' }
              ]
            }
          ]
        },
        {
          id: 'house-of-the-dragon',
          title: 'Ród smoka',
          type: 'series',
          genre: 'Fantasy',
          sub: 'Serial · 2022 · 2 sezony',
          year: '2022',
          maturity: '18+',
          duration: '60 min na odcinek',
          tags: ['Game of Thrones', 'HBO', 'Drama'],
          desc: 'Historia rodu Targaryenów na dwa wieki przed wydarzeniami Gry o Tron, pełna intryg i smoków.',
          backdrop: 'https://images.unsplash.com/photo-1527239441920-2241a24f8f95?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 1',
              episodes: [
                { title: 'Ep. 1 — Dziedzice Smoka', duration: '59 min' },
                { title: 'Ep. 2 — Książę łotr', duration: '54 min' }
              ]
            }
          ]
        },
        {
          id: 'inception',
          title: 'Incepcja',
          type: 'movie',
          genre: 'Thriller',
          sub: 'Film · 2010 · 2h 28m',
          year: '2010',
          maturity: '13+',
          duration: '2h 28m',
          tags: ['Sci-Fi', 'Mind-bending', 'Christopher Nolan'],
          desc: 'Zespół złodziei snów wykonuje najtrudniejsze zadanie: zaszczepienie pomysłu w podświadomości ofiary.',
          backdrop: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
        }
      ]
    };

    const watchlist = new Map();
    const expandedState = {
      popular: null,
      new: null,
      recommended: null
    };

    function openMovieModal(movie) {
      modal.classList.add('open');
      modalTitle.textContent = movie.title;
      modalSub.textContent = movie.sub;
      modalDesc.textContent = movie.desc;
      if (modalVideo) {
        modalVideo.textContent = `Odtwarzanie „${movie.title}”...`;
      }
    }

    function closeModal() {
      modal.classList.remove('open');
      if (modalVideo) {
        modalVideo.textContent = 'Wideo';
      }
    }

    function setWatchlistButtonState(button, isInWatchlist) {
      if (!button) return;
      const { movieId, movieTitle } = button.dataset;
      if (!movieId || !movieTitle) return;

      if (isInWatchlist) {
        button.classList.add('is-added');
        button.textContent = 'Dodano';
        button.setAttribute('aria-pressed', 'true');
        button.setAttribute('aria-label', `Usuń „${movieTitle}” z listy do obejrzenia`);
      } else {
        button.classList.remove('is-added');
        button.textContent = 'Dodaj do listy';
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', `Dodaj „${movieTitle}” do listy do obejrzenia`);
      }
    }

    function syncWatchlistButtons(movieId) {
      const inWatchlist = watchlist.has(movieId);
      document.querySelectorAll(`[data-watchlist-btn="${movieId}"]`).forEach(button => {
        setWatchlistButtonState(button, inWatchlist);
      });
    }

    function updateWatchlistUI() {
      if (!watchlistList || !watchlistEmpty) return;

      watchlistList.innerHTML = '';
      if (watchlist.size === 0) {
        watchlistEmpty.style.display = 'block';
        watchlistList.style.display = 'none';
        return;
      }

      watchlistEmpty.style.display = 'none';
      watchlistList.style.display = 'grid';

      watchlist.forEach(movie => {
        const item = document.createElement('li');
        item.className = 'watchlist-item';

        const info = document.createElement('div');
        info.innerHTML = '<div class="watchlist-item-title">' + movie.title + '</div><div class="watchlist-item-sub">' + movie.sub + '</div>';

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'watchlist-remove';
        removeBtn.textContent = 'Usuń';
        removeBtn.addEventListener('click', () => {
          watchlist.delete(movie.id);
          updateWatchlistUI();
          syncWatchlistButtons(movie.id);
        });

        item.appendChild(info);
        item.appendChild(removeBtn);
        watchlistList.appendChild(item);
      });
    }

    function toggleWatchlist(movie) {
      if (watchlist.has(movie.id)) {
        watchlist.delete(movie.id);
      } else {
        watchlist.set(movie.id, movie);
      }
      updateWatchlistUI();
      syncWatchlistButtons(movie.id);
    }

    function collapseDetail(rowKey) {
      const detailContainer = detailContainers[rowKey];
      if (!detailContainer) return;
      const previousId = expandedState[rowKey];
      if (previousId) {
        const previousCard = sliderMap[rowKey]?.querySelector(`.movie-card[data-movie-id="${previousId}"]`);
        if (previousCard) {
          previousCard.classList.remove('is-expanded');
          const previousTrigger = previousCard.querySelector('.overlay-trigger');
          if (previousTrigger) {
            previousTrigger.setAttribute('aria-label', 'Pokaż szczegóły filmu');
            previousTrigger.setAttribute('aria-expanded', 'false');
          }
        }
      }

      if (detailContainer.classList.contains('open')) {
        detailContainer.dataset.closing = 'true';
        const handleTransitionEnd = event => {
          if (event.target !== detailContainer) return;
          if (event.propertyName !== 'opacity' && event.propertyName !== 'transform') return;
          detailContainer.removeEventListener('transitionend', handleTransitionEnd);
          if (detailContainer.dataset.closing === 'true') {
            detailContainer.innerHTML = '';
            delete detailContainer.dataset.closing;
          }
        };
        detailContainer.addEventListener('transitionend', handleTransitionEnd);
        detailContainer.classList.remove('open');
      } else {
        detailContainer.innerHTML = '';
        delete detailContainer.dataset.closing;
      }
      expandedState[rowKey] = null;
      const wrapper = wrapperMap[rowKey];
      if (wrapper) {
        wrapper.classList.remove('detail-open');
      }
      const section = sectionMap[rowKey];
      if (section) {
        section.classList.remove('detail-open');
      }
    }

    function buildDetailPanel(movie, rowKey) {
      const panel = document.createElement('div');
      panel.className = 'detail-panel';

      const visual = document.createElement('div');
      visual.className = 'detail-visual';
      if (movie.backdrop) {
        visual.style.backgroundImage = `url(${movie.backdrop})`;
      }

      const body = document.createElement('div');
      body.className = 'detail-body';

      const header = document.createElement('div');
      header.className = 'detail-header';

      const headerInfo = document.createElement('div');
      headerInfo.innerHTML = `<div class="detail-title">${movie.title}</div>`;

      const meta = document.createElement('div');
      meta.className = 'detail-meta';
      if (movie.sub) meta.innerHTML += `<span>${movie.sub}</span>`;
      if (movie.maturity) meta.innerHTML += `<span>${movie.maturity}</span>`;
      if (movie.duration) meta.innerHTML += `<span>${movie.duration}</span>`;
      headerInfo.appendChild(meta);

      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'detail-close';
      closeBtn.setAttribute('aria-label', 'Zamknij szczegóły');
      closeBtn.textContent = '×';
      closeBtn.addEventListener('click', event => {
        event.stopPropagation();
        collapseDetail(rowKey);
      });

      header.appendChild(headerInfo);
      header.appendChild(closeBtn);

      const actions = document.createElement('div');
      actions.className = 'detail-actions';

      const playBtn = document.createElement('button');
      playBtn.type = 'button';
      playBtn.className = 'detail-btn play-btn';
      playBtn.textContent = 'Odtwórz';
      playBtn.addEventListener('click', event => {
        event.stopPropagation();
        openMovieModal(movie);
      });

      const watchlistBtn = document.createElement('button');
      watchlistBtn.type = 'button';
      watchlistBtn.className = 'detail-btn watchlist-btn';
      watchlistBtn.dataset.movieId = movie.id;
      watchlistBtn.dataset.movieTitle = movie.title;
      watchlistBtn.dataset.watchlistBtn = movie.id;
      setWatchlistButtonState(watchlistBtn, watchlist.has(movie.id));
      watchlistBtn.addEventListener('click', event => {
        event.stopPropagation();
        toggleWatchlist(movie);
      });

      actions.appendChild(playBtn);
      actions.appendChild(watchlistBtn);

      const description = document.createElement('p');
      description.className = 'detail-desc';
      description.textContent = movie.desc || '';

      const tags = document.createElement('div');
      tags.className = 'detail-tags';
      if (Array.isArray(movie.tags)) {
        movie.tags.forEach(tag => {
          const span = document.createElement('span');
          span.textContent = tag;
          tags.appendChild(span);
        });
      }

      body.appendChild(header);
      body.appendChild(actions);
      if (movie.desc) body.appendChild(description);
      if (tags.childElementCount) body.appendChild(tags);

      if (movie.type === 'series' && Array.isArray(movie.seasons)) {
        const seasonsWrapper = document.createElement('div');
        seasonsWrapper.className = 'detail-seasons';
        movie.seasons.forEach(season => {
          const seasonBlock = document.createElement('div');
          seasonBlock.className = 'season-block';

          const summary = document.createElement('div');
          summary.className = 'season-summary';
          summary.innerHTML = `<span>${season.name}</span><span>${season.episodes.length} odc.</span>`;

          const episodes = document.createElement('ul');
          episodes.className = 'episodes';
          season.episodes.forEach(episode => {
            const li = document.createElement('li');
            li.className = 'episode';
            li.innerHTML = `<div class="episode-title">${episode.title}</div><div class="episode-duration">${episode.duration}</div>`;
            episodes.appendChild(li);
          });

          seasonBlock.appendChild(summary);
          seasonBlock.appendChild(episodes);
          seasonsWrapper.appendChild(seasonBlock);
        });
        body.appendChild(seasonsWrapper);
      }

      panel.appendChild(visual);
      panel.appendChild(body);
      return panel;
    }

    function toggleDetail(rowKey, movie, card) {
      const detailContainer = detailContainers[rowKey];
      if (!detailContainer) return;
      const activeRow = Object.keys(expandedState).find(key => expandedState[key]);
      if (activeRow && activeRow !== rowKey) {
        collapseDetail(activeRow);
      }

      if (expandedState[rowKey] === movie.id) {
        collapseDetail(rowKey);
        return;
      }

      collapseDetail(rowKey);

      if (!card) return;

      const triggerBtn = card.querySelector('.overlay-trigger');
      if (triggerBtn) {
        triggerBtn.setAttribute('aria-label', 'Zwiń szczegóły filmu');
        triggerBtn.setAttribute('aria-expanded', 'true');
      }

      detailContainer.dataset.closing = 'false';
      expandedState[rowKey] = movie.id;
      card.classList.add('is-expanded');
      detailContainer.innerHTML = '';
      detailContainer.appendChild(buildDetailPanel(movie, rowKey));
      requestAnimationFrame(() => detailContainer.classList.add('open'));
      const wrapper = wrapperMap[rowKey];
      if (wrapper) {
        wrapper.classList.add('detail-open');
      }
      const section = sectionMap[rowKey];
      if (section) {
        section.classList.add('detail-open');
      }
    }

    function createCard(movie, rowKey) {
      const card = document.createElement('article');
      card.className = 'movie-card';
      card.dataset.movieId = movie.id;
      card.dataset.row = rowKey;
      card.tabIndex = 0;

      const backdrop = document.createElement('div');
      backdrop.className = 'card-backdrop';
      if (movie.backdrop) {
        backdrop.style.backgroundImage = `url(${movie.backdrop})`;
      }

      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';

      const overlayContent = document.createElement('div');
      overlayContent.className = 'overlay-content';

      const overlayActions = document.createElement('div');
      overlayActions.className = 'overlay-actions';

      const playBtn = document.createElement('button');
      playBtn.type = 'button';
      playBtn.className = 'overlay-btn play-btn';
      playBtn.textContent = 'Odtwórz';
      playBtn.addEventListener('click', event => {
        event.stopPropagation();
        openMovieModal(movie);
      });

      const watchlistBtn = document.createElement('button');
      watchlistBtn.type = 'button';
      watchlistBtn.className = 'overlay-btn watchlist-btn';
      watchlistBtn.dataset.movieId = movie.id;
      watchlistBtn.dataset.movieTitle = movie.title;
      watchlistBtn.dataset.watchlistBtn = movie.id;
      setWatchlistButtonState(watchlistBtn, watchlist.has(movie.id));
      watchlistBtn.addEventListener('click', event => {
        event.stopPropagation();
        toggleWatchlist(movie);
      });

      overlayActions.appendChild(playBtn);
      overlayActions.appendChild(watchlistBtn);

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'overlay-trigger';
      trigger.setAttribute('aria-label', 'Pokaż szczegóły filmu');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.innerHTML = '<span class="overlay-trigger-icon" aria-hidden="true">' + EXPAND_ICON_SVG + '</span>';
      trigger.addEventListener('click', event => {
        event.stopPropagation();
        toggleDetail(rowKey, movie, card);
      });

      overlayContent.appendChild(overlayActions);
      overlayContent.appendChild(trigger);

      overlay.appendChild(overlayContent);

      card.appendChild(backdrop);
      card.appendChild(overlay);
      card.addEventListener('click', () => openMovieModal(movie));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          openMovieModal(movie);
        }
      });

      return card;
    }

    function updateSliderArrows(wrapper) {
      const slider = wrapper.querySelector('.slider');
      if (!slider) return;
      const left = wrapper.querySelector('.arrow-left');
      const right = wrapper.querySelector('.arrow-right');
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

      if (maxScrollLeft <= 1) {
        left?.classList.add('is-hidden');
        right?.classList.add('is-hidden');
        return;
      }

      if (slider.scrollLeft <= 8) {
        left?.classList.add('is-hidden');
      } else {
        left?.classList.remove('is-hidden');
      }

      if (slider.scrollLeft >= maxScrollLeft - 8) {
        right?.classList.add('is-hidden');
      } else {
        right?.classList.remove('is-hidden');
      }
    }

    function setupSlider(wrapper) {
      const rowKey = wrapper.dataset.row;
      const slider = wrapper.querySelector('.slider');
      const left = wrapper.querySelector('.arrow-left');
      const right = wrapper.querySelector('.arrow-right');
      if (!slider) return;

      updateSliderArrows(wrapper);
      slider.addEventListener('scroll', () => updateSliderArrows(wrapper));

      const scrollAmount = () => slider.clientWidth * 0.8;

      left?.addEventListener('click', event => {
        event.stopPropagation();
        slider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });

      right?.addEventListener('click', event => {
        event.stopPropagation();
        slider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });

      if (rowKey) {
        slider.addEventListener('scroll', () => {
          if (expandedState[rowKey]) {
            // keep detail panel aligned with active card
            const activeCard = sliderMap[rowKey]?.querySelector(`.movie-card[data-movie-id="${expandedState[rowKey]}"]`);
            if (!activeCard) {
              collapseDetail(rowKey);
            }
          }
        });
      }
    }

    Object.entries(catalog).forEach(([rowKey, items]) => {
      const row = sliderMap[rowKey];
      const wrapper = sliderWrappers.find(w => w.dataset.row === rowKey);
      if (!row || !wrapper) return;
      row.innerHTML = '';

      items.forEach(movie => {
        const card = createCard(movie, rowKey);
        row.appendChild(card);
      });

      setupSlider(wrapper);
      updateSliderArrows(wrapper);
    });

    window.addEventListener('resize', () => {
      sliderWrappers.forEach(updateSliderArrows);
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        closeModal();
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

    // Strzałki przewijania
    document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
      const slider = wrapper.querySelector('.slider');
      const left = wrapper.querySelector('.arrow-left');
      const right = wrapper.querySelector('.arrow-right');

      left.addEventListener('click', () => slider.scrollBy({ left: -400, behavior: 'smooth' }));
      right.addEventListener('click', () => slider.scrollBy({ left: 400, behavior: 'smooth' }));
    });

    // Wyszukiwarka
    function closeSearch() {
      if (!searchWrapper || !searchToggle) return;
      searchWrapper.dataset.open = 'false';
      searchToggle.setAttribute('aria-expanded', 'false');
      searchToggle.setAttribute('aria-label', 'Otwórz wyszukiwarkę');
    }

    function openSearch() {
      if (!searchWrapper || !searchToggle) return;
      searchWrapper.dataset.open = 'true';
      searchToggle.setAttribute('aria-expanded', 'true');
      searchToggle.setAttribute('aria-label', 'Zamknij wyszukiwarkę');
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 60);
      }
    }

    function closeAccountPanel() {
      if (!accountWrapper || !accountToggle) return;
      accountWrapper.dataset.open = 'false';
      accountToggle.setAttribute('aria-expanded', 'false');
    }

    function openAccountPanel() {
      if (!accountWrapper || !accountToggle) return;
      accountWrapper.dataset.open = 'true';
      accountToggle.setAttribute('aria-expanded', 'true');
    }

    if (searchToggle) {
      searchToggle.addEventListener('click', event => {
        event.stopPropagation();
        const isOpen = searchWrapper && searchWrapper.dataset.open === 'true';
        if (isOpen) {
          closeSearch();
        } else {
          openSearch();
          closeAccountPanel();
        }
      });
    }

    if (accountToggle) {
      accountToggle.addEventListener('click', event => {
        event.stopPropagation();
        const isOpen = accountWrapper && accountWrapper.dataset.open === 'true';
        if (isOpen) {
          closeAccountPanel();
        } else {
          openAccountPanel();
          closeSearch();
        }
      });
    }

    document.addEventListener('click', event => {
      if (searchWrapper && searchWrapper.dataset.open === 'true' && !searchWrapper.contains(event.target)) {
        closeSearch();
      }
      if (accountWrapper && accountWrapper.dataset.open === 'true' && !accountWrapper.contains(event.target)) {
        closeAccountPanel();
      }
    });

    if (navLinks.length) {
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navLinks.forEach(item => item.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        [popularRow, newRow, recommendedRow].forEach(row => {
          Array.from(row.children).forEach(card => {
            const title = card.querySelector('.title').textContent.toLowerCase();
            card.style.display = title.includes(term) ? 'flex' : 'none';
          });
        });
      });
    }

    updateWatchlistUI();

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (modal.classList.contains('open')) {
          closeModal();
        }
        if (searchWrapper && searchWrapper.dataset.open === 'true') {
          closeSearch();
        }
        if (accountWrapper && accountWrapper.dataset.open === 'true') {
          closeAccountPanel();
        }
      }
    }, { capture: true });
  });