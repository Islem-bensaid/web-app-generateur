import { Component, Input, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import { data as countries } from 'emoji-flags';

import { Color, colorSets, escapeLabel, formatLabel, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import {
  boxData,
  bubble,
  fiscalYearReport,
  generateData,
  generateGraph,
  multi,
  single,
  timelineFilterBarData,
  treemap
} from './data';
import { bubbleDemoData } from './custom-charts/bubble-chart-interactive/data';
import { BubbleChartInteractiveServerDataModel } from './custom-charts/bubble-chart-interactive/models';
import chartGroups from './chartTypes';
import { barChart, lineChartSeries } from './combo-chart-data';
import { InputTypes } from '@swimlane/ngx-ui';
import { isEmptyValue, isInputChanged } from '@shared/tools';
import { CHARTS_CODES } from '@shared/constantes/Constante';
import { GaugeComponent } from '@swimlane/ngx-charts/lib/gauge/gauge.component';

const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
const weekdayName = new Intl.DateTimeFormat('en-us', { weekday: 'short' });


function multiFormat(value) {
  if (value < 1000) return `${value.toFixed(2)}ms`;
  value /= 1000;
  if (value < 60) return `${value.toFixed(2)}s`;
  value /= 60;
  if (value < 60) return `${value.toFixed(2)}mins`;
  value /= 60;
  return `${value.toFixed(2)}hrs`;
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


@Component({
  selector: 'st2i-charts',
  templateUrl: './charts.component.html',
  // styleUrls: ['../../node_modules/@swimlane/ngx-ui/index.css', './charts.component.scss'],
  styleUrls: ['./charts.component.scss'],
  // providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  encapsulation: ViewEncapsulation.None
})
export class ChartsComponent implements OnInit {

  @ViewChild('ngxChartsGauge') ngxChartsGauge: GaugeComponent;

  @Input() data: any;
  @Input() metadata: any;


  isEmptyValue = isEmptyValue;
  CHARTS_CODES = CHARTS_CODES;

  inputTypes = InputTypes;

  theme = 'dark';
  chartType: string;
  chartGroups: any[];
  chart: any;
  realTimeData: boolean = false;
  countries: any[];
  single: any[];
  multi: any[];
  fiscalYearReport: any[];
  dateData: any[];
  dateDataWithRange: any[];
  calendarData: any[];
  statusData: any[];
  sparklineData: any[];
  timelineFilterBarData: any[];
  graph: { links: any[]; nodes: any[] };
  bubble: any;
  linearScale: boolean = false;
  range: boolean = false;

  view: [number, number];
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Legend';
  legendPosition = LegendPosition.Right;
  showXAxisLabel = true;
  tooltipDisabled = false;
  showText = true;
  xAxisLabel: string;
  showYAxisLabel = true;
  yAxisLabel: string;
  showGridLines = true;
  innerPadding = '10%';
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  showSeriesOnHover = true;
  roundEdges: boolean = true;
  animations: boolean = true;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number;
  showDataLabel: boolean = false;
  noBarWhenZero: boolean = true;
  trimXAxisTicks: boolean = true;
  trimYAxisTicks: boolean = true;
  rotateYAxisTicks: boolean = true;
  yAxisTicks: any[];
  xAxisTicks: any[];
  rotateXAxisTicks: boolean = true;
  maxXAxisTickLength: number = 16;
  maxYAxisTickLength: number = 16;
  strokeColor: string = '#FFFFFF';
  strokeWidth: number = 2;
  // pieTooltipText: any;
  // labelFormatting: any;

  curves = {
    Basis: shape.curveBasis,
    'Basis Closed': shape.curveBasisClosed,
    Bundle: shape.curveBundle.beta(1),
    Cardinal: shape.curveCardinal,
    'Cardinal Closed': shape.curveCardinalClosed,
    'Catmull Rom': shape.curveCatmullRom,
    'Catmull Rom Closed': shape.curveCatmullRomClosed,
    Linear: shape.curveLinear,
    'Linear Closed': shape.curveLinearClosed,
    'Monotone X': shape.curveMonotoneX,
    'Monotone Y': shape.curveMonotoneY,
    Natural: shape.curveNatural,
    Step: shape.curveStep,
    'Step After': shape.curveStepAfter,
    'Step Before': shape.curveStepBefore,
    default: shape.curveLinear
  };

  // line interpolation
  curveType: string = 'Linear';
  curve: any = this.curves[this.curveType];
  interpolationTypes = [
    'Basis',
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];

  closedCurveType: string = 'Linear Closed';
  closedCurve: any = this.curves[this.closedCurveType];
  closedInterpolationTypes = ['Basis Closed', 'Cardinal Closed', 'Catmull Rom Closed', 'Linear Closed'];

  colorSets: any;
  colorScheme: any;
  schemeType = ScaleType.Ordinal;
  selectedColorScheme: string;
  rangeFillOpacity: number = 0.15;

  // Override colors for certain values
  customColors: any[] = [
    {
      name: 'Germany',
      value: '#a8385d'
    }
  ];

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;

  // line, area
  autoScale = false;
  timeline = false;

  // margin
  margin: boolean = false;
  marginTop: number = 40;
  marginRight: number = 40;
  marginBottom: number = 40;
  marginLeft: number = 40;

  // box
  boxData = boxData;

  // gauge
  gaugeMin: number = 0;
  gaugeMax: number = 100;
  gaugeLargeSegments: number = 10;
  gaugeSmallSegments: number = 5;
  gaugeTextValue: string = '';
  gaugeUnits: string = 'alerts';
  gaugeAngleSpan: number = 240;
  gaugeStartAngle: number = -120;
  gaugeShowAxis: boolean = true;
  gaugeValue: number = 50; // linear gauge value
  gaugePreviousValue: number = 70;
  gaugeFormatValue: any;

  // ngx gauge
  ngxGaugeSize: number = 200;
  ngxGaugeType: 'full' | 'semi' | 'arch' = 'full';
  ngxGaugeMin: number = 0;
  ngxGaugeMax: number = 100;
  ngxGaugeCap: 'round' | 'butt' = 'butt';
  ngxGaugeThick: number = 6;
  ngxGaugeLabel: string = '';
  ngxGaugeForegroundColor: string = 'rgba(0, 150, 136, 1)';
  ngxGaugeBackgroundColor: string = 'rgba(0, 0, 0, 0.1)';
  ngxGaugeAppend: string = '';
  ngxGaugePrepend: string = '';
  ngxGaugeDuration: number = 1500;
  ngxGaugeMarkers: any = {};
  ngxGaugeThresholds: any = {};
  ngxGaugeMargin: number = 0;
  ngxGaugeAnimate: boolean = true;
  ngxGaugeAriaLabel: string = '';
  ngxGaugeAriaLabeledBy: string = null;

  // heatmap
  heatmapMin: number = 0;
  heatmapMax: number = 50000;

  // Combo Chart
  barChart: any[] = barChart;
  lineChartSeries: any[] = lineChartSeries;
  lineChartScheme: Color = {
    name: 'coolthree',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#01579b', '#7aa3e5', '#a8385d', '#00bfa5']
  };

  comboBarScheme: Color = {
    name: 'singleLightBlue',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#01579b']
  };

  showRightYAxisLabel: boolean = true;
  yAxisLabelRight: string = 'Utilization';

  // demos
  totalSales = 0;
  salePrice = 100;
  personnelCost = 100;

  mathText = '3 - 1.5*sin(x) + cos(2*x) - 1.5*abs(cos(x))';
  mathFunction: (o: any) => any;

  treemap: any[];
  treemapPath: any[] = [];
  sumBy: string = 'Size';

  // bubble chart interactive demo
  bubbleDemoTempData: any[] = [];
  bubbleDemoChart: BubbleChartInteractiveServerDataModel;

  // Reference lines
  showRefLines: boolean = true;
  showRefLabels: boolean = true;

  // Supports any number of reference lines.
  refLines = [
    { value: 42500, name: 'Maximum' },
    { value: 37750, name: 'Average' },
    { value: 33000, name: 'Minimum' }
  ];

  // data
  plotData: any;

  // Sidebar Controls:
  colorVisible: boolean = true;
  dataVisible: boolean = true;
  dimVisible: boolean = true;
  optsVisible: boolean = true;

  constructor() {
    this.mathFunction = this.getFunction();

    Object.assign(this, {
      single,
      multi,
      countries,
      chartGroups,
      colorSets,
      graph: generateGraph(50),
      boxData,
      bubble,
      plotData: this.generatePlotData(),
      treemap,
      bubbleDemoData,
      fiscalYearReport
    });

    // interactive drill down demos
    this.treemapProcess();
    this.bubbleDemoChart = new BubbleChartInteractiveServerDataModel();
    this.bubbleDemoProcess(bubbleDemoData[0]);

    this.dateData = generateData(5, false);
    this.dateDataWithRange = generateData(2, true);
    this.setColorScheme('cool');
    this.calendarData = this.getCalendarData();
    this.statusData = this.getStatusData();
    this.sparklineData = generateData(1, false, 30);
    this.timelineFilterBarData = timelineFilterBarData();
  }

  get dateDataWithOrWithoutRange() {
    if (this.range) {
      return this.dateDataWithRange;
    } else {
      return this.dateData;
    }
  }

  ngOnInit() {
    setInterval(this.updateData.bind(this), 1000);

    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isInputChanged(changes, 'data')) {
      if (changes.data) {
        if (changes.data.currentValue !== changes.data.previousValue) {
          this._loadData(changes.data.previousValue);
        }
      }
    }
    if (isInputChanged(changes, 'metadata')) {
      if (changes.metadata) {
        if (changes.metadata.currentValue !== changes.metadata.previousValue) {
          this._loadMetadata(changes.metadata.currentValue);
        }
      }
    }
  }

  private _loadData(data) {
    this.multi = data;
    this.single = data;
  }

  private _loadMetadata(metadata) {
    this.chartType = !isEmptyValue(metadata?.chartType) ? metadata?.chartType : this.chartType;
    this.selectChart(this.chartType);
    this.theme = !isEmptyValue(metadata?.theme) ? metadata?.theme : this.theme;
    this.chartGroups = !isEmptyValue(metadata?.chartGroups) ? metadata?.chartGroups : this.chartGroups;
    // this.chart = !isEmptyValue(metadata?.chart)? metadata?.chart : this.chart;
    this.realTimeData = !isEmptyValue(metadata?.realTimeData) ? metadata?.realTimeData : this.realTimeData;
    this.countries = !isEmptyValue(metadata?.countries) ? metadata?.countries : this.countries;
    this.fiscalYearReport = !isEmptyValue(metadata?.fiscalYearReport) ? metadata?.fiscalYearReport : this.fiscalYearReport;
    // this.single = metadata?.single || this.single;
    // this.multi = metadata?.multi|| this.multi;
    this.pieTooltipText = !isEmptyValue(metadata?.pieTooltipText) ? metadata?.pieTooltipText : this.pieTooltipText;
    // this.labelFormatting = !isEmptyValue(metadata?.labelFormatting)? metadata?.labelFormatting : this.labelFormatting;
    this.dateData = !isEmptyValue(metadata?.dateData) ? metadata?.dateData : this.dateData;
    this.dateDataWithRange = !isEmptyValue(metadata?.dateDataWithRange) ? metadata?.dateDataWithRange : this.dateDataWithRange;
    this.calendarData = !isEmptyValue(metadata?.calendarData) ? metadata?.calendarData : this.calendarData;
    this.statusData = !isEmptyValue(metadata?.statusData) ? metadata?.statusData : this.statusData;
    this.sparklineData = !isEmptyValue(metadata?.sparklineData) ? metadata?.sparklineData : this.sparklineData;
    this.timelineFilterBarData = !isEmptyValue(metadata?.timelineFilterBarData) ? metadata?.timelineFilterBarData : this.timelineFilterBarData;
    this.graph = !isEmptyValue(metadata?.timelineFilterBarData) ? metadata?.graph : this.graph;
    this.bubble = !isEmptyValue(metadata?.bubble) ? metadata?.bubble : this.bubble;
    this.linearScale = !isEmptyValue(metadata?.linearScale) ? metadata?.linearScale : this.linearScale;
    this.range = !isEmptyValue(metadata?.range) ? metadata?.range : this.range;

    this.view = !isEmptyValue(metadata?.view) ? metadata?.view : this.view;
    this.width = !isEmptyValue(metadata?.width) ? metadata?.width : this.width;
    this.height = !isEmptyValue(metadata?.height) ? metadata?.height : this.height;
    this.fitContainer = !isEmptyValue(metadata?.fitContainer) ? metadata?.fitContainer : this.fitContainer;


// options//
    this.showXAxis = !isEmptyValue(metadata?.showXAxis) ? metadata?.showXAxis : this.showXAxis;
    this.showYAxis = !isEmptyValue(metadata?.showYAxis) ? metadata?.showYAxis : this.showYAxis;
    this.gradient = !isEmptyValue(metadata?.gradient) ? metadata?.gradient : this.gradient;
    this.showLegend = !isEmptyValue(metadata?.showLegend) ? metadata?.showLegend : this.showLegend;
    this.legendTitle = !isEmptyValue(metadata?.legendTitle) ? metadata?.legendTitle : this.legendTitle;
    this.legendPosition = !isEmptyValue(metadata?.legendPosition) ? metadata?.legendPosition : this.legendPosition;
    this.showXAxisLabel = !isEmptyValue(metadata?.showXAxisLabel) ? metadata?.showXAxisLabel : this.showXAxisLabel;
    this.tooltipDisabled = !isEmptyValue(metadata?.tooltipDisabled) ? metadata?.tooltipDisabled : this.tooltipDisabled;
    this.showText = !isEmptyValue(metadata?.showText) ? metadata?.showText : this.showText;
    this.xAxisLabel = !isEmptyValue(metadata?.xAxisLabel) ? metadata?.xAxisLabel : this.xAxisLabel;
    this.showYAxisLabel = !isEmptyValue(metadata?.showYAxisLabel) ? metadata?.showYAxisLabel : this.showYAxisLabel;
    this.yAxisLabel = !isEmptyValue(metadata?.yAxisLabel) ? metadata?.yAxisLabel : this.yAxisLabel;
    this.showGridLines = !isEmptyValue(metadata?.showGridLines) ? metadata?.showGridLines : this.showGridLines;
    this.innerPadding = !isEmptyValue(metadata?.innerPadding) ? metadata?.innerPadding : this.innerPadding;
    this.barPadding = !isEmptyValue(metadata?.barPadding) ? metadata?.barPadding : this.barPadding;
    this.groupPadding = !isEmptyValue(metadata?.groupPadding) ? metadata?.groupPadding : this.groupPadding;
    this.roundDomains = !isEmptyValue(metadata?.roundDomains) ? metadata?.roundDomains : this.roundDomains;
    this.maxRadius = !isEmptyValue(metadata?.maxRadius) ? metadata?.maxRadius : this.maxRadius;
    this.minRadius = !isEmptyValue(metadata?.minRadius) ? metadata?.minRadius : this.minRadius;
    this.showSeriesOnHover = !isEmptyValue(metadata?.showSeriesOnHover) ? metadata?.showSeriesOnHover : this.showSeriesOnHover;
    this.roundEdges = !isEmptyValue(metadata?.roundEdges) ? metadata?.roundEdges : this.roundEdges;
    this.animations = !isEmptyValue(metadata?.animations) ? metadata?.animations : this.animations;
    this.xScaleMin = !isEmptyValue(metadata?.xScaleMin) ? metadata?.xScaleMin : this.xScaleMin;
    this.xScaleMax = !isEmptyValue(metadata?.xScaleMax) ? metadata?.xScaleMax : this.xScaleMax;
    this.yScaleMin = !isEmptyValue(metadata?.yScaleMin) ? metadata?.yScaleMin : this.yScaleMin;
    this.yScaleMax = !isEmptyValue(metadata?.yScaleMax) ? metadata?.yScaleMax : this.yScaleMax;
    this.showDataLabel = !isEmptyValue(metadata?.showDataLabel) ? metadata?.showDataLabel : this.showDataLabel;
    this.noBarWhenZero = !isEmptyValue(metadata?.noBarWhenZero) ? metadata?.noBarWhenZero : this.noBarWhenZero;
    this.trimXAxisTicks = !isEmptyValue(metadata?.trimXAxisTicks) ? metadata?.trimXAxisTicks : this.trimXAxisTicks;
    this.trimYAxisTicks = !isEmptyValue(metadata?.trimYAxisTicks) ? metadata?.trimXAxisTicks : this.trimYAxisTicks;
    this.rotateYAxisTicks = !isEmptyValue(metadata?.rotateYAxisTicks) ? metadata?.rotateYAxisTicks : this.rotateYAxisTicks;
    this.xAxisTicks = !isEmptyValue(metadata?.xAxisTicks) ? metadata?.xAxisTicks : this.xAxisTicks;
    this.yAxisTicks = !isEmptyValue(metadata?.yAxisTicks) ? metadata?.yAxisTicks : this.yAxisTicks;
    this.rotateXAxisTicks = !isEmptyValue(metadata?.rotateXAxisTicks) ? metadata?.trimXAxisTicks : this.rotateXAxisTicks;
    this.maxXAxisTickLength = !isEmptyValue(metadata?.maxXAxisTickLength) ? metadata?.trimXAxisTicks : this.maxXAxisTickLength;
    this.maxYAxisTickLength = !isEmptyValue(metadata?.maxYAxisTickLength) ? metadata?.maxYAxisTickLength : this.maxYAxisTickLength;
    this.strokeColor = !isEmptyValue(metadata?.strokeColor) ? metadata?.strokeColor : this.strokeColor;
    this.strokeWidth = !isEmptyValue(metadata?.strokeWidth) ? metadata?.strokeWidth : this.strokeWidth;

    this.curves = !isEmptyValue(metadata?.curves) ? metadata?.curves : this.curves;
// line interpolation
    this.curveType = !isEmptyValue(metadata?.curveType) ? metadata?.curveType : this.curveType;
    this.curve = !isEmptyValue(metadata?.curve) ? metadata?.curve : this.curve;
    this.interpolationTypes = !isEmptyValue(metadata?.interpolationTypes) ? metadata?.interpolationTypes : this.interpolationTypes;

    this.closedCurveType = !isEmptyValue(metadata?.closedCurveType) ? metadata?.closedCurveType : this.closedCurveType;
    this.closedCurve = !isEmptyValue(metadata?.closedCurve) ? metadata?.closedCurve : this.closedCurve;
    this.closedInterpolationTypes = !isEmptyValue(metadata?.closedInterpolationTypes) ? metadata?.closedInterpolationTypes : this.closedCurve;

    this.colorSets = !isEmptyValue(metadata?.colorSets) ? metadata?.colorSets : this.colorSets;
    this.colorScheme = !isEmptyValue(metadata?.colorScheme) ? metadata?.colorScheme : this.colorScheme;
    this.schemeType = !isEmptyValue(metadata?.schemeType) ? metadata?.schemeType : this.schemeType;
    this.selectedColorScheme = !isEmptyValue(metadata?.selectedColorScheme) ? metadata?.selectedColorScheme : this.selectedColorScheme;
    this.rangeFillOpacity = !isEmptyValue(metadata?.rangeFillOpacity) ? metadata?.rangeFillOpacity : this.rangeFillOpacity;

// Override colors for certain values
    this.customColors = !isEmptyValue(metadata?.customColors) ? metadata?.customColors : this.customColors;

// pie
    this.showLabels = !isEmptyValue(metadata?.showLabels) ? metadata?.showLabels : this.showLabels;
    this.explodeSlices = !isEmptyValue(metadata?.explodeSlices) ? metadata?.explodeSlices : this.explodeSlices;
    this.doughnut = !isEmptyValue(metadata?.doughnut) ? metadata?.doughnut : this.doughnut;
    this.arcWidth = !isEmptyValue(metadata?.arcWidth) ? metadata?.arcWidth : this.arcWidth;

// line, area
    this.autoScale = !isEmptyValue(metadata?.autoScale) ? metadata?.autoScale : this.autoScale;
    this.timeline = !isEmptyValue(metadata?.timeline) ? metadata?.timeline : this.timeline;

// margin
    this.margin = !isEmptyValue(metadata?.margin) ? metadata?.margin : this.margin;
    this.marginTop = !isEmptyValue(metadata?.marginTop) ? metadata?.marginTop : this.marginTop;
    this.marginRight = !isEmptyValue(metadata?.marginRight) ? metadata?.marginRight : this.marginRight;
    this.marginBottom = !isEmptyValue(metadata?.marginBottom) ? metadata?.marginBottom : this.marginBottom;
    this.marginLeft = !isEmptyValue(metadata?.marginLeft) ? metadata?.marginLeft : this.marginLeft;

// box
    this.boxData = !isEmptyValue(metadata?.boxData) ? metadata?.boxData : this.boxData;

// gauge
    this.gaugeMin = !isEmptyValue(metadata?.gaugeMin) ? metadata?.gaugeMin : this.gaugeMin;
    this.gaugeMax = !isEmptyValue(metadata?.gaugeMax) ? metadata?.gaugeMax : this.gaugeMax;
    this.gaugeLargeSegments = !isEmptyValue(metadata?.gaugeLargeSegments) ? metadata?.gaugeLargeSegments : this.gaugeLargeSegments;
    this.gaugeSmallSegments = !isEmptyValue(metadata?.gaugeSmallSegments) ? metadata?.gaugeSmallSegments : this.gaugeSmallSegments;
    this.gaugeTextValue = !isEmptyValue(metadata?.gaugeTextValue) ? metadata?.gaugeTextValue : this.gaugeTextValue;
    this.gaugeUnits = !isEmptyValue(metadata?.gaugeUnits) ? metadata?.gaugeUnits : this.gaugeUnits;
    this.gaugeAngleSpan = !isEmptyValue(metadata?.gaugeAngleSpan) ? metadata?.gaugeAngleSpan : this.gaugeAngleSpan;
    this.gaugeStartAngle = !isEmptyValue(metadata?.gaugeStartAngle) ? metadata?.gaugeStartAngle : this.gaugeStartAngle;
    this.gaugeShowAxis = !isEmptyValue(metadata?.gaugeShowAxis) ? metadata?.gaugeShowAxis : this.gaugeShowAxis;
    this.gaugeValue = !isEmptyValue(metadata?.gaugeValue) ? metadata?.gaugeValue : this.gaugeValue;
    this.gaugePreviousValue = !isEmptyValue(metadata?.gaugePreviousValue) ? metadata?.gaugePreviousValue : this.gaugePreviousValue;
    this.gaugeFormatValue = !isEmptyValue(metadata?.gaugeFormatValue) ? metadata?.gaugeFormatValue : this.gaugeFormatValue;
// ngx gauge
    this.ngxGaugeSize = !isEmptyValue(metadata?.ngxGaugeSize) ? metadata.ngxGaugeSize : this.ngxGaugeSize;
    this.ngxGaugeType = !isEmptyValue(metadata?.ngxGaugeType) ? metadata.ngxGaugeType : this.ngxGaugeType;
    this.ngxGaugeMin = !isEmptyValue(metadata?.ngxGaugeMin) ? metadata.ngxGaugeMin : this.ngxGaugeMin;
    this.ngxGaugeMax = !isEmptyValue(metadata?.ngxGaugeMax) ? metadata.ngxGaugeMax : this.ngxGaugeMax;
    this.ngxGaugeCap = !isEmptyValue(metadata?.ngxGaugeCap) ? metadata.ngxGaugeCap : this.ngxGaugeCap;
    this.ngxGaugeThick = !isEmptyValue(metadata?.ngxGaugeThick) ? metadata.ngxGaugeThick : this.ngxGaugeThick;
    this.ngxGaugeLabel = !isEmptyValue(metadata?.ngxGaugeLabel) ? metadata.ngxGaugeLabel : this.ngxGaugeLabel;
    this.ngxGaugeForegroundColor = !isEmptyValue(metadata?.ngxGaugeForegroundColor) ? metadata.ngxGaugeForegroundColor : this.ngxGaugeForegroundColor;
    this.ngxGaugeBackgroundColor = !isEmptyValue(metadata?.ngxGaugeBackgroundColor) ? metadata.ngxGaugeBackgroundColor : this.ngxGaugeBackgroundColor;
    this.ngxGaugeAppend = !isEmptyValue(metadata?.ngxGaugeAppend) ? metadata.ngxGaugeAppend : this.ngxGaugeAppend;
    this.ngxGaugePrepend = !isEmptyValue(metadata?.ngxGaugePrepend) ? metadata.ngxGaugePrepend : this.ngxGaugePrepend;
    this.ngxGaugeDuration = !isEmptyValue(metadata?.ngxGaugeDuration) ? metadata.ngxGaugeDuration : this.ngxGaugeDuration;
    this.ngxGaugeMarkers = !isEmptyValue(metadata?.ngxGaugeMarkers) ? metadata.ngxGaugeMarkers : this.ngxGaugeMarkers;
    this.ngxGaugeThresholds = !isEmptyValue(metadata?.ngxGaugeThresholds) ? metadata.ngxGaugeThresholds : this.ngxGaugeThresholds;
    this.ngxGaugeMargin = !isEmptyValue(metadata?.ngxGaugeMargin) ? metadata.ngxGaugeMargin : this.ngxGaugeMargin;
    this.ngxGaugeAnimate = !isEmptyValue(metadata?.ngxGaugeAnimate) ? metadata.ngxGaugeAnimate : this.ngxGaugeAnimate;
    this.ngxGaugeAriaLabel = !isEmptyValue(metadata?.ngxGaugeAriaLabel) ? metadata.ngxGaugeAriaLabel : this.ngxGaugeAriaLabel;
    this.ngxGaugeAriaLabeledBy = !isEmptyValue(metadata?.ngxGaugeAriaLabeledBy) ? metadata.ngxGaugeAriaLabeledBy : this.ngxGaugeAriaLabeledBy;
// heatmap
    this.heatmapMin = !isEmptyValue(metadata?.heatmapMin) ? metadata?.heatmapMin : this.heatmapMin;
    this.heatmapMax = !isEmptyValue(metadata?.heatmapMax) ? metadata?.heatmapMax : this.heatmapMax;

// Combo Chart
    this.barChart = !isEmptyValue(metadata?.barChart) ? metadata?.barChart : this.barChart;
    this.lineChartSeries = !isEmptyValue(metadata?.lineChartSeries) ? metadata?.lineChartSeries : this.lineChartSeries;
    this.lineChartScheme = !isEmptyValue(metadata?.lineChartScheme) ? metadata?.lineChartScheme : this.lineChartScheme;
    this.comboBarScheme = !isEmptyValue(metadata?.comboBarScheme) ? metadata?.comboBarScheme : this.comboBarScheme;
    this.comboBarScheme = !isEmptyValue(metadata?.comboBarScheme) ? metadata?.comboBarScheme : this.comboBarScheme;


    this.showRightYAxisLabel = !isEmptyValue(metadata?.showRightYAxisLabel) ? metadata?.showRightYAxisLabel : this.showRightYAxisLabel;
    this.yAxisLabelRight = !isEmptyValue(metadata?.yAxisLabelRight) ? metadata?.yAxisLabelRight : this.yAxisLabelRight;
  }

  updateData() {
    if (!this.realTimeData) {
      return;
    }

    // this.gaugeValue = this.gaugeMin + Math.floor(Math.random() * (this.gaugeMax - this.gaugeMin));

    const country = this.countries[Math.floor(Math.random() * this.countries.length)];
    const add = Math.random() < 0.7;
    const remove = Math.random() < 0.5;

    if (remove) {
      if (this.single.length > 1) {
        const index = Math.floor(Math.random() * this.single.length);
        this.single.splice(index, 1);
        this.single = [...this.single];
      }

      if (this.multi.length > 1) {
        const index = Math.floor(Math.random() * this.multi.length);
        this.multi.splice(index, 1);
        this.multi = [...this.multi];
      }

      if (this.bubble.length > 1) {
        const index = Math.floor(Math.random() * this.bubble.length);
        this.bubble.splice(index, 1);
        this.bubble = [...this.bubble];
      }

      if (this.graph.nodes.length > 1) {
        const index = Math.floor(Math.random() * this.graph.nodes.length);
        const value = this.graph.nodes[index].value;
        this.graph.nodes.splice(index, 1);
        const nodes = [...this.graph.nodes];

        const links = this.graph.links.filter(link => {
          return (
            link.source !== value && link.source.value !== value && link.target !== value && link.target.value !== value
          );
        });
        this.graph = { links, nodes };
      }

      if (this.boxData.length > 1) {
        const index = Math.floor(Math.random() * this.boxData.length);
        this.boxData.splice(index, 1);
        this.boxData = [...this.boxData];
      }
    }

    if (add) {
      // single
      const entry = {
        name: country.name,
        value: Math.floor(10000 + Math.random() * 50000)
      };
      this.single = [...this.single, entry];

      // multi
      const multiEntry = {
        name: country.name,
        series: [
          {
            name: '1990',
            value: Math.floor(10000 + Math.random() * 50000)
          },
          {
            name: '2000',
            value: Math.floor(10000 + Math.random() * 50000)
          },
          {
            name: '2010',
            value: Math.floor(10000 + Math.random() * 50000)
          }
        ]
      };

      this.multi = [...this.multi, multiEntry];

      // graph
      const node = { value: country.name };
      const nodes = [...this.graph.nodes, node];
      const link = {
        source: country.name,
        target: nodes[Math.floor(Math.random() * (nodes.length - 1))].value
      };
      const links = [...this.graph.links, link];
      this.graph = { links, nodes };

      // bubble
      const bubbleYear = Math.floor((2010 - 1990) * Math.random() + 1990);
      const bubbleEntry = {
        name: country.name,
        series: [
          {
            name: '' + bubbleYear,
            x: new Date(bubbleYear, 0, 1),
            y: Math.floor(30 + Math.random() * 70),
            r: Math.floor(30 + Math.random() * 20)
          }
        ]
      };

      this.bubble = [...this.bubble, bubbleEntry];

      // box
      const boxEntry = {
        name: country.name,
        series: [
          {
            name: '1990',
            value: getRandomInt(10, 5)
          },
          {
            name: '2000',
            value: getRandomInt(15, 5)
          },
          {
            name: '2010',
            value: getRandomInt(20, 10)
          },
          {
            name: '2020',
            value: getRandomInt(30, 10)
          },
          {
            name: '2030',
            value: getRandomInt(50, 20)
          }
        ]
      };

      const index = this.boxData.findIndex(box => box.name === country.name);
      if (index > -1) {
        this.boxData[index] = boxEntry;
      } else {
        this.boxData = [...this.boxData, boxEntry];
      }

      // bubble interactive demo
      this.bubbleDemoProcess(bubbleDemoData[getRandomInt(0, bubbleDemoData.length - 1)]);

      this.statusData = this.getStatusData();

      this.timelineFilterBarData = timelineFilterBarData();
    }

    const date = new Date(Math.floor(1473700105009 + Math.random() * 1000000000));
    for (const series of this.dateData) {
      series.series.push({
        name: date,
        value: Math.floor(2000 + Math.random() * 5000)
      });
    }
    this.dateData = [...this.dateData];

    this.dateDataWithRange = generateData(2, true);

    if (this.chart.inputFormat === 'calendarData') this.calendarData = this.getCalendarData();
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  toggleFitContainer() {
    if (this.fitContainer) {
      this.view = undefined;
    } else {
      this.applyDimensions();
    }
  }

  selectChart(chartSelector) {
    // debugger;
    // this.chartType = chartSelector = chartSelector.replace('/', '');
    for (const group of this.chartGroups) {
      this.chart = group.charts.find(x => x.selector === chartSelector);
      if (this.chart) {
      }
      break;
    }
    if (this.chartType != CHARTS_CODES.NGX_GAUGE) {

      this.linearScale =  !isEmptyValue(this.metadata?.linearScale) ? this.metadata?.linearScale : this.linearScale;
      this.yAxisLabel =  !isEmptyValue(this.metadata?.yAxisLabel) ? this.metadata?.yAxisLabel : this.yAxisLabel;
      this.xAxisLabel = !isEmptyValue(this.metadata?.xAxisLabel) ? this.metadata?.xAxisLabel : this.xAxisLabel;

      this.width = 700;
      this.height = 300;

      Object.assign(this, this.chart.defaults);

      if (!this.fitContainer) {
        this.applyDimensions();
      }
    }

  }

  changeTheme(theme: string) {
    this.theme = theme;
    if (theme === 'light') {
      this.strokeColor = '#000000';
    } else {
      this.strokeColor = '#FFFFFF';
    }
  }

  select(data) {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  activate(data) {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  deactivate(data) {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getInterpolationType(curveType) {
    return this.curves[curveType] || this.curves['default'];
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  getCalendarData(): any[] {
    // today
    const now = new Date();
    const todaysDay = now.getDate();
    const thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);

    // Monday
    const thisMonday = new Date(thisDay.getFullYear(), thisDay.getMonth(), todaysDay - thisDay.getDay() + 1);
    const thisMondayDay = thisMonday.getDate();
    const thisMondayYear = thisMonday.getFullYear();
    const thisMondayMonth = thisMonday.getMonth();

    // 52 weeks before monday
    const calendarData = [];
    const getDate = d => new Date(thisMondayYear, thisMondayMonth, d);
    for (let week = -52; week <= 0; week++) {
      const mondayDay = thisMondayDay + week * 7;
      const monday = getDate(mondayDay);

      // one week
      const series = [];
      for (let dayOfWeek = 7; dayOfWeek > 0; dayOfWeek--) {
        const date = getDate(mondayDay - 1 + dayOfWeek);

        // skip future dates
        if (date > now) {
          continue;
        }

        // value
        const value = dayOfWeek < 6 ? date.getMonth() + 1 : 0;

        series.push({
          date,
          name: weekdayName.format(date),
          value
        });
      }

      calendarData.push({
        name: monday.toString(),
        series
      });
    }

    return calendarData;
  }

  calendarAxisTickFormatting(mondayString: string) {
    const monday = new Date(mondayString);
    const month = monday.getMonth();
    const day = monday.getDate();
    const year = monday.getFullYear();
    const lastSunday = new Date(year, month, day - 1);
    const nextSunday = new Date(year, month, day + 6);
    return lastSunday.getMonth() !== nextSunday.getMonth() ? monthName.format(nextSunday) : '';
  }

  // calendarTooltipText(c): string {
  //   return `
  //     <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
  //     <span class="tooltip-val">${c.data.toLocaleString()}</span>
  //   `;
  // }
  //
  pieTooltipText({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);
    const pourcentage = data.extra.pourcentage;

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val} - ${pourcentage}</span>
    `;
  }

  labelFormatting(name) {
    let self: any = this; // this "this" will refer to the chart component (pun intented :))
    let data = self.series.filter(x => x.name == name); // chartData will be present in
                                                        // series along with the label

    if (data.length > 0) {
      return `${data[0].extra.pourcentage}`;
    } else {
      return name;
    }
  }

  dollarValueFormat(c): string {
    return `$${c.value.toLocaleString()}`;
  }

  getStatusData() {
    const sales = Math.round(1e4 * Math.random());
    const dur = 36e5 * Math.random();
    return this.calcStatusData(sales, dur);
  }

  calcStatusData(sales = this.statusData[0].value, dur = this.statusData[2].value) {
    const ret = sales * this.salePrice;
    const cost = ((sales * dur) / 60 / 60 / 1000) * this.personnelCost;
    const ROI = (ret - cost) / cost;
    return [
      {
        name: 'Sales',
        value: sales
      },
      {
        name: 'Gross',
        value: ret,
        extra: { format: 'currency' }
      },
      {
        name: 'Avg. Time',
        value: dur,
        extra: { format: 'time' }
      },
      {
        name: 'Cost',
        value: cost,
        extra: { format: 'currency' }
      },
      {
        name: 'ROI',
        value: ROI,
        extra: { format: 'percent' }
      }
    ];
  }

  statusValueFormat(c): string {
    switch (c.data.extra ? c.data.extra.format : '') {
      case 'currency':
        return `$${Math.round(c.value).toLocaleString()}`;
      case 'time':
        return multiFormat(c.value);
      case 'percent':
        return `${Math.round(c.value * 100)}%`;
      default:
        return c.value.toLocaleString();
    }
  }

  valueFormatting(value: number): string {
    return `${Math.round(value).toLocaleString()} €`;
  }

  currencyFormatting(value: number) {
    return `$${Math.round(value).toLocaleString()}`;
  }

  gdpLabelFormatting(c) {
    return `${escapeLabel(c.label)}<br/><small class="number-card-label">GDP Per Capita</small>`;
  }

  statusLabelFormat(c): string {
    return `${c.label}<br/><small class="number-card-label">This week</small>`;
  }

  generatePlotData() {
    if (!this.mathFunction) {
      return [];
    }
    const twoPi = 2 * Math.PI;
    const length = 25;
    const series = Array({ length }).map((d, i) => {
      const x = i / (length - 1);
      const t = x * twoPi;
      return {
        name: ~~(x * 360),
        value: this.mathFunction(t)
      };
    });

    return [
      {
        name: this.mathText,
        series
      }
    ];
  }

  getFunction(text = this.mathText) {
    try {
      text = `with (Math) { return ${this.mathText} }`;
      // tslint:disable-next-line: function-constructor
      const fn = new Function('x', text).bind(Math); // tslint:disable-line: tsr-detect-eval-with-expression
      return typeof fn(1) === 'number' ? fn : null;
    } catch (err) {
      return null;
    }
  }

  treemapProcess(sumBy = this.sumBy) {
    this.sumBy = sumBy;
    const children = treemap[0];
    const value = sumBy === 'Size' ? sumChildren(children) : countChildren(children);
    this.treemap = [children];
    this.treemapPath = [{ name: 'Top', children: [children], value }];

    function sumChildren(node) {
      return (node.value = node.size || d3Array.sum(node.children, sumChildren));
    }

    function countChildren(node) {
      return (node.value = node.children ? d3Array.sum(node.children, countChildren) : 1);
    }
  }

  treemapSelect(item) {
    if (item.children) {
      const idx = this.treemapPath.indexOf(item);
      this.treemapPath.splice(idx + 1);
      this.treemap = this.treemapPath[idx].children;
      return;
    }
    const node = this.treemap.find(d => d.name === item.name);
    if (node.children) {
      this.treemapPath.push(node);
      this.treemap = node.children;
    }
  }

  getFlag(country) {
    return this.countries.find(c => c.name === country).emoji;
  }

  onFilter(event) {
    console.log('timeline filter', event);
  }

  /*
  **
  Combo Chart
  **
  [yLeftAxisScaleFactor]="yLeftAxisScale" and [yRightAxisScaleFactor]="yRightAxisScale"
  exposes the left and right min and max axis values for custom scaling, it is probably best to
  scale one axis in relation to the other axis but for flexibility to scale either the left or
  right axis both were exposed.
  **
  */

  yLeftAxisScale(min, max) {
    return { min: `${min}`, max: `${max}` };
  }

  yRightAxisScale(min, max) {
    return { min: `${min}`, max: `${max}` };
  }

  yLeftTickFormat(data) {
    return `${data.toLocaleString()}`;
  }

  yRightTickFormat(data) {
    return `${data}%`;
  }

  /*
  **
  End of Combo Chart
  **
  */

  onSelect(event) {
    console.log(event);
  }

  dblclick(event) {
    console.log('Double click', event);
  }

  /*
  **
  Bubble Chart Interactive Demo
  **
  */

  bubbleDemoProcess(dataFromServer) {
    this.bubbleDemoChart.setDataFromServer(dataFromServer);
    this.bubbleDemoTempData = this.bubbleDemoChart.toChart();
  }

  getBubbleInteractiveTitle() {
    return this.bubbleDemoChart.getChartTitle();
  }

  bubbleShowDrillDownResetLink() {
    return this.bubbleDemoChart.getDrilldownDepth() > 0;
  }

  onClickResetBubbleInteractiveDrill() {
    this.bubbleDemoChart.resetDrilldown();
    this.bubbleDemoTempData = this.bubbleDemoChart.toChart();
  }

  onSelectBubbleInteractivePoint(event) {
    this.bubbleDemoChart.drilldown(event);
    this.bubbleDemoTempData = this.bubbleDemoChart.toChart();
  }

}
