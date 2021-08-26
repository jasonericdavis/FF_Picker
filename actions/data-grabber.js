const https = require('https')
console.log('Hello World')

let data = '';

const options = {
  hostname: 'whatever.com',
  port: 443,
  path: '/todos',
  method: 'GET'
}

const req = https.request("https://www.pro-football-reference.com/years/2020/fantasy.htm", res => {
    
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    // process.stdout.write(d)
    data += d
  })

//   res.on('end', () => {
//       console.log(data)
//   })
})

req.on('error', error => {
  console.error(error)
})

console.log(data)
req.end()