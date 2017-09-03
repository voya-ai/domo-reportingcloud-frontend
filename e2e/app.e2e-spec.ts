import { VoyaReportingFrontendPage } from './app.po';

describe('voya-reporting-frontend App', () => {
  let page: VoyaReportingFrontendPage;

  beforeEach(() => {
    page = new VoyaReportingFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
