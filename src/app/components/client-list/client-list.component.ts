import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Client from 'src/app/interfaces/client.interface';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  allClients!: Client[];
  
  constructor(
    private clientService: TablesService,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    // Obtenemos todos los clientes de la base de datos
    this.clientService.getClients().subscribe((clients) => {
      this.allClients = clients;
    });
  }


  // Método para eliminar cliente
  deleteClient(clientId: any) {
    this.clientService.deleteClient(clientId).then(() => {
      this.toastr.error(
        'Empleado eliminado correctamente',
        'Empleado eliminado',
        { positionClass: 'toast-top-right' }
      );
    });
  }

}
