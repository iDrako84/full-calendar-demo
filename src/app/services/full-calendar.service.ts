import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullCalendarService {
  private readonly currentDate: WritableSignal<Date> = signal(new Date());
  private readonly date: Signal<number> = computed(() => {
    return this.currentDate().getDate();
  });
  private readonly mounth: Signal<number> = computed(() => {
    return this.currentDate().getMonth();
  });
  private readonly year: Signal<number> = computed(() => {
    return this.currentDate().getFullYear();
  });
  private readonly fullCalendar: Signal<any> = computed(() => {
    let currentMounth: any = []
    const mounth = this.mounth();
    const year = this.year();
    let date = 1;
    let datePre = 0;
    
    do {
      const processDay = new Date(year, mounth, date);
      currentMounth = [
        ...currentMounth,
        {
          year: signal(year),
          mounth: signal(mounth),
          date: signal(date),
          day: signal(processDay.getDay()),
          processDay: signal(processDay)
        }
      ]
      date++;
    } while(new Date(year, mounth, date).getMonth() === mounth);
    
    if (currentMounth[0].day() !== 0) {
      do {
        const processDay = new Date(year, mounth, datePre);
        currentMounth = [
          {
            year: signal(processDay.getFullYear()),
            mounth: signal(processDay.getMonth()),
            date: signal(processDay.getDate()),
            day: signal(processDay.getDay()),
            processDay: signal(processDay)
          },
          ...currentMounth
        ]
        datePre--;
      } while(new Date(year, mounth, datePre).getDay() !== 6);
    }
    
    if (currentMounth[currentMounth.length - 1].day() !== 6) {
      do {
        const processDay = new Date(year, mounth, date);
        currentMounth = [
          ...currentMounth,
          {
            year: signal(processDay.getFullYear()),
            mounth: signal(processDay.getMonth()),
            date: signal(processDay.getDate()),
            day: signal(processDay.getDay()),
            processDay: signal(processDay)
          }
        ]
        date++;
      } while(new Date(year, mounth, date).getDay() !== 6);
    }
    return currentMounth;
  });

  constructor() { }

  public getMounth(): Signal<number> {
    return this.mounth;
  }

  public getFullCalendar(): Signal<any> {
    return this.fullCalendar;
  }

  public initDate(): void {
    console.log(this.fullCalendar());
  }
}
