const DMY = "dd-mm-yyyy";
const MDY = "mm-dd-yyyy";
const YMD = "yyyy-mm-dd";
const HYPHEN = "-";
const SPACE = " ";
const EMPTY_STRING = "";

function isNumberInInclusiveRange(number, start, end) {
  return number >= start && number <= end; 
}

function getSubString(string, from, length) {
  const end = from + length;
  let subString = "";

  for (let index = from; index < end; index++) {
    subString += string[index];
  }

  return subString;
}

function isSubStringPresent(string, subString, index) {
  const subStringCandidate = getSubString(string, index, subString.length);
  return subString === subStringCandidate;
}

function occurrences(string, substring) {
  let occurenceCount = 0;

  const isSubStringBigger = substring.length > string.length;
  const isSubStringEmpty = substring === '';
  if (isSubStringEmpty || isSubStringBigger) {
    return occurenceCount;
  }

  const end = string.length - substring.length;
  for (let index = 0; index <= end; index++) {
    if (isSubStringPresent(string, substring, index)) {
      occurenceCount++;
    }
  }

  return occurenceCount;
}

function findIndex(text, target) {
  for (let index = 0; index < text.length; index++) {
    if (text[index] === target) {
      return index;
    }
  }

  return -1;
}

function isDateValidToFormat(format, date) {
  const isHyphenNumberTwo = occurrences(date, HYPHEN) === 2;
  const isSpacePresent = occurrences(date, SPACE) > 0;

  if (date.length !== 10 || !isHyphenNumberTwo || isSpacePresent) {
    return false;
  }

  const hyphenIndex = findIndex(format, HYPHEN);
  const isHyphen1AtCorrectIndex = date[hyphenIndex] === HYPHEN;
  const isHyphen2AtCorrectIndex = date[hyphenIndex + 3] === HYPHEN;

  return  isHyphen1AtCorrectIndex && isHyphen2AtCorrectIndex;
}

function cutDateAccordingToFormat(format, date, character, length) { 
  const start = findIndex(format, character);
  const stringValue = getSubString(date, start, length);
  
  return +stringValue;
}

function isFormatValid(format) {
  return format === DMY || format === MDY || format === YMD;
}

function isDivisible(dividend, divisor) {
  return dividend % divisor === 0;
}

function isLeapYear(year) {
  if (isDivisible(year, 400)) {
    return true;
  }

  return isDivisible(year, 4) && !isDivisible(year, 100);
}

function getMaxDay(year, month) {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }

  const has30Days = month === 4 || month === 6 || month === 9 || month === 11;
  return has30Days ? 30 : 31;
}

function isDayValid(year, month, day) {  
  if (!isNumberInInclusiveRange(day, 1, 31)) {
    return false;
  }

  const maxDay = getMaxDay(year, month);
  return isNumberInInclusiveRange(day, 1, maxDay);
}

function validateDates(year, month, day) {
  if (!isNumberInInclusiveRange(year, 1, 9999)) {
    return 'invalid year';
  }

  if (!isNumberInInclusiveRange(month, 1, 12)) {
    return 'invalid month';
  }

  if (!isDayValid(year, month, day)) {
    return 'invalid day';
  }

  return 'valid';
}

// main function
function validate(format, date) {
  if (!isFormatValid(format)) {
    return 'invalid format';
  }

  if (!isDateValidToFormat(format, date)) {
    return 'date not according to format';
  }

  const year = cutDateAccordingToFormat(format, date, "y", 4);
  const month = cutDateAccordingToFormat(format, date, "m", 2);
  const day = cutDateAccordingToFormat(format, date, "d", 2);

  return validateDates(year, month, day);
}

function testValidate(format, date, expected) {
  const result = validate(format, date);
  console.log(result === expected ? '✅' : '❌', format, date, expected, result);
}

function testInvalidFormat() {
  testValidate('dd-mm-mmmm', '01-01-2020', 'invalid format');
  testValidate('yy-dd-mmmm', '01-01-2020', 'invalid format');
  testValidate('mm-yy-dddd', '01-01-2020', 'invalid format');
  testValidate('dd-dd-dddd', '01-01-2020', 'invalid format');
}

function testDateIsNotAccordingToFormat() {
  testValidate('dd-mm-yyyy', '11-11-111', 'date not according to format');
  testValidate('dd-mm-yyyy', '1111-11-11', 'date not according to format');
  testValidate('dd-mm-yyyy', '11-1-1111', 'date not according to format');
  testValidate('dd-mm-yyyy', '1-11-1111', 'date not according to format');
  testValidate('yyyy-mm-dd', '1111-11-1', 'date not according to format');
  testValidate('yyyy-mm-dd', '1111-1-11', 'date not according to format');
  testValidate('yyyy-mm-dd', '11111-1-11', 'date not according to format');
  testValidate('yyyy-mm-dd', '11-11- 111', 'date not according to format');
  testValidate('yyyy-mm-dd', '----------', 'date not according to format');
  testValidate('mm-dd-yyyy', '11-11- 224', 'date not according to format');
  testValidate('yyyy-mm-dd', 'yyyy- 1- 1', 'date not according to format');
  testValidate('yyyy-mm-dd', 'yyyy-a  1-a1', 'date not according to format');
}

