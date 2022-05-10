// Weil die "splice" Funktion so komisch ist, machen wir eine "entfernen" Funktion
Array.prototype.entfernen = function( element ) {
    var index = this.indexOf( element );
    this.splice( index, 1 );
};

Array.prototype.hinzufügen = function( element ) {
    this.push( element );
};

window.Spiel = (function(Räume, Gegenstände, Aktionen, Spielstand) {

    // Räume mit "ihren" Gegenständen füllen
    for (var Raum_Name in Räume) {
        var Raum = Räume[Raum_Name];
        Räume[Raum_Name].Gegenstände = [];
    }
    for (var Gegenstand_Name in Gegenstände) {
        var Gegenstand = Gegenstände[Gegenstand_Name];
        if ( Gegenstand.wo ) {
            Räume[ Gegenstand.wo.Raum_Name ].Gegenstände.hinzufügen( Gegenstand );
        }
    }

    // mögliche_Aktionen im Raum mit Magie versehen
    for (var Raum_Name in Räume) {
        var Raum = Räume[Raum_Name];
        for (var Aktion_Name in Raum.mögliche_Aktionen) {
            var Aktion = Raum.mögliche_Aktionen[Aktion_Name];
            Aktion.ausführen = (function(Aktion_Name, Raum, Spielstand, Aktion) {
                return function() {
                    Aktionen[Aktion_Name]( "keiner", Raum, Spielstand, Aktion );
                };
            }( Aktion_Name, Raum, Spielstand, Aktion ));
        }        
    }

    // mögliche_Aktionen im Gegenstand mit Magie versehen
    for (var Gegenstand_Name in Gegenstände) {
        var Gegenstand = Gegenstände[Gegenstand_Name];
        for (var Aktion_Name in Gegenstand.mögliche_Aktionen) {
            var Aktion = Gegenstand.mögliche_Aktionen[Aktion_Name];
            Aktion.ausführen = (function( Aktion_Name, Gegenstand, Räume, Spielstand, Aktion ) {
                return function() {
                    Aktionen[Aktion_Name]( Gegenstand, Räume[Spielstand.aktueller_Raum_Name], Spielstand, Aktion );
                };
            }( Aktion_Name, Gegenstand, Räume, Spielstand, Aktion ));
        }
    }

    return {
        Räume: Räume,
        Gegenstände: Gegenstände,
        Aktionen: Aktionen,
        Spielstand: Spielstand
    };

} (window.Räume, window.Gegenstände, window.Aktionen, window.Spielstand));





// "Ausgabe" -- der folgende Code macht das Spiel im HTML-Dokument sichtbar.


function Gegenstände_in_Besitz_anzeigen() {
    for (var Gegenstand_Name in Spiel.Gegenstände) {
        var Gegenstand = Spiel.Gegenstände[Gegenstand_Name];
        var element = document.getElementById( "Gegenstand_in_Besitz_" + Gegenstand_Name );

        if (element != null) {
            if (Spielstand.Gegenstände_in_Besitz.includes(Gegenstand)) {
                element.style.display = ""; // display von CSS erben
            } else {
                element.style.display = "none"; // display mit "none" übersteuern
            }
        }
    }
}

function Gegenstände_im_Raum_anzeigen() {
    var Raum = Spiel.Räume[Spiel.Spielstand.aktueller_Raum_Name];

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
        if ( Spielstand.aktuelle_Aktion_Name == Aktion_Name ) {
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
        if (Gegenstand.mögliche_Aktionen && Gegenstand.mögliche_Aktionen.nehmen) {
            var Gegenstand_in_Besitz_Vorlage = document.getElementById("Gegenstand_in_Besitz_Vorlage");
            var Besitz_div = document.getElementById("Besitz");
            var Gegenstand_in_Besitz_div = Gegenstand_in_Besitz_Vorlage.cloneNode(true);
            var Gegenstand_in_Besitz_img = Gegenstand_in_Besitz_div.getElementsByTagName("img")[0];

            Gegenstand_in_Besitz_div.setAttribute("id", "Gegenstand_in_Besitz_" + Gegenstand_Name);
            Gegenstand_in_Besitz_img.setAttribute("src", Gegenstand_Name + ".png");
            Besitz_div.appendChild(Gegenstand_in_Besitz_div);
        }

    }

}

bereite_Spiel_vor();

