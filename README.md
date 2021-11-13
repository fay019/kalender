##Erstellen Sie eine Geburtstags-Kalender-App.

Mit der Applikation können Geburtstage verwaltet werden.
1. Anzeige aller gespeicherten Geburtstage (Liste/Tabelle)
2. Speichern neuer Geburtstage (Name + Geburtstag)
3. Löschen und Editieren bestehender Geburtstage

Verwenden Sie dazu die REST-WebApi http://wifi.1av.at/birthday/<<<TOKEN>>>

Zum Aufrufen der API benötigen Sie einen Token (= am Besten ihr Vorname), Beispiel: http://wifi.1av.at/birthday/anna

Die REST API unterstützt folgende Methoden:
GET http://wifi.1av.at/birthday/anna -> liefert alle gespeicherten Daten als JSON/Array
GET http://wifi.1av.at/birthday/anna/<<<ID>>> -> liefert gespeicherten Daten eines Datensatzes als JSON/Array
POST http://wifi.1av.at/birthday/anna -> speichert alle gesendeten Daten und antwortet mit der ID des gespeicherten Datensatzes
PUT http://wifi.1av.at/birthday/anna/<<<ID>>> -> überschreibt einen Datensatz mit gesendeten Daten komplett (ID bleibt gleich)
DELETE http://wifi.1av.at/birthday/anna/<<<ID>>> -> löscht einen Datensatz

Der Response hat unterschiedliche HTTP-Status-Codes
200 OK (bei GET Requests)
201 Created (neuer Datensatz wurde erzeugt, Antwort enthält zusätzlich ID des Datensatzes)
202 Accepted (Datensatz wurde geändert, Antwort enthält zusätzlich ID des Datensatzes)
204 No Content (Datensatz wurde erfolgreich gelöscht)
404 Not found (wenn ein Datensatz mit bestimmter ID nicht gefunden wurde, oder PUT/DELETE ohne id aufgerufen wurde)
405 Method Not Allowed (falsche Methode)

Viel Erfolg!

Zusatzaufgaben:
- Gestaltung UI mit Bootstrap // done
- Ausgabe in Kalenderform  // toDo Ask
- Anzeige wie alt eine Person ist // done
- Anzeige in wie vielen Tagen der nächste Geburtstag ist // done
- Reihung der Personen nach den nächsten Geburtstagen // done