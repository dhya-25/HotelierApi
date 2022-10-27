import { Resident } from '@/Model/Resident';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResidentService } from '@services/resident.service';

@Component({
  selector: 'app-entre-sortie',
  templateUrl: './entre-sortie.component.html',
  styleUrls: ['./entre-sortie.component.scss']
})
export class EntreSortieComponent implements OnInit {
  resident : Resident[]=[];
  displayedColumns: string[] = ['id', 'name', 'progress'];
      dataSource: MatTableDataSource<any>;
      numFact!:any
      commentaire!:any
      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;
  constructor(private residentService : ResidentService) { }

  ngOnInit(): void {
    this.getAllEtat()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
   
  }
  printerReportES(){
   
    try {
        debugger
        this.residentService.getReportES('Essai')
        .subscribe((data)=>{
          console.log(data)
          let file = new Blob([data], { type: 'application/pdf' });            
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        });
      

    } catch (error) {
      console.log(error)
    }
  }
  getAllEtat() {
    
    this.residentService.GetResident().subscribe((data: Resident[]) => {
      
      this.dataSource= new MatTableDataSource(data) ; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
      console.log(data);
      
    }, error => {
      console.log(error);
    });
  }

}
