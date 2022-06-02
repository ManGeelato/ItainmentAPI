const expect = require('chai');
const axios = require('axios');

it("Successfully fetched data from itunes api", () => {
    return axios.get("https://itunes.apple.com/search?term=jack+jackson&media=music").then((response) => {
        let itunesData = response.data;

        expect(itunesData.results[0]).to.have.property('artistName')
        expect(typeof response).to.equal('object')
    });
});

