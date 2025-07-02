const greeting = function (username) {
  console.log(`Hallo selamat siang ${username}`)
}

greeting("Wira")

const helloWorld = (name) => {
  console.log(`Hello ${name}`)
}

helloWorld('Wira')

function helloWira(name) {
  return `Hello ${name} Ganteng`
}

console.log(helloWira("Wira"))

const rumusLuas = (sisi) => {
  return sisi * sisi;
}

console.log(rumusLuas(5))

// Callback

function hitungBelanja(harga1, harga2, callback) {
  const total = harga1 + harga2
  callback(total)
}

function tampilkanTotal(totalBelanja) {
  console.log(`Total belanja kamu adalah Rp${totalBelanja}`)
}

function kita(total) {
  console.log(`Hello world : ${total}`)
}

hitungBelanja(10000, 15000, tampilkanTotal)
hitungBelanja(1000, 2000, kita)