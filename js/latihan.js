// Nomor 1
// check negatif atau positif
// check tipe data

const hitungLuasPersegiPanjang = (panjang, lebar) => {

  if(isValid(panjang) && isValid(lebar)) {
    return panjang * lebar
  } else {
    return "Inputan tidak valid"
  }
}

const hitungLuasLingkaran = (jariJari) => {
  if(isValid(jariJari)) {
    return Math.PI * jariJari * jariJari
  } else {
    return "Inputan tidak valid"
  }
}

const hitungLuasSegitiga = (alas, tinggi) => {
  if(isValid(alas) && isValid(tinggi)) {
    return (alas * tinggi) / 2
  } else {
    return "Inputan tidak valid"
  }
}

const isValid = (n) => {
  return n >= 0 && typeof n === 'number' && (Number.isInteger(n) || n % 1 === 0);
}

console.log(`Luas Persegi Panjang = ${hitungLuasPersegiPanjang(3.3, 4)}`)
console.log(`Luas Lingkaran = ${hitungLuasLingkaran(3.3)}`)
console.log(`Luas Luas Segitiga = ${hitungLuasSegitiga(3, 4)}`)