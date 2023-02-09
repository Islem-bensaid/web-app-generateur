import { NgModule } from '@angular/core';
import { ChartCommonModule } from '@swimlane/ngx-charts';
import { BubbleChartInteractiveComponent } from './bubble-chart-interactive.component';
import { BubbleSeriesInteractiveComponent } from './bubble-series-interactive.component';

export { BubbleChartInteractiveComponent, BubbleSeriesInteractiveComponent };

@NgModule({
  imports: [ChartCommonModule, ChartCommonModule],
  declarations: [BubbleChartInteractiveComponent, BubbleSeriesInteractiveComponent],
  exports: [BubbleChartInteractiveComponent, BubbleSeriesInteractiveComponent]
})
export class BubbleChartInteractiveModule {}
