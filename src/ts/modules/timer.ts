export const timer = (containerId: string, deadline: string) => {
  interface ITimerValues {
    timeDifference: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  }

  const addZeroToStringTimerValue = (num: number): string => {
    return num <= 9 ? `0${num}` : num.toString();
  };

  const getTimeRemaining = (endtime: string): ITimerValues => {
    const timeDifference: number =
      Date.parse(endtime) - Date.parse(new Date().toString());
    const seconds: number = Math.floor((timeDifference / 1000) % 60);
    const minutes: number = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours: number = Math.floor((timeDifference / 1000 / 60 / 60) % 24);
    const days: number = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

    return {
      timeDifference,
      seconds,
      minutes,
      hours,
      days
    } as ITimerValues;
  };

  const setTimeRemaining = (
    containerSelector: string,
    endtime: string
  ): void => {
    const timer = document.querySelector(containerSelector) as HTMLElement;
    const days = timer.querySelector('#days') as HTMLElement;
    const hours = timer.querySelector('#hours') as HTMLElement;
    const minutes = timer.querySelector('#minutes') as HTMLElement;
    const seconds = timer.querySelector('#seconds') as HTMLElement;
    const timeInterval = setInterval(updateTimer, 1000);

    updateTimer();

    function updateTimer() {
      const timerValues = getTimeRemaining(endtime);

      days.textContent = addZeroToStringTimerValue(timerValues.days);
      hours.textContent = addZeroToStringTimerValue(timerValues.hours);
      minutes.textContent = addZeroToStringTimerValue(timerValues.minutes);
      seconds.textContent = addZeroToStringTimerValue(timerValues.seconds);

      if (timerValues.timeDifference <= 0) {
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';

        clearInterval(timeInterval);
      }
    }
  };

  setTimeRemaining(containerId, deadline);
};
