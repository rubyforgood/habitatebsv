import {hideLoader, handleClickButton, findSiteFromInput} from './index.js'
import {createTestContainer, tearDownTestContainer} from "./specHelper.js";

describe('index.js', () => {
  let testContainer;

  beforeEach(() => {
    testContainer = createTestContainer();
  });

  afterEach(() => {
    tearDownTestContainer();
  });

  describe('#hideLoader()', () => {
    it('finds the loader adds the hide class', () => {
      const loader = document.createElement('div');
      loader.setAttribute('class', 'loading');
      testContainer.appendChild(loader);

      hideLoader();

      const actual = document.querySelector('.loading');
      expect(actual.className).toContain('hide');
    });
  });

  describe('#handleClickButton()', () => {
    describe('when site is not found', () => {
      it('adds visible class to alert', () => {
        const data = [];
        const container = document.createElement('div');
        container.innerHTML = '<div class="alert"></div>' +
            '<input id="site-code-input" type="tel" value="1"/>' +
            '<input type="submit" name="submit" id="submit-button"/>';
        testContainer.appendChild(container);

        jasmine.clock().install();
        handleClickButton(new Event('click'), data);
        jasmine.clock().tick(50);

        const actual = document.querySelector('.alert');
        expect(actual.className).toContain('visible');
      });
    });

    describe('when site is found', () => {
      it('redirects to the site url', () => {
        const data = [
          {code: '1', url: 'something'}
        ];
        const container = document.createElement('div');
        container.innerHTML = '<div class="alert"></div>' +
            '<input id="site-code-input" type="tel" value="1"/>' +
            '<input type="submit" name="submit" id="submit-button"/>';
        testContainer.appendChild(container);


        const redirectSpy = jasmine.createSpy();
        handleClickButton(new Event('click'), data, redirectSpy);

        expect(redirectSpy).toHaveBeenCalled();
      });
    });
  });

  describe('#findSiteFromInput()', () => {
    it('returns site when site code from input exists in lookup data', () => {
      const data = [
        {code: '1234', url: 'something.com'}
      ];
      const input = {value: '1234'};

      expect(findSiteFromInput(data, input)).toEqual(data[0]);
    });

    it('returns undefined when site code from input does not exist in lookup data', () => {
      const data = [
        {code: '1234', url: 'something.com'}
      ];
      const input = {value: '1111'};

      expect(findSiteFromInput(data, input)).toEqual(undefined);
    });
  });
});
