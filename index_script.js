let accommodations = [{
  "Name": "test1",
  "Country": "Germany",
  "Region": "Berlin",
  "AdditionalLocationInformation": "",
  "SmallImageLink": "https://cf.bstatic.com/xdata/images/hotel/square200/346273890.webp?k=31cfcf34684b3a8e63c1a40afab3fbc4852ebef6fdac2543a61d851696317275&o=&s=1",
  "MaxPersonCount": 10,
  "TotalPrice": 1000
}
,
{
  "Name": "Ferienhaus Apfelblüte by Heinke Wohnraum",
  "Country": "Deutschland",
  "Region": "Baden-Württemberg",
  "AdditionalLocationInformation": "in der Nähe vom Bodensee",
  "Address": "7 Azenbergstraße, 88677 Markdorf",
  "TravelTime": 3.5,
  "TravelDescription": "Naja halt da lang und dann dort.",
  "MaxPersonCount": 13,
  "Rooms": [
    {
      "SingleBeds": 1,
      "DoubleBeds": 2,
      "SofaBeds": 0
    },
    {
      "SingleBeds": 0,
      "DoubleBeds": 1,
      "SofaBeds": 0
    },
    {
      "SingleBeds": 3,
      "DoubleBeds": 1,
      "SofaBeds": 0
    }
  ],
  "TimeSpan": "3.6. - 7.6.2024",
  "TotalPrice": 3984,
  "SmallImageLink": "https://cf.bstatic.com/xdata/images/hotel/square200/346273890.webp?k=31cfcf34684b3a8e63c1a40afab3fbc4852ebef6fdac2543a61d851696317275&o=&s=1",
  "Images": [
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/346273890.jpg?k=14261375253169a3e134482beddbd4282ef534bea5ef27151b21ada20fc6c593&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/346273860.jpg?k=74f027984cbb340772de64e7466ccedd9be695198b2cc4fb58489b1f74f7cc20&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/340097205.jpg?k=c963c7d17d3bf6ed994e78bc0aadef9a586ab186c7a915ef6f1300efe7e2d614&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/346273884.jpg?k=dfb32e6ed099a8076579ca32bb4ec446ed1d787a0a45a7911185536c3f1309dd&o=&hp=1"
  ],
  "InformationDate": "15.4.2023",
  "BookingComLink": "https://www.booking.com/Share-dWOpjU"
},
{
  "Name": "test2",
  "Country": "Germany",
  "Region": "Dresden",
  "AdditionalLocationInformation": "",
  "SmallImageLink": "https://cf.bstatic.com/xdata/images/hotel/square200/153806432.webp?k=055aadf3fea1e5f932b69bcea59c55b53ceb8bb7fea3d20f87607bd981823272&o=&s=1",
  "MaxPersonCount": 15,
  "TotalPrice": 2000
}
,
];

const preset = "<div class=\"accommodation-container\">     <img src=\"SmallImageLink\" width=\"200px\" height=\"200px\">     <div class=\"accommodation-info-div\">         <p class=\"accommodation-name\">Name</p>         <p class=\"accommodation-location\">Country, Region AdditionalLocationInformation</p>         <p class=\"accommodation-capacity\">MaxPersonCount Personen</p>     </div>     <div class=\"accommodation-right-div\">         <div class=\"accommodation-new-label-div\">             <p class=\"accommodation-new-label\">NEU</p>         </div>         <table class=\"accommodation-pricing-table\">             <tr>                 <td class=\"accommodation-pricingInfo\">Total: </td>                 <td class=\"accommodation-totalPrice\">TotalPrice€</td>             </tr>             <tr>                 <td class=\"accommodation-pricingInfo\">Pro Person (bei MaxPersonCount Pers.): </td>                 <td class=\"accommodation-perPersonPricing\">PerPersonPrice€</td>             </tr>         </table>     </div> </div>";

let selected_countries = [];
let selected_regions = [];
let filter_new = false;

accommodations = accommodations.sort((a, b) => a['Name'].localeCompare(b['Name']));

generateContent();

