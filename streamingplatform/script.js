// script.js — nowoczesny, animowany frontend ModernFlix

document.addEventListener('DOMContentLoaded', () => {
    const popularRows = [
      document.getElementById('popular-row-1'),
      document.getElementById('popular-row-2'),
      document.getElementById('popular-row-3')
    ];
    const newRows = [
      document.getElementById('new-row-1'),
      document.getElementById('new-row-2'),
      document.getElementById('new-row-3')
    ];
    const recommendedRows = [
      document.getElementById('recommended-row-1'),
      document.getElementById('recommended-row-2'),
      document.getElementById('recommended-row-3')
    ];
    const modal = document.getElementById('modal');
    const modalClose = modal.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalSub = document.getElementById('modal-sub');
    const modalDesc = document.getElementById('modal-desc');
    const modalVideo = modal.querySelector('.modal-video');
    const watchlistList = document.getElementById('watchlist-list');
    const watchlistEmpty = document.getElementById('watchlist-empty');
    const searchWrapper = document.querySelector('.search-wrapper');
    const searchToggle = document.querySelector('.search-toggle');
    const accountWrapper = document.querySelector('.account-wrapper');
    const accountToggle = document.querySelector('.account-toggle');
    const accountPanel = document.getElementById('account-panel');
    const navLinks = document.querySelectorAll('.nav-link');
    const libraryTabs = Array.from(document.querySelectorAll('.library-tab'));
    const libraryPanels = Array.from(document.querySelectorAll('.library-panel'));

    const sliderWrappers = Array.from(document.querySelectorAll('.slider-wrapper'));
    const activateWrapperArrows = wrapper => wrapper.classList.add('arrows-active');
    const deactivateWrapperArrows = wrapper => wrapper.classList.remove('arrows-active');
    const arrowHideTimers = new WeakMap();

    sliderWrappers.forEach(wrapper => {
      const leftArrow = wrapper.querySelector('.arrow-left');
      const rightArrow = wrapper.querySelector('.arrow-right');

      const clearHideTimer = () => {
        const timer = arrowHideTimers.get(wrapper);
        if (timer) {
          clearTimeout(timer);
          arrowHideTimers.delete(wrapper);
        }
      };

      const scheduleHide = () => {
        clearHideTimer();
        const timer = setTimeout(() => {
          if (wrapper.matches(':hover')) return;
          const activeElement = document.activeElement;
          if (activeElement && wrapper.contains(activeElement)) return;
          if (leftArrow?.matches(':hover') || rightArrow?.matches(':hover')) return;
          deactivateWrapperArrows(wrapper);
        }, 180);
        arrowHideTimers.set(wrapper, timer);
      };

      const showArrows = () => {
        clearHideTimer();
        activateWrapperArrows(wrapper);
        updateSliderArrows(wrapper);
      };

      wrapper.addEventListener('mouseenter', showArrows);
      wrapper.addEventListener('mouseleave', scheduleHide);
      wrapper.addEventListener('focusin', showArrows);
      wrapper.addEventListener('focusout', event => {
        if (!event.relatedTarget || !wrapper.contains(event.relatedTarget)) {
          scheduleHide();
        }
      });

      [leftArrow, rightArrow].forEach(button => {
        if (!button) return;
        button.addEventListener('mouseenter', showArrows);
        button.addEventListener('mouseleave', scheduleHide);
        button.addEventListener('focusin', showArrows);
        button.addEventListener('focusout', scheduleHide);
      });
    });
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
      'popular-1': popularRows[0],
      'popular-2': popularRows[1],
      'popular-3': popularRows[2],
      'new-1': newRows[0],
      'new-2': newRows[1],
      'new-3': newRows[2],
      'recommended-1': recommendedRows[0],
      'recommended-2': recommendedRows[1],
      'recommended-3': recommendedRows[2]
    };
    const detailContainers = sliderWrappers.reduce((acc, wrapper) => {
      const key = wrapper.dataset.row;
      if (key) {
        acc[key] = wrapper.querySelector('.slider-detail');
      }
      return acc;
    }, {});

    const catalog = {
      'popular-1': [
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
          backdrop: 'https://images.unsplash.com/photo-1526314116281-977cc23e6a11?auto=format&fit=crop&w=900&q=80',
          rating: 4.6
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
          backdrop: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
          rating: 4.8
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
          backdrop: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
          rating: 4.5
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
        },
        {
          id: 'joker',
          title: 'Joker',
          type: 'movie',
          genre: 'Psychologiczny',
          sub: 'Film · 2019 · 2h 2m',
          year: '2019',
          maturity: '16+',
          duration: '2h 2m',
          tags: ['DC', 'Psychologiczny', 'Oscar'],
          desc: 'Arthur Fleck przechodzi mroczną przemianę, odkrywając swoją tożsamość jako Joker.',
          backdrop: 'https://images.unsplash.com/photo-1542208999-58d04c7bb514?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'mad-max-fury-road',
          title: 'Mad Max: Na drodze gniewu',
          type: 'movie',
          genre: 'Akcja',
          sub: 'Film · 2015 · 2h',
          year: '2015',
          maturity: '16+',
          duration: '2h',
          tags: ['Postapokaliptyczny', 'Akcja', 'George Miller'],
          desc: 'Max Rockatansky łączy siły z Furiosą, aby uciec z despotycznego królestwa Immortan Joe.',
          backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'black-panther',
          title: 'Czarna Pantera',
          type: 'movie',
          genre: 'Superbohaterski',
          sub: 'Film · 2018 · 2h 14m',
          year: '2018',
          maturity: '12+',
          duration: '2h 14m',
          tags: ['Marvel', 'Afrofuturyzm', 'Oscar'],
          desc: 'T’Challa wraca do Wakandy, aby objąć tron i stawić czoła wyzwaniom odrodzonego Króla.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'parasite',
          title: 'Parasite',
          type: 'movie',
          genre: 'Thriller',
          sub: 'Film · 2019 · 2h 12m',
          year: '2019',
          maturity: '16+',
          duration: '2h 12m',
          tags: ['Oscar', 'Korea Południowa', 'Bong Joon-ho'],
          desc: 'Rodzina Kimów przejmuje posady w domu bogatej rodziny Parków, co prowadzi do nieoczekiwanych konsekwencji.',
          backdrop: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=900&q=80'
        }
      ],
      'popular-2': [
        {
          id: 'avengers-endgame',
          title: 'Avengers: Koniec gry',
          type: 'movie',
          genre: 'Superbohaterski',
          sub: 'Film · 2019 · 3h 1m',
          year: '2019',
          maturity: '12+',
          duration: '3h 1m',
          tags: ['Marvel', 'Superbohaterowie', 'Blockbuster'],
          desc: 'Ostatnia walka Avengersów z Thanosem, która decyduje o przyszłości wszechświata.',
          backdrop: 'https://images.unsplash.com/photo-1542208999-58d04c7bb514?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'fast-x',
          title: 'Szybcy i Wściekli X',
          type: 'movie',
          genre: 'Akcja',
          sub: 'Film · 2023 · 2h 21m',
          year: '2023',
          maturity: '12+',
          duration: '2h 21m',
          tags: ['Akcja', 'Vin Diesel', 'Rodzina'],
          desc: 'Dominic Toretto staje naprzeciw przeciwnikowi pragnącemu zemsty na jego rodzinie.',
          backdrop: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d4?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'creed-iii',
          title: 'Creed III',
          type: 'movie',
          genre: 'Sportowy',
          sub: 'Film · 2023 · 1h 56m',
          year: '2023',
          maturity: '12+',
          duration: '1h 56m',
          tags: ['Boks', 'Dramat', 'Michael B. Jordan'],
          desc: 'Adonis Creed konfrontuje się z przyjacielem z dzieciństwa, którego przeszłość powraca.',
          backdrop: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'aquaman-2',
          title: 'Aquaman i Zaginione Królestwo',
          type: 'movie',
          genre: 'Fantasy',
          sub: 'Film · 2023 · 2h 4m',
          year: '2023',
          maturity: '12+',
          duration: '2h 4m',
          tags: ['DC', 'Fantasy', 'Przygoda'],
          desc: 'Aquaman wraca do Atlantydy, aby stawić czoła nowemu zagrożeniu z głębin.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'nope',
          title: 'Nie!',
          type: 'movie',
          genre: 'Horror',
          sub: 'Film · 2022 · 2h 10m',
          year: '2022',
          maturity: '16+',
          duration: '2h 10m',
          tags: ['Jordan Peele', 'Sci-Fi', 'Thriller'],
          desc: 'Rodzeństwo z Hollywood odkrywa przerażające zjawisko nad swoim ranczem.',
          backdrop: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'godzilla-vs-kong',
          title: 'Godzilla vs. Kong',
          type: 'movie',
          genre: 'Sci-Fi',
          sub: 'Film · 2021 · 1h 53m',
          year: '2021',
          maturity: '12+',
          duration: '1h 53m',
          tags: ['MonsterVerse', 'Akcja', 'Epicki'],
          desc: 'Dwaj tytaniczni przeciwnicy stają naprzeciw siebie w walce o dominację.',
          backdrop: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'blade-runner-2049-popular',
          title: 'Blade Runner 2049',
          type: 'movie',
          genre: 'Sci-Fi',
          sub: 'Film · 2017 · 2h 44m',
          year: '2017',
          maturity: '16+',
          duration: '2h 44m',
          tags: ['Neo-noir', 'Villeneuve', 'Cyberpunk'],
          desc: 'Nowy łowca androidów odkrywa tajemnicę, która może pogrążyć resztki cywilizacji.',
          backdrop: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'knives-out',
          title: 'Na noże',
          type: 'movie',
          genre: 'Kryminalny',
          sub: 'Film · 2019 · 2h 10m',
          year: '2019',
          maturity: '13+',
          duration: '2h 10m',
          tags: ['Zagadka', 'Kryminalny', 'Rian Johnson'],
          desc: 'Ekscentryczny detektyw bada śmierć patriarchy bogatej rodziny.',
          backdrop: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'no-time-to-die',
          title: 'Nie czas umierać',
          type: 'movie',
          genre: 'Akcja',
          sub: 'Film · 2021 · 2h 43m',
          year: '2021',
          maturity: '13+',
          duration: '2h 43m',
          tags: ['James Bond', 'Akcja', 'Szpiegowski'],
          desc: 'James Bond wraca z emerytury, by stawić czoła nowemu zagrożeniu z bronią biologiczną.',
          backdrop: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'top-gun-maverick-popular',
          title: 'Top Gun: Maverick',
          type: 'movie',
          genre: 'Akcja',
          sub: 'Film · 2022 · 2h 11m',
          year: '2022',
          maturity: '12+',
          duration: '2h 11m',
          tags: ['Lotnictwo', 'IMAX', 'Blockbuster'],
          desc: 'Maverick wraca jako instruktor elitarnej jednostki i szkoli nowe pokolenie pilotów.',
          backdrop: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=900&q=80'
        }
      ],
      'popular-3': [
        {
          id: 'matrix-resurrections',
          title: 'Matrix Zmartwychwstania',
          type: 'movie',
          genre: 'Sci-Fi',
          sub: 'Film · 2021 · 2h 28m',
          year: '2021',
          maturity: '16+',
          duration: '2h 28m',
          tags: ['Sci-Fi', 'Matrix', 'Cyberpunk'],
          desc: 'Neo znów budzi się w Matrixie, odkrywając nową warstwę symulacji.',
          backdrop: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'shang-chi',
          title: 'Shang-Chi i legenda dziesięciu pierścieni',
          type: 'movie',
          genre: 'Akcja',
          sub: 'Film · 2021 · 2h 12m',
          year: '2021',
          maturity: '12+',
          duration: '2h 12m',
          tags: ['Marvel', 'Sztuki walki', 'Fantastyka'],
          desc: 'Mistrz sztuk walki musi zmierzyć się z przeszłością i tajemniczą organizacją Dziesięciu Pierścieni.',
          backdrop: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'tenet',
          title: 'Tenet',
          type: 'movie',
          genre: 'Thriller',
          sub: 'Film · 2020 · 2h 30m',
          year: '2020',
          maturity: '13+',
          duration: '2h 30m',
          tags: ['Christopher Nolan', 'Sci-Fi', 'Mind-bending'],
          desc: 'Agent CIA wykorzystuje inwersję czasu, aby zapobiec globalnej katastrofie.',
          backdrop: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'jurassic-world-dominion',
          title: 'Jurassic World: Dominion',
          type: 'movie',
          genre: 'Przygodowy',
          sub: 'Film · 2022 · 2h 27m',
          year: '2022',
          maturity: '12+',
          duration: '2h 27m',
          tags: ['Dinozaury', 'Akcja', 'Przygoda'],
          desc: 'Dinozaury i ludzie współistnieją na Ziemi, co prowadzi do niebezpiecznych konsekwencji.',
          backdrop: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'king-richard',
          title: 'King Richard: Zwycięska rodzina',
          type: 'movie',
          genre: 'Biograficzny',
          sub: 'Film · 2021 · 2h 24m',
          year: '2021',
          maturity: '10+',
          duration: '2h 24m',
          tags: ['Biografia', 'Sport', 'Will Smith'],
          desc: 'Historia Richarda Williamsa wychowującego tenisowe legendy Serenę i Venus.',
          backdrop: 'https://images.unsplash.com/photo-1509474520651-53cf02b30d8d?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'top-gun-classic',
          title: 'Top Gun',
          type: 'movie',
          genre: 'Akcja',
          sub: 'Film · 1986 · 1h 50m',
          year: '1986',
          maturity: '12+',
          duration: '1h 50m',
          tags: ['Klasyk', 'Lotnictwo', 'Akcja'],
          desc: 'Maverick szkoli się w elitarnej szkole pilotów myśliwców, rywalizując o miano najlepszego.',
          backdrop: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=900&q=80'
        }
      ],
      'new-1': [
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
        },
        {
          id: 'wonka',
          title: 'Wonka',
          type: 'movie',
          genre: 'Familijny',
          sub: 'Film · 2023 · 1h 56m',
          year: '2023',
          maturity: '7+',
          duration: '1h 56m',
          tags: ['Familijny', 'Muzyka', 'Przygodowy'],
          desc: 'Młody Willy Wonka realizuje marzenie o własnej fabryce czekolady, mierząc się z potężnym kartlem cukierniczym.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'napoleon',
          title: 'Napoleon',
          type: 'movie',
          genre: 'Historyczny',
          sub: 'Film · 2024 · 2h 38m',
          year: '2024',
          maturity: '16+',
          duration: '2h 38m',
          tags: ['Ridley Scott', 'Historia', 'Epicki'],
          desc: 'Biograficzna epopeja ukazująca wzloty i upadki Napoleona Bonaparte oraz jego relację z Józefiną.',
          backdrop: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'oppenheimer-new',
          title: 'Oppenheimer',
          type: 'movie',
          genre: 'Biograficzny',
          sub: 'Film · 2023 · 3h 1m',
          year: '2023',
          maturity: '16+',
          duration: '3h 1m',
          tags: ['Christopher Nolan', 'Biografia', 'Oscar'],
          desc: 'Twórca bomby atomowej staje w obliczu moralnych konsekwencji własnego wynalazku.',
          backdrop: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'dungeons-dragons',
          title: 'Dungeons & Dragons: Złodziejski Honor',
          type: 'movie',
          genre: 'Fantasy',
          sub: 'Film · 2023 · 2h 14m',
          year: '2023',
          maturity: '12+',
          duration: '2h 14m',
          tags: ['Przygoda', 'Humor', 'Fantasy'],
          desc: 'Drużyna awanturników rusza na wyprawę, by odzyskać skarb i uratować świat przed złowieszczą klątwą.',
          backdrop: 'https://images.unsplash.com/photo-1529927066849-18d5ea81f542?auto=format&fit=crop&w=900&q=80'
        }
      ],
      'new-2': [
        {
          id: 'killer-moon',
          title: 'Killer Moon',
          type: 'movie',
          genre: 'Thriller',
          sub: 'Film · 2025 · 2h 5m',
          year: '2025',
          maturity: '16+',
          duration: '2h 5m',
          tags: ['Thriller', 'Kosmos', 'Nowość'],
          desc: 'Załoga księżycowej stacji badawczej staje w obliczu tajemniczego zagrożenia z głębi kraterów.',
          backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'lost-kingdom',
          title: 'Lost Kingdom',
          type: 'series',
          genre: 'Fantasy',
          sub: 'Serial · 2025 · 1 sezon',
          year: '2025',
          maturity: '13+',
          duration: '52 min na odcinek',
          tags: ['Fantasy', 'Przygoda', 'Nowość'],
          desc: 'Młoda królowa próbuje odbudować upadłe królestwo, odkrywając dawno zapomniane moce.',
          backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'aurora',
          title: 'Aurora',
          type: 'movie',
          genre: 'Dramat',
          sub: 'Film · 2025 · 1h 58m',
          year: '2025',
          maturity: '12+',
          duration: '1h 58m',
          tags: ['Dramat', 'Coming of age', 'Nowość'],
          desc: 'Historia młodej skrzypaczki odkrywającej swoją tożsamość w trakcie zimowego festiwalu muzycznego.',
          backdrop: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'solaris-awakening',
          title: 'Solaris: Przebudzenie',
          type: 'series',
          genre: 'Sci-Fi',
          sub: 'Serial · 2025 · 1 sezon',
          year: '2025',
          maturity: '16+',
          duration: '48 min na odcinek',
          tags: ['Sci-Fi', 'Filozofia', 'Nowość'],
          desc: 'Adaptacja klasycznej powieści Lema z nowym spojrzeniem na świadomość i pamięć.',
          backdrop: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'neon-city',
          title: 'Neon City',
          type: 'movie',
          genre: 'Cyberpunk',
          sub: 'Film · 2025 · 2h 2m',
          year: '2025',
          maturity: '16+',
          duration: '2h 2m',
          tags: ['Cyberpunk', 'Thriller', 'Nowość'],
          desc: 'Detektyw w neonowej metropolii odkrywa spisek związany z kontrolą ludzkiej świadomości.',
          backdrop: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'echoes-of-time',
          title: 'Echoes of Time',
          type: 'movie',
          genre: 'Sci-Fi',
          sub: 'Film · 2025 · 2h 12m',
          year: '2025',
          maturity: '13+',
          duration: '2h 12m',
          tags: ['Podróże w czasie', 'Sci-Fi', 'Nowość'],
          desc: 'Fizycy próbują odwrócić skutki eksperymentu, który rozdarł rzeczywistość na wiele osi czasu.',
          backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80'
        }
      ],
      'new-3': [
        {
          id: 'afterglow',
          title: 'Afterglow',
          type: 'movie',
          genre: 'Romantyczny',
          sub: 'Film · 2025 · 1h 46m',
          year: '2025',
          maturity: '13+',
          duration: '1h 46m',
          tags: ['Romantyczny', 'Indie', 'Nowość'],
          desc: 'Młoda fotografka zakochuje się w nieznajomym podczas podróży koleją transsyberyjską.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'northbound',
          title: 'Northbound',
          type: 'series',
          genre: 'Dramat',
          sub: 'Serial · 2025 · 1 sezon',
          year: '2025',
          maturity: '12+',
          duration: '50 min na odcinek',
          tags: ['Dramat', 'Norwegia', 'Nowość'],
          desc: 'Historia rodziny z północy Norwegii walczącej z ekstremalnymi warunkami klimatycznymi.',
          backdrop: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'silent-planet',
          title: 'Silent Planet',
          type: 'movie',
          genre: 'Sci-Fi',
          sub: 'Film · 2025 · 1h 59m',
          year: '2025',
          maturity: '12+',
          duration: '1h 59m',
          tags: ['Sci-Fi', 'Thriller', 'Nowość'],
          desc: 'Załoga terraformująca nową planetę odkrywa, że nie są na niej sami.',
          backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'blue-harbor',
          title: 'Blue Harbor',
          type: 'movie',
          genre: 'Dramat',
          sub: 'Film · 2025 · 2h 7m',
          year: '2025',
          maturity: '13+',
          duration: '2h 7m',
          tags: ['Dramat', 'Rodzinny', 'Nowość'],
          desc: 'Kapitan statku rybackiego musi pogodzić tradycje z presją nowoczesności.',
          backdrop: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'beyond-surface',
          title: 'Beyond Surface',
          type: 'series',
          genre: 'Dokumentalny',
          sub: 'Serial · 2025 · 1 sezon',
          year: '2025',
          maturity: '7+',
          duration: '45 min na odcinek',
          tags: ['Dokument', 'Przyroda', 'Nowość'],
          desc: 'Ekipa badawcza eksploruje morskie głębiny, odkrywając nieznane gatunki.',
          backdrop: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'city-of-glass',
          title: 'City of Glass',
          type: 'movie',
          genre: 'Kryminalny',
          sub: 'Film · 2025 · 2h 11m',
          year: '2025',
          maturity: '16+',
          duration: '2h 11m',
          tags: ['Kryminalny', 'Thriller', 'Nowość'],
          desc: 'Detektyw prowadzi śledztwo w świecie pełnym lustrzanych metropolii i iluzji.',
          backdrop: 'https://images.unsplash.com/photo-1529927066849-18d5ea81f542?auto=format&fit=crop&w=900&q=80'
        }
      ],
      'recommended-1': [
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
        },
        {
          id: 'interstellar',
          title: 'Interstellar',
          type: 'movie',
          genre: 'Sci-Fi',
          sub: 'Film · 2014 · 2h 49m',
          year: '2014',
          maturity: '12+',
          duration: '2h 49m',
          tags: ['Sci-Fi', 'Kosmos', 'Christopher Nolan'],
          desc: 'Zdesperowani astronauti szukają nowego domu dla ludzkości, przekraczając granice wszechświata.',
          backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'la-la-land',
          title: 'La La Land',
          type: 'movie',
          genre: 'Musical',
          sub: 'Film · 2016 · 2h 8m',
          year: '2016',
          maturity: '10+',
          duration: '2h 8m',
          tags: ['Musical', 'Romantyczny', 'Oscar'],
          desc: 'Miłość i ambicje młodej pary w Los Angeles splatają się z jazzową magią kina.',
          backdrop: 'https://images.unsplash.com/photo-1436397543931-01c4a5162b0a?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'the-social-network',
          title: 'The Social Network',
          type: 'movie',
          genre: 'Dramat',
          sub: 'Film · 2010 · 2h',
          year: '2010',
          maturity: '13+',
          duration: '2h',
          tags: ['Biograficzny', 'Technologia', 'David Fincher'],
          desc: 'Chronika powstania Facebooka oraz konfliktów, które ukształtowały giganta mediów społecznościowych.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'arrival',
          title: 'Nowy początek',
          type: 'movie',
          genre: 'Sci-Fi',
          sub: 'Film · 2016 · 1h 56m',
          year: '2016',
          maturity: '12+',
          duration: '1h 56m',
          tags: ['Denis Villeneuve', 'Sci-Fi', 'Kontakt'],
          desc: 'Lingwistka próbuje porozumieć się z obcymi, odkrywając tajemnice czasu i przeznaczenia.',
          backdrop: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
        }
      ],
      'recommended-2': [
        {
          id: 'succession',
          title: 'Sukcesja',
          type: 'series',
          genre: 'Dramat',
          sub: 'Serial · 2018 · 4 sezony',
          year: '2018',
          maturity: '18+',
          duration: '60 min na odcinek',
          tags: ['HBO', 'Dramat', 'Rodzinny'],
          desc: 'Rywalizacja w rodzinie magnata medialnego o przejęcie kontroli nad korporacją.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'crown',
          title: 'The Crown',
          type: 'series',
          genre: 'Biograficzny',
          sub: 'Serial · 2016 · 6 sezonów',
          year: '2016',
          maturity: '16+',
          duration: '55 min na odcinek',
          tags: ['Monarchia', 'Biografia', 'Netflix'],
          desc: 'Historia panowania królowej Elżbiety II na przestrzeni dekad.',
          backdrop: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'oppenheimer-rec',
          title: 'Oppenheimer',
          type: 'movie',
          genre: 'Biograficzny',
          sub: 'Film · 2023 · 3h 1m',
          year: '2023',
          maturity: '16+',
          duration: '3h 1m',
          tags: ['Biografia', 'Christopher Nolan', 'Oscar'],
          desc: 'Opowieść o twórcy bomby atomowej i jego moralnych dylematach.',
          backdrop: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'the-prestige',
          title: 'Prestiż',
          type: 'movie',
          genre: 'Thriller',
          sub: 'Film · 2006 · 2h 10m',
          year: '2006',
          maturity: '12+',
          duration: '2h 10m',
          tags: ['Christopher Nolan', 'Thriller', 'Magia'],
          desc: 'Dwóch iluzjonistów rywalizuje o miano najlepszego, posuwając się do ekstremów.',
          backdrop: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'the-boys',
          title: 'The Boys',
          type: 'series',
          genre: 'Akcja',
          sub: 'Serial · 2019 · 4 sezony',
          year: '2019',
          maturity: '18+',
          duration: '58 min na odcinek',
          tags: ['Superbohaterowie', 'Amazon', 'Satrya'],
          desc: 'Antybohaterska drużyna walczy z korporacyjnie kontrolowanymi superherosami.',
          backdrop: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'once-upon-hollywood',
          title: 'Pewnego razu w Hollywood',
          type: 'movie',
          genre: 'Dramat',
          sub: 'Film · 2019 · 2h 41m',
          year: '2019',
          maturity: '16+',
          duration: '2h 41m',
          tags: ['Tarantino', 'Hollywood', 'Dramat'],
          desc: 'Aktor i jego dubler próbują znaleźć swoje miejsce w zmieniającym się Hollywood lat 60.',
          backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80'
        }
      ],
      'recommended-3': [
        {
          id: 'chernobyl',
          title: 'Czarnobyl',
          type: 'series',
          genre: 'Dramat',
          sub: 'Serial · 2019 · 1 sezon',
          year: '2019',
          maturity: '16+',
          duration: '60 min na odcinek',
          tags: ['HBO', 'Katastrofa', 'Historia'],
          desc: 'Rekonstrukcja wydarzeń po katastrofie w elektrowni jądrowej w Czarnobylu.',
          backdrop: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'westworld',
          title: 'Westworld',
          type: 'series',
          genre: 'Sci-Fi',
          sub: 'Serial · 2016 · 4 sezony',
          year: '2016',
          maturity: '18+',
          duration: '60 min na odcinek',
          tags: ['Sci-Fi', 'AI', 'Mind-bending'],
          desc: 'Park rozrywki z androidami oferuje odwiedzającym realizację fantazji, ale rzeczywistość wymyka się spod kontroli.',
          backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'dune',
          title: 'Diuna',
          type: 'movie',
          genre: 'Sci-Fi',
          sub: 'Film · 2021 · 2h 35m',
          year: '2021',
          maturity: '13+',
          duration: '2h 35m',
          tags: ['Sci-Fi', 'Epicki', 'Villeneuve'],
          desc: 'Syn księcia rodu Atrydów musi przenieść się na pustynną planetę Arrakis, by ocalić swój lud.',
          backdrop: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'la-la-land-rec',
          title: 'La La Land',
          type: 'movie',
          genre: 'Musical',
          sub: 'Film · 2016 · 2h 8m',
          year: '2016',
          maturity: '10+',
          duration: '2h 8m',
          tags: ['Musical', 'Romantyczny', 'Oscar'],
          desc: 'Historia miłości i ambicji w Los Angeles w rytmie jazzowych melodii.',
          backdrop: 'https://images.unsplash.com/photo-1436397543931-01c4a5162b0a?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'prisoners',
          title: 'Labirynt',
          type: 'movie',
          genre: 'Thriller',
          sub: 'Film · 2013 · 2h 33m',
          year: '2013',
          maturity: '16+',
          duration: '2h 33m',
          tags: ['Thriller', 'Dramat', 'Hugh Jackman'],
          desc: 'Ojciec szukający zaginionej córki decyduje się na desperackie kroki poza prawem.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 'gravity',
          title: 'Grawitacja',
          type: 'movie',
          genre: 'Sci-Fi',
          sub: 'Film · 2013 · 1h 31m',
          year: '2013',
          maturity: '12+',
          duration: '1h 31m',
          tags: ['Sci-Fi', 'Kosmos', 'Oscar'],
          desc: 'Astronautka walczy o przeżycie po zniszczeniu wahadłowca w przestrzeni kosmicznej.',
          backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80'
        }
      ],
      'top-series': [
        {
          id: 'breaking-bad',
          title: 'Breaking Bad',
          type: 'series',
          genre: 'Dramat',
          sub: 'Serial · 2008 · 5 sezonów',
          year: '2008',
          maturity: '18+',
          duration: '47 min na odcinek',
          tags: ['AMC', 'Antybohater', 'Kultowy'],
          desc: 'Nauczyciel chemii staje się baronem narkotykowym, by zabezpieczyć przyszłość rodziny.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 5',
              episodes: [
                { title: 'Live Free or Die', duration: '43 min' },
                { title: 'Madrigal', duration: '48 min' }
              ]
            }
          ]
        },
        {
          id: 'chernobyl',
          title: 'Czarnobyl',
          type: 'series',
          genre: 'Dramat',
          sub: 'Serial · 2019 · 1 sezon',
          year: '2019',
          maturity: '16+',
          duration: '60 min na odcinek',
          tags: ['HBO', 'Historia', 'Miniserial'],
          desc: 'Dramatyczne odtworzenie katastrofy nuklearnej w Czarnobylu i bohaterów, którzy ją powstrzymali.',
          backdrop: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 1',
              episodes: [
                { title: '1:23:45', duration: '60 min' },
                { title: 'Pochylone ramię', duration: '64 min' }
              ]
            }
          ]
        },
        {
          id: 'game-of-thrones',
          title: 'Gra o Tron',
          type: 'series',
          genre: 'Fantasy',
          sub: 'Serial · 2011 · 8 sezonów',
          year: '2011',
          maturity: '18+',
          duration: '55 min na odcinek',
          tags: ['HBO', 'Fantasy', 'Smoki'],
          desc: 'Walka o żelazny tron Westeros rozciąga się na osiem sezonów pełnych intryg i bitew.',
          backdrop: 'https://images.unsplash.com/photo-1527239441920-2241a24f8f95?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 8',
              episodes: [
                { title: 'Winterfell', duration: '54 min' },
                { title: 'The Long Night', duration: '82 min' }
              ]
            }
          ]
        },
        {
          id: 'sherlock',
          title: 'Sherlock',
          type: 'series',
          genre: 'Kryminalny',
          sub: 'Serial · 2010 · 4 sezony',
          year: '2010',
          maturity: '12+',
          duration: '90 min na odcinek',
          tags: ['BBC', 'Detektywistyczny', 'Kultowy'],
          desc: 'Sherlock Holmes rozwiązuje zagadki w realiach współczesnego Londynu.',
          backdrop: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 4',
              episodes: [
                { title: 'The Six Thatchers', duration: '88 min' },
                { title: 'The Lying Detective', duration: '89 min' }
              ]
            }
          ]
        },
        {
          id: 'peaky-blinders',
          title: 'Peaky Blinders',
          type: 'series',
          genre: 'Gangsterski',
          sub: 'Serial · 2013 · 6 sezonów',
          year: '2013',
          maturity: '16+',
          duration: '60 min na odcinek',
          tags: ['BBC', 'Historia', 'Tommy Shelby'],
          desc: 'Rodzina Shelby rozszerza swoje wpływy w powojennym Birmingham.',
          backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 6',
              episodes: [
                { title: 'Black Day', duration: '58 min' },
                { title: 'Black Shirt', duration: '56 min' }
              ]
            }
          ]
        },
        {
          id: 'stranger-things-top',
          title: 'Stranger Things',
          type: 'series',
          genre: 'Sci-Fi',
          sub: 'Serial · 2016 · 4 sezony',
          year: '2016',
          maturity: '16+',
          duration: '50 min na odcinek',
          tags: ['Netflix', 'Horror', 'Lata 80.'],
          desc: 'Dzieciaki z Hawkins mierzą się z kolejnymi zagrożeniami z drugiej strony Portalu.',
          backdrop: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 4',
              episodes: [
                { title: 'Rozdział Jeden: Klub Ognia Piekielnego', duration: '78 min' },
                { title: 'Rozdział Dwa: Klątwa Vecny', duration: '80 min' }
              ]
            }
          ]
        },
        {
          id: 'the-wire',
          title: 'Prawo ulicy',
          type: 'series',
          genre: 'Dramat',
          sub: 'Serial · 2002 · 5 sezonów',
          year: '2002',
          maturity: '18+',
          duration: '55 min na odcinek',
          tags: ['HBO', 'Realizm', 'Kultowy'],
          desc: 'Serial o Baltimore ukazujący relacje policji, dilerów i instytucji publicznych.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 5',
              episodes: [
                { title: 'More with Less', duration: '58 min' },
                { title: 'Transitions', duration: '58 min' }
              ]
            }
          ]
        },
        {
          id: 'narcos',
          title: 'Narcos',
          type: 'series',
          genre: 'Crime',
          sub: 'Serial · 2015 · 3 sezony',
          year: '2015',
          maturity: '18+',
          duration: '50 min na odcinek',
          tags: ['Netflix', 'Kartel', 'Biograficzny'],
          desc: 'Kronika wzlotu i upadku Pablo Escobara oraz wojny z kartelami.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 2',
              episodes: [
                { title: 'Free at Last', duration: '50 min' },
                { title: 'Cambalache', duration: '45 min' }
              ]
            }
          ]
        },
        {
          id: 'the-crown',
          title: 'The Crown',
          type: 'series',
          genre: 'Biograficzny',
          sub: 'Serial · 2016 · 6 sezonów',
          year: '2016',
          maturity: '16+',
          duration: '55 min na odcinek',
          tags: ['Netflix', 'Monarchia', 'Biografia'],
          desc: 'Historia panowania królowej Elżbiety II od lat 40. XX wieku.',
          backdrop: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 6',
              episodes: [
                { title: 'Persona Non Grata', duration: '57 min' },
                { title: 'Two Photographs', duration: '55 min' }
              ]
            }
          ]
        },
        {
          id: 'house-of-cards',
          title: 'House of Cards',
          type: 'series',
          genre: 'Polityczny',
          sub: 'Serial · 2013 · 6 sezonów',
          year: '2013',
          maturity: '18+',
          duration: '55 min na odcinek',
          tags: ['Netflix', 'Polityka', 'Thriller'],
          desc: 'Frank Underwood wspina się po szczeblach władzy Waszyngtonu, wykorzystując intrygi i manipulacje.',
          backdrop: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=80',
          seasons: [
            {
              name: 'Sezon 3',
              episodes: [
                { title: 'Chapter 27', duration: '52 min' },
                { title: 'Chapter 28', duration: '52 min' }
              ]
            }
          ]
        }
      ]
    };

    const watchlist = new Map();
    const expandedState = Object.keys(sliderMap).reduce((acc, key) => {
      acc[key] = null;
      return acc;
    }, {});

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

    function setWatchlistButtonState(button, isInWatchlist, { animate = false } = {}) {
      if (!button) return;
      const { movieId, movieTitle } = button.dataset;
      if (!movieId || !movieTitle) return;
      const card = document.querySelector(`.movie-card[data-movie-id="${movieId}"]`);

      if (isInWatchlist) {
        button.classList.add('is-added');
        button.innerHTML = '<span class="icon-check" aria-hidden="true"></span><span class="sr-only">Usuń „' + movieTitle + '” z listy</span>';
        button.setAttribute('aria-pressed', 'true');
        button.setAttribute('aria-label', `Usuń „${movieTitle}” z listy do obejrzenia`);
        if (card) {
          card.classList.add('is-watchlisted');
          if (animate) {
            card.classList.remove('watchlist-pulse');
            void card.offsetWidth;
            card.classList.add('watchlist-pulse');
            card.addEventListener('animationend', () => {
              card.classList.remove('watchlist-pulse');
            }, { once: true });
          }
        }
      } else {
        button.classList.remove('is-added');
        button.innerHTML = '<span class="icon-plus" aria-hidden="true"></span><span class="sr-only">Dodaj „' + movieTitle + '” do listy</span>';
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('aria-label', `Dodaj „${movieTitle}” do listy do obejrzenia`);
        if (card) {
          card.classList.remove('is-watchlisted');
          card.classList.remove('watchlist-pulse');
        }
      }
    }

    function syncWatchlistButtons(movieId, options = {}) {
      const inWatchlist = watchlist.has(movieId);
      document.querySelectorAll(`[data-watchlist-btn="${movieId}"]`).forEach(button => {
        setWatchlistButtonState(button, inWatchlist, options);
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
          syncWatchlistButtons(movie.id, { animate: false });
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

      syncWatchlistButtons(movie.id, { animate: true });
      updateWatchlistUI();
    }

    function collapseDetail(rowKey) {
      const detailContainer = detailContainers[rowKey];
      if (!detailContainer) return;
      const previousId = expandedState[rowKey];
      if (previousId) {
        const previousCard = sliderMap[rowKey]?.querySelector(`.movie-card[data-movie-id="${previousId}"]`);
        if (previousCard) {
          previousCard.classList.remove('is-expanded');
          const previousTrigger = previousCard.querySelector('.card-detail-btn');
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

    function createCard(movie, rowKey) {
      const card = document.createElement('article');
      card.className = 'movie-card';
      card.dataset.movieId = movie.id;
      card.dataset.movieTitle = movie.title;
      card.dataset.row = rowKey;
      card.tabIndex = 0;

      const media = document.createElement('div');
      media.className = 'card-media';

      const mediaImage = document.createElement('div');
      mediaImage.className = 'card-media-image';
      if (movie.backdrop) {
        mediaImage.style.backgroundImage = `url(${movie.backdrop})`;
      }

      const mediaGradient = document.createElement('div');
      mediaGradient.className = 'card-media-gradient';

      media.appendChild(mediaImage);
      media.appendChild(mediaGradient);

      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';

      const overlayTop = document.createElement('div');
      overlayTop.className = 'card-overlay-top';

      const watchlistBtn = document.createElement('button');
      watchlistBtn.type = 'button';
      watchlistBtn.className = 'card-icon-btn watchlist-btn';
      watchlistBtn.dataset.movieId = movie.id;
      watchlistBtn.dataset.movieTitle = movie.title;
      watchlistBtn.dataset.watchlistBtn = movie.id;
      watchlistBtn.innerHTML = '<span class="icon-plus" aria-hidden="true"></span><span class="sr-only">Dodaj do listy</span>';
      setWatchlistButtonState(watchlistBtn, watchlist.has(movie.id));
      watchlistBtn.addEventListener('click', event => {
        event.stopPropagation();
        toggleWatchlist(movie);
      });

      const ratingContainer = document.createElement('div');
      ratingContainer.className = 'card-rating';
      const ratingText = typeof movie.rating === 'number' ? `${movie.rating.toFixed(1)}/5` : '4.7/5';
      ratingContainer.innerHTML = '<span class="icon-star" aria-hidden="true"></span><span class="card-rating-value">' + ratingText + '</span>';

      overlayTop.appendChild(watchlistBtn);
      overlayTop.appendChild(ratingContainer);

      const overlayCenter = document.createElement('div');
      overlayCenter.className = 'card-overlay-center';

      const playBtn = document.createElement('button');
      playBtn.type = 'button';
      playBtn.className = 'card-play-btn';
      playBtn.setAttribute('aria-label', `Odtwórz „${movie.title}”`);
      playBtn.innerHTML = '<span class="card-play-icon" aria-hidden="true"></span>';
      playBtn.addEventListener('click', event => {
        event.stopPropagation();
        openMovieModal(movie);
      });

      overlayCenter.appendChild(playBtn);

      overlay.appendChild(overlayTop);
      overlay.appendChild(overlayCenter);

      media.appendChild(overlay);

      card.appendChild(media);

      const watchlistMarker = document.createElement('div');
      watchlistMarker.className = 'card-watchlist-marker';
      watchlistMarker.innerHTML = '<span class="icon-check" aria-hidden="true"></span><span>Na liście</span>';
      card.appendChild(watchlistMarker);

      card.addEventListener('click', () => openMovieModal(movie));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
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

      const tolerance = 24;

      if (maxScrollLeft <= tolerance) {
        left?.classList.add('is-hidden');
        right?.classList.add('is-hidden');
        return;
      }

      if (slider.scrollLeft <= tolerance) {
        left?.classList.add('is-hidden');
      } else {
        left?.classList.remove('is-hidden');
      }

      if (slider.scrollLeft >= maxScrollLeft - tolerance) {
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

      const scrollAmount = () => slider.clientWidth;

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
      if (!slider) return;
      left?.addEventListener('click', () => slider.scrollBy({ left: -400, behavior: 'smooth' }));
      right?.addEventListener('click', () => slider.scrollBy({ left: 400, behavior: 'smooth' }));
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
          const targetTab = link.dataset.tabTarget;
          if (targetTab) {
            activateLibraryTab(targetTab);
          }
        });
      });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      const searchableRows = Object.values(sliderMap).filter(Boolean);
      searchInput.addEventListener('input', e => {
        const term = e.target.value.trim().toLowerCase();
        searchableRows.forEach(row => {
          Array.from(row.children).forEach(card => {
            const label = card.dataset.movieTitle || card.dataset.movieId || '';
            card.style.display = label.toLowerCase().includes(term) ? '' : 'none';
          });
        });
      });
    }

    function activateLibraryTab(targetKey) {
      if (!targetKey) return;
      libraryTabs.forEach(tab => {
        const isActive = tab.dataset.target === targetKey;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });
      libraryPanels.forEach(panel => {
        const isActive = panel.dataset.panel === targetKey;
        panel.classList.toggle('active', isActive);
        if (isActive) {
          panel.removeAttribute('hidden');
          const wrapper = panel.querySelector('.slider-wrapper');
          if (wrapper) {
            requestAnimationFrame(() => updateSliderArrows(wrapper));
          }
        } else {
          panel.setAttribute('hidden', '');
        }
      });
    }

    if (libraryTabs.length && libraryPanels.length) {
      libraryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetKey = tab.dataset.target;
          activateLibraryTab(targetKey);
        });
      });
      activateLibraryTab(libraryTabs.find(tab => tab.classList.contains('active'))?.dataset.target || 'new');
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