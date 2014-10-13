goog.provide('bitex.util');
goog.provide('bitex.util.PriceAmountCalculatorVerb');

goog.require('goog.math.Long');
goog.require('goog.crypt');
goog.require('goog.crypt.Sha256');


bitex.util.isTestNetAddress = function(address) {
  switch(address[0]) {
    case 'm':
    case 'n':
    case '2':
    case '9':
    case 'c':
      return true;
    default:
      return false;
  }
};

bitex.util.decimalPlaces = function(num) {
  var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
      0,
      // Number of digits right of decimal point.
      (match[1] ? match[1].length : 0)
        // Adjust for scientific notation.
          - (match[2] ? +match[2] : 0));
};

/**
 * @param {Element} element
 * @return {Object}
 */
bitex.util.getFormAsJSON = function(element){
  var json_res = {};
  for (var el, i = 0; el = element.elements[i]; i++) {
    if (el.disabled || el.tagName.toLowerCase() == 'fieldset') {
      continue;
    }

    var name = el.name;
    if (goog.string.isEmpty(name)) {
      continue;
    }

    var type = el.type.toLowerCase();
    switch (type) {
      case 'file':
      case 'submit':
      case 'reset':
      case 'button':
        // don't submit these
        break;

      case 'select-multiple':
        var values = goog.dom.forms.getValue(el);
        if (values != null) {
          json_res[name] = [];
          for (var value, j = 0; value = values[j]; j++) {
            json_res[name].push(value);
          }
        }
        break;
      default:
        var form_value = goog.dom.forms.getValue(el);
        if (form_value != null) {
          json_res[name] = form_value;
        }
    }
  }
  return json_res;
};



bitex.util.getCountries = function() {
  return {
    "AF": "Afghanistan",
    "AX": "Åland Islands",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AC": "Ascension Island",
    "AU": ["Australia", "ACT|NSW|NT|QLD|SA|TAS|VIC|WA", "Australian Capital Territory|New South Wales|Northern Territory|Queensland|South Australia|Tasmania|Victoria|Western Australia"],
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BQ": "Bonaire, Sint Eustatius, and Saba",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "VG": "British Virgin Islands",
    "BN": "Brunei",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "IC": "Canary Islands",
    "CV": "Cape Verde",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "EA": "Ceuta and Melilla",
    "TD": "Chad",
    "CL": ["Chile", "RM|XV|I|II|III|IV|V|VI|VII|VIII|IX|XIV|X|XI|XII", "Metropolitana de Santiago|Arica y Parinacota|Tarapacá|Antofagasta|Atacama|Coquimbo|Valparaíso|Libertador General Bernardo O'Higgins|Maule|Biobío|La Araucanía|Los Ríos|Los Lagos|Aysén del General Carlos Ibáñez del Campo|Magallanes y de la Antártica Chilena"],
    "CN": "China",
    "CX": "Christmas Island",
    "CP": "Clipperton Island",
    "CC": "Cocos [Keeling] Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo - Brazzaville",
    "CD": "Congo - Kinshasa",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Côte d’Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CW": "Curaçao",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DG": "Diego Garcia",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "EU": "European Union",
    "FK": "Falkland Islands",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island and McDonald Islands",
    "HN": "Honduras",
    "HK": "Hong Kong SAR China",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Laos",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macau SAR China",
    "MK": "Macedonia",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar [Burma]",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "AN": "Netherlands Antilles",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "KP": "North Korea",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "QO": "Outlying Oceania",
    "PK": ["Pakistan", "Balochistan|KPK|Punjab|Sindh|Islamabad|FATA|AJ&K|Gilgit–Baltistan", "Balochistan|Khyber Pakhtunkhwa|Punjab|Sindh|Islamabad|FATA|Azad and Jamu Kashmir|Gilgit–Baltistan"],
    "PW": "Palau",
    "PS": "Palestinian Territories",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn Islands",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Réunion",
    "RO": "Romania",
    "RU": "Russia",
    "RW": "Rwanda",
    "BL": "Saint Barthélemy",
    "SH": "Saint Helena",
    "KN": "Saint Kitts and Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin",
    "PM": "Saint Pierre and Miquelon",
    "VC": "Saint Vincent and the Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "São Tomé and Príncipe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "CS": "Serbia and Montenegro",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SX": "Sint Maarten",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia and the South Sandwich Islands",
    "KR": "South Korea",
    "SS": "South Sudan",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard and Jan Mayen",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syria",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TA": "Tristan da Cunha",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks and Caicos Islands",
    "TV": "Tuvalu",
    "UM": "U.S. Minor Outlying Islands",
    "VI": "U.S. Virgin Islands",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": ["United States", "AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VE|VA|WA|WV|WI|WY", "Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming" ],
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VA": "Vatican City",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "WF": "Wallis and Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
  };
};

/**
 * @enum {number}
 */
bitex.util.PriceAmountCalculatorVerb = {
  SPEND: 0,
  GET: 1
};

/**
 * @param {number} user_input
 * @param {bitex.util.PriceAmountCalculatorVerb} verb
 * @param {.Array<.Array<Object>>} order_depth
 * @param {string} username
 * @param {number} fee
 * @return {Array.<number>=}
 */
bitex.util.calculatePriceAmountAndFee = function(user_input, verb, order_depth, username, fee) {
  var amount = 0;
  var price = 0;
  var vwap = 0;

  var order;
  var total_volume = 0;

  /**
   * @enum {number}
   */
  var OrderDepthIndex = {
    PRICE: 0,
    SIZE: 1,
    USERNAME: 2
  };

  var total = user_input;
  var fee =  total * fee / 10000;
  var work_total = total - fee;

  for ( var order_idx in order_depth) {
    order = order_depth[order_idx];
    if (username  == order[OrderDepthIndex.USERNAME] ) {
      continue;
    }

    var order_volume = order[OrderDepthIndex.PRICE] * order[OrderDepthIndex.SIZE] / 1e8;

    if (verb == bitex.util.PriceAmountCalculatorVerb.SPEND) {
      if (order_volume >= work_total) {
        amount += (work_total / order[OrderDepthIndex.PRICE] ) * 1e8;
        price = order[OrderDepthIndex.PRICE];
        work_total = 0;
        vwap =  (total - fee) / amount;
        break;
      } else if (order_volume < work_total) {
        amount += order[OrderDepthIndex.SIZE];
        work_total -= order_volume;
      }
    } else if (verb == bitex.util.PriceAmountCalculatorVerb.GET) {
      if (order[OrderDepthIndex.SIZE] >= work_total) {
        price = order[OrderDepthIndex.PRICE];
        total_volume += (order[OrderDepthIndex.PRICE] * work_total /1e8 );
        vwap = total_volume / (total - fee);
        amount = vwap * (total - fee);
        work_total = 0;
        break;
      } else if (order[OrderDepthIndex.SIZE] < work_total) {
        total_volume += order_volume;
        work_total -= order[OrderDepthIndex.SIZE];
      }
    }
  }

  if (work_total === 0 && amount > 0) {
    return [ price, parseInt(amount,10),  parseInt(fee, 10),  vwap  ];
  }
  return undefined;
};

/**
 * @enum {number}
 */
bitex.util.isValidAddress = function(address) {
  var bytes = bitex.util.base58Decode(address);

  var end = bytes.length - 4;
  var hash = bytes.slice(0, end);

  var checksum = bitex.util.sha256_digest(bitex.util.sha256_digest(hash));
  if (checksum[0] != bytes[end] ||
      checksum[1] != bytes[end+1] ||
      checksum[2] != bytes[end+2] ||
      checksum[3] != bytes[end+3])
          return false;

  return true;
};

bitex.util.sha256_digest = function(data) {
  var sha256 = new goog.crypt.Sha256();
  sha256.update(data);

  return sha256.digest();
};

bitex.util.base58Decode = function(string) {

  if (string.length === 0) return "";

  var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  var ALPHABET_MAP = {};
  for(var i = 0; i < ALPHABET.length; i++) {
    ALPHABET_MAP[ALPHABET.charAt(i)] = i;
  }
  var BASE = 58;

  var input = string.split('').map(function(c){
    return ALPHABET_MAP[c];
  })

  var i, j, bytes = [0]
  for (i = 0; i < input.length; i++) {
    for (j = 0; j < bytes.length; j++) bytes[j] *= BASE;
    bytes[bytes.length - 1] += input[i];

    var carry = 0;
    for (j = bytes.length - 1; j >= 0; j--){
      bytes[j] += carry;
      carry = bytes[j] >> 8;
      bytes[j] &= 0xff;
    }

    while (carry) {
      bytes.unshift(carry);
      carry = bytes[0] >> 8;
      bytes[0] &= 0xff;
    }
  }

  // deal with leading zeros
  for (i = 0; i < input.length - 1 && input[i] == 0; i++) bytes.unshift(0);

  return bytes;
}



