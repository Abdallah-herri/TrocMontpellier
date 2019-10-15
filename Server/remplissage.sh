mongoimport --db allovoisins --collection membres 				--file JSON/Membres.json 			--jsonArray --drop
mongoimport --db allovoisins --collection biens	  				--file JSON/Biens.json   			--jsonArray --drop
mongoimport --db allovoisins --collection services 				--file JSON/Services.json 			--jsonArray --drop
mongoimport --db allovoisins --collection disponibilites 		--file JSON/Disponibilites.json 		--jsonArray --drop
mongoimport --db allovoisins --collection utilisations 			--file JSON/Utilisations.json 		--jsonArray --drop
mongoimport --db allovoisins --collection descriptifs 		--file JSON/Descriptifs.json 	--jsonArray --drop
