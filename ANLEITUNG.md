# Gedankenblasen online stellen und aufs iPhone holen

## 1. Kostenlos online stellen mit GitHub Pages

1. Erstelle ein kostenloses Konto auf github.com.
2. Klicke oben rechts auf **+** → **New repository**.
   - Name: `gedankenblasen`
   - Sichtbarkeit: **Public** (für das kostenlose GitHub Pages nötig)
   - Auf **Create repository** klicken.
3. Klicke auf **uploading an existing file**.
4. Ziehe den **Inhalt** dieses Ordners hinein (nicht den Ordner selbst):
   `index.html`, `manifest.webmanifest`, `sw.js` und den Ordner `icons`.
5. Unten auf **Commit changes** klicken.
6. Gehe zu **Settings → Pages**.
   - Source: **Deploy from a branch**
   - Branch: **main**, Ordner **/ (root)** → **Save**
7. Nach 1–2 Minuten steht oben dein Link, etwa:
   `https://DEIN-NAME.github.io/gedankenblasen/`

Hinweis: Der Code ist öffentlich sichtbar, die Einträge deiner Freund*innen aber nicht.
Die bleiben nur auf deren eigenem Handy.

## 2. Auf dem iPhone installieren

1. Link in **Safari** öffnen.
2. Unten auf **Teilen** (Quadrat mit Pfeil) tippen.
3. **Zum Home-Bildschirm** wählen → **Hinzufügen**.
4. Fertig: Das Blasen-Icon liegt jetzt auf dem Home-Bildschirm und öffnet im Vollbild.

Wichtig: Immer über das Icon öffnen, nicht über Safari.
Die App auf dem Home-Bildschirm hat ihren eigenen Speicher.

## 3. Updates veröffentlichen

1. Geänderte Dateien bei GitHub erneut hochladen.
2. In `sw.js` die Zeile `const VERSION = "gedankenblasen-v1";` hochzählen (v2, v3 …).
3. Die Handys laden die neue Version beim nächsten oder übernächsten Öffnen.

## 4. Gut zu wissen

- Die Einträge liegen nur auf dem jeweiligen Gerät. Wer die App vom Home-Bildschirm löscht, löscht auch die Einträge.
- Sicherung: Schild-Symbol oben rechts → **Sicherung herunterladen** → am iPhone **In Dateien sichern**.
- Offline: Nach dem ersten Öffnen funktioniert die App auch ohne Internet.
