curl --header "Content-type: application/json" -X POST --data '{"idBien":"1234", "nom":"marteau", "descriptif":"bain un marteau", "lienPhoto":"www.marteau.com", "type":"outil", "PrixNeuf":"50", "motClef":["m", "a", "r", "t", "e", "a", "u"]}' localhost:8888/creationBien