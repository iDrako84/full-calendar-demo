import { Component, Signal } from '@angular/core';
import { DayContainerComponent } from './day-container/day-container.component';
import { FullCalendarService } from '../services/full-calendar.service';

@Component({
  selector: 'app-calendar-container',
  imports: [DayContainerComponent],
  templateUrl: './calendar-container.component.html',
  styleUrl: './calendar-container.component.scss',
  host: {
    class: 'w-full p-2'
  }
})
export class CalendarContainerComponent {
  public fullCalendar: Signal<any>;

  constructor(private _fullCalendarService: FullCalendarService) {
    this.fullCalendar = this._fullCalendarService.getFullCalendar();
  }
}