const country_filter_options = document.getElementById("country-filter").children;
for (let option of country_filter_options) {
    option.addEventListener("click", function () {
        if (option.className.includes('selected')) {
            option.className = option.className.replaceAll('selected', '');
            selected_countries.splice(selected_countries.indexOf(option.innerHTML), 1);
        } else {
            option.className += ' selected';
            selected_countries.push(option.innerHTML);
        }
        updateRegionSelection();
    });
}

const region_filter_options = document.getElementById('region-filter').children;

for (let regionFilterOption of region_filter_options) {
    regionFilterOption.addEventListener("click", function () {
        if (regionFilterOption.className.includes('selected')) {
            regionFilterOption.className = regionFilterOption.className.replaceAll('selected', '');
            selected_regions.splice(selected_regions.indexOf(regionFilterOption.innerHTML), 1);
        } else {
            regionFilterOption.className += ' selected';
            selected_regions.push(regionFilterOption.innerHTML);
        }

        generateContent();
    });
}

const new_filter = document.getElementById('new-filter');
new_filter.addEventListener("click", function () {
    if (new_filter.className.includes('selected')) {
        new_filter.className = new_filter.className.replaceAll('selected', '');
        filter_new = false;
    } else {
        new_filter.className += ' selected';
        filter_new = true;
    }

    generateContent();
});

function updateRegionSelection() {
    for (let regionFilterOption of region_filter_options) {
        if (selected_countries.length === 0 || selected_countries.includes(regionFilterOption.className))
            regionFilterOption.style.display = 'block';
        else {
            regionFilterOption.style.display = 'none';
            if (regionFilterOption.className.includes('selected')) {
                regionFilterOption.className = regionFilterOption.className.replaceAll('selected', '');
                selected_regions.splice(selected_regions.indexOf(regionFilterOption.innerHTML), 1);
            }
        }
    }

    generateContent();
}


function generateContent() {
    let content = [];

    for (let data of accommodations) {

        if (selected_countries.length > 0 && !selected_countries.includes(data['Country'])
            || selected_regions.length > 0 && !selected_regions.includes(data['Region'])) continue;

        const accommodations_seen = getCookie('AccommodationsSeen');
        const seen = accommodations_seen.split(',').includes(SafeName(data['Name']));

        if (filter_new && seen) continue;

        let presetCopy = preset;
        for (let key in data) {
            presetCopy = presetCopy.replaceAll(key, data[key]);
        }
        if (seen)
            presetCopy = presetCopy.replaceAll('<div class="accommodation-new-label-div">',
                '<div class="accommodation-new-label-div" style="display: none">')

        content.push([seen, presetCopy.replaceAll("PerPersonPrice", Math.round(data["TotalPrice"] / data["MaxPersonCount"]).toString())]);
    }
    
    function cmp(a, b) {
        if(a[0] && !b[0])
            return -1;
        if(!a[0] && b[0])
            return 1;
        else return 0;
    }

    content = content.sort(cmp);
    document.getElementById("accommodations-div").innerHTML = content.map(value => value[1]).join('');

    const all = document.getElementsByClassName("accommodation-container");
    for (let e of all) {
        e.addEventListener("click", function () {
            const safe_name = SafeName(e.getElementsByClassName("accommodation-name")[0].innerHTML);

            const accommodations_seen = getCookie('AccommodationsSeen');
            if (!accommodations_seen.split(',').includes(safe_name)) {
                let expiration_date = new Date();
                expiration_date.setFullYear(expiration_date.getFullYear() + 5);
                if (accommodations_seen === '')
                    document.cookie = "AccommodationsSeen=" + safe_name + '; path=/; expires=' + expiration_date.toUTCString();
                else
                    document.cookie = "AccommodationsSeen=" + accommodations_seen + ',' + safe_name + '; path=/; expires=' + expiration_date.toUTCString();
                if (filter_new)
                    generateContent();
            }

            e.getElementsByClassName("accommodation-new-label-div")[0].style.display = 'none';
            window.open(safe_name + '.html', '_blank').focus()
        });
    }
}

function SafeName(name) {
    return name
        .replaceAll(' ', '_')
        .replaceAll('ö', 'oe')
        .replaceAll('ä', 'ae')
        .replaceAll('ü', 'ue')
        .replaceAll('ß', 'ss');
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}