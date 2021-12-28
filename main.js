const btn = document.getElementById('btn-kick');
const btn2 = document.getElementById('btn-kick-2');

const character = {
    name: 'Pikachu',
    defaultHp: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
    name: 'Charmander',
    defaultHp: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
}

function renderHPLife(person) {
    person.elHP.textContent = person.damageHP + ' / ' + person.defaultHp;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function changeHP(count, person) {
    console.log(`Damage: ${count}`);
    if (person.damageHP <= count) {
        person.damageHP = 0;
        alert(person.name + ' проиграл!');
        btn.disabled = true;
        btn2.disabled = true;
    } else person.damageHP -= count;

    renderHP(person);
}

function random(num) {
    return (Math.ceil(Math.random() * num));
}

btn.addEventListener('click', function () {
    console.log('Kick');
    changeHP(random(20), character);
    changeHP(random(20), enemy);
})

btn2.addEventListener('click', function () {
    console.log('Kick-2');
    changeHP(random(5), character);
    changeHP(random(5), enemy);
})

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

init();