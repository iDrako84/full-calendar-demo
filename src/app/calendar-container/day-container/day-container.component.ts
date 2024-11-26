import { Component, computed, Input, Signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FullCalendarService } from '../../services/full-calendar.service';

@Component({
  selector: 'app-day-container',
  imports: [NgClass],
  templateUrl: './day-container.component.html',
  styleUrl: './day-container.component.scss',
  host: {
    class: 'border min-h-[300px] max-h-[300px]'
  }
})
export class DayContainerComponent {
  @Input({required: true}) day: any;
  private readonly mounth: Signal<number>;
  public readonly dayClass: Signal<string> = computed(() => {
    if (this.day.mounth() !== this.mounth()) {
      return `bg-gray-400`;
    } else {
      return `bg-gray-100`;
    }
  });
  public readonly mountLabel: Signal<string> = computed(() => {
    return this.day.processDay().toLocaleString('default', { month: 'long' });
  });

  constructor(private _fullCalendarService: FullCalendarService) {
    this.mounth = this._fullCalendarService.getMounth();
  }
}
