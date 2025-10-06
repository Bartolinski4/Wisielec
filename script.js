let haslo = "Codziennie rano wstaje do pracy";
haslo = haslo.toUpperCase();

let dlugosc = haslo.length;
let haslo1 = "";
let bledy = 0;
const yes = new Audio('./audio/yes.wav')
const no = new Audio('./audio/no.wav')

for (i = 0; i < dlugosc; i++) {
    if (haslo.charAt(i) == " ") haslo1 = haslo1 + " ";
    else haslo1 = haslo1 + "-";
}

function odswiezanieHasla() {
    document.getElementById("plansza").innerHTML = haslo1;
}

window.onload = start;
let litery = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', "I", "J", "K", "L", 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ż', 'Ź']

function start() {
    let trescDiva = "";

    for (i = 0; i <= 34; i++) {
        trescDiva = trescDiva + '<div class="litera" onclick="sprawdz(' + i + ')" id="litera' + i + '">' + litery[i] + '</div>';
        if ((i + 1) % 7 == 0) trescDiva = trescDiva + '<div style="clear: both;"></div>';
    }

    document.getElementById("alfabet").innerHTML = trescDiva;

    odswiezanieHasla();
}

function zamienZnak(tekst, miejsce, znak) {
    if (miejsce < 0 || miejsce >= tekst.length) return tekst;
    return tekst.slice(0, miejsce) + znak + tekst.slice(miejsce + 1);
}

function sprawdz(nr) {
    let trafiona = false;

    for (i = 0; i < dlugosc; i++) {
        if (haslo.charAt(i) == litery[nr]) {
            haslo1 = zamienZnak(haslo1, i, litery[nr]);
            trafiona = true;
        }
    }

    if (trafiona == true) {
        yes.play();
        const element = "litera" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.borderColor = "#00C000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");

        odswiezanieHasla()
    }
    else {
        no.play();
        const element = "litera" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.borderColor = "#C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");

        bledy++;
        if(bledy >= 8) {
            document.getElementById("alfabet").innerHTML = '<span class="przegrana">Przegrałeś!</span><br>Niestety nie udało Ci się zgadnąć hasła.<br><br><span class="restart" onclick="location.reload()">Jeszcze raz</span>'
            document.getElementById("plansza").innerHTML = haslo;
        }

        const obraz = "./img/s" + bledy + ".png";
        document.getElementById("szubienica").innerHTML = '<img src="'+ obraz + '">'
    }

    if (haslo == haslo1) {
        document.getElementById("alfabet").innerHTML = '<span class="wygrana">Wygrałeś!</span><br>Gratulacje udało Ci się zgadnąć hasło.<br><br><span class="restart" onclick="location.reload()">Jeszcze raz</span>'
    }
}