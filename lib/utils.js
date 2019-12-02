const todayCount = data => {
  // Reverse the array.
  data.reverse();
  // Get the day number from the last element of the array.
  const day = data[0].day;
  const todayArray = [];

  for (const item of data) {
    if (item.day !== day) {
      break;
    } else {
      todayArray.push(item);
    }
  }
  data.reverse();

  return todayArray.reverse();
};

const yesterdayCount = data => {
  // Reverse the array.
  data.reverse();
  console.log(data);
  // Get the numbers relating to today and yesterday.
  const today = data[0].day;
  let yesterday = today - 1;
  if (yesterday === -1) {
    yesterday = 6;
  }
  const yesterdayArray = [];

  // Skip over all of today's entries.
  let i = 1;
  while (i < data.length && data[i].day === today) {
    i++;
  }

  // Get yesterday's entries.
  while (i < data.length) {
    console.log(data[i]);
    if (yesterday === 0) {
      if (data[i].day === 6) {
        break;
      }
    } else if (data[i].day < yesterday) {
      break;
    }
    yesterdayArray.push(data[i]);
    i++;
  }

  data.reverse();

  return yesterdayArray.reverse();
};

module.exports = { todayCount, yesterdayCount };
