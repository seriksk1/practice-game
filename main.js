import Pokemon from './pokemon.js';
import random from './utils.js';

const player1 = new Pokemon({
    name: 'Pickachu',
    hp: 500,
    type: 'electric',
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    hp: 350,
    type: 'fire',
    selectors: 'enemy',
});

function getElById(id) {
    return document.getElementById(id);
}

const btn = getElById('btn-kick');
const btn2 = getElById('btn-kick-2');
const $logs = document.querySelector('#logs');

function countClicks(limitClicks) {
    return () => limitClicks > 0 ? --limitClicks : limitClicks = 0;
}

const btn1_RemainClicks = countClicks(7);
const btn2_RemainClicks = countClicks(7);

const changeButtonName = (btn, clicks) => {
    let btnName = btn.textContent.split(' ');

    btnName.splice(btnName.indexOf('('), 1);

    return `${btnName.join(' ')} (${clicks})`;
}

btn.addEventListener('click', function () {
    console.log('Kick');

    generateLog(player1, player2, player1.changeHP(random(30, 60)));
    generateLog(player2, player1, player2.changeHP(random(30, 60)));

    let remainClicks = btn1_RemainClicks();

    btn.textContent = changeButtonName(btn, remainClicks);

    if (!remainClicks) btn.disabled = true;

    if (!player1.hp.current || !player2.hp.current) {
        btn.disabled = true;
        btn2.disabled = true;
    }
})

btn2.addEventListener('click', function () {
    console.log('Kick-2');

    generateLog(player1, player2, player1.changeHP(random(40)));
    generateLog(player2, player1, player2.changeHP(random(40)));

    let remainClicks = btn2_RemainClicks();

    btn2.textContent = changeButtonName(btn2, remainClicks);

    if (!remainClicks) btn2.disabled = true;

    if (!player1.hp.current || !player2.hp.current) {
        btn.disabled = true;
        btn2.disabled = true;
    }
})

function generateLog(character, enemy, count) {
    const logs = [
        `${character.name} вспомнил что-то важное, но неожиданно ${enemy.name}, не помня себя от испуга, ударил в предплечье врага.`,
        `${character.name} поперхнулся, и за это ${enemy.name} с испугу приложил прямой удар коленом в лоб врага.`,
        `${character.name} забылся, но в это время наглый ${enemy.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `${character.name} пришел в себя, но неожиданно ${enemy.name} случайно нанес мощнейший удар.`,
        `${character.name} поперхнулся, но в это время ${enemy.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
        `${character.name} удивился, а ${enemy.name} пошатнувшись влепил подлый удар.`,
        `${character.name} высморкался, но неожиданно ${enemy.name} провел дробящий удар.`,
        `${character.name} пошатнулся, и внезапно наглый ${enemy.name} беспричинно ударил в ногу противника.`,
        `${character.name} расстроился, как вдруг, неожиданно ${enemy.name} случайно влепил стопой в живот соперника.`,
        `${character.name} пытался что-то сказать, но вдруг, неожиданно ${enemy.name} со скуки, разбил бровь сопернику.`
    ];

    let log = logs[random(logs.length) - 1];

    const $p = document.createElement('p');
    $p.innerText = `${log} (-${count}HP [${character.hp.current}/${character.hp.total}])`;
    $logs.insertBefore($p, $logs.children[0]);
    $logs.scrollTop = 0;
}

function init() {
    console.log('Start Game!');

    btn.textContent += ' (7)';
    btn2.textContent += ' (7)';
}

init();