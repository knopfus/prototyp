
window.Räume = {

    Zimmer_Gegenwart: {

        mögliche_Aktionen: {
            gehe_zu: { Ziel_Raum_Name: "Wiese_Gegenwart", Luan_10: { links: 200, oben: 200 } }
        }

    },

    Zimmer_Vergangenheit: {

        mögliche_Aktionen: {
            gehe_zu: { Ziel_Raum_Name: "Wiese_Vergangenheit", Luan_10: { links: 310, oben: 445, kommt_von: { links: 0, oben: 300 } } }
        }

    },

    Höhle_Gegenwart: {

        mögliche_Aktionen: { }

    },

    Höhle_Vergangenheit: {

        mögliche_Aktionen: {
            gehe_zu: { Ziel_Raum_Name: "Wiese_Vergangenheit", Luan_10: { links: 310, oben: 445, kommt_von: { links: 0, oben: 300 } } }
        }

    },

    Labor_Vergangenheit: {

        mögliche_Aktionen: {}

    },

    Labor_Gegenwart: {

        mögliche_Aktionen: {}

    },

    Wiese_Vergangenheit: {

        mögliche_Aktionen: {}

    },

    Wiese_Gegenwart: {

        mögliche_Aktionen: {}

    }
};

window.Gegenstände = {

    "Stadt_Vergangenheit": {

        wo: { Raum_Name: "Wiese_Vergangenheit", links: 78, oben: -20, breit: 500, hoch: 500 }

    },

    "Stadt_Gegenwart": {

        wo: { Raum_Name: "Wiese_Gegenwart", links: 78, oben: -20, breit: 500, hoch: 500 }

    },


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

    },

    "Tür_Vergangenheit": {

        wo: { Raum_Name: "Labor_Vergangenheit", links: 400, oben: 1, breit: 150, hoch: 75 },

        mögliche_Aktionen: {
            gehe_zu: {
                wo: "im_Raum",
                Ziel_Raum_Name: "Wiese_Vergangenheit",
                Luan_10: { links: 310, oben: 445, kommt_von: { links: 0, oben: 300 } }
            }
        }
    },


   "Tür_Gegenwart": {

        wo: { Raum_Name: "Labor_Gegenwart", links: 400, oben: 1, breit: 150, hoch: 75 },

        mögliche_Aktionen: {
            gehe_zu: {
                wo: "im_Raum",
                Ziel_Raum_Name: "Wiese_Gegenwart",
                Luan_10: { links: 310, oben: 445, kommt_von: { links: 0, oben: 300 } }
            }
        }
    },


    "Haus_Vergangenheit": {

        wo: { Raum_Name: "Wiese_Vergangenheit", links: 175, oben: 165, breit: 100, hoch: 100 },

        mögliche_Aktionen: {
            gehe_zu: {
                wo: "im_Raum",
                Ziel_Raum_Name: "Zimmer_Vergangenheit",
                Luan_10: { links: 200, oben: 60, kommt_von: { links: 200, oben: 0 } }
            }
        }
    },


    "Haus_Gegenwart": {

        wo: { Raum_Name: "Wiese_Gegenwart", links: 175, oben: 165, breit: 100, hoch: 100 },

        mögliche_Aktionen: {
            gehe_zu: {
                wo: "im_Raum",
                Ziel_Raum_Name: "Zimmer_Gegenwart",
                Luan_10: { links: 200, oben: 60, kommt_von: { links: 200, oben: 0 } }
            }
        }
    },



    "Labor_Gebäude_Vergangenheit": {

        wo: { Raum_Name: "Wiese_Vergangenheit", links: 400, oben: 165, breit: 100, hoch: 100 },

        mögliche_Aktionen: {
            gehe_zu: {
                wo: "im_Raum",
                Ziel_Raum_Name: "Labor_Vergangenheit",
                Luan_10: { links: 400, oben: 60, kommt_von: { links: 400, oben: 0 } }
            }
        }
    },

    "Labor_Gebäude_Gegenwart": {

        wo: { Raum_Name: "Wiese_Gegenwart", links: 400, oben: 165, breit: 100, hoch: 100 },

        mögliche_Aktionen: {
            gehe_zu: {
                wo: "im_Raum",
                Ziel_Raum_Name: "Labor_Gegenwart",
                Luan_10: { links: 400, oben: 60, kommt_von: { links: 400, oben: 0 } }
            }
        }
    },

    "Höhle_von_aussen_Vergangenheit": {

        wo: { Raum_Name: "Wiese_Vergangenheit", links: 0, oben: 188, breit: 140, hoch: 300 },

        mögliche_Aktionen: {
            gehe_zu: {
                wo: "im_Raum",
                Ziel_Raum_Name: "Höhle_Vergangenheit",
                Luan_10: { links: 300, oben: 460, kommt_von: { links: 380, oben: 90 } }
            }
        }
    },

    "Höhle_von_aussen_Gegenwart": {

        wo: { Raum_Name: "Wiese_Gegenwart", links: 0, oben: 188, breit: 140, hoch: 300 },

        mögliche_Aktionen: {
            gehe_zu: {
                wo: "im_Raum",
                Ziel_Raum_Name: "Höhle_Gegenwart",
                Luan_10: { links: 300, oben: 460, kommt_von: { links: 380, oben: 90 } }
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

        Raum.Gegenstände.entfernen( Gegenstand );
        Spielstand.Gegenstände_in_Besitz.hinzufügen( Gegenstand );

    },

    /*einfallen: function( Gegenstand, Raum, Spielstand, Aktion ) {

        if (Aktion.eingefallen == false) {
            Spielstand.aktuelle_Ideen += Aktion.zusätzliche_Idee;
        }

        Aktion.eingefallen = true;

    },*/

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
