var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate a correct message object', () => {
    var from = 'benjamin';
    var text = 'hello';
    var message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
  })
});