function zeige_Spiel_an() {

    document.getElementById("Status-Raum").innerText = Spiel.Spielstand.aktueller_Raum_Name;
    document.getElementById("Status-Aktion").innerText = Spiel.Spielstand.aktuelle_Aktion_Name;

    document.getElementById("IQ").innerText = "IQ: " + Spiel.Spielstand.aktueller_IQ;

    document.getElementById("Ideen").innerText = "Ideen: " + Spiel.Spielstand.aktuelle_Ideen;

    document.getElementById("Raum-Bild").src = Spiel.Spielstand.aktueller_Raum_Name + ".png";

    var Luan_10 = Spiel.Spielstand.Luan_10,
        Luan_10_div = document.getElementById("Luan_10");

    Luan_10_div.style.transition = "";

    if (Luan_10.kommt_von) {
        Luan_10_div.style.left = Luan_10.kommt_von.links + "px";
        Luan_10_div.style.top = Luan_10.kommt_von.oben + "px";
        Luan_10.kommt_von = null;
        window.setTimeout(function() {
            Luan_10_div.style.transition = "left 1s, top 1s";
            Luan_10_div.style.left = Luan_10.links + "px";
            Luan_10_div.style.top = Luan_10.oben + "px";
        }, 0);
    } else {
        Luan_10_div.style.left = Luan_10.links + "px";
        Luan_10_div.style.top = Luan_10.oben + "px";
    }

    var Luan_12 = Spiel.Spielstand.Luan_12,
    Luan_12_div = document.getElementById("Luan_12");

Luan_12_div.style.transition = "";

if (Luan_12.kommt_von) {
    Luan_12_div.style.left = Luan_12.kommt_von.links + "px";
    Luan_12_div.style.top = Luan_12.kommt_von.oben + "px";
    Luan_12.kommt_von = null;
    window.setTimeout(function() {
        Luan_12_div.style.transition = "left 1s, top 1s";
        Luan_12_div.style.left = Luan_12.links + "px";
        Luan_12_div.style.top = Luan_12.oben + "px";
    }, 0);
} else {
    Luan_12_div.style.left = Luan_12.links + "px";
    Luan_12_div.style.top = Luan_12.oben + "px";
}


    Gegenstände_in_Besitz_anzeigen();
    Gegenstände_im_Raum_anzeigen();
    ausgewählte_Aktion_anzeigen();

}



// --- Nun versehen wir die Aktionsknöpfe mit Magie:
for (var Aktion_Name in Spiel.Aktionen) {
    document.getElementById("Aktion-" + Aktion_Name).onclick = (function(Aktion_Name) {
        return function() {
            Spiel.Spielstand.aktuelle_Aktion_Name = Aktion_Name;
            zeige_Spiel_an();
        };
    }( Aktion_Name ));
}



// --- Nun versehen wir die Gegenstände mit Magie:
for (var Gegenstand_Name in Spiel.Gegenstände) {
    var Gegenstand = Spiel.Gegenstände[Gegenstand_Name];

    document.getElementById( "Gegenstand_" + Gegenstand_Name ).onclick = (function(Gegenstand) {
        return function() {

            var Aktion = Gegenstand.mögliche_Aktionen[Spiel.Spielstand.aktuelle_Aktion_Name];
            if ( Aktion && (Aktion.wo == "im_Raum" || Array.isArray(Aktion.wo) && Aktion.wo.includes("im_Raum") )) {
                Aktion.ausführen();
                Spiel.Spielstand.aktuelle_Aktion_Name = "";
                zeige_Spiel_an();
            }
        };
    }( Gegenstand ));

    var element = document.getElementById( "Gegenstand_in_Besitz_" + Gegenstand_Name );
    if (element != null) {
        element.onclick = (function(Gegenstand) {
            return function() {

                var Aktion = Gegenstand.mögliche_Aktionen[Spiel.Spielstand.aktuelle_Aktion_Name];
                if ( Aktion && (Aktion.wo == "im_Besitz" || Array.isArray(Aktion.wo) && Aktion.wo.includes("im_Besitz")) ) {
                    Aktion.ausführen();
                    Spiel.Spielstand.aktuelle_Aktion_Name = "";
                    zeige_Spiel_an();
                }
            };
        }( Gegenstand ));
    }
}


// --- Und man muss die Aktion auch ausführen können, indem man aufs Bild klickt
document.getElementById("Raum-Bild").onclick = function() {
    var Raum = Spiel.Räume[Spiel.Spielstand.aktueller_Raum_Name];
    var mögliche_Aktion = Raum.mögliche_Aktionen[Spiel.Spielstand.aktuelle_Aktion_Name];
    if ( mögliche_Aktion ) {
        mögliche_Aktion.ausführen();
        Spiel.Spielstand.aktuelle_Aktion_Name = "";
        zeige_Spiel_an();
    }
};


zeige_Spiel_an();
