define([
    'modules/apiDocumentation/apiDocumentationPage/apiDocumentationModel',
    'text!modules/apiDocumentation/apiDocumentationPage/api-docs.json'
], function (APIDocumentationModel, APIDocs) {
    'use strict';

    beforeEach(function(){
        this.apiDocumentationModel = new APIDocumentationModel(JSON.parse(APIDocs));
    });

    describe('The API documentation model', function () {
        it('should have parsed the JSON API doc and created a resource collection from the resources property', function () {
            expect(this.apiDocumentationModel.resourceCollection).not.to.be.undefined;
        });

        it('should have 5 resources in the resourceCollection property', function () {
            expect(this.apiDocumentationModel.resourceCollection).to.have.length(5);
        });
    });
});

