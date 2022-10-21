# Koodihaaste

<p>Ohjelma on toteuttu käyttäen linux ubuntua käyttöjärjestelmänä</p>
<p>Bäkkärinä toimii Node.js, sisältää oman rajapinnan api kutsuille joka reitittää Finelille, paikallinen json on myös käytössä</p>
<p>Fronttina on perus html, css ja javascript. Ei mitään sen ihmeellisempää. Jquery ja fontawesome on myös mukana</p>
<p>Finelin data mapataan olioihin niinkuin tehtävän annossa pyydettiin</p>

<p>Default portti 3000. Konffaus .env tiedostossa</p>
  
<h3>Asennus</h3>
<p>Onnistuu perus nodejs ajo kuin myös dockerin avulla</p>

```
npm install
node app.js
```

```
docker build -t app .
docker run -p 80:3000 -d --name app app
```

<p>Osallistun arvontaan ja minuun saa ottaa yhteyttä ;)</p>
