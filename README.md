# Koodihaaste

<p>Ohjelma on toteuttu käyttäen linux ubuntua käyttöjärjestelmänä</p>
<p>Bäkkärinä toimii Node.js, sisältää oman rajapinnan api kutsuille joka reitittää Finelille, paikallinen json on myös käytössä</p>
<p>Fronttina on perus html, css ja javascript. Ei mitään sen ihmeellisempää. Jquery ja fontawesome on myös mukana</p>
<p>Finelin data mapataan olioihin niinkuin tehtävän annossa pyydettiin</p>

<h3>Asennus</h3>
<p>Onnistuu perus nodejs ajo kuin myös dockerin avulla</p>

```
<p>docker build -t app .</p>
<p>docker run 80:3000 -d --name app app</p>
```

<p>npm install</p>
<p>node app.js</p>
