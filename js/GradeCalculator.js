console.log("=== Grade Calculat ===")

var namaStudent = "Rogers"
let tahunAngkatan = 2025
const passingGrade = 70

let mathScore = 85 // number (integer)
let scienceScore = 92.5 // number (decimal)
let englishScore = 78 // number (integer)
let isEnrolled = true // boolean
let graduationYear = null //null
let extraCredit // undefined

console.log("Student Information:")
console.log("Name: " + namaStudent)
console.log("Enrolled: " + isEnrolled)
console.log("Year: " + tahunAngkatan)
console.log("Passing Grade: " + passingGrade + "%\n")

console.log("=== Hitung Grade ===")
let totalPoints = mathScore + scienceScore + englishScore
let numberOfSubjects = 3
let averageGrade = totalPoints / numberOfSubjects
let roundedAverage = Math.round(averageGrade)

console.log("Math Score: " + mathScore)
console.log("Science Score: " + scienceScore)
console.log("English Points: " + englishScore)
console.log("Total Points: " + totalPoints)
console.log("Average Grade: " + averageGrade.toFixed(2))
console.log("Rounded Average: " + roundedAverage + "\n")

console.log("=== Grade Analysis ===")
let gradeLetter;

if (averageGrade >= 90) {
  gradeLetter = "A"
} else if (averageGrade > 80) {
  gradeLetter = "B"
} else if (averageGrade >= 70) {
  gradeLetter = "C"
} else if (averageGrade >= 60) {
  gradeLetter = "D"
} else {
  gradeLetter = "F"
}

console.log(gradeLetter)