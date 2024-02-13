import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoperEntity } from './Types/stoper.inteface';
import { StoperComponent } from './Components/stoper/stoper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, StoperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  inputValue = '';
  stopers: StoperEntity[] = []

  ngOnInit() {
    const storedStopers = localStorage.getItem('stopers');
    if (storedStopers) {
      this.stopers = JSON.parse(storedStopers);
    }
  }

  addStoper() {
    this.stopers.push({
      id: this.stopers[this.stopers.length - 1]?.id + 1 || 1,
      title: this.inputValue,
      hours: 0,
      minutes: 0,
      seconds: 0,
    })

    localStorage.setItem('stopers', JSON.stringify(this.stopers));
  }

  deleteStoper(id: number) {
    this.stopers = this.stopers.filter(stoper => stoper.id != id)

    localStorage.setItem('stopers', JSON.stringify(this.stopers));
  }
}
