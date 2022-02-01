const { DateTime } = require('luxon');
const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const clazzes = {
  Physics: {
    link: 'https://meet.google.com/kag-tbah-xge',
    teacher: 'SC Yadav',
  },
  Chemistry: {
    link: 'https://meet.google.com/ykr-zotn-uzq',
    teacher: 'Ajay Madan',
  },
  Maths: {
    link: 'https://meet.google.com/itt-peuk-kgi',
    teacher: 'SK Gupta',
  },
  PEd: {
    link: 'https://meet.google.com/cfe-yyjk-qov',
    teacher: 'Saba Ayub',
  },
  Computer: {
    link: 'https://meet.google.com/oku-vspk-zpj',
    teacher: 'Sanjib Roy',
  },
  English: {
    link: 'https://meet.google.com/xyz-difk-pph',
    teacher: 'Vaibhav Srivastava',
  },
  MT: {
    link: 'https://meet.google.com/ztk-hjpc-xpj',
    teacher: 'Tanuja Mishra',
  },
};
const table = [
  [
    'MT',
    'Computer',
    'Maths',
    'Chemistry',
    'Physics',
    'Maths',
    'Chemistry',
    'PEd',
  ],
  [
    'English',
    'Computer',
    'Physics',
    'English',
    'Chemistry',
    'Chemistry',
    'Computer',
    'PEd',
  ],
  [
    'Physics',
    'Maths',
    'PEd',
    'Maths',
    'Chemistry',
    'Chemistry',
    'English',
    'Computer',
  ],
  [
    'English',
    'Chemistry',
    'Computer',
    'Maths',
    'Maths',
    'Physics',
    'Physics',
    'English',
  ],
  [
    'English',
    'Chemistry',
    'Computer',
    'Maths',
    'Maths',
    'Physics',
    'Physics',
    'English',
  ],
  [
    'Maths',
    'English',
    'Maths',
    'English',
    'Chemistry',
    'Physics',
    'Physics',
    'Computer',
  ],
];
const times = [
  {
    start: DateTime.fromSQL('09:15:00'),
    end: DateTime.fromSQL('09:45:00'),
  },
  {
    start: DateTime.fromSQL('09:45:00'),
    end: DateTime.fromSQL('10:15:00'),
  },
  {
    start: DateTime.fromSQL('10:15:00'),
    end: DateTime.fromSQL('10:45:00'),
  },
  {
    start: DateTime.fromSQL('10:45:00'),
    end: DateTime.fromSQL('11:15:00'),
  },
  {
    start: DateTime.fromSQL('11:45:00'),
    end: DateTime.fromSQL('12:15:00'),
  },
  {
    start: DateTime.fromSQL('12:15:00'),
    end: DateTime.fromSQL('12:45:00'),
  },
  {
    start: DateTime.fromSQL('12:45:00'),
    end: DateTime.fromSQL('13:20:00'),
  },
  {
    start: DateTime.fromSQL('13:20:00'),
    end: DateTime.fromSQL('13:55:00'),
  },
];

const parseTime = (start, end) => {
  return `${start.hour}:${start.minute} to ${end.hour}:${end.minute}`;
};

const scs = [];
for (let i = 0; i < days.length; i++) {
  const day = days[i];
  for (let j = 0; j < times.length; j++) {
    const time = times[j];
    const clazz = Object.entries(clazzes).find((obj) => obj[0] === table[i][j]);
    if (!clazz) continue;
    const details = clazz[1];
    const description = parseTime(time.start, time.end);
    scs.push({
      info: {
        button: {
          name: 'Join',
          url: details.link,
        },
        caption: details.teacher,
        description,
        title: clazz[0],
      },
      time: {
        day: day,
        start: time.start,
        end: time.end,
      },
    });
  }
}
console.log(JSON.stringify(scs));