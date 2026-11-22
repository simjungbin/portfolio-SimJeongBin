/**
 * SimJeongBin Portfolio — Interactive Logic
 *
 * Architecture:
 *  • Shared overlay open / close system
 *  • Shared custom cursor  (Back / Focus)  with mix-blend-mode: difference
 *  • Shared image focus modal
 *  • All future project overlays inherit behaviour automatically
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     Helpers
     ========================================================================= */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice        = window.matchMedia('(hover: none)').matches;

  /* =========================================================================
     1. Homepage utilities
     ========================================================================= */
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', scrollToTop);
  }

  /* Header logo — scroll-to-top on homepage, close overlay inside a project */
  const headerLogo = document.getElementById('headerLogo');
  if (headerLogo) {
    headerLogo.addEventListener('click', (e) => {
      if (activeOverlay && activeOverlay.classList.contains('is-open')) {
        e.preventDefault();
        closeActiveOverlay();
      } else {
        scrollToTop(e);
      }
    });
  }

  /* =========================================================================
     2. Project overlay open / close  (shared)
     ========================================================================= */
  const allOverlays    = document.querySelectorAll('.project-overlay');
  let   activeOverlay  = null;
  let   savedScrollY   = 0;
  let   closeAnimTimer = null;
  const CLOSE_DURATION = 350; // matches overlayFadeOut in CSS

  /* --- Open --------------------------------------------------------------- */
  const openOverlay = (targetOverlay, e) => {
    if (e) e.preventDefault();
    if (!targetOverlay) return;

    if (closeAnimTimer) {
      clearTimeout(closeAnimTimer);
      closeAnimTimer = null;
    }
    savedScrollY = window.scrollY || window.pageYOffset || 0;

    // Measure scrollbar width before locking scroll
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    } else {
      document.documentElement.style.removeProperty('--scrollbar-width');
    }
    document.body.classList.add('overlay-open');

    // Instantly hide a previously open overlay (different project)
    if (activeOverlay && activeOverlay !== targetOverlay) {
      activeOverlay.classList.remove('is-open', 'is-closing');
      activeOverlay.style.display = 'none';
      activeOverlay.setAttribute('aria-hidden', 'true');
    }

    activeOverlay = targetOverlay;
    activeOverlay.classList.remove('is-closing');
    activeOverlay.style.display = 'block';
    void activeOverlay.offsetWidth; // force reflow so CSS animation restarts
    activeOverlay.classList.add('is-open');
    activeOverlay.setAttribute('aria-hidden', 'false');

    // Reset image-column scroll to top on open
    const scrollCol = activeOverlay.querySelector('.project-overlay-scroll-column');
    if (scrollCol) scrollCol.scrollTop = 0;
  };

  /* --- Close -------------------------------------------------------------- */
  const closeActiveOverlay = () => {
    if (!activeOverlay || !activeOverlay.classList.contains('is-open')) return;

    // Hide custom cursor immediately
    hideCursor();

    if (prefersReducedMotion) {
      _finaliseClose();
      return;
    }

    activeOverlay.classList.remove('is-open');
    activeOverlay.classList.add('is-closing');

    closeAnimTimer = setTimeout(() => _finaliseClose(), CLOSE_DURATION);
  };

  const _finaliseClose = () => {
    if (activeOverlay) {
      activeOverlay.classList.remove('is-open', 'is-closing');
      activeOverlay.style.display = 'none';
      activeOverlay.setAttribute('aria-hidden', 'true');
      activeOverlay = null;
    }
    document.body.classList.remove('overlay-open');
    document.documentElement.style.removeProperty('--scrollbar-width');
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });
  };

  /* --- Open triggers ------------------------------------------------------- */
  const lotteOverlay     = document.getElementById('projectOverlay');
  const orbOverlay       = document.getElementById('projectOverlayOrb');
  const ibmOverlay       = document.getElementById('projectOverlayIbm');
  const commaOverlay     = document.getElementById('projectOverlayComma');
  const eroomOverlay     = document.getElementById('projectOverlayEroom');
  const lotteMartCard    = document.querySelector('.project-card[data-name="LOTTE MART × ZETTA Renewal"]');
  const lotteMartIndex   = document.querySelector('.index-item[data-node-id="31:2745"]');
  const orbCard          = document.querySelector('.project-card[data-name="ORB — Tableware Branding Website"]');
  const orbIndex         = document.querySelector('.index-item[data-node-id="31:2749"]');
  const ibmCard          = document.querySelector('[data-name="Type Specimen Mini Book IBM Plex Mono"]');
  const ibmIndex         = document.querySelector('.index-item[data-node-id="31:2753"]');
  const commaCard        = document.querySelector('[data-name="쉼표 — Smart IoT Service"]');
  const commaIndex       = document.querySelector('.index-item[data-node-id="31:2757"]');
  const eroomCard        = document.querySelector('[data-name="이룸 — Social Connection App"]');
  const eroomIndex       = document.querySelector('.index-item[data-node-id="88:271"]');

  if (lotteMartCard)  lotteMartCard.addEventListener('click',  (e) => openOverlay(lotteOverlay, e));
  if (lotteMartIndex) lotteMartIndex.addEventListener('click', (e) => openOverlay(lotteOverlay, e));
  if (orbCard)        orbCard.addEventListener('click',        (e) => openOverlay(orbOverlay, e));
  if (orbIndex)       orbIndex.addEventListener('click',       (e) => openOverlay(orbOverlay, e));
  if (ibmCard)        ibmCard.addEventListener('click',        (e) => openOverlay(ibmOverlay, e));
  if (ibmIndex)       ibmIndex.addEventListener('click',       (e) => openOverlay(ibmOverlay, e));
  if (commaCard)      commaCard.addEventListener('click',      (e) => openOverlay(commaOverlay, e));
  if (commaIndex)     commaIndex.addEventListener('click',     (e) => openOverlay(commaOverlay, e));
  if (eroomCard)      eroomCard.addEventListener('click',      (e) => openOverlay(eroomOverlay, e));
  if (eroomIndex)     eroomIndex.addEventListener('click',     (e) => openOverlay(eroomOverlay, e));

  /* --- Close triggers ----------------------------------------------------- */

  // SimJeongBin logos inside each overlay
  document.querySelectorAll('.project-overlay-logo').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeActiveOverlay();
    });
  });

  // Click on empty overlay background → close
  allOverlays.forEach(ov => {
    ov.addEventListener('click', (e) => {
      if (
        e.target.closest('.project-overlay-info')          ||
        e.target.closest('.project-overlay-scroll-column') ||
        e.target.closest('.project-overlay-header')
      ) return;
      closeActiveOverlay();
    });
  });

  // Explore links: open external URL without closing the overlay
  document.querySelectorAll('.overlay-explore-link').forEach(link => {
    link.addEventListener('click', (e) => e.stopPropagation());
  });

    /* =========================================================================
     3. Shared custom cursor  (Back / Focus / Drag)
        Single <span> on <body>; text swaps instantly, fade is CSS transition.
        Immediately follows the mouse pointer on pointermove with zero lag.
        z-index 9999 + mix-blend-mode: difference → blends over all layers.
     ========================================================================= */

  let cursorEl = null;   // the DOM node
  let cursorVisible = false;

  const updateCursorPosition = (clientX, clientY) => {
    if (!cursorEl) return;
    cursorEl.style.transform = 'translate3d(calc(-50% + ' + clientX + 'px), calc(-50% + ' + clientY + 'px), 0)';
  };

  const hideCursor = () => {
    if (!cursorEl) return;
    cursorEl.classList.remove('is-visible');
    cursorVisible = false;
  };

  const showCursor = (label) => {
    if (!cursorEl) return;
    // Swap text instantly — no transition delay
    if (cursorEl.textContent !== label) {
      cursorEl.textContent = label;
    }
    if (!cursorVisible) {
      cursorEl.classList.add('is-visible');
      cursorVisible = true;
    }
  };

  if (!isTouchDevice && allOverlays.length > 0) {
    cursorEl = document.createElement('span');
    cursorEl.className   = 'overlay-cursor';
    cursorEl.textContent = 'Back';
    cursorEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursorEl);

    /* Determine which cursor label to show for a given hovered element.
       Returns 'back', 'focus', or null (native cursor area). */
    const getCursorMode = (target) => {
      // Always native in info panel, header, logo, explore links
      if (
        target.closest('.project-overlay-header') ||
        target.closest('.project-overlay-info')   ||
        target.closest('.overlay-explore-link')
      ) return null;

      // Project images → Focus
      if (target.closest('.project-overlay-img')) return 'focus';

      // Inside scroll column but not on an image → native (scrollbar, gap)
      if (target.closest('.project-overlay-scroll-column')) return null;

      // Everything else on the overlay backdrop → Back
      return 'back';
    };

    allOverlays.forEach(ov => {
      ov.addEventListener('pointermove', (e) => {
        if (!ov.classList.contains('is-open')) return;
        if (isFocusOpen) return; // focus modal handles cursor when active

        // Immediately update position with zero delay
        updateCursorPosition(e.clientX, e.clientY);

        const mode = getCursorMode(e.target);
        if (mode === 'back')  showCursor('Back');
        else if (mode === 'focus') showCursor('Focus');
        else hideCursor();
      });

      ov.addEventListener('pointerleave', () => {
        if (!isFocusOpen) hideCursor();
      });
    });
  }

  /* =========================================================================
     4. Image Focus Modal  (shared)
        Opens when any .project-overlay-img is clicked.
        Closes on backdrop click or Escape — WITHOUT closing the project overlay.
        Supports Drag-to-Pan for oversized / catalog images.
        Displays the TOP of long catalog images first.
     ========================================================================= */

  const focusModal     = document.getElementById('imageFocusModal');
  const focusImg       = document.getElementById('imageFocusImg');
  const focusContainer = focusModal
                           ? focusModal.querySelector('.image-focus-container')
                           : null;
  const focusBackdrop  = focusModal
                           ? focusModal.querySelector('.image-focus-backdrop')
                           : null;

  let isFocusOpen          = false;
  let focusCloseTimer      = null;
  let savedOverlayScrollTop = 0;    // scroll column position to restore
  let activeScrollColumn   = null;  // which scroll column was active
  const FOCUS_CLOSE_DURATION = 280; // matches CSS transition duration

  // Drag-to-pan state
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let hasDragged = false;
  let justFinishedDrag = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let panStartX = 0;
  let panStartY = 0;

  const updatePanTransform = () => {
    if (!focusContainer) return;
    focusContainer.style.transform = 'translate3d(' + panX + 'px, ' + panY + 'px, 0px)';
  };

  const getPanBounds = () => {
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    const imgRect = focusImg ? focusImg.getBoundingClientRect() : { width: 0, height: 0 };
    const imgW = imgRect.width;
    const imgH = imgRect.height;
    const INSET = 32;

    let minX = 0, maxX = 0;
    if (imgW > vpW) {
      const overflowX = (imgW - vpW) / 2 + INSET;
      minX = -overflowX;
      maxX = overflowX;
    }

    let minY = 0, maxY = 0;
    if (imgH > vpH) {
      const overflowY = (imgH - vpH) / 2 + INSET;
      minY = -overflowY;
      maxY = overflowY;
    }

    return { imgW, imgH, vpW, vpH, minX, maxX, minY, maxY };
  };

  const applyFocusImageSizingAndPosition = (imgEl) => {
    if (!focusImg) return;
    const natW = imgEl.naturalWidth || 1920;
    const natH = imgEl.naturalHeight || 1080;
    const ratio = natW / natH;

    // Landscape slides / spreads (LOTTE, ORB, IBM) -> fit within 88vh centered
    // Tall catalog posters (이룸, etc.) -> comfortable width allowing drag-to-pan
    if (ratio >= 1.2) {
      focusImg.style.maxWidth = '90vw';
      focusImg.style.maxHeight = '88vh';
      focusImg.style.width = 'auto';
      focusImg.style.height = 'auto';
    } else {
      focusImg.style.maxWidth = 'min(88vw, 1100px)';
      focusImg.style.maxHeight = 'none';
      focusImg.style.width = 'min(88vw, 1100px)';
      focusImg.style.height = 'auto';
    }

    // Force layout update so getBoundingClientRect reflects the current dimensions
    void focusModal.offsetWidth;

    const bounds = getPanBounds();
    panX = 0; // horizontally centered

    // If taller than viewport, display the TOP of the image first (with small top inset)
    // If it fits within viewport, center normally (panY = 0)
    panY = bounds.maxY;

    updatePanTransform();
  };

  const openFocusModal = (imgEl) => {
    if (!focusModal || !focusImg) return;

    // Remember scroll position of the image column
    activeScrollColumn = imgEl.closest('.project-overlay-scroll-column');
    if (activeScrollColumn) {
      savedOverlayScrollTop = activeScrollColumn.scrollTop;
    }

    isDragging = false;
    hasDragged = false;
    justFinishedDrag = false;

    // Set image source & alt
    focusImg.src = imgEl.src;
    focusImg.alt = imgEl.alt || '';

    // Cancel any pending close animation
    if (focusCloseTimer) {
      clearTimeout(focusCloseTimer);
      focusCloseTimer = null;
      focusModal.classList.remove('is-closing');
    }

    focusModal.style.display = 'flex';
    void focusModal.offsetWidth; // reflow
    focusModal.classList.add('is-open');
    focusModal.setAttribute('aria-hidden', 'false');
    isFocusOpen = true;

    // Calculate initial sizing & position (TOP of image shown first if taller than viewport)
    applyFocusImageSizingAndPosition(imgEl);

    // If image was not yet cached/decoded, re-apply once loaded
    focusImg.onload = () => {
      if (!isFocusOpen) return;
      applyFocusImageSizingAndPosition(focusImg);
    };

    // Show Drag cursor immediately over the enlarged image
    showCursor('Drag');
  };

  const closeFocusModal = () => {
    if (!isFocusOpen || !focusModal) return;
    isFocusOpen = false;

    // Hide cursor immediately when focus mode closes
    hideCursor();

    if (prefersReducedMotion) {
      _finaliseFocusClose();
      return;
    }

    focusModal.classList.remove('is-open');
    focusModal.classList.add('is-closing');

    focusCloseTimer = setTimeout(() => _finaliseFocusClose(), FOCUS_CLOSE_DURATION);
  };

  const _finaliseFocusClose = () => {
    if (!focusModal) return;
    focusModal.classList.remove('is-open', 'is-closing');
    focusModal.style.display = 'none';
    focusModal.setAttribute('aria-hidden', 'true');
    focusImg.src = '';
    panX = 0;
    panY = 0;
    updatePanTransform();

    // Restore scroll position in the image column
    if (activeScrollColumn) {
      activeScrollColumn.scrollTop = savedOverlayScrollTop;
      activeScrollColumn = null;
    }
  };

  // ── Drag-to-pan pointer interaction ────────────────────────────────────
  if (focusContainer) {
    focusContainer.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return; // left click only
      isDragging = true;
      hasDragged = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      panStartX = panX;
      panStartY = panY;

      try {
        focusContainer.setPointerCapture(e.pointerId);
      } catch (err) {}

      e.preventDefault();
    });

    focusContainer.addEventListener('pointermove', (e) => {
      updateCursorPosition(e.clientX, e.clientY);
      showCursor('Drag');

      if (!isDragging) return;

      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasDragged = true;
      }

      const bounds = getPanBounds();
      let nextX = panStartX + dx;
      let nextY = panStartY + dy;

      // Clamp X: keep centered if fits; otherwise allow reaching every edge
      nextX = Math.max(bounds.minX, Math.min(bounds.maxX, nextX));

      // Clamp Y: keep centered if fits; otherwise allow reaching every edge
      nextY = Math.max(bounds.minY, Math.min(bounds.maxY, nextY));

      panX = nextX;
      panY = nextY;
      updatePanTransform();
    });

    const onPointerEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      if (hasDragged) {
        justFinishedDrag = true;
        setTimeout(() => { justFinishedDrag = false; }, 80);
      }
      try {
        focusContainer.releasePointerCapture(e.pointerId);
      } catch (err) {}
    };

    focusContainer.addEventListener('pointerup', onPointerEnd);
    focusContainer.addEventListener('pointercancel', onPointerEnd);
  }

  if (focusModal) {
    // Click on the modal backdrop → close focus mode (dragging never closes it)
    focusModal.addEventListener('click', (e) => {
      if (justFinishedDrag) return;
      if (focusContainer && focusContainer.contains(e.target)) return;
      closeFocusModal();
    });

    // ── Custom cursor inside the focus modal ──────────────────────────────
    // Immediately tracks pointer with zero delay; swaps between Drag and Back.
    if (!isTouchDevice) {
      focusModal.addEventListener('pointermove', (e) => {
        if (!isFocusOpen) return;

        updateCursorPosition(e.clientX, e.clientY);

        if (isDragging || (focusContainer && (e.target === focusImg || focusContainer.contains(e.target)))) {
          showCursor('Drag');
        } else {
          showCursor('Back');
        }
      });

      focusModal.addEventListener('pointerleave', () => hideCursor());
    }
  }

  // Delegate image clicks across all overlays (also handles future overlays)
  document.querySelectorAll('.project-overlay').forEach(ov => {
    ov.addEventListener('click', (e) => {
      const imgEl = e.target.closest('.project-overlay-img');
      if (imgEl) {
        e.stopPropagation(); // prevent closing the project overlay
        openFocusModal(imgEl);
      }
    });
  });

  /* =========================================================================
     5. Keyboard handling
        Priority: focus modal > project overlay
     ========================================================================= */
  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (isFocusOpen) {
      closeFocusModal();
    } else if (activeOverlay && activeOverlay.classList.contains('is-open')) {
      closeActiveOverlay();
    }
  });

});
