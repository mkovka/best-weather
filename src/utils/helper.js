function compare(a, b) {
  if (a.place < b.place) {
    return -1;
  }
  if (a.place > b.place) {
    return 1;
  }
  return 0;
}

export function makeRange(obgArr, temp, humidity) {
  const resArr = [];
  if (obgArr) {
    obgArr.forEach(item => {
      const placeTemp = Math.round(Math.abs(item.main.temp - temp));
      const placeHum = Math.round(Math.abs(item.main.humidity - humidity));
      const place = placeTemp + Math.round(placeHum/4);
      resArr.push({ ...item, place });
    });
  }
  return resArr.sort(compare);
}
