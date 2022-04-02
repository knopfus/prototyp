
window.Räume = {

    Gegenwart: {

        mögliche_Aktionen: {
            gehe_zu: { Raum: "Vergangenheit" }
        },

        Bild_Datei: "Zimmer-Vergangenheit.png"
    },

    Vergangenheit: {

        mögliche_Aktionen: {
            gehe_zu: { Raum: "Höhle_Vergangenheit" }
        },

        Bild_Datei: "Zimmer-Vergangenheit.png"
    },

    Höhle_Vergangenheit: {

        mögliche_Aktionen: { },

        Bild_Datei: "Höhle.jpeg"
    }
};

window.Gegenstände = {

    "Bücher": {

        in_Raum: "Gegenwart",

        mögliche_Aktionen: {
            nehmen: { wo: "im_Raum" },
            lernen: { wo: "im_Besitz", zusätzlicher_IQ: 2, gelernt: false }
        }

    },

    "Computer": {

        in_Raum: "Gegenwart",

        mögliche_Aktionen: {
            nehmen: { wo: "im_Raum" },
            lernen: { wo: "im_Besitz", zusätzlicher_IQ: 3, gelernt: false }
        }

    },

    "Zeitmaschine_Höhle_Vergangenheit": {

        in_Raum: "Höhle_Vergangenheit",

        mögliche_Aktionen: {
            gehe_zu: { wo: "im_Raum", Raum: "Gegenwart" }
        }

    },

    "Zeitmaschine_Zimmer_Gegenwart": {

        in_Raum: "Gegenwart",

        mögliche_Aktionen: {
            gehe_zu: { wo: "im_Raum", Raum: "Höhle_Vergangenheit" }
        }

    }
};

window.Aktionen = {

    gehe_zu: function( Gegenstand, Raum, Spieler, Aktion ) {

        Spieler.im_Raum = Aktion.Raum;

    },

    nehmen: function( Gegenstand, Raum, Spieler, Aktion ) {

        var index = Raum.Gegenstände.indexOf( Gegenstand );
        Raum.Gegenstände.splice( index, 1 );
        Spieler.besitzt_Gegenstände.push( Gegenstand );

    },

    lernen: function( Gegenstand, Raum, Spieler, Aktion ) {
        if (Gegenstand.mögliche_Aktionen.lernen.gelernt == false) {
            Spieler.hat_IQ += Gegenstand.mögliche_Aktionen.lernen.zusätzlicher_IQ;
        }
        Gegenstand.mögliche_Aktionen.lernen.gelernt = true;
    }

}

window.Spieler = {

    im_Raum: "Höhle_Vergangenheit",
    macht_Aktion: "keine",

    besitzt_Gegenstände: [],

    hat_IQ: 130

}
