function getElById(id) {
    return document.getElementById(id);
}

const btn = getElById('btn-kick');
const btn2 = getElById('btn-kick-2');
const $logs = document.querySelector('#logs');

const character = {
    name: 'Pikachu',
    defaultHp: 100,
    damageHP: 100,
    elHP: getElById('health-character'),
    elProgressbar: getElById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

const enemy = {
    name: 'Charmander',
    defaultHp: 100,
    damageHP: 100,
    elHP: getElById('health-enemy'),
    elProgressbar: getElById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

function renderHPLife() {
    this.elHP.textContent = this.damageHP + ' / ' + this.defaultHp;
}

function renderProgressbarHP() {
    this.elProgressbar.style.width = this.damageHP + '%';
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function changeHP(count) {
    this.damageHP -= count;

    const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);

    $logs.scrollTop = 0;

    const $p = document.createElement('p');
    $p.innerText = `${log} (-${count}HP [${this.damageHP}/${this.defaultHp}])`;
    $logs.insertBefore($p, $logs.children[0]);

    // console.log(`${log} (-${count}HP [${this.damageHP}/${this.defaultHp}])`);

    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert(this.name + ' проиграл!');
        btn.disabled = true;
        btn2.disabled = true;
    }

    this.renderHP();
}

function random(num) {
    return (Math.ceil(Math.random() * num));
}

btn.addEventListener('click', function () {
    console.log('Kick');

    character.changeHP(random(20));
    enemy.changeHP(random(20));
})

btn2.addEventListener('click', function () {
    console.log('Kick-2');

    character.changeHP(random(5));
    enemy.changeHP(random(5));
})

function generateLog({name: first}, {name: second}) {
    const logs = [
        `${first} вспомнил что-то важное, но неожиданно ${second}, не помня себя от испуга, ударил в предплечье врага.`,
        `${first} поперхнулся, и за это ${second} с испугу приложил прямой удар коленом в лоб врага.`,
        `${first} забылся, но в это время наглый ${second}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${first} пришел в себя, но неожиданно ${second} случайно нанес мощнейший удар.`,
        `${first} поперхнулся, но в это время ${second} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `${first} удивился, а ${second} пошатнувшись влепил подлый удар.`,
        `${first} высморкался, но неожиданно ${second} провел дробящий удар.`,
        `${first} пошатнулся, и внезапно наглый ${second} беспричинно ударил в ногу противника.`,
        `${first} расстроился, как вдруг, неожиданно ${second} случайно влепил стопой в живот соперника.`,
        `${first} пытался что-то сказать, но вдруг, неожиданно ${second} со скуки, разбил бровь сопернику.`
    ];

    return logs[random(logs.length) - 1];
}

function init() {
    console.log('Start Game!');

    character.renderHP();
    enemy.renderHP();
}

init();