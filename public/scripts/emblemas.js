/* ==========================================================
   darasa — emblemas heráldicos SVG
   Pictogramas simplificados por dinastía.
   Heredan color via currentColor. Construidos con DOM API puro (sin innerHTML).
   ========================================================== */

(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  // [tag, attributes] tuples — rendered via document.createElementNS.
  var EMBLEM_SPEC = {
    visigodos: [
      ['path', { d: 'M12 3v18M3 12h18M6 6l12 12M18 6l-12 12', 'stroke-linecap': 'round' }]
    ],
    'al-andalus': [
      ['path', { d: 'M4 12c4-8 12-8 16 0-4 8-12 8-16 0z' }],
      ['circle', { cx: 12, cy: 12, r: 3, fill: 'currentColor' }],
      ['path', { d: 'M12 3v3M12 18v3', 'stroke-linecap': 'round' }]
    ],
    taifas: [
      ['path', { d: 'M4 20h16M6 20v-8l3-4h6l3 4v8M10 20v-5h4v5', 'stroke-linejoin': 'round' }]
    ],
    norte: [
      ['path', { d: 'M12 3v18M7 9h10M9 5l3-2 3 2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }]
    ],
    catolicos: [
      ['path', { d: 'M12 3l9 6-9 12-9-12 9-6z' }],
      ['circle', { cx: 12, cy: 11, r: 2, fill: 'currentColor' }]
    ],
    habsburgo: [
      ['path', { d: 'M4 10h16v10H4zM8 10V6h8v4', 'stroke-linejoin': 'round' }],
      ['rect', { x: 11, y: 3, width: 2, height: 3 }]
    ],
    borbon: [
      ['path', { d: 'M12 4c-4 4-4 10 0 14 4-4 4-10 0-14zM6 14c2 2 4 2 6 0 2 2 4 2 6 0', 'stroke-linecap': 'round' }],
      ['path', { d: 'M12 18v3M9 21h6', 'stroke-linecap': 'round' }]
    ],
    republica: [
      ['rect', { x: 4, y: 5, width: 16, height: 14, rx: 2 }],
      ['path', { d: 'M4 10h16', 'stroke-linejoin': 'round' }]
    ]
  };

  /**
   * Build an SVG DOM element for a dynasty emblem. Safe (no innerHTML / no string parsing).
   * @param {string} slug - dynasty slug (e.g. "visigodos")
   * @param {number} [size=24] - width/height in px
   * @returns {SVGElement}
   */
  function getEmblemElement(slug, size) {
    var s = typeof size === 'number' ? size : 24;
    var spec = EMBLEM_SPEC[slug] || [['rect', { x: 4, y: 4, width: 16, height: 16, rx: 3 }]];

    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', String(s));
    svg.setAttribute('height', String(s));
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

    for (var i = 0; i < spec.length; i++) {
      var tag = spec[i][0];
      var attrs = spec[i][1];
      var child = document.createElementNS(SVG_NS, tag);
      for (var key in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, key)) {
          child.setAttribute(key, String(attrs[key]));
        }
      }
      svg.appendChild(child);
    }
    return svg;
  }

  window.getEmblemElement = getEmblemElement;
  window.EMBLEM_SLUGS = Object.keys(EMBLEM_SPEC);
})();
