
window.Räume = {

    Zimmer_Gegenwart: {

        mögliche_Aktionen: {
            gehe_zu: { Ziel_Raum_Name: "Zimmer_Vergangenheit", Luan_10: { links: 200, oben: 200 } }
        }

    },

    Zimmer_Vergangenheit: {

        mögliche_Aktionen: {
            gehe_zu: { Ziel_Raum_Name: "Labor", Luan_10: { links: 200, oben: 490 } }
        }

    },

    Höhle_Vergangenheit: {

        mögliche_Aktionen: { }

    },

    Labor: {

        mögliche_Aktionen: {
            gehe_zu: { Ziel_Raum_Name: "Höhle_Vergangenheit", Luan_10: { links: 200, oben: 490 } }
        }
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

        wo: { Raum_Name: "Höhle_Vergangenheit", links: 669, oben: 480, breit: 80, hoch: 150, gedreht: 263 },

        mögliche_Aktionen: {
            gehe_zu: {
                wo: "im_Raum",
                Ziel_Raum_Name: "Zimmer_Gegenwart",
                Luan_10: { links: 520, oben: 72, kommt_von: { links: 550, oben: 71 } }
            }
        }

    },

    "Zeitmaschine_Zimmer_Gegenwart": {

        wo: { Raum_Name: "Zimmer_Gegenwart", links: 629, oben: 40, breit: 80, hoch: 150, gedreht: 263 },

        mögliche_Aktionen: {
            gehe_zu: {
                wo: "im_Raum",
                Ziel_Raum_Name: "Höhle_Vergangenheit",
                Luan_10: { links: 560, oben: 512, kommt_von: { links: 590, oben: 511 } }
            }
        }

    }
};


window.Aktionen = {

    gehe_zu: function( Gegenstand, Raum, Spielstand, Aktion ) {

        Spielstand.vorheriger_Raum_Name = Spielstand.aktueller_Raum_Name;
        Spielstand.aktueller_Raum_Name = Aktion.Ziel_Raum_Name;

        Spielstand.Luan_10.links = Aktion.Luan_10.links;
        Spielstand.Luan_10.oben = Aktion.Luan_10.oben;
        Spielstand.Luan_10.kommt_von = Aktion.Luan_10.kommt_von;

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

    Luan_10: { links: 200, oben: 490 },

    aktuelle_Aktion_Name: "",

    Gegenstände_in_Besitz: [],

    aktueller_IQ: 130

}
