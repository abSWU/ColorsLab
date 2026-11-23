
const fs = require('fs');
const vm = require('vm');
const path = require('path');

test('addColor sends the correct color and user ID', () => {
  const elements = {
    colorText: { value: 'Blue' },
    colorAddResult: { innerHTML: '' }
  };

  const xhr = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    send: jest.fn()
  };

  const context = {
    document: {
      getElementById: id => elements[id]
    },
    XMLHttpRequest: jest.fn(() => xhr)
  };

  vm.createContext(context);

  const code = fs.readFileSync(
    path.join(__dirname, '../js/code.js'),
    'utf8'
  );

  vm.runInContext(code, context);
  vm.runInContext('userId = 5; addColor();', context);

  expect(xhr.open).toHaveBeenCalledWith(
    'POST',
    'http://COP4331-67.live/LAMPAPI/AddColor.php',
    true
  );

  expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({
    color: 'Blue',
    userId: 5
  });
});