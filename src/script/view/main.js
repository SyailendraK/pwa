import DataCorona from '../data/data-corona.js';
import '../component/select-negara.js';
import moment from "moment";

const main = () => {
    const selectElement = document.querySelector("select-negara");
    const caseNumber = document.querySelector("#data-case");
    const recoveredNumber = document.querySelector("#data-recovered");
    const deathNumber = document.querySelector("#data-death");
    const activeNumber = document.querySelector("#data-active");
    const updateDate = document.querySelectorAll(".update");

    const onLoad = async () => {
        try {
            const result = await DataCorona.corona();
            const gap = await DataCorona.gap(moment().subtract(2, 'days').format("M-D-YYYY"));
            renderResult(result, gap);
        } catch (message) {
            fallbackResult(message)
        }
    };

    const onButtonSelectChanged = async () => {
        try {
            const result = await DataCorona.coronaByCountry(selectElement.value);
            const gap = await DataCorona.gap(moment().subtract(2, 'days').format("M-D-YYYY"), selectElement.value);
            renderResult(result, gap);
        } catch (message) {
            fallbackResult(message)
        }
    };

    selectElement.changeEvent = onButtonSelectChanged;

    const renderResult = (results, gap) => {
        if (results) {
            let confirmed = results.confirmed.value;
            let recovered = results.recovered.value
            let deaths = results.deaths.value;
            let gapConfirmed = gap.confirmed;
            let gapRecovered = gap.recovered;
            let gapDeaths = gap.deaths;
            let activeToday = confirmed - recovered - deaths;
            let activeYesterday = gapConfirmed - gapRecovered - gapDeaths;


            caseNumber.innerHTML = confirmed + `<sup>+${confirmed - gapConfirmed}</sup>`;
            recoveredNumber.innerHTML = recovered + `<sup>+${recovered - gapRecovered}</sup>`;
            deathNumber.innerHTML = deaths + `<sup>+${deaths - gapDeaths}</sup>`;

            if (activeToday - activeYesterday >= 0) {
                activeNumber.innerHTML = activeToday + `<sup>+${activeToday - activeYesterday}</sup>`;
            } else {
                activeNumber.innerHTML = activeToday + `<sup>${activeToday - activeYesterday}</sup>`;
            }

            updateDate.forEach(update => {
                update.innerHTML = 'Terakhir diupdate pada : ' +
                    results.lastUpdate.split("T")[0].split("-").reverse().join("-");
            });
        } else {
            caseNumber.innerHTML = "Data tidak ditemukan";
            recoveredNumber.innerHTML = "Data tidak ditemukan";
            deathNumber.innerHTML = "Data tidak ditemukan";
            activeNumber.innerHTML = "Data tidak ditemukan";
        }
    };

    const fallbackResult = message => {
        console.log(message);
    };

    onLoad();

};

export default main;