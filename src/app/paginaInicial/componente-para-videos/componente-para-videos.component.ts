import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

interface Reel {
  id: number;
  usuario: string;
  descripcion: string;
  video: string;
  likes: string;
  comentarios: number;
  compartidos: number;
}




@Component({
  selector: 'app-componente-para-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './componente-para-videos.component.html',
  styleUrl: './componente-para-videos.component.css'
})
export class ComponenteParaVideosComponent {

  @ViewChildren('videoElement') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;

  /*  videos = [
     {
       type: 'video',
       src: 'videos/video1.mp4',
       title: 'Pollo Asado Especial',
       description: 'Preparado con nuestra receta secreta, crujiente por fuera y jugoso por dentro.',
       muted: true
     },
     {
       type: 'video',
       src: 'videos/video1.mp4',
       title: 'Combo Familiar',
       description: 'Disfruta de una comida completa para 4 personas.',
       muted: true
     },
     {
       type: 'video',
       src: 'videos/video2.mp4',
       title: 'Nuevo Local',
       description: 'Ven a conocer nuestra nueva sucursal en Tlalpan.', muted: true
     },
     {
       type: 'video',
       src: 'videos/video1.mp4',
       title: 'Nuevo Local',
       description: 'Ven a conocer nuestra nueva sucursal en Tlalpan.', muted: true
     },
     {
       type: 'video',
       src: 'videos/video1.mp4',
       title: 'Nuevo Local',
       description: 'Ven a conocer nuestra nueva sucursal en Tlalpan.', muted: true
     },
     {
       type: 'video',
       src: 'videos/video1.mp4',
       title: 'Nuevo Local',
       description: 'Ven a conocer nuestra nueva sucursal en Tlalpan.', muted: true
     }
   ]; */


  videos: any[] | null = null;  // null = "cargando"

  ngOnInit() {
    setTimeout(() => {
      // Simulas que la API respondió SIN videos
      this.videos = [];
    }, 1500);
  }



  ngAfterViewInit() {
    this.videoElements.forEach((el) => {
      el.nativeElement.muted = true;
      el.nativeElement.play().catch(() => { });
    });
  }

  toggleSound(video: any, index: number) {
    const videoEl = this.videoElements.toArray()[index].nativeElement;

    video.muted = !video.muted;
    videoEl.muted = video.muted;

    if (!video.muted) {
      videoEl.play().catch(() => { });
    }
  }
}


