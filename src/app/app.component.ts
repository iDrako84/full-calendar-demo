import { Component, OnInit } from '@angular/core';
import { CalendarContainerComponent } from './calendar-container/calendar-container.component';
import { FullCalendarService } from './services/full-calendar.service';

@Component({
  selector: 'app-root',
  imports: [CalendarContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private _fullCalendarService: FullCalendarService) {}

  ngOnInit(): void {
    this._fullCalendarService.initDate();
  }
}
