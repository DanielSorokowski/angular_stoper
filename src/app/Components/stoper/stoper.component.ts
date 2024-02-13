import { Component, Input } from '@angular/core';
import { StoperEntity } from '../../Types/stoper.inteface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stoper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stoper.component.html',
  styleUrl: './stoper.component.scss'
})
export class StoperComponent {
  @Input() stoper!: StoperEntity
  interval: any

  changeTimerState() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    } else {
      this.startTimer();
    }
  }
  startTimer() {
    this.interval = setInterval(() => {
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
    }, 1000)
  }
}
