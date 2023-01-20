import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {
  @ViewChild('name') clientName!: ElementRef;
  @ViewChild('address') clientAddress!: ElementRef;
  @ViewChild('postalCode') clientPostalCode!: ElementRef;
  @ViewChild('poblation') clientPoblation!: ElementRef;
  @ViewChild('messageError') messageError!: ElementRef;
  newClient: any = {};
  id!: string | null;
  loading: boolean = false;

  ngOnInit(): void {
    this.editClient();
  }

  constructor(
    private clientService: TablesService,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  // Método para crear un nuevo cliente
  async addClient() {
    let name = this.clientName.nativeElement.value;
    let address = this.clientAddress.nativeElement.value;
    let postalCode = this.clientPostalCode.nativeElement.value;
    let poblation = this.clientPoblation.nativeElement.value;
    const today = new Date();

    if (
      name === '' ||
      address === '' ||
      postalCode === '' ||
      poblation === ''
    ) {
      this.messageError.nativeElement.innerHTML =
        'Debes llenar todos los campos';
      this.renderer.setStyle(
        this.messageError.nativeElement,
        'display',
        'block'
      );
      this.renderer.setStyle(
        this.messageError.nativeElement,
        'background-color',
        '#D32f2f'
      );
    } else {
      this.newClient = {
        name,
        address,
        postalCode,
        poblation,
        createdAt: today.getTime(),
      };
      this.loading = true;
      const response = await this.clientService.addClient(this.newClient);

      this.clientName.nativeElement.value = '';
      this.clientAddress.nativeElement.value = '';
      this.clientPostalCode.nativeElement.value = '';
      this.clientPoblation.nativeElement.value = '';

      this.renderer.setStyle(
        this.messageError.nativeElement,
        'display',
        'none'
      );
      this.renderer.setStyle(
        this.messageError.nativeElement,
        'background-color',
        '#D32f2f'
      );

      this.toastr.success(
        'Empleado registrado correctamente',
        'Empleado registrado',
        { positionClass: 'toast-top-right' }
      );

      this.loading = false;
      this.router.navigate(['/clientList']);
    }
  }

  // Método para editar cliente
  editClient() {
    if (this.id !== null) {
      this.loading = true;
      this.clientService.getClient(this.id).subscribe((client) => {
        this.loading = false;
        this.clientName.nativeElement.value = client.payload.data()['name'];
        this.clientAddress.nativeElement.value =
          client.payload.data()['address'];
        this.clientPostalCode.nativeElement.value =
          client.payload.data()['postalCode'];
        this.clientPoblation.nativeElement.value =
          client.payload.data()['poblation'];
      });
    }
  }

  saveEditionClient() {
    if (this.id === null) {
      this.addClient();
    } else {
      this.dataClientEdited(this.id);
    }
  }

  dataClientEdited(id: string) {
    let name = this.clientName.nativeElement.value;
    let address = this.clientAddress.nativeElement.value;
    let postalCode = this.clientPostalCode.nativeElement.value;
    let poblation = this.clientPoblation.nativeElement.value;
    const dataClient = {
      name,
      address,
      postalCode,
      poblation,
    };
    this.loading = true;
    this.clientService.updateClient(id, dataClient).then(() => {
      this.toastr.info(
        'Los datos han sido editados correctamente',
        'Cliente editado',
        { positionClass: 'toast-top-right' }
      );
      this.loading = false;
      this.router.navigate(['/clientList']);
    });
  }
}
