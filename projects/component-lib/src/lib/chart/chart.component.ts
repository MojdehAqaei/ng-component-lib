import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClChartType} from "@sadad/component-lib/src/models";
import {LegendPosition, NgxChartsModule} from "@swimlane/ngx-charts";
import {ClHttpMethod} from "@sadad/component-lib/src/enums";
import {ClSharedService} from "@sadad/component-lib/src/services";
import {HttpClientModule} from "@angular/common/http";

const INITIAL_VALUE = {
  // view:[700,300],
  animations: true,
  legend: false,
  legendTitle: '',
  legendPosition: 'right',
  schemeType: 'ordinal',
  xAxis: false,
  yAxis: false,
  showGridLines: true,
  roundDomains: false,
  showXAxisLabel: false,
  showYAxisLabel: false,
  trimXAxisTicks: true,
  trimYAxisTicks: true,
  rotateXAxisTicks: true,
  maxXAxisTickLength: 16,
  maxYAxisTickLength: 16,
  showDataLabel: false,
  noBarWhenZero: true,
  gradient: false,
  activeEntries: [],
  barPadding: 8,
  groupPadding: 16,
  tooltipDisabled: false,
  tooltipText: '',
  roundEdges: true,
  min: 0,
  max: 10,
  bigSegments: 10,
  smallSegments: 5,
  angleSpan: 240,
  startAngle: -120,
  cardColor: '#37404b',
  showText: false
};


@Component({
  selector: 'cl-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, HttpClientModule ],
  templateUrl: 'chart.component.html',
})
export class ClChartComponent implements OnChanges {


  @Input() type!: ClChartType;
  @Input() view?: [number, number]; // the dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size
  @Input() data?: object[]; // the chart data
  @Input() isLazy?: boolean = false; // chart lazy loading
  @Input() method: ClHttpMethod = ClHttpMethod.GET;
  @Input() styleClasses: string = '';
  @Input() requestParams: any;
  @Input() requestBody: any;
  @Input() url: string = '';
  @Input() animations: boolean = true; // enable animations
  @Input() showPercent: boolean = false; // show or hide person on label
  @Input() showText: boolean = false; // show or hide radial gauge center label
  @Input() label: string = ''; //  total label  on pie  chart
  @Input() legend: boolean = false; // show or hide the legend
  @Input() legendTitle: string = ''; // the legend title
  @Input() legendPosition: 'right' | 'below' = 'right'; // the legend position
  @Input() xAxis: boolean = false; // show or hide the x axis
  @Input() yAxis: boolean = false; // show or hide the y axis
  @Input() showGridLines: boolean = true; // show or hide the grid lines
  @Input() roundDomains: boolean = false; // round domains for aligned gridlines
  @Input() showXAxisLabel: boolean = false; // show or hide the x axis label
  @Input() showYAxisLabel: boolean = false; // show or hide the y axis label
  @Input() xAxisLabel: string = ''; // the x axis label text
  @Input() yAxisLabel: string = ''; // the y axis label text
  @Input() labels: boolean = false; //  show or not label  on pie
  @Input() doughnut: boolean = false; //  activation doughnut in pie
  @Input() trimLabels: boolean = true; // trim or not label on pie
  @Input() trimXAxisTicks: boolean = true; // trim or not ticks on the x axis
  @Input() trimYAxisTicks: boolean = true; // trim or not ticks on the y axis
  @Input() rotateXAxisTicks: boolean = true; // enable automatic rotation of x-axis ticks to prevent overlaps
  @Input() maxLabelLength: number = 16; // max length of the label. If trimLabels is true, ticks over this length will be trimmed
  @Input() maxXAxisTickLength: number = 16; // max length of the ticks. If trimXAxisTicks is true, ticks over this length will be trimmed
  @Input() maxYAxisTickLength: number = 16; // max length of the ticks. If trimYAxisTicks is true, ticks over this length will be trimmed
  @Input() dataLabelFormatting?: (value: any) => {}; // data label formatting
  @Input() xAxisTickFormatting?: (value: any) => {}; // the x axis tick formatting
  @Input() yAxisTickFormatting?: (value: any) => {}; // the y axis tick formatting
  @Input() xAxisTicks?: any[]; // predefined list of x axis tick values
  @Input() yAxisTicks?: any[]; // predefined list of y axis tick values
  @Input() showDataLabel: boolean = false; // displays the value number next to the bar
  @Input() noBarWhenZero: boolean = true; // hide bar if value is 0 and setting is true
  @Input() gradient: boolean = false; // fill elements with a gradient instead of a solid color
  @Input() activeEntries: object[] = []; // elements to highlight
  @Input() barPadding: number = 8; // padding between bars in px
  @Input() groupPadding: number = 16; // padding between groups in px
  @Input() tooltipDisabled: boolean = false; // show or hide the tooltip
  @Input() tooltipText: string = ''; // tooltip text
  @Input() yScaleMax?: number; // the maximum value of the y axis (ignored if chart data contains a higher value)
  @Input() yScaleMin?: number; // the minimum value of the y axis (ignored if chart data contains a lower value)
  @Input() xScaleMax?: number; // the maximum value of the x axis (ignored if chart data contains a higher value)
  @Input() xScaleMin?: number; // the minimum value of the x axis (ignored if chart data contains a higher value)
  @Input() roundEdges: boolean = true;
  @Input() min: number = 0; // starting point of the scale for chart type of gauge
  @Input() max: number = 100; // ending point of the scale for chart type of gauge
  @Input() bigSegments: number = 10; // number of big segments on the axis for chart type of gauge
  @Input() smallSegments: number = 5; // number of small segments between every big segment for chart type of gauge
  @Input() angleSpan: number = 240; // the angle that the chart spans (in degrees) for chart type of gauge
  @Input() startAngle: number = -120; // tthe angle that the chart is rotated by. Use negative half of the spanning angle to centralize for chart type of gauge
  @Input() cardColor: string = '#37404b'; // color of the card background, defaults to color based on value and scheme for chart type of number-cards
  @Input() bandColor: string = ''; // color of the card color-bar, defaults to color based on value and scheme for chart type of number-cards
  @Input() textColor: string = ''; // color of the card text, defaults to the inverse of the card color for chart type of number-cards
  @Output() onStart = new EventEmitter<any>();
  @Output() onload = new EventEmitter<any>();
  @Output() onError = new EventEmitter<any>();
  chartLegendPosition?: LegendPosition;

