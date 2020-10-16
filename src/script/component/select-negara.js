import Datanegara from '../data/data-negara.js';

class Selectnegara extends HTMLElement {

    connectedCallback() {
        const result = Datanegara.negara();
        this.render(result);
    }

    set changeEvent(event) {
        this._changeEvent = event;
        this.querySelector("#country").addEventListener("change", this._changeEvent);
    }

    get value() {
        return this.querySelector("#country").value;
    }

    render(negara) {
        let formTop = `<div class="row" id="sect-detail">
        <div class="col-md-12">
            <nav class="navbar navbar-light" data-aos="fade-up">
                <form class="form-inline">
                    <select class="custom-select" id="country">
                        <option selected value="Indonesia">Indonesia</option>`;

        let formBottom = `
                                </select>
                            </form>
                        </nav>
                    </div>
                </div>
        `;

        negara.forEach(ng => {
            formTop = formTop + `<option class="opsi" value="${ng.name}">${ng.name}</option>`;
        });

        this.innerHTML = formTop + formBottom;
    }
}
customElements.define("select-negara", Selectnegara);