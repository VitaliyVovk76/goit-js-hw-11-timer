import '../css/common.css';
const refs = {
  daysEl: document.querySelector('[data-value="days"]'),
  hoursEl: document.querySelector('[data-value="hours"]'),
  minsEl: document.querySelector('[data-value="mins"]'),
  secsEl: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
    this.time = targetDate.getTime() - Date.now();
    this.intervalId = null;
  }

  tick() {
    if (this.secs <= 0) {
      this.stop();
    } else {
      this.secs -= 1;
    }
    if (this.secs === 0 && this.mins > 0) {
      this.secs = 59;
      this.mins -= 1;
    }
    if (this.mins === 0 && this.hours > 0) {
      this.mins = 59;
      this.hours -= 1;
    }
    if (this.hours === 0 && this.days > 0) {
      this.hours = 23;
      this.days -= 1;
    }
  }

  start() {
    this.days = Math.floor(this.time / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.mins = Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));
    this.secs = Math.floor((this.time % (1000 * 60)) / 1000);

    this.intervalId = setInterval(() => {
      this.tick();
      this.onTick(this);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

const newTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('August 26, 2020'),
  onTick: updateTimer,
});

function updateTimer(timer) {
  const { days, hours, mins, secs } = timer;
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = pad(hours);
  refs.minsEl.textContent = pad(mins);
  refs.secsEl.textContent = pad(secs);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

newTimer.start();
