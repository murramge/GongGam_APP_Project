export function parseSchedule(input) {
  const schedule = {};
  const dayTimePattern = /([가-힣]+(?: ~ [가-힣]+)?)\(([\d:]+(?:,[\d:]+)*)\)/g;
  let match;

  while ((match = dayTimePattern.exec(input))) {
    const [_, days, times] = match;
    const timeList = times.split(',');

    if (days.includes(' ~ ')) {
      const [startDay, endDay] = days.split(' ~ ');
      const dayRange = expandDayRange(startDay, endDay);
      dayRange.forEach(day => (schedule[day] = timeList));
    } else {
      schedule[days] = timeList;
    }
  }

  return schedule;
}

export function divFuntion(schedule) {
  let collectedSchedule = {};

  Object.keys(schedule).forEach(day => {
    collectedSchedule[day] = schedule[day];
  });
  return collectedSchedule;
}

export function expandDayRange(startDay, endDay) {
  const allDays = [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ];
  const startIndex = allDays.indexOf(startDay);
  const endIndex = allDays.indexOf(endDay);
  return allDays.slice(startIndex, endIndex + 1);
}