  @ViewChild('chartRef') chartRef: any;

  constructor(private _elRef: ElementRef,
              private _sharedService: ClSharedService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["legendPosition"]?.currentValue) {
      this.chartLegendPosition = <LegendPosition>this.legendPosition;
    }

    if (!changes["data"]?.currentValue && changes["url"]?.currentValue){
      this.retrieveData();
    }
  }

  ngOnInit() {
    for (let property in this) {
      if (this[property] == undefined || this[property] == null) {
        // @ts-ignore
        this[property] = INITIAL_VALUE[property];
      }
    }
  }

  ngAfterViewChecked() {
    // add percent to chart tooltip
    if (this.showPercent && ['pie', 'gauge'].includes(this.type)) {
      const node = document?.querySelector('ngx-tooltip-content.ngx-charts-tooltip-content.type-tooltip .tooltip-val');
      if (node) {
        node.innerHTML = node.innerHTML.includes("%") ? node.innerHTML : node.innerHTML + "%";
      }
    }
  }

  ngAfterViewInit() {
    if (this.showPercent) {
      this._elRef?.nativeElement?.querySelectorAll(['vertical-bar', 'vertical-bar-stacked', 'group-vertical-bar', 'line', 'area',].includes(this.type) ? '.app-chart .y.axis .tick text' : '.app-chart .x.axis .tick text')?.forEach((node: any) =>
        node.innerHTML = node.innerHTML.includes("%") ? node.innerHTML : "%" + node.innerHTML);
    }
  }


  retrieveData() {
    this.onStart.emit();
    this._sharedService.createHttpRequest<any[]>(this.url, ClHttpMethod.GET, this.requestBody, this.requestParams).subscribe({
      next: (res: any[]) => {
        this.onload.emit(res);
        this.data = res;
      }, error: (error) => {
        this.onError.emit(error);
      }
    });
  }

}
