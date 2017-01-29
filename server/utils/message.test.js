var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate a correct message object', () => {
    var from = 'benjamin';
    var text = 'hello';
    var message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate a correct location object', () => {
    var from = 'benjamin';
    var latitude = '32.8797585';
    var longitude = '-117.2359593';
    var message = generateLocationMessage(from, latitude, longitude);
    expect(message.from).toBe(from);
    expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    expect(message.createdAt).toBeA('number');
  });
});
