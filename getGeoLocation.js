
import { CurrentPosition } from './CurrentPosition';

export const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    CurrentPosition()
      .then((resLocation) => {
        if (resLocation.code === 0) {
          resolve(resLocation)
        } else if (resLocation.code === 1 || resLocation.code === 5) {
          reject(resLocation.msg);
        } else {
          console.log('CurrentPosition 실패 : ', resLocation.msg);
          alert('CurrentPosition : ' + err);
          reject(resLocation.msg);
        }
      })
      .catch((err) => {
        console.log('CurrentPosition catch : ', err);
        alert('CurrentPosition : ' + err);
        reject(err);
      });
  });
};