import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineServiceService } from '../../services/online-service.service';


@Component({
  selector: 'app-componente-barra-sin-internet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './componente-barra-sin-internet.component.html',
  styleUrls: ['./componente-barra-sin-internet.component.css']
})
export class ComponenteBarraSinInternetComponent {

  online = true;
  wasOffline = false; // 🔹 Bandera para saber si ya se perdió la conexión antes
  showOfflineBanner = false;
  showOnlineBanner = false;

  constructor( private serviceSinConexion: OnlineServiceService) {


    this.online = this.serviceSinConexion.isOnline;
    this.serviceSinConexion.online$.subscribe(status => {
      // 🔸 Si cambia el estado
      if (status === false) {
        this.wasOffline = true;
        this.showOfflineBanner = true;
        this.showOnlineBanner = false;
      } else if (status === true && this.wasOffline) {
        // 🔸 Solo muestra "Conexión restaurada" si antes se perdió
        this.showOfflineBanner = false;
        this.showOnlineBanner = true;

        // 🔹 Oculta el banner después de unos segundos
        setTimeout(() => this.showOnlineBanner = false, 4000);
      }
      this.online = status;
    });
  }

}
