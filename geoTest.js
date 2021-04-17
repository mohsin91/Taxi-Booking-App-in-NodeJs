
const weight = [
  {
    key: 'distance',
    value: -5
  },
  {
    key: 'time',
    value: -4
  },
  {
    key: 'review',
    value: 7
  },
  {
    key: 'tripCount',
    value: -3
  }
]

var providers = [
  {
    'id': 2,
    'Name': 'Cafe Coffee day (Habibullah Rd)',
    'lat': '13.048693',
    'lng': '80.245716',
    's2Key': '1/310221030302022',
    's2Id': '4202533849902612480',
    'time': 468,
    'distance': 2278,
    'rating': 4
  },
  {
    'id': 3,
    'Name': 'Amma Chettinadu Restuarant (Giri Rd)',
    'lat': '13.048021',
    'lng': '80.244554',
    's2Key': '1/310221030302022',
    's2Id': '4202533849902612480',
    'time': 585,
    'distance': 2559,
    'rating': 5
  },
  {
    'id': 4,
    'Name': 'Canara Bank',
    'lat': '13.053350',
    'lng': '80.247213',
    's2Key': '1/310221030302013',
    's2Id': '4202533843460161536',
    'time': 6,
    'distance': 38,
    'rating': 3
  },
  {
    'id': 5,
    'Name': 'Grill House',
    'lat': '13.053432',
    'lng': '80.245441',
    's2Key': '1/310221030302012',
    's2Id': '4202533841312677888',
    'time': 292,
    'distance': 1270,
    'rating': 5
  },
  {
    'id': 6,
    'Name': 'Valluvar Kottam',
    'lat': '13.051471',
    'lng': '80.244934',
    's2Key': '1/310221030302021',
    's2Id': '4202533847755128832',
    'time': 404,
    'distance': 1919,
    'rating': 5
  }
]
var config = {}
weight.forEach(element => {
  config[element.key] = element.value
})

var providerweight = providers.map(provider => {
  return weightCalculator(provider, config)
})

providerweight.sort((a, b) => a.total - b.total)

function weightCalculator (data, config) {
  var key = Object.keys(config)
  var total = 0
  key.forEach(element => {
    if (data[element] && config[element]) {
      total += data[element] * config[element]
    } else {
      total += 0
    }
  })
  data['total'] = total
  return data
}
