const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getFormattedTime = (time) => {
  const date = new Date(time);
  const text =
    `Joined ${date.getUTCDate()} ` +
    `${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;

  return text;
};

export default getFormattedTime;
