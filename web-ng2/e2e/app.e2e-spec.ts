import { WebNg2Page } from './app.po';

describe('web-ng2 App', function() {
  let page: WebNg2Page;

  beforeEach(() => {
    page = new WebNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
