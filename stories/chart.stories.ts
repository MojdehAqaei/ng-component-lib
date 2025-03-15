import {StoryFn, Meta, moduleMetadata, applicationConfig} from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { ClChartComponent } from "../projects/component-lib/src/lib/chart/chart.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

const chartData = [
  {
    name: " آلمان",
    value: 40632,
  },
  {
    name: "آمریکا",
    value: 50000,
  },
  {
    name: "فرانسه",
    value: 36745,
  },
  {
    name: "انگلستان",
    value: 36240,
  },
  {
    name: "اسپانیا",
    value: 33000,
  },
  {
    name: "ایتالیا",
    value: 35800,
  },
];

const groupedChartData = [
  {
    name: "آلمان",
    series: [
      {
        name: "2010",
        value: 40632,
      },
      {
        name: "2000",
        value: 36953,
      },
      {
        name: "1990",
        value: 31476,
      },
    ],
  },
  {
    name: "آمریکا",
    series: [
      {
        name: "2010",
        value: 0,
      },
      {
        name: "2000",
        value: 45986,
      },
      {
        name: "1990",
        value: 37060,
      },
    ],
  },
  {
    name: "فرانسه",
    series: [
      {
        name: "2010",
        value: 36745,
      },
      {
        name: "2000",
        value: 34774,
      },
      {
        name: "1990",
        value: 29476,
      },
    ],
  },
  {
    name: "انگلستان",
    series: [
      {
        name: "2010",
        value: 36240,
      },
      {
        name: "2000",
        value: 32543,
      },
      {
        name: "1990",
        value: 26424,
      },
    ],
  },
];

const bubbleChartData = [
  {
    name: "آلمان",
    series: [
      {
        name: "2010",
        x: "2010",
        y: 80.3,
        r: 250,
      },
      {
        name: "2000",
        x: "2000",
        y: 20.3,
        r: 180,
      },
      {
        name: "1990",
        x: "1990",
        y: 15,
        r: 130,
      },
    ],
  },
  {
    name: "آمریکا",
    series: [
      {
        name: "2010",
        x: "2010",
        y: 10,
        r: 100,
      },
      {
        name: "2000",
        x: "2000",
        y: 76.9,
        r: 300,
      },
      {
        name: "1990",
        x: "1990",
        y: 60,
        r: 253,
      },
    ],
  },
  {
    name: "فرانسه",
    series: [
      {
        name: "2010",
        x: "2010",
        y: 88.4,
        r: 63,
      },
      {
        name: "2000",
        x: "2000",
        y: 90.1,
        r: 59.4,
      },
      {
        name: "1990",
        x: "1990",
        y: 77.2,
        r: 56.9,
      },
    ],
  },
  {
    name: "انگلستان",
    series: [
      {
        name: "2010",
        x: "2010",
        y: 60.2,
        r: 62.7,
      },
      {
        name: "2000",
        x: "2000",
        y: 55.8,
        r: 58.9,
      },
      {
        name: "1990",
        x: "1990",
        y: 45.7,
        r: 57.1,
      },
    ],
  },
];

export default {
  title: "Components/Data/Chart",
  component: ClChartComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
} as Meta;

const Template: StoryFn<ClChartComponent> = (args) => ({
  component: ClChartComponent,
  props: {
    type: args.type,
    data: args.data,
    legend: args.legend,
    legendTitle: args.legendTitle,
    legendPosition: args.legendPosition,
    showXAxisLabel: args.showXAxisLabel,
    showYAxisLabel: args.showYAxisLabel,
    showDataLabel: args.showDataLabel,
    showGridLines: args.showGridLines,
    xAxis: args.xAxis,
    yAxis: args.yAxis,
    xAxisLabel: args.xAxisLabel,
    yAxisLabel: args.yAxisLabel,
    trimLabels: args.trimLabels,
    trimXAxisTicks: args.trimXAxisTicks,
    trimYAxisTicks: args.trimYAxisTicks,
    gradient: args.gradient,
    labels: args.labels,
    min: args.min,
    max: args.max,
    bigSegments: args.bigSegments,
    smallSegments: args.smallSegments,
    angleSpan: args.angleSpan,
    startAngle: args.startAngle,
    animations: args.animations,
    xScaleMin: args.xScaleMin,
    xScaleMax: args.xScaleMax,
    yScaleMin: args.yScaleMin,
    yScaleMax: args.yScaleMax,
    label: args.label,
  },
  template: `
          <style>

          pre{
           direction: ltr;background-color: #818181;color: #ffffff;padding:5px;border-radius: 5px;font-size: 0.8em;
          }

     </style>

        <br/>
        <pre >{{data | json}}</pre>
        <br/>
        <cl-chart  [type]="type"
                   [data]="data"
                   [legend]="legend"
                   [legendTitle]="legendTitle"
                   [legendPosition]="legendPosition"
                   [showXAxisLabel]="showXAxisLabel"
                   [showYAxisLabel]="showYAxisLabel"
                   [showDataLabel]="showDataLabel"
                   [showGridLines]="showGridLines"
                   [xAxis]="xAxis"
                   [yAxis]="yAxis"
                   [xAxisLabel]="xAxisLabel"
                   [yAxisLabel]="yAxisLabel"
                   [trimLabels]="trimLabels"
                   [trimXAxisTicks]="trimXAxisTicks"
                   [trimYAxisTicks]="trimYAxisTicks"
                   [gradient]="gradient"
                   [labels]="labels"
                   [min]="min"
                   [max]="max"
                   [bigSegments]="bigSegments"
                   [smallSegments]="smallSegments"
                   [angleSpan]="angleSpan"
                   [startAngle]="startAngle"
                   [animations]="animations"
                   [xScaleMin]="xScaleMin"
                   [xScaleMax]="xScaleMax"
                   [yScaleMin]="yScaleMin"
                   [yScaleMax]="yScaleMax"
                   [label]="label">
        </cl-chart>
        `,
});

