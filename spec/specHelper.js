export function createTestContainer() {
  const testContainer = document.createElement('div');
  testContainer.setAttribute('id', 'test-container');
  testContainer.setAttribute('style', "border: 2px solid red");
  document.body.appendChild(testContainer);

  return document.getElementById('test-container')
}

export function tearDownTestContainer() {
  const testContainer = document.getElementById('test-container');
  testContainer.parentNode.removeChild(testContainer);
}
