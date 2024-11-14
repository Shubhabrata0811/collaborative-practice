const YMD = "yyyy-mm-dd";
const DMY = "dd-mm-yyyy";
const MDY = "mm-dd-yyyy";

function isValidFormat(format) {
  return format === YMD || format === DMY || format === MDY;
}

function isCorrectDateFormat(format, date) {
  if (date.length !== 10) {
    return false;
  }
  if (format === YMD) {
    return date[4] + date[7] === "--";
  }
  return date[2] + date[5] === "--";
}

function extractValue(string, startIdx, length) {
  let value = string[startIdx] + string[startIdx + 1];
  if (length === 4) {
    value = value + string[startIdx + 2] + string[startIdx + 3];
  }
  return +value;
}

function isDivisible(nominator, denominator) {
  return nominator % denominator === 0;
}

function isLeapYear(year) {
  const divisibleBy400 = isDivisible(year, 400);
  const divisibleBy100 = isDivisible(year, 100);
  const divisibleBy4 = isDivisible(year, 4);

  return divisibleBy400 || (divisibleBy4 && !divisibleBy100);
}

function isWithInRange(value, startRange, endRange) {
  return value >= startRange && value <= endRange;
}

function getDaysInMonth(month, year) {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  if (month < 8) {
    return 30 + (month % 2);
  }
  return 30 + ((month + 1) % 2);
}

function getDateValidationMessage(format, date) {
  let year = extractValue(date, format === YMD ? 0 : 6, 4);
  let month = 0;
  let day = 0;

  if (format === YMD) {
    month = extractValue(date, 5, 2);
    day = extractValue(date, 8, 2);
  } else {
    month = extractValue(date, format === DMY ? 3 : 0, 2);
    day = extractValue(date, format === DMY ? 0 : 3, 2);
  }

  if (!isWithInRange(year, 1, 9999)) {
    return "invalid year";
  }

  if (!isWithInRange(month, 1, 12)) {
    return "invalid month";
  }

  if (!isWithInRange(day, 1, getDaysInMonth(month, year))) {
    return "invalid day";
  }

  return "valid";
}

function validate(format, date) {
  // implement this

  if (!isValidFormat(format)) {
    return "invalid format";
  }
  if (!isCorrectDateFormat(format, date)) {
    return "date not according to format";
  }

  return getDateValidationMessage(format, date);
}

function testValidate(format, date, expected) {
  const result = validate(format, date);
  const resultIndicator = result === expected ? "✅" : "❌";
  console.log(resultIndicator, format, date, expected, result);
}

function testAll() {
  testValidate("xx-yy-zzzz", "01-01-2020", "invalid format");
  testValidate("mm-dd-yyyy", "01 01 2020", "date not according to format");
  testValidate("mm-dd-yyyy", "01-01-0000", "invalid year");
  testValidate("mm-dd-yyyy", "13-01-0001", "invalid month");
  testValidate("mm-dd-yyyy", "01-60-0001", "invalid day");
  testValidate("dd-mm-yyyy", "0*-01-2020", "invalid day");
  testValidate("xx-yy-zzzz", "01-01-2020", "invalid format");
  testValidate("mm=dd=yyyy", "01-01-2020", "invalid format");
  testValidate("mm-dd-yyyy", "01 01 2020", "date not according to format");
  testValidate("mm-dd-yyyy", "01-01-20200", "date not according to format");
  testValidate("mm-dd-yyyy", "01-01-0000", "invalid year");
  testValidate("mm-dd-yyyy", "13-01-0001", "invalid month");
  testValidate("mm-dd-yyyy", "01-60-0001", "invalid day");
  testValidate("mm-dd-yyyy", "02-29-0005", "invalid day");
  testValidate("mm-dd-yyyy", "02-29-0004", "valid");
  testValidate("mm-dd-yyyy", "02-29-0100", "invalid day");
  testValidate("mm-dd-yyyy", "02-29-1900", "invalid day");
  testValidate("mm-dd-yyyy", "02-29-2000", "valid");
  testValidate("mm-dd-yyyy", "04-31-0001", "invalid day");
  testValidate("mm-dd-yyyy", "02-31-0001", "invalid day");
  testValidate("mm-dd-yyyy", "03-31-0001", "valid");
  testValidate("mm-dd-yyyy", "04-30-0001", "valid");
  testValidate("dd-mm-yyyy", "01-01-2020", "valid");
  testValidate("dd-mm-yyyy", "31-01-2020", "valid");
  testValidate("dd-mm-yyyy", "32-01-2020", "invalid day");
  testValidate("dd=mm=yyyy", "01-01-2020", "invalid format");
  testValidate("dd-mm-yyyy", "01 01 2020", "date not according to format");
  testValidate("dd-mm-yyyy", "01-01-20200", "date not according to format");
  testValidate("dd-mm-yyyy", "01-01-0000", "invalid year");
  testValidate("dd-mm-yyyy", "01-13-0001", "invalid month");
  testValidate("dd-mm-yyyy", "01-01-6000", "valid");
  testValidate("dd-mm-yyyy", "29-02-0005", "invalid day");
  testValidate("dd-mm-yyyy", "29-02-0004", "valid");
  testValidate("dd-mm-yyyy", "29-02-0100", "invalid day");
  testValidate("dd-mm-yyyy", "29-02-1900", "invalid day");
  testValidate("dd-mm-yyyy", "29-02-2000", "valid");
  testValidate("dd-mm-yyyy", "31-04-0001", "invalid day");
  testValidate("dd-mm-yyyy", "31-02-0001", "invalid day");
  testValidate("dd-mm-yyyy", "31-03-0001", "valid");
  testValidate("dd-mm-yyyy", "30-04-0001", "valid");
  testValidate("yyyy=mm=dd", "2020-01-01", "invalid format");
  testValidate("yyyy-mm-dd", "2020 01 01", "date not according to format");
  testValidate("yyyy-mm-dd", "20200-01-01", "date not according to format");
  testValidate("yyyy-mm-dd", "0000-01-01", "invalid year");
  testValidate("yyyy-mm-dd", "0001-13-01", "invalid month");
  testValidate("yyyy-mm-dd", "0001-01-01", "valid");
  testValidate("yyyy-mm-dd", "0005-02-29", "invalid day");
  testValidate("yyyy-mm-dd", "0004-02-29", "valid");
  testValidate("yyyy-mm-dd", "0100-02-29", "invalid day");
  testValidate("yyyy-mm-dd", "1900-02-29", "invalid day");
  testValidate("yyyy-mm-dd", "2000-02-29", "valid");
  testValidate("yyyy-mm-dd", "0001-04-31", "invalid day");
  testValidate("yyyy-mm-dd", "0001-02-31", "invalid day");
  testValidate("yyyy-mm-dd", "0001-03-31", "valid");
  testValidate("yyyy-mm-dd", "0001-04-30", "valid");
  testValidate("yyyy-mm-dd", "0001-04-*0", "invalid day");
}

testAll();
