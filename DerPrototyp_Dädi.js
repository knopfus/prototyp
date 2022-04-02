// Das "Spiel" bringt alles aus "DerPrototyp_Gavin.js" zusammen, damit es mit dem HTML-Dokument verknüpft werden kann.


window.Spiel = (function(Räume, Gegenstände, Aktionen, Spieler) {

    // Räume mit "ihren" Gegenständen füllen
    for (var Raum_Name in Räume) {
        var Raum = Räume[Raum_Name];
        Räume[Raum_Name].Gegenstände = [];
    }
    for (var Gegenstand_Name in Gegenstände) {
        var Gegenstand = Gegenstände[Gegenstand_Name];
        if ( Gegenstand.wo ) {
            Räume[ Gegenstand.wo.Raum ].Gegenstände.push( Gegenstand );
        }
    }

    // mögliche_Aktionen im Raum mit Magie versehen
    for (var Raum_Name in Räume) {
        var Raum = Räume[Raum_Name];
        for (var Aktion_Name in Raum.mögliche_Aktionen) {
            var Aktion = Raum.mögliche_Aktionen[Aktion_Name];
            Aktion.ausführen = (function(Aktion_Name, Raum, Spieler, Aktion) {
                return function() {
                    Aktionen[Aktion_Name]( "keiner", Raum, Spieler, Aktion );
                };
            }( Aktion_Name, Raum, Spieler, Aktion ));
        }        
    }

    // mögliche_Aktionen im Gegenstand mit Magie versehen
    for (var Gegenstand_Name in Gegenstände) {
        var Gegenstand = Gegenstände[Gegenstand_Name];
        for (var Aktion_Name in Gegenstand.mögliche_Aktionen) {
            var Aktion = Gegenstand.mögliche_Aktionen[Aktion_Name];
            Aktion.ausführen = (function( Aktion_Name, Gegenstand, Räume, Spieler, Aktion ) {
                return function() {
                    Aktionen[Aktion_Name]( Gegenstand, Räume[Gegenstand.wo.Raum], Spieler, Aktion );
                };
            }( Aktion_Name, Gegenstand, Räume, Spieler, Aktion ));
        }
    }

    return {
        Räume: Räume,
        Gegenstände: Gegenstände,
        Aktionen: Aktionen,
        Spieler: Spieler
    };

} (window.Räume, window.Gegenstände, window.Aktionen, window.Spieler));





// "Ausgabe" -- der folgende Code macht das Spiel im HTML-Dokument sichtbar.


function Gegenstände_im_Besitz_anzeigen() {
    for (var Gegenstand_Name in Spiel.Gegenstände) {
        var Gegenstand = Spiel.Gegenstände[Gegenstand_Name];
        var visibility;
        if (Spieler.besitzt_Gegenstände.includes(Gegenstand)) {
            visibility = "visible";
        } else {
            visibility = "hidden";
        }

        var element = document.getElementById( "Gegenstand_in_Besitz_" + Gegenstand_Name );

        if (element != null) {
            element.style.visibility = visibility;
        }
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

        var element_id = "Gegenstand_" + Gegenstand_Name;

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

function bereite_Spiel_vor() {

    for (var Gegenstand_Name in Spiel.Gegenstände) {
        var Gegenstand = Gegenstände[Gegenstand_Name];

        // Hier benutzen wir ein Element ("Gegenstand_Vorlage") als Kopiervorlage.
        // Wir erzeugen automatisch nochmal genau das gleiche Element, verändern es und fügen
        // es dann hinzu. So entstehen automatisch weitere Elemente für jeden Gegenstand.

        var Gegenstand_Vorlage = document.getElementById("Gegenstand_Vorlage");
        var Raum_div = document.getElementById("Raum");
        var Gegenstand_div = Gegenstand_Vorlage.cloneNode(true);
        var Gegenstand_img = Gegenstand_div.getElementsByTagName("img")[0];

        Gegenstand_div.setAttribute("id", "Gegenstand_" + Gegenstand_Name);
        if (Gegenstand.wo.links) { Gegenstand_div.style.left = Gegenstand.wo.links + "px"; }
        if (Gegenstand.wo.oben) { Gegenstand_div.style.top = Gegenstand.wo.oben + "px"; }
        if (Gegenstand.wo.breit) { Gegenstand_div.style.width = Gegenstand.wo.breit + "px"; }
        if (Gegenstand.wo.hoch) { Gegenstand_div.style.height = Gegenstand.wo.hoch + "px"; }
        if (Gegenstand.wo.gedreht) {
            Gegenstand_div.style.transform = "rotate(" + Gegenstand.wo.gedreht + "deg)";
        }

        Gegenstand_img.setAttribute("src", Gegenstand_Name + ".png");

        Raum_div.appendChild(Gegenstand_div);


        // ... und nun nochmal das gleiche Prinzip im Besitz
        var Gegenstand_in_Besitz_Vorlage = document.getElementById("Gegenstand_in_Besitz_Vorlage");
        var Besitz_div = document.getElementById("Besitz");
        var Gegenstand_in_Besitz_div = Gegenstand_in_Besitz_Vorlage.cloneNode(true);
        var Gegenstand_in_Besitz_img = Gegenstand_in_Besitz_div.getElementsByTagName("img")[0];

        Gegenstand_in_Besitz_div.setAttribute("id", "Gegenstand_in_Besitz_" + Gegenstand_Name);
        Gegenstand_in_Besitz_img.setAttribute("src", Gegenstand_Name + ".png");
        Besitz_div.appendChild(Gegenstand_in_Besitz_div);

    }

}

bereite_Spiel_vor();

function zeige_Spiel_an() {

    document.getElementById("Status-Raum").innerText = Spiel.Spieler.im_Raum;
    document.getElementById("Status-Aktion").innerText = Spiel.Spieler.macht_Aktion;

    document.getElementById("IQ").innerText = "IQ: " + Spiel.Spieler.hat_IQ;

    document.getElementById("Raum-Bild").src = Spiel.Spieler.im_Raum + ".png";

    document.getElementById("Luan_10").classList.add(Spiel.Spieler.im_Raum);

    if ( Spiel.Spieler.vorheriger_Raum != "" ) {

        document.getElementById("Luan_10").classList.remove(Spiel.Spieler.vorheriger_Raum);

    }

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

    document.getElementById( "Gegenstand_" + Gegenstand_Name ).onclick = (function(Gegenstand) {
        return function() {

            var mögliche_Aktion = Gegenstand.mögliche_Aktionen[Spiel.Spieler.macht_Aktion];
            if ( mögliche_Aktion && mögliche_Aktion.wo == "im_Raum" ) {
                mögliche_Aktion.ausführen();
                Spiel.Spieler.macht_Aktion = "keine";
                zeige_Spiel_an();
            }
        };
    }( Gegenstand ));

    var element = document.getElementById( "Gegenstand_in_Besitz_" + Gegenstand_Name );
    if (element != null) {
        element.onclick = (function(Gegenstand) {
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
