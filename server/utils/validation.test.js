const expect = require('expect');
const {isRealString} = require('./validation');


describe('isRealString', () => {
  it('should reject non-string value', () => {
    var string = 1234;
    expect(isRealString(string)).toBe(false);
  });

  it('should reject string with only space', () => {
    var string = '     ';
    expect(isRealString(string)).toBe(false);
  });

  it('should allow string with non-space character', () => {
    var string = "  benjamin   ";
    expect(isRealString(string)).toBe(true);
  });
});
