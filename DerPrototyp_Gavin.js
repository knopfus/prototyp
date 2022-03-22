
window.Räume = {

    Gegenwart: {

        mögliche_Aktionen: {
            gehe_zu: { Raum: "Vergangenheit" }
        },

        Bild_Datei: "Zimmer-Vergangenheit.png"
    },

    Vergangenheit: {

        mögliche_Aktionen: {
            gehe_zu: { Raum: "Gegenwart" }
        },

        Bild_Datei: "Zimmer-Vergangenheit.png"
    }

};

window.Gegenstände = {

    "Bücher": {

        in_Raum: "Gegenwart",

        mögliche_Aktionen: {
            nehmen: { wo: "im_Raum" },
            lernen: { wo: "im_Besitz", zusätzlicher_IQ: 2 }
        }

    }
};

window.Aktionen = {

    gehe_zu: function( Gegenstand, Raum, Spieler ) {

        Spieler.im_Raum = Raum.mögliche_Aktionen.gehe_zu.Raum;

    },

    nehmen: function( Gegenstand, Raum, Spieler ) {

        var index = Raum.Gegenstände.indexOf( Gegenstand );
        Raum.Gegenstände.splice( index );
        Spieler.besitzt_Gegenstände.push( Gegenstand );

    },

    lernen: function( Gegenstand, Raum, Spieler ) {

        Spieler.hat_IQ += Gegenstand.mögliche_Aktionen.lernen.zusätzlicher_IQ;

    }

}

window.Spieler = {

    im_Raum: "Vergangenheit",
    macht_Aktion: "keine",

    besitzt_Gegenstände: [],

    hat_IQ: 130

}
