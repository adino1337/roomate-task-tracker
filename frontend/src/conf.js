// conf.js

export const roommates = ['Pato', 'Mišo', 'Filip', 'Andrej'];

export const daysOfWeek = [
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday', 
  'Friday', 
  'Saturday', 
  'Sunday'
];

export const predefinedTasks = [
  {
    category: 'Vysavanie',
    tasks: [
      { name: 'Celý byt', points: 10 },
      { name: 'Miestnosť', points: 2 },
    ],
  },
  {
    category: 'Kúpelňa',
    tasks: [
      { name: 'Sprcha', points: 5 },
      { name: 'Umývadlo', points: 3 },
      { name: 'Zrkadlo', points: 2 },
    ],
  },
  {
    category: 'Kuchyňa',
    tasks: [
      { name: 'Mraznička', points: 2 },
      { name: 'Umývačka', points: 2 },
      { name: 'Linky + stôl', points: 5 },
      { name: 'Skrinky + priečinky', points: 5 },
      { name: 'Poličky', points: 2 },
      { name: 'Mikrovlnka', points: 3 },
    ],
  },
  {
    category: 'Záchod',
    tasks: [
      { name: 'Záchod', points: 5 },
    ],
  },
  {
    category: 'Smetí',
    tasks: [
      { name: 'Smetí', points: 3 },
    ],
  },
];
