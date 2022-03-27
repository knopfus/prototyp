
// Im script kannst du programmieren, was nach dem Laden passieren soll.


// --- Als erstes bauen wir unsere Datenstrukturen.
// In eine Variable kann man sich irgendetwas "merken". Hier definieren wir die Räume (Knoten).
// Jeder Raum hat Übergänge (Kanten) zu einem Zielraum, sowie ein BildSrc zum Anzeigen.
// Damit das Gemerkte solange bleibt, wie das Fenster offen ist, speichern wir es "ins Fenster hinein": mit "window."
window.Räume = {
  Gegenwart: {
    Übergänge: [
      {
        ZielRaumName: "Vergangenheit"
      }
    ],
    BildSrc: "Zimmer-Vergangenheit.png",
    Gegenstände: [
      "Buecher"
    ]
  },
  Vergangenheit: {
    Übergänge: [
      {
        ZielRaumName: "Gegenwart"
      }
    ],
    BildSrc: "Zimmer-Vergangenheit.png",
    Gegenstände: []
  }
}


// Der Spielstand besteht aktuell nur aus dem Raum, wo wir uns befinden, und der ausgewählten Aktion.

window.Spielstand = {
    RaumName: "",
    Aktion: "Keine",
    Besitz: []
}



// --- Jetzt bereiten wir die Funktionen (Abläufe, Unterprogrammli) vor, die in bestimmen Situationen ausgeführt werden sollen

function GeheZu( ZielRaumName ) {
  window.Spielstand.RaumName = ZielRaumName;
  window.Spielstand.Raum = window.Räume[ZielRaumName];

  NeuenSpielstandAnzeigen();
}

function Nehmen( Gegenstand ) {
  window.Spielstand.Besitz.push( Gegenstand );
  
  NeuenSpielstandAnzeigen();
}

function SindBücherImRaum() {
    return window.Spielstand.Raum.Gegenstände.includes("Buecher");
}

function SindBücherGenommen() {
    return window.Spielstand.Besitz.includes("Buecher");
}

function BücherImRaumAnzeigen() {
    document.getElementById("Buecher").style.visibility = "visible";
}

function BücherImRaumNichtAnzeigen() {
    document.getElementById("Buecher").style.visibility = "hidden";
}

function BücherImBesitzAnzeigen() {
}

function BücherImBesitzNichtAnzeigen() {
}

// Zeigt alles richtig an
function NeuenSpielstandAnzeigen() {
  console.log("NeuenSpielstandAnzeigen: ");
  console.log(JSON.stringify(window.Spielstand));

  // Status anzeigen
  document.getElementById("Status-Raum").innerText = window.Spielstand.RaumName;
  document.getElementById("Status-Aktion").innerText = window.Spielstand.Aktion;

  document.getElementById("Raum-Bild").src = window.Spielstand.Raum.BildSrc;

  if (SindBücherImRaum()) {
      // Ja, Bücher sind im Raum (true)

      if (SindBücherGenommen()) {
          // Ja, Bücher sind genommen (true)
          BücherImRaumNichtAnzeigen();
      } else {
          // Nein, Bücher sind nicht genommen (false)
          BücherImRaumAnzeigen();
      }
  } else {
      // Nein, Bücher sind nicht im Raum (false)
      BücherImRaumNichtAnzeigen();
  }

  if (SindBücherGenommen()) {
      // Ja, Bücher sind genommen (true)
      BücherImBesitzAnzeigen();
  } else {
      // Nein, Bücher sind nicht genommen (false)
      BücherImBesitzNichtAnzeigen();
  }
}

function AktionGeheZuAuswählen() {
  document.getElementById("Aktion-Gehe-Zu").classList.add("aktiv");
  window.Spielstand.Aktion = "Gehe-Zu";
  NeuenSpielstandAnzeigen();
}

function AktionNehmenAuswählen() {
  document.getElementById("Aktion-Nehmen").classList.add("aktiv");
  window.Spielstand.Aktion = "Nehmen";
  NeuenSpielstandAnzeigen();
}

function KeineAktionAuswählen() {
  document.getElementById("Aktion-Gehe-Zu").classList.remove("aktiv");
  window.Spielstand.Aktion = "Keine"
  NeuenSpielstandAnzeigen();
}



// --- Nun erstmal alles richtig anzeigen...
GeheZu("Vergangenheit");



// --- Nun versehen wir die Aktionsknöpfe mit Magie:
document.getElementById("Aktion-Gehe-Zu").onclick = AktionGeheZuAuswählen;
document.getElementById("Aktion-Nehmen").onclick = AktionNehmenAuswählen;

// --- Nun versehen wir die Gegenstände mit Magie:
document.getElementById("Buecher").onclick = function() {
  console.log("Bücher angeklickt");
  if (window.Spielstand.Aktion == "Nehmen") {
    Nehmen ( "Buecher" );
  }
}

// --- Und man muss die Aktion auch ausführen können, indem man aufs Bild klickt
document.getElementById("Raum-Bild").onclick = function() {
  // Welche Aktion ist aktiv? (Momentan gibt es nur eine...)
  if (window.Spielstand.Aktion == "Gehe-Zu") {
    
    // Gehe-zu ist aktiv => In welchen Zielraum soll man kommen? Momentan machen wir es uns einfach:
    // Jeder Raum hat nur einen Übergang, also nutzen wir einfach den einzigen, den es gibt.
    // Später müsste man dann je nachdem, wo man hin klickt, an einen anderen Ort kommen!
    var aktuellerRaum = window.Spielstand.Raum;
    var einzigerÜbergang = aktuellerRaum.Übergänge[0]; // Aufzählungen beginnen immer mit 0.
    
    GeheZu(einzigerÜbergang.ZielRaumName);
    
    KeineAktionAuswählen();
  }
};
