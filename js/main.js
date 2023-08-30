// O`zgaruvchilar
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const cells = document.querySelectorAll('.cell')
const x = document.querySelector('.x-player')
const o = document.querySelector('.o-player')
const restartBtn = document.querySelector('.restart')
const bout = document.querySelector('.bout')
const result = document.querySelector('.modal-result')
const resultText = document.querySelector('.modal-result .text')
const restartModal = document.querySelector('.restartModal')
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; // To`g`ri keladigan kataklar indeksi
let options = ['','','','','','','','','']
let player
let running = false
// Modal va o`yinchini tanlash
setTimeout(() => { // Modalni biroz ushlab turadi
    modal.classList.add('show') // Modalni class qo`shish orqali ekranga chiqaradi
    overlay.classList.add('active') // Orqa fonni xiralashtirish uchun class qo`shadi
}, 100);
x.addEventListener('click', () => {
    modal.classList.remove('show') // Modalni class ayirish orqali ekranga chetlashtiradi 
    overlay.classList.remove('active') // Orqa fonni xiralashtirish uchun qo`shilgan classni ayiradi
    player = 'X'
    bout.textContent = `${player}'s turn` // Navbatni ko`rsatib turadi

})
o.addEventListener('click', () => {
    modal.classList.remove('show') // Modalni qo`shilgan classni ayirish orqali ekranga chetlashtiradi 
    overlay.classList.remove('active') // Orqa fonni xiralashtirish uchun qo`shilgan classni ayiradi
    player = 'O'
    bout.textContent = `${player}'s turn` // Navbatni ko`rsatib turadi
})
// Funksiyalar
game()
function game() {
cells.forEach(cell => cell.addEventListener('click', cellClicked)) // Bosilayotgan katakni aniqlaydi va funksiyani chaqiradi
restartBtn.addEventListener('click', restart) // O`yinni qayta ishga tushiradi
restartModal.addEventListener('click', restart) // O`yinni qayta ishga tushiradi
bout.textContent = `${player}'s turn` // Navbatni ko`rsatib turadi
running = true
}
function cellClicked() {
    const index = this.getAttribute('index') // Bosilgan katak indeksini oladi
    if (options[index] != '' || !running) { // Tekshiradi va o`yinni to`xtatadi
        return;
    }
    uptadeCell(this, index) // Funksiya parametrlari orqali katak va uning indeksini jo`natadi
    checkWinner() // Tekshiruvchi funksiya
}
function uptadeCell(cell, index) {
    options[index] = player // Optionsga katak indeksi bo`yicha o`yinchi nomini joylaydi
    cell.textContent = player // O`yinchi nomini katakka chiqaradi
}
function changePlayer() {
    player = (player == 'X') ? 'O' : 'X' // Navbatni ta`minlaydi
    bout.textContent = `${player}'s turn` // Navbatni ko`rsatib turadi
}
function checkWinner() {
    let round = false

    for (let i = 0; i < win.length; i++) { // Arrayni ochib beradi
        const condition = win[i]; 
        const cellA = options[condition[0]] // 1-qator bo`yicha tekshiradi
        const cellB = options[condition[1]] // 2-qator bo`yicha tekshiradi
        const cellC = options[condition[2]] // 3-qator bo`yicha tekshiradi
        if(cellA == '' || cellB == '' || cellC == '') { // To`g`ri kelgan yoki kelmaganini va 
            continue; // davom ettiradi
        }
        if(cellA == cellB && cellB == cellC) { // To`g`ri kelgan yoki kelmaganini tekshiradi va 
            round = true
            break; // o`yinni to`xtatadi
        }
    }
    if (round) {
        resultText.innerHTML = `${player} wins!🎉 ` // Yutgan o`yinchini ekranga chiqaradi
        result.classList.add('show') // Modalni ekranga chiqarish uchun class qo`shadi
        running = false // o`yinni to`xtatadi
        overlay.classList.add('active')

    } else if (!options.includes('')) {
        resultText.innerHTML = 'Draw!😢 ' // Durrangni e`lon qiladi
        result.classList.add('show') // Modalni ekranga chiqarish uchun class qo`shadi
        overlay.classList.add('active')

    } else {
        changePlayer()
    }
}
// O`yinni qaytadan boshlaydi
function restart() {
    bout.textContent = `${player}'s turn`
    options = ['','','','','','','','','']
    result.classList.remove('show')
    modal.classList.add('show')
    overlay.classList.add('active')
    cells.forEach(cell => cell.textContent = '')
    running = true
}