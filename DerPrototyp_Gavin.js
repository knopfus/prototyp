
window.Räume = {

    Zimmer_Gegenwart: {

        mögliche_Aktionen: {
            gehe_zu: { Ziel_Raum_Name: "Zimmer_Vergangenheit" }
        }

    },

    Zimmer_Vergangenheit: {

        mögliche_Aktionen: {
            gehe_zu: { Ziel_Raum_Name: "Höhle_Vergangenheit" }
        }

    },

    Höhle_Vergangenheit: {

        mögliche_Aktionen: { }

    }
};


window.Gegenstände = {

    "Bücher": {

        wo: { Raum_Name: "Zimmer_Gegenwart", links: 200, oben: 180, breit: 100, hoch: 75 },

        mögliche_Aktionen: {
            nehmen: { wo: "im_Raum" },
            lernen: { wo: "im_Besitz", zusätzlicher_IQ: 2, gelernt: false }
        }

    },

    "Computer": {

        wo: { Raum_Name: "Zimmer_Gegenwart", links: 500, oben: 350, breit: 100, hoch: 75 },

        mögliche_Aktionen: {
            nehmen: { wo: "im_Raum" },
            lernen: { wo: "im_Besitz", zusätzlicher_IQ: 3, gelernt: false }
        }

    },

    "Zeitmaschine_Höhle_Vergangenheit": {

        wo: { Raum_Name: "Höhle_Vergangenheit", links: 360, oben: 70, breit: 100, hoch: 100 },

        mögliche_Aktionen: {
            gehe_zu: { wo: "im_Raum", Ziel_Raum_Name: "Zimmer_Gegenwart" }
        }

    },

    "Zeitmaschine_Zimmer_Gegenwart": {

        wo: { Raum_Name: "Zimmer_Gegenwart", links: 614, oben: 70, breit: 80, hoch: 100, gedreht: 263 },

        mögliche_Aktionen: {
            gehe_zu: { wo: "im_Raum", Ziel_Raum_Name: "Höhle_Vergangenheit" }
        }

    }
};


window.Aktionen = {

    gehe_zu: function( Gegenstand, Raum, Spielstand, Aktion ) {

        Spielstand.vorheriger_Raum_Name = Spielstand.aktueller_Raum_Name;
        Spielstand.aktueller_Raum_Name = Aktion.Ziel_Raum_Name;

    },

    nehmen: function( Gegenstand, Raum, Spielstand, Aktion ) {

        Raum.Gegenstände.entfernen(Gegenstand);
        Spielstand.Gegenstände_in_Besitz.hinzufügen( Gegenstand );

    },

    lernen: function( Gegenstand, Raum, Spielstand, Aktion ) {

        if (Aktion.gelernt == false) {
            Spielstand.aktueller_IQ += Aktion.zusätzlicher_IQ;
        }

        Aktion.gelernt = true;

    }

}


window.Spielstand = {

    aktueller_Raum_Name: "Höhle_Vergangenheit",
    vorheriger_Raum_Name: "",

    aktuelle_Aktion_Name: "",

    Gegenstände_in_Besitz: [],

    aktueller_IQ: 130

}
