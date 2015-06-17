var Banner = function()  {
    this.c2a = element(by.id('logo'));
    this.banner = element(by.css('.helloUrban'));
    this.bannerBtn = element(by.css('.collapse'));
    this.url = 'http://localhost/test-app-tim-lauter';

    this.hasClass = function (element, cssClass) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cssClass) !== -1;
        });
    };
}

var LocationForm = function() {
    this.input = element(by.model('postData.city'));
    this.submitBtn = element(by.css('.button.postfix'));
    this.output = element(by.id('location'));

    this.submit = function(location) {
        this.input.sendKeys(location);
        this.submitBtn.click();
    }
}

describe('dropdown banner', function() {
    it('should add an open class to helloUrban', function() {
        var banner = new Banner();
        browser.get(banner.url);
        banner.c2a.click();
        expect(banner.hasClass(banner.banner, 'open')).toEqual(true);
    });
});

describe('location input', function() {
    it('submits location', function() {
      var error = 'Ahh shoot, you couldn\'t find you. Try entering your location.';
      var locationForm = new LocationForm();
      locationForm.submit('Austin, TX');

      setTimeout(function() {
          expect(this.output.getText()).toEqual('Austin, TX');
      }, 5000);
    });
});

describe('onload', function() {
    it('provides user location', function() {
        this.output = element(by.id('location'));

        setTimeout(function() {
            expect(this.output.getText()).toEqual(String);
        }, 5000);
    });
});
