import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/pages/auth/auth.service';
import { Cobros, Medicos, OrdenMedica } from '@app/shared/components/models/data';
import { DetailsOrderComponent } from '../details-order/details-order.component';
import { MedDataService } from '../Services/med-data.service';



@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
export class OrderPaymentComponent implements OnInit {

  displayedColumns: string[] = [
                                'Numero de Orden',
                                'Numero de Factura','Paciente','Fecha de la Factura',
                                'Monto en Bs','Monto en $'
                               ];
  dataSource = JSON.parse(localStorage.getItem('cobros')||'{}');
  montoBs="";

  constructor(public dialog:MatDialog,private medSrvc:MedDataService,private service:AuthService) {}

  openModal(numero:number){

    console.log(numero);

    this.dialog.open(DetailsOrderComponent,{data:{numero}});
  }

  ngOnInit(): void {

    this.dataSource=this.medSrvc.getOrder().subscribe(data=>{
      let orderData:Cobros[]= data;
      let cont:number=0;
      this.dataSource=orderData;
    })

  }
}