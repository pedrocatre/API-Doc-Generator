define([
    'modules/apiDocumentation/apiDocumentationPage/apiDocumentationPageView',
    'backboneWreqr',
    'modules/common/appUtils'
], function (APIDocumentationPageView) {
    'use strict';

    beforeEach(function() {
        this.apiDocumentationPageView  = new APIDocumentationPageView({
            resourceId: 'Contracts'
        });
    });

    afterEach(function() {
    });

    describe('The page view', function () {
        it('should have a resource id with the value contracts', function () {
            expect(this.apiDocumentationPageView.resourceId).to.equal('Contracts');
        });
    });
});