function testInvalidYear() {
  testValidate('yyyy-mm-dd', '0000-11-11', 'invalid year');
  testValidate('yyyy-mm-dd', 'tada-11-11', 'invalid year');
  testValidate('dd-mm-yyyy', '11-11-0000', 'invalid year');
  testValidate('dd-mm-yyyy', '11-11-tasa', 'invalid year');
  testValidate('dd-mm-yyyy', '11-11-yyyy', 'invalid year');
  testValidate('mm-dd-yyyy', '11-11-0000', 'invalid year');
  testValidate('mm-dd-yyyy', '11-11-tasa', 'invalid year');
  testValidate('mm-dd-yyyy', '11-11-yyyy', 'invalid year');
}

function testInvalidMonth() {
  testValidate('yyyy-mm-dd', '0001-00-01', 'invalid month');
  testValidate('yyyy-mm-dd', '0001-13-01', 'invalid month');
  testValidate('yyyy-mm-dd', '0001-1a-01', 'invalid month');
  testValidate('yyyy-mm-dd', '0001-aa-01', 'invalid month');
  testValidate('mm-dd-yyyy', '00-01-0001', 'invalid month');
  testValidate('mm-dd-yyyy', '13-01-0001', 'invalid month');
  testValidate('mm-dd-yyyy', '1a-01-0001', 'invalid month');
  testValidate('mm-dd-yyyy', 'aa-01-0001', 'invalid month');
  testValidate('dd-mm-yyyy', '01-00-0001', 'invalid month');
  testValidate('dd-mm-yyyy', '01-13-0001', 'invalid month');
  testValidate('dd-mm-yyyy', '01-1a-0001', 'invalid month');
  testValidate('dd-mm-yyyy', '01-aa-0001', 'invalid month');
}

function testInvalidDay() {
  testValidate('dd-mm-yyyy', '29-02-2023', 'invalid day');
  testValidate('dd-mm-yyyy', '30-02-2023', 'invalid day');
  testValidate('dd-mm-yyyy', '32-09-2023', 'invalid day');
  testValidate('dd-mm-yyyy', '31-04-2023', 'invalid day');
  testValidate('dd-mm-yyyy', '31-11-2023', 'invalid day');

  testValidate('mm-dd-yyyy', '02-29-2023', 'invalid day');
  testValidate('mm-dd-yyyy', '02-30-2023', 'invalid day');
  testValidate('mm-dd-yyyy', '09-32-2023', 'invalid day');
  testValidate('mm-dd-yyyy', '04-31-2023', 'invalid day');
  testValidate('mm-dd-yyyy', '11-31-2023', 'invalid day');

  testValidate('yyyy-mm-dd', '2023-02-29', 'invalid day');
  testValidate('yyyy-mm-dd', '2023-02-30', 'invalid day');
  testValidate('yyyy-mm-dd', '2023-09-32', 'invalid day');
  testValidate('yyyy-mm-dd', '2023-04-31', 'invalid day');
  testValidate('yyyy-mm-dd', '2023-11-31', 'invalid day');
}

function testAllValidCases() {
  testValidate('yyyy-mm-dd', '2023-11-30', 'valid');
  testValidate('yyyy-mm-dd', '2023-12-31', 'valid');
  testValidate('yyyy-mm-dd', '2024-02-29', 'valid');
  testValidate('yyyy-mm-dd', '1900-02-28', 'valid');
  testValidate('yyyy-mm-dd', '1900-02-28', 'valid');
  testValidate('yyyy-mm-dd', '0001-01-01', 'valid');

  testValidate('dd-mm-yyyy', '30-11-2023', 'valid');
  testValidate('dd-mm-yyyy', '31-12-2023', 'valid');
  testValidate('dd-mm-yyyy', '29-02-2024', 'valid');
  testValidate('dd-mm-yyyy', '28-02-1900', 'valid');
  testValidate('dd-mm-yyyy', '28-02-1900', 'valid');
  testValidate('dd-mm-yyyy', '01-01-0001', 'valid');

  testValidate('mm-dd-yyyy', '11-30-2023', 'valid');
  testValidate('mm-dd-yyyy', '12-31-2023', 'valid');
  testValidate('mm-dd-yyyy', '02-29-2024', 'valid');
  testValidate('mm-dd-yyyy', '02-28-1900', 'valid');
  testValidate('mm-dd-yyyy', '02-28-1900', 'valid');
  testValidate('mm-dd-yyyy', '01-01-0001', 'valid');
}

function testAll() {
  console.log("..........Testing Starts............")
  testInvalidFormat();
  testDateIsNotAccordingToFormat()
  testInvalidMonth();
  testInvalidDay();
  testAllValidCases();
  testInvalidYear();
}

testAll();
