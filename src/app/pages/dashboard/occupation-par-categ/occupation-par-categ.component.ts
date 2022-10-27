import { EtatChambre } from '@/Model/EtatChambre';
import { Component, OnInit } from '@angular/core';
import { EtatChambreService } from '@services/etat-chambre.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label,Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-occupation-par-categ',
  templateUrl: './occupation-par-categ.component.html',
  styleUrls: ['./occupation-par-categ.component.scss']
})
export class OccupationParCategComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
        }
      }
    }
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },

  ];
  lstNbr:number[];

  constructor(private EtatService : EtatChambreService) { }

  ngOnInit(): void {
    this.getChart();
  }
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
  getChart(){
    this.lstNbr=[];

    this.EtatService.GetOccupParCateg().subscribe((data:Object[])=>{
      debugger
      console.log(data)
      data.forEach(element => {

        this.barChartLabels.push(element[1]);
        this.lstNbr.push(element[0]);
console.log(this.lstNbr)
      });
       this.barChartData=[
         { data: this.lstNbr,
            label: 'Occupation par Categories chambre' },
       ]
    })
  }
}
