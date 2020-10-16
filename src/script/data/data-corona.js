class DataCorona {
    static corona() {
        return fetch('https://covid19.mathdro.id/api/countries/indonesia')
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`${keyword} is not found`);
                }
            })
    }

    static coronaByCountry(country) {
        return fetch(`https://covid19.mathdro.id/api/countries/${country}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (!responseJson.error) {
                    return Promise.resolve(responseJson);
                } else {
                    return false;
                }
            })
    }

    static gap(date, con = "Indonesia") {
        return fetch(`https://covid19.mathdro.id/api/daily/${date}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                let now = false;
                if (!responseJson.error) {
                    responseJson.forEach(country => {
                        if (country.countryRegion == con) {
                            console.log(con);

                            now = country;
                        }
                    });
                    return Promise.resolve(now);

                } else {
                    return false;
                }
            })
    }
}

export default DataCorona;