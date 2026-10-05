/**
 * Portal Oficial - Programa de Ingeniería de Sistemas
 * Universidad de la Amazonia (SNIES: 52384 | Res. MEN 001562)
 *
 * App Controller (Patrón Modular)
 */

const App = (() => {
  // Constantes globales del plan de estudios oficial
  const CONFIG = {
    TOTAL_CREDITOS: 178,
    TOTAL_MATERIAS: 50,
    TOAST_DURATION: 5000
  };

  /**
   * Módulo: Navegación y Menú Móvil
   * Gestiona el despliegue del menú móvil, su accesibilidad y el autocierre al hacer clic en enlaces.
   */
  const Navigation = {
    mobileBtn: null,
    mobileMenu: null,
    menuLinks: [],

    init() {
      this.mobileBtn = document.getElementById('mobile-menu-btn');
      this.mobileMenu = document.getElementById('mobile-menu');

      if (!this.mobileBtn || !this.mobileMenu) return;

      // Configuración de atributos de accesibilidad iniciales
      this.mobileBtn.setAttribute('aria-expanded', 'false');
      this.mobileBtn.setAttribute('aria-controls', 'mobile-menu');
      this.mobileBtn.setAttribute('aria-label', 'Abrir menú de navegación');

      // Evento toggle botón móvil
      this.mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });

      // Autocierre al hacer clic en cualquier enlace del menú móvil
      this.menuLinks = Array.from(this.mobileMenu.querySelectorAll('a'));
      this.menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
          this.close();
        });
      });

      // Cerrar al presionar la tecla Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !this.mobileMenu.classList.contains('hidden')) {
          this.close();
          this.mobileBtn.focus();
        }
      });

      // Cerrar al hacer clic fuera del menú
      document.addEventListener('click', (e) => {
        if (
          !this.mobileMenu.classList.contains('hidden') &&
          !this.mobileMenu.contains(e.target) &&
          !this.mobileBtn.contains(e.target)
        ) {
          this.close();
        }
      });
    },

    toggle() {
      const isClosed = this.mobileMenu.classList.contains('hidden');
      if (isClosed) {
        this.open();
      } else {
        this.close();
      }
    },

    open() {
      this.mobileMenu.classList.remove('hidden');
      this.mobileBtn.setAttribute('aria-expanded', 'true');
      this.mobileBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
    },

    close() {
      this.mobileMenu.classList.add('hidden');
      this.mobileBtn.setAttribute('aria-expanded', 'false');
      this.mobileBtn.setAttribute('aria-label', 'Abrir menú de navegación');
    }
  };

  /**
   * Módulo: Tabs con roles WAI-ARIA y soporte de navegación por teclado
   * Gestiona el cambio entre Propósito, Misión/Visión y Perfil del Egresado.
   */
  const Tabs = {
    tabBtns: [],
    tabContents: [],

    init() {
      this.tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
      this.tabContents = Array.from(document.querySelectorAll('.tab-content'));

      if (this.tabBtns.length === 0) return;

      // Configurar contenedor tablist WAI-ARIA
      const tabListContainer = this.tabBtns[0].parentElement;
      if (tabListContainer) {
        tabListContainer.setAttribute('role', 'tablist');
        tabListContainer.setAttribute('aria-label', 'Información institucional del programa');
      }

      // Configurar cada botón y su panel correspondiente
      this.tabBtns.forEach((btn, index) => {
        const targetId = btn.dataset.tab;
        const btnId = `tab-btn-${targetId.replace(/^tab-/, '')}`;

        btn.setAttribute('role', 'tab');
        btn.setAttribute('id', btnId);
        btn.setAttribute('aria-controls', targetId);

        const panel = document.getElementById(targetId);
        if (panel) {
          panel.setAttribute('role', 'tabpanel');
          panel.setAttribute('aria-labelledby', btnId);
          panel.setAttribute('tabindex', '0');
        }

        // Evento de clic
        btn.addEventListener('click', () => {
          this.activateTab(btn, false);
        });

        // Soporte de navegación por teclado (WAI-ARIA Tabs Pattern)
        btn.addEventListener('keydown', (e) => {
          this.handleKeydown(e, index);
        });
      });

      // Activar tab inicial (el primero con clase activa o por defecto el primero)
      const initialTab = this.tabBtns.find((b) => b.classList.contains('bg-emerald-600')) || this.tabBtns[0];
      this.activateTab(initialTab, false);
    },

    activateTab(selectedBtn, shouldFocus = false) {
      const targetId = selectedBtn.dataset.tab;

      // Actualizar estados y estilos de los botones
      this.tabBtns.forEach((btn) => {
        const isSelected = btn === selectedBtn;
        btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        btn.setAttribute('tabindex', isSelected ? '0' : '-1');

        if (isSelected) {
          btn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
          btn.classList.add('bg-emerald-600', 'text-white', 'shadow-md');
          if (shouldFocus) {
            btn.focus();
          }
        } else {
          btn.classList.remove('bg-emerald-600', 'text-white', 'shadow-md');
          btn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        }
      });

      // Actualizar paneles de contenido
      this.tabContents.forEach((content) => {
        if (content.id === targetId) {
          content.classList.remove('hidden');
          content.removeAttribute('hidden');
          content.setAttribute('aria-hidden', 'false');
        } else {
          content.classList.add('hidden');
          content.setAttribute('hidden', '');
          content.setAttribute('aria-hidden', 'true');
        }
      });
    },

    handleKeydown(e, currentIndex) {
      let nextIndex = currentIndex;
      const totalTabs = this.tabBtns.length;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % totalTabs;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = (currentIndex - 1 + totalTabs) % totalTabs;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = totalTabs - 1;
          break;
        default:
          return;
      }

      const nextBtn = this.tabBtns[nextIndex];
      if (nextBtn) {
        this.activateTab(nextBtn, true);
      }
    }
  };

  /**
   * Módulo: Plan de Estudios (Pensum) y Filtros
   * Renderiza las asignaturas, mantiene los contadores globales fijos y ofrece empty state con reset.
   */
  const Pensum = {
    container: null,
    semesterFilter: null,
    searchInput: null,
    statTotalCreditos: null,
    statTotalMaterias: null,

    init() {
      this.container = document.getElementById('pensum-container');
      this.semesterFilter = document.getElementById('filter-semestre');
      this.searchInput = document.getElementById('search-materia');
      this.statTotalCreditos = document.getElementById('stat-total-creditos');
      this.statTotalMaterias = document.getElementById('stat-total-materias');

      // Inicializar y fijar contadores globales institucionales (178 Créditos / 50 Materias)
      this.initGlobalStats();

      // Render inicial con todos los datos
      const data = typeof PENSUM_DATA !== 'undefined' ? PENSUM_DATA : [];
      this.render(data);

      // Event Listeners para filtrado dinámico
      if (this.semesterFilter) {
        this.semesterFilter.addEventListener('change', () => this.filter());
      }
      if (this.searchInput) {
        this.searchInput.addEventListener('input', () => this.filter());
      }
    },

    initGlobalStats() {
      // Calcular los totales reales del pensum institucional o usar valores fijos oficiales
      let totalCreditos = CONFIG.TOTAL_CREDITOS;
      let totalMaterias = CONFIG.TOTAL_MATERIAS;

      if (typeof PENSUM_DATA !== 'undefined' && Array.isArray(PENSUM_DATA) && PENSUM_DATA.length > 0) {
        totalMaterias = PENSUM_DATA.reduce((acc, sem) => acc + (sem.materias ? sem.materias.length : 0), 0);
        totalCreditos = PENSUM_DATA.reduce((acc, sem) => {
          return acc + (sem.materias ? sem.materias.reduce((sAcc, m) => sAcc + (m.creditos || 0), 0) : 0);
        }, 0);
      }

      if (this.statTotalCreditos) {
        this.statTotalCreditos.textContent = totalCreditos;
      }
      if (this.statTotalMaterias) {
        this.statTotalMaterias.textContent = totalMaterias;
      }
    },

    render(data) {
      if (!this.container) return;

      this.container.innerHTML = '';

      // Si no hay semestres o asignaturas que mostrar, desplegar Empty State
      if (!data || data.length === 0) {
        this.renderEmptyState();
        return;
      }

      data.forEach((sem) => {
        const semCreditos = sem.materias.reduce((acc, m) => acc + m.creditos, 0);

        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between';

        const semHeader = document.createElement('div');
        semHeader.className = 'bg-slate-900 text-white p-4 flex justify-between items-center';
        semHeader.innerHTML = `
          <div class="flex items-center space-x-2">
            <span class="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 font-bold flex items-center justify-center text-sm">${sem.semestre}</span>
            <h3 class="font-bold text-lg">${sem.titulo}</h3>
          </div>
          <span class="text-xs bg-slate-800 text-emerald-400 px-3 py-1 rounded-full font-medium border border-slate-700">${semCreditos} Créditos</span>
        `;

        const semBody = document.createElement('div');
        semBody.className = 'p-4 space-y-3 flex-1';

        sem.materias.forEach((mat) => {
          const badgeColor = this.getAreaBadgeColor(mat.area);
          const matEl = document.createElement('div');
          matEl.className = 'p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition flex flex-col justify-between';
          matEl.innerHTML = `
            <div class="flex justify-between items-start mb-1">
              <span class="text-xs font-mono font-bold text-gray-500">Cód: ${mat.codigo}</span>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}">${mat.area}</span>
            </div>
            <h4 class="font-medium text-slate-800 text-sm mb-2">${mat.nombre}</h4>
            <div class="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span>Prerreq: <strong class="text-gray-700">${mat.prerrequisitos}</strong></span>
              <span class="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">${mat.creditos} CR</span>
            </div>
          `;
          semBody.appendChild(matEl);
        });

        card.appendChild(semHeader);
        card.appendChild(semBody);
        this.container.appendChild(card);
      });

      // NOTA: Los contadores globales stat-total-creditos y stat-total-materias
      // se mantienen fijos y representativos del programa oficial completo (178 CR / 50 materias).
    },

    renderEmptyState() {
      if (!this.container) return;

      const emptyEl = document.createElement('div');
      emptyEl.className = 'col-span-full bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm max-w-xl mx-auto my-4 flex flex-col items-center animate-fade-in';
      emptyEl.innerHTML = `
        <div class="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-2xl mb-4 shadow-inner">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3 class="text-xl font-extrabold text-slate-900 mb-2">No se encontraron asignaturas</h3>
        <p class="text-sm text-slate-600 mb-6 max-w-md">
          No hay materias que coincidan con el término de búsqueda o el semestre seleccionado. Podés restablecer los filtros para consultar la malla curricular completa.
        </p>
        <button id="btn-reset-pensum-filter" type="button" class="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition">
          <i class="fa-solid fa-rotate-left mr-1"></i>
          <span>Restablecer Filtros</span>
        </button>
      `;

      this.container.appendChild(emptyEl);

      const resetBtn = emptyEl.querySelector('#btn-reset-pensum-filter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.resetFilters();
        });
      }
    },

    filter() {
      if (typeof PENSUM_DATA === 'undefined') return;

      const semValue = this.semesterFilter ? this.semesterFilter.value : 'todos';
      const searchValue = this.searchInput ? this.searchInput.value.toLowerCase().trim() : '';

      let filtered = JSON.parse(JSON.stringify(PENSUM_DATA));

      if (semValue !== 'todos') {
        filtered = filtered.filter((s) => s.semestre === parseInt(semValue, 10));
      }

      if (searchValue !== '') {
        filtered = filtered
          .map((s) => {
            const matchingMaterias = s.materias.filter(
              (m) =>
                m.nombre.toLowerCase().includes(searchValue) ||
                m.codigo.toLowerCase().includes(searchValue) ||
                m.area.toLowerCase().includes(searchValue)
            );
            return { ...s, materias: matchingMaterias };
          })
          .filter((s) => s.materias.length > 0);
      }

      this.render(filtered);
    },

    resetFilters() {
      if (this.semesterFilter) {
        this.semesterFilter.value = 'todos';
      }
      if (this.searchInput) {
        this.searchInput.value = '';
      }

      this.filter();

      if (this.searchInput) {
        this.searchInput.focus();
      }
    },

    getAreaBadgeColor(area) {
      switch (area) {
        case 'Básica':
          return 'bg-blue-100 text-blue-800 border border-blue-200';
        case 'Profesional':
          return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        case 'Institucional':
          return 'bg-purple-100 text-purple-800 border border-purple-200';
        case 'Humanística':
          return 'bg-amber-100 text-amber-800 border border-amber-200';
        case 'Investigación':
          return 'bg-rose-100 text-rose-800 border border-rose-200';
        case 'Gestión':
          return 'bg-cyan-100 text-cyan-800 border border-cyan-200';
        case 'Electiva':
          return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
        default:
          return 'bg-gray-100 text-gray-800 border border-gray-200';
      }
    }
  };

  /**
   * Módulo: Formulario de Contacto y Feedback No Bloqueante (Toast)
   * Procesa el envío asíncrono sin alert() síncronos y notifica al usuario con un Toast accesible.
   */
  const ContactForm = {
    form: null,
    toastEl: null,
    toastTimeout: null,

    init() {
      this.form = document.querySelector('#contacto form') || document.querySelector('form');
      if (!this.form) return;

      // Anular cualquier manejador inline onsubmit si existía
      this.form.removeAttribute('onsubmit');
      this.form.onsubmit = null;

      this.form.addEventListener('submit', (e) => {
        this.handleSubmit(e);
      });
    },

    handleSubmit(e) {
      e.preventDefault();

      // Validación nativa HTML5
      if (!this.form.checkValidity()) {
        this.form.reportValidity();
        return;
      }

      const submitBtn = this.form.querySelector('button[type="submit"]');
      const nombreInput = document.getElementById('form-nombre');
      const nombre = nombreInput && nombreInput.value.trim() ? nombreInput.value.trim() : 'Estimado/a aspirante';

      const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';

      // Estado de carga en el botón
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <i class="fa-solid fa-circle-notch fa-spin mr-2"></i>
          <span>Enviando mensaje...</span>
        `;
      }

      // Simulación de envío asíncrono no bloqueante
      setTimeout(() => {
        this.form.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
        }

        this.showToast(
          '¡Consulta enviada con éxito!',
          `Gracias ${nombre}, tu mensaje sobre el programa de Ingeniería de Sistemas ha sido enviado al Decanato.`
        );
      }, 500);
    },

    showToast(title, message) {
      // Reutilizar o crear el elemento Toast
      if (!this.toastEl) {
        this.toastEl = document.createElement('div');
        this.toastEl.id = 'app-status-toast';
        this.toastEl.className = 'status-toast bg-slate-900 border border-emerald-500/40 text-white shadow-2xl';
        this.toastEl.setAttribute('role', 'status');
        this.toastEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(this.toastEl);
      }

      this.toastEl.innerHTML = `
        <div class="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
          <i class="fa-solid fa-circle-check text-lg"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h5 class="text-sm font-bold text-white mb-0.5">${title}</h5>
          <p class="text-xs text-slate-300 leading-relaxed">${message}</p>
        </div>
        <button type="button" class="text-slate-400 hover:text-white transition p-1 text-sm focus:outline-none ml-1" aria-label="Cerrar notificación">
          <i class="fa-solid fa-xmark"></i>
        </button>
      `;

      const closeBtn = this.toastEl.querySelector('button');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.hideToast();
        });
      }

      // Animación de entrada
      requestAnimationFrame(() => {
        this.toastEl.classList.add('show');
      });

      // Auto-cierre programado
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }
      this.toastTimeout = setTimeout(() => {
        this.hideToast();
      }, CONFIG.TOAST_DURATION);
    },

    hideToast() {
      if (this.toastEl) {
        this.toastEl.classList.remove('show');
      }
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
        this.toastTimeout = null;
      }
    }
  };

  /**
   * Inicializador central de la aplicación
   */
  const init = () => {
    Navigation.init();
    Tabs.init();
    Pensum.init();
    ContactForm.init();
  };

  return {
    init,
    Navigation,
    Tabs,
    Pensum,
    ContactForm,
    CONFIG
  };
})();

// Inicialización controlada en el ciclo de vida del DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// Compatibilidad modular para navegadores y entornos CommonJS/Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}
if (typeof window !== 'undefined') {
  window.App = App;
}