export const VerticalBarChart = {
  render: Template,

  args: {
    type: "vertical-bar",
    data: chartData,
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    showXAxisLabel: true,
    showYAxisLabel: true,
    showDataLabel: true,
    showGridLines: true,
    xAxis: true,
    yAxis: true,
    xAxisLabel: "کشور",
    yAxisLabel: "جمعیت",
    trimLabels: true,
    trimXAxisTicks: true,
    trimYAxisTicks: true,
    gradient: false,
    labels: false,
  },
};

export const HorizontalBarChart = {
  render: Template,

  args: {
    type: "horizontal-bar",
    data: chartData,
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    showXAxisLabel: true,
    showYAxisLabel: true,
    showDataLabel: true,
    showGridLines: true,
    xAxis: true,
    yAxis: true,
    yAxisLabel: "کشور",
    xAxisLabel: "جمعیت",
    trimLabels: true,
    trimXAxisTicks: true,
    trimYAxisTicks: true,
    gradient: false,
    labels: false,
  },
};

export const GroupVerticalBar = {
  render: Template,

  args: {
    type: "group-vertical-bar",
    data: groupedChartData,
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    showXAxisLabel: true,
    showYAxisLabel: true,
    showDataLabel: true,
    showGridLines: true,
    xAxis: true,
    yAxis: true,
    xAxisLabel: "کشور",
    yAxisLabel: "جمعیت",
    trimLabels: true,
    trimXAxisTicks: true,
    trimYAxisTicks: true,
    gradient: false,
    labels: false,
  },
};

export const GroupHorizontalBar = {
  render: Template,

  args: {
    type: "group-horizontal-bar",
    data: groupedChartData,
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    showXAxisLabel: true,
    showYAxisLabel: true,
    showDataLabel: true,
    showGridLines: true,
    xAxis: true,
    yAxis: true,
    yAxisLabel: "کشور",
    xAxisLabel: "جمعیت",
    trimLabels: true,
    trimXAxisTicks: true,
    trimYAxisTicks: true,
    gradient: false,
    labels: false,
  },
};

export const VerticalBarStacked = {
  render: Template,

  args: {
    data: groupedChartData,
    type: "vertical-bar-stacked",
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    showXAxisLabel: true,
    showYAxisLabel: true,
    showDataLabel: true,
    showGridLines: true,
    xAxis: true,
    yAxis: true,
    xAxisLabel: "کشور",
    yAxisLabel: "جمعیت",
  },
};

export const HorizontalBarStacked = {
  render: Template,

  args: {
    data: groupedChartData,
    type: "horizontal-bar-stacked",
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    showXAxisLabel: true,
    showYAxisLabel: true,
    showDataLabel: true,
    showGridLines: true,
    xAxis: true,
    yAxis: true,
    yAxisLabel: "کشور",
    xAxisLabel: "جمعیت",
  },
};

export const PieChart = {
  render: Template,

  args: {
    data: chartData,
    type: "pie",
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    labels: true,
  },
};

export const PieGridChart = {
  render: Template,

  args: {
    data: chartData,
    type: "pie-grid",
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    label: "جمعیت",
  },
};

export const LineChart = {
  render: Template,

  args: {
    data: groupedChartData,
    type: "line",
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "below",
    showXAxisLabel: true,
    showYAxisLabel: true,
    showDataLabel: true,
    showGridLines: true,
    xAxis: true,
    yAxis: true,
    xAxisLabel: "کشور",
    yAxisLabel: "جمعیت",
  },
};

export const AreaChart = {
  render: Template,

  args: {
    data: groupedChartData,
    type: "area",
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    showXAxisLabel: true,
    showYAxisLabel: true,
    showDataLabel: true,
    showGridLines: true,
    xAxis: true,
    yAxis: true,
    xAxisLabel: "کشور",
    yAxisLabel: "جمعیت",
  },
};

export const BubbleChart = {
  render: Template,

  args: {
    data: bubbleChartData,
    type: "bubble",
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    showXAxisLabel: true,
    showYAxisLabel: true,
    showGridLines: true,
    xAxis: true,
    yAxis: true,
    xAxisLabel: "سال",
    yAxisLabel: "جمعیت",
    xScaleMin: 1900,
    xScaleMax: 2024,
    yScaleMin: 1,
    yScaleMax: 200,
  },
};

export const GaugeChart = {
  render: Template,

  args: {
    data: chartData,
    type: "gauge",
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "right",
    showText: true,
    // min: 0,
    // max: 100,
    // bigSegments: 1,
    // smallSegments: 1,
    // angleSpan: 500,
    // startAngle: 15,
  },
};

export const NumberCardsChart = {
  render: Template,

  args: {
    data: chartData,
    type: "number-cards",
  },
};

export const PolarChart = {
  render: Template,

  args: {
    data: groupedChartData,
    type: "polar",
    legend: true,
    legendTitle: "لیست کشور",
    legendPosition: "below",
    xAxis: true,
    yAxis: true,
    xAxisLabel: "کشور",
    yAxisLabel: "جمعیت",
    showXAxisLabel: true,
    showYAxisLabel: true,
    showGridLines: true,
  },
};

export const DoughnutChart = {
  render: Template,

  args: {
    data: chartData,
    type: "doughnut",
  },
};
