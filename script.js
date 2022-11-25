// getting all countries
async function getCountries() {
    try {
        var response = await fetch('https://covid19.mathdro.id/api/countries');
        response = await response.json();
        response = response.countries.map(ele => ele.name);
        // console.log(response);
        await setOptionsForCountry(response)
        await fetchDatas()
    } catch (error) {
        throw (error)
    }
}
getCountries()

// adding options in country
function setOptionsForCountry(arr) {
    let select = document.getElementById('byCountry')
    arr.map((ele) => {
        let option = document.createElement("option");
        option.value = ele;
        option.text = ele;
        select.add(option);
    })
}

function createHeader() {
    var thead = document.getElementById('thead');
    thead.innerHTML = `
    <tr>
        <th scope="col">#</th>
        <th scope="col">State</th>
        <th scope="col">Confirmed</th>
        <th scope="col">Active</th>
        <th scope="col">Death</th>
        <th scope="col">Cases in last 28 days</th>
        <th scope="col">Death in last 28 days</th>
        <th scope="col">Country</th>
    </tr>`
}

function createBoy(response) {
    var tbody = document.getElementById('tbody');
    tbody.innerHTML = "";
    response.map((res, index) => {
        var newRow = tbody.insertRow(index);
        newRow.insertCell(0).innerText = index + 1;
        newRow.insertCell(1).innerHTML = res.provinceState;
        newRow.insertCell(2).innerHTML = res.confirmed;
        newRow.insertCell(3).innerHTML = res.active;
        newRow.insertCell(4).innerHTML = res.deaths;
        newRow.insertCell(5).innerHTML = res.cases28Days;
        newRow.insertCell(6).innerHTML = res.deaths28Days;
        newRow.insertCell(7).innerHTML = res.countryRegion;
    })
}

// listening change of country and trigger fetch
document.getElementById('byCountry').addEventListener('change', () => fetchDatas())

async function fetchDatas() {

    let selectedCountry = document.getElementById('byCountry').value;

    try {
        var response = await fetch(`https://covid19.mathdro.id/api/countries/${selectedCountry}/confirmed`);
        response = await response.json();
        // console.log(response);
        await createHeader()
        await createBoy(response)
    } catch (error) {
        throw (error)
    }
}