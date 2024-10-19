export default function replaceServerDates(obj:object) {
    if (obj instanceof Array) {
      for (let i = 0; i < obj.length; i++) {
        replaceServerDates(obj[i]);
      }
    } else if (typeof obj === 'object' && obj !== null) {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (obj[prop] === 'SERVERDATE') {
            obj[prop] = new Date();
          } else {
            replaceServerDates(obj[prop]);
          }
        }
      }
    }
  }