__author__ = 'rodrigo'

import pycountry

def get_country_code(country_name):
  try:
    return  pycountry.countries.get(name=country_name).alpha2
  except KeyError:
    jotform_countries_that_are_not_in_pycountry = {
      "The Bahamas" : "BS",
      "Bolivia" : 'BO',
      "Brunei": "BN",
      "People's Republic of China": "CN",
      "Republic of China": "CN",
      "Cote d'Ivoire": "CI",
      "Falkland Islands": "FK",
      "The Gambia": "GM",
      "Iran": "IR",
      "North Korea": "KP",
      "South Korea": "KR",
      "Kosovo": "XK",
      "Laos": "LA",
      "Macau": "MO",
      "Macedonia": "MK",
      "Micronesia": "FM",
      "Moldova": "MD",
      "Nagorno-Karabakh":"AZ",
      "Netherlands Antilles": "AN",
      "Turkish Republic of Northern Cyprus": "CY",
      "Northern Mariana":"MP",
      "Palestine": "PS",
      "Pitcairn Islands": "PN",
      "Russia":"RU",
      "Saint Barthelemy": "BL",
      "Saint Helena":"SH",
      "Saint Martin" : "MF",
      "Somaliland" : "SO",
      "South Ossetia": "GE",
      "Svalbard":"SJ",
      "Syria":"SY",
      "Taiwan":"TW",
      "Tanzania":"TZ",
      "Transnistria Pridnestrovie":"MD",
      "Tristan da Cunha":"SH",
      "Vatican City":"VA",
      "Venezuela":"VE",
      "Vietnam":"VN",
      "British Virgin Islands": "VG",
      "US Virgin Islands": "VI"
    }
    try:
      return jotform_countries_that_are_not_in_pycountry[country_name]
    except KeyError:
      return country_name


