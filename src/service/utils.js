
export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateExp(exp) {
  let arrayString = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/'];
  let same = false; let other = false; let separator = false;
  for (let i = 0; i < exp.length; i++) {
    same = false;
    for (let j = 0; j < arrayString.length; j++) {
      if (exp[i] == '/') {
        separator = true;
      }

      if (exp[i] == arrayString[j]) {
        same = true
        break;
      }
    }
    if (same == true) {
      continue;
    }

    if (same == false) {
      other = true;
      break;
    }
  }

  if (other == true) {
    return false
  }
  
  let dateArray = exp.split('/');

  if (parseInt(dateArray[0]) < 1 || parseInt(dateArray[0]) > 12) {
    return false;
  }

  if (separator == false) {
    return false;
  } else {
    if (dateArray[1].length != 4) {
      return false;
    }
  }

  return true;
}

export const validateCardNum = (number) => {
  return /^(?=.*\d)[\d ]+$/.test(number);
}