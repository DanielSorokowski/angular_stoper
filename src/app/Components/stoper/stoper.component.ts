import { Component, Input, OnDestroy } from '@angular/core';
import { StoperEntity } from '../../Types/stoper.inteface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stoper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stoper.component.html',
  styleUrl: './stoper.component.scss'
})
export class StoperComponent implements OnDestroy {
  @Input() stoper!: StoperEntity;
  animationFrameId: number | undefined;

  changeTimerState() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    let lastTime = performance.now();

    const update = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= 1000) {
        this.stoper.seconds++;

        if (this.stoper.seconds >= 60) {
          this.stoper.seconds = 0;
          this.stoper.minutes++;
        }

        if (this.stoper.minutes >= 60) {
          this.stoper.minutes = 0;
          this.stoper.hours++;
        }

        const stopersFromLocalStorage = JSON.parse(localStorage.getItem('stopers') || '[]');
        const updatedStopers = stopersFromLocalStorage.map((storedStoper: StoperEntity) => {
          if (storedStoper.id === this.stoper.id) {
            return this.stoper;
          }
          return storedStoper;
        });
        localStorage.setItem('stopers', JSON.stringify(updatedStopers));

        lastTime = currentTime;
      }

      this.animationFrameId = requestAnimationFrame(update);
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}