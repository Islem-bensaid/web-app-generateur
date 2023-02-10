// ################################################
// # SPECIFIC CASE CONSTANTE
// ################################################

import { ScaleType } from '@swimlane/ngx-charts';



// ################################################
// # Charts Codes
// ################################################

export const CHARTS_CODES = {
  BAR_VERTICAL : 'bar-vertical',
  BAR_HORIZONTAL : 'bar-horizontal',
  BAR_VERTICAL_2D : 'bar-vertical-2d',
  BAR_HORIZONTAL_2D : 'bar-horizontal-2d',
  BAR_VERTICAL_STACKED : 'bar-vertical-stacked',
  BAR_HORIZONTAL_STACKED : 'bar-horizontal-stacked',
  BAR_VERTICAL_NORMALIZED : 'bar-vertical-normalized',
  BAR_HORIZONTAL_NORMALIZED : 'bar-horizontal-normalized',
  PIE_CHART : 'pie-chart',
  ADVANCED_PIE_CHART : 'advanced-pie-chart',
  PIE_GRID : 'pie-grid',
  LINE_CHART : 'line-chart',
  POLAR_CHART : 'polar-chart',
  AREA_CHART : 'area-chart',
  BUBBLE_CHART : 'bubble-chart',
  AREA_CHART_STACKED : 'area-chart-stacked',
  AREA_CHART_NORMALIZED : 'area-chart-normalized',
  COMBO_CHART : 'combo-chart',
  HEAT_MAP : 'heat-map',
  CALENDAR : 'calendar',
  TREE_MAP : 'tree-map',
  NUMBER_CARD : 'number-card',
  BOX_PLOT : 'box-plot',
  STATUS_DEMO : 'status-demo',
  GAUGE : 'gauge',
  LINEAR_GAUGE : 'linear-gauge',
  NGX_GAUGE : 'ngx-gauge',
  PLOT_DEMO : 'plot-demo',
  TREE_PLOT_DEMO : 'tree-map-demo',
  BUBBLE_CHART_INTERACTIVE_DEMO : 'bubble-chart-interactive-demo',
  LINE_REFERENCE_LINES : 'line-reference-lines',
  TOOLTIP_TEMPLATES : 'tooltip-templates',
  SPARKLINE : 'sparkline',
  TIMELINE_FILTER_BAR_CHART_DEMO : 'timeline-filter-bar-chart-demo',
  BAR_VERTICAL_STACKED_NEGATIVE: 'bar-vertical-stacked-negative',
  BAR_HORIZONTAL_STACKED_NEGATIVE: 'bar-horizontal-stacked-negative',
}

export const CHARTS_COLOR_SCHEMA = {
  VIVID: 'vivid',
  NATURAL: 'natural',
  FIRE: 'fire',
  COOL: 'cool',
  PICNIC: 'picnic',
  FLAME: 'flame',
  NEONS: 'neons',
  CUSTOM_1:  {
    name: 'Custom 1',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5', '#17657D']
  },
}

// ################################################
// # Types Codes
// ################################################
export const COMMON_TYPES_CODES = {
  TEXT: 'text',
  DATE: 'date',
  DATETIME: 'datetime',
  MONTANT: 'montant',
  ACTIONS: 'actions',
  COMBINED: 'combined',
  HAS_CHECKBOX: 'has-checkbox',
  HAS_RADIO_BTN: 'has-radio-btn',
  HAS_IMAGE: 'has-image',
  TEXT_FIELD_INPUT: 'text-field-input',
  SELECT_DATE_INPUT: 'select_date_input',
  MONTANT_INPUT: 'montant-input',
}


export const BTN_TYPES = {
  BTN_ICON: "icon",
  BTN_FLAT: "flat",
}

export const REQUEST_SPE_CASE = {
  DOWNLOAD: 'download',
  UPLOAD: 'upload',
  DOWNLOAD_PROGRESS: 'download-progress'
}
