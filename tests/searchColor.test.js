
const fs = require('fs');
const vm = require('vm');
const path = require('path');

test('searchColor displays colors from an API response', () => {
  const elements = {
    searchText: { value: 'Blue' },
    colorSearchResult: { innerHTML: '' }
  };

  const paragraph = { innerHTML: '' };

  const xhr = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    send: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: JSON.stringify({
      results: ['Blue', 'Light Blue'],
      error: ''
    })
  };

  const context = {
    document: {
      getElementById: id => elements[id],
      getElementsByTagName: () => [paragraph]
    },
    XMLHttpRequest: jest.fn(() => xhr)
  };

  vm.createContext(context);

  const code = fs.readFileSync(
    path.join(__dirname, '../js/code.js'),
    'utf8'
  );

  vm.runInContext(code, context);
  vm.runInContext('userId = 5; searchColor();', context);

  expect(xhr.open).toHaveBeenCalledWith(
    'POST',
    'http://COP4331-67.live/LAMPAPI/SearchColors.php',
    true
  );

  expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({
    search: 'Blue',
    userId: 5
  });

  xhr.onreadystatechange();

  expect(elements.colorSearchResult.innerHTML)
    .toBe('Color(s) has been retrieved');

  expect(paragraph.innerHTML)
    .toContain('Blue');

  expect(paragraph.innerHTML)
    .toContain('Light Blue');
});