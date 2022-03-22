

window.Spiel = (function(Räume, Gegenstände, Aktionen, Spieler) {

    // Räume mit "ihren" Gegenständen füllen
    for (var Raum_Name in Räume) {
        var Raum = Räume[Raum_Name];
        Räume[Raum_Name].Gegenstände = [];
    }
    for (var Gegenstand_Name in Gegenstände) {
        var Gegenstand = Gegenstände[Gegenstand_Name];
        if ( Gegenstand.in_Raum ) {
            Räume[ Gegenstand.in_Raum ].Gegenstände.push( Gegenstand );
        }
    }

    // mögliche_Aktionen im Raum mit Magie versehen
    for (var Raum_Name in Räume) {
        var Raum = Räume[Raum_Name];
        for (var Aktion_Name in Raum.mögliche_Aktionen) {
            Raum.mögliche_Aktionen[Aktion_Name].ausführen = (function(Aktion_Name, Raum, Spieler) {
                return function() {
                    Aktionen[Aktion_Name]( "keiner", Raum, Spieler );
                };
            }( Aktion_Name, Raum, Spieler ));
        }        
    }

    // mögliche_Aktionen im Gegenstand mit Magie versehen
    for (var Gegenstand_Name in Gegenstände) {
        var Gegenstand = Gegenstände[Gegenstand_Name];
        for (var Aktion_Name in Gegenstand.mögliche_Aktionen) {
            Gegenstand.mögliche_Aktionen[Aktion_Name].ausführen = (function( Aktion_Name, Gegenstand, Spieler ) {
                return function() {
                    Aktionen[Aktion_Name]( Gegenstand, Räume[Gegenstand.in_Raum], Spieler );
                };
            }( Aktion_Name, Gegenstand, Spieler ));
        }
    }

    return {
        Räume: Räume,
        Gegenstände: Gegenstände,
        Aktionen: Aktionen,
        Spieler: Spieler
    };

} (window.Räume, window.Gegenstände, window.Aktionen, window.Spieler));


// Der Spielstand besteht aktuell nur aus dem Raum, wo wir uns befinden, und der ausgewählten Aktion.


function Gegenstände_im_Besitz_anzeigen() {
    for (var Gegenstand_Name in Spiel.Gegenstände) {
        var Gegenstand = Spiel.Gegenstände[Gegenstand_Name];
        var visibility;
        if (Spieler.besitzt_Gegenstände.includes(Gegenstand)) {
            visibility = "visible";
        } else {
            visibility = "hidden";
        }

        var element_id = Gegenstand_Name + "InBesitz";

        document.getElementById( element_id ).style.visibility = visibility;
    }
}

function Gegenstände_im_Raum_anzeigen() {
    var Raum = Spiel.Räume[Spiel.Spieler.im_Raum];

    for (var Gegenstand_Name in Spiel.Gegenstände) {
        var Gegenstand = Spiel.Gegenstände[Gegenstand_Name];
        var visibility;
        if (Raum.Gegenstände.includes(Gegenstand)) {
            visibility = "visible";
        } else {
            visibility = "hidden";
        }

        var element_id = Gegenstand_Name;

        document.getElementById( element_id ).style.visibility = visibility;
    }
}

function ausgewählte_Aktion_anzeigen() {
    for (var Aktion_Name in Spiel.Aktionen) {
        var element_id = "Aktion-" + Aktion_Name;
        var element = document.getElementById(element_id);

        element.classList.remove("aktiv");
        if ( Spieler.macht_Aktion == Aktion_Name ) {
            element.classList.add("aktiv");
        }
    }
}

// Zeigt alles richtig an
function zeige_Spiel_an() {

    document.getElementById("Status-Raum").innerText = Spiel.Spieler.im_Raum;
    document.getElementById("Status-Aktion").innerText = Spiel.Spieler.macht_Aktion;

    document.getElementById("IQ").innerText = "IQ: " + Spiel.Spieler.hat_IQ;

    document.getElementById("Raum-Bild").src = Spiel.Räume[Spiel.Spieler.im_Raum].Bild_Datei;

    Gegenstände_im_Besitz_anzeigen();
    Gegenstände_im_Raum_anzeigen();
    ausgewählte_Aktion_anzeigen();

}



// --- Nun versehen wir die Aktionsknöpfe mit Magie:
for (var Aktion_Name in Spiel.Aktionen) {
    document.getElementById("Aktion-" + Aktion_Name).onclick = (function(Aktion_Name) {
        return function() {
            Spiel.Spieler.macht_Aktion = Aktion_Name;
            zeige_Spiel_an();
        };
    }( Aktion_Name ));
}



// --- Nun versehen wir die Gegenstände mit Magie:
for (var Gegenstand_Name in Spiel.Gegenstände) {
    var Gegenstand = Spiel.Gegenstände[Gegenstand_Name];

    document.getElementById(Gegenstand_Name).onclick = (function(Gegenstand) {
        return function() {

            var mögliche_Aktion = Gegenstand.mögliche_Aktionen[Spiel.Spieler.macht_Aktion];
            if ( mögliche_Aktion && mögliche_Aktion.wo == "im_Raum" ) {
                mögliche_Aktion.ausführen();
                Spiel.Spieler.macht_Aktion = "keine";
                zeige_Spiel_an();
            }
        };
    }( Gegenstand ));

    document.getElementById(Gegenstand_Name + "InBesitz").onclick = (function(Gegenstand) {
        return function() {

            var mögliche_Aktion = Gegenstand.mögliche_Aktionen[Spiel.Spieler.macht_Aktion];
            if ( mögliche_Aktion && mögliche_Aktion.wo == "im_Besitz" ) {
                mögliche_Aktion.ausführen();
                Spiel.Spieler.macht_Aktion = "keine";
                zeige_Spiel_an();
            }
        };
    }( Gegenstand ));
}


// --- Und man muss die Aktion auch ausführen können, indem man aufs Bild klickt
document.getElementById("Raum-Bild").onclick = function() {
    var Raum = Spiel.Räume[Spiel.Spieler.im_Raum];
    var mögliche_Aktion = Raum.mögliche_Aktionen[Spiel.Spieler.macht_Aktion];
    if ( mögliche_Aktion ) {
        mögliche_Aktion.ausführen();
        Spiel.Spieler.macht_Aktion = "keine";
        zeige_Spiel_an();
    }
};


zeige_Spiel_an();
