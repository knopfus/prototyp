
window.Räume = {

    Zimmer_Gegenwart: {

        mögliche_Aktionen: {
            gehe_zu: { Raum: "Zimmer_Vergangenheit" }
        }

    },

    Zimmer_Vergangenheit: {

        mögliche_Aktionen: {
            gehe_zu: { Raum: "Höhle_Vergangenheit" }
        }

    },

    Höhle_Vergangenheit: {

        mögliche_Aktionen: { }

    }
};

window.Gegenstände = {

    "Bücher": {

        wo: { Raum: "Zimmer_Gegenwart", links: 200, oben: 180, breit: 100, hoch: 75 },

        mögliche_Aktionen: {
            nehmen: { wo: "im_Raum" },
            lernen: { wo: "im_Besitz", zusätzlicher_IQ: 2, gelernt: false }
        }

    },

    "Computer": {

        wo: { Raum: "Zimmer_Gegenwart", links: 500, oben: 350, breit: 100, hoch: 75 },

        mögliche_Aktionen: {
            nehmen: { wo: "im_Raum" },
            lernen: { wo: "im_Besitz", zusätzlicher_IQ: 3, gelernt: false }
        }

    },

    "Zeitmaschine_Höhle_Vergangenheit": {

        wo: { Raum: "Höhle_Vergangenheit", links: 360, oben: 70, breit: 100, hoch: 100 },

        mögliche_Aktionen: {
            gehe_zu: { wo: "im_Raum", Raum: "Zimmer_Gegenwart" }
        }

    },

    "Zeitmaschine_Zimmer_Gegenwart": {

        wo: { Raum: "Zimmer_Gegenwart", links: 614, oben: 70, breit: 80, hoch: 100, gedreht: 263 },

        mögliche_Aktionen: {
            gehe_zu: { wo: "im_Raum", Raum: "Höhle_Vergangenheit" }
        }

    }
};

window.Aktionen = {

    gehe_zu: function( Gegenstand, Raum, Spieler, Aktion ) {

        Spieler.vorheriger_Raum = Spieler.im_Raum;
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
    vorheriger_Raum: "",
    macht_Aktion: "keine",

    besitzt_Gegenstände: [],

    hat_IQ: 130

}
