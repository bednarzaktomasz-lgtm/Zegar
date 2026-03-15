# 📱 Instrukcje Publikacji na GitHub Pages jako PWA

## Co zostało przygotowane:

✅ **manifest.json** - Manifest PWA z ikonami, opisem i ustawieniami<br>
✅ **service-worker.js** - Service Worker do obsługi offline<br>
✅ **index.html** - Strona główna z PWA meta tagami i instalacją<br>
✅ **.nojekyll** - Plik dla GitHub Pages

---

## 🚀 Kroki do Publikacji

### 1. Dodaj pliki do Git
```bash
cd /path/to/Zegar
git add manifest.json service-worker.js index.html .nojekyll
git commit -m "Add PWA support: manifest, service worker, and GitHub Pages config"
```

### 2. Push na GitHub
```bash
git push origin main
# lub
git push origin master
```

### 3. Konfiguracja GitHub Pages

1. Przejdź do: **https://github.com/bednarzaktomasz-lgtm/Zegar/settings**
2. W lewym menu: **Code and automation** → **Pages**
3. Build and deployment:
   - **Source**: Ustaw na `Deploy from a branch`
   - **Branch**: Wybierz `main` (lub `master`) i folder `/root`
   - Kliknij **Save**

GitHub automatycznie wdroży aplikację.

---

## ✨ Funkcjonalność PWA

### 🔄 Service Worker
- Cache zasobów dla offline mode
- Update v1 → v2 automatu cally
- Fallback na start.html gdy offline

### 📲 Instalacja aplikacji
- Prompt instalacji po 2 sekundach
- Support iOS (Apple Touch Icon)
- Support Android (Full PWA)
- Shortcuty do trybu nauki i quizu

### 📦 Manifest
- Ikony SVG (192px, 512px)
- Tilamat: `standalone` (wygląda jak natywna app)
- Ikona Apple Touch dla iOS
- Kategorie: education, productivity

---

## 🌐 URL Aplikacji

Po wdrożeniu dostęp do aplikacji:
```
https://bednarzaktomasz-lgtm.github.io/Zegar/
```

Lub bezpośrednio index.html:
```
https://bednarzaktomasz-lgtm.github.io/Zegar/index.html
```

---

## 📱 Instalacja na Urządzeniu

### Android
1. Otwórz aplikację w Chrome
2. Kliknij menu (⋮) → **Zainstaluj aplikację**
3. Potwierdzenie → Aplikacja na ekranie głównym

### iOS
1. Otwórz Safari
2. Kliknij udostępnianie (↗️)
3. **Dodaj do ekranu głównego**
4. Potwierdź nazwę → Dodaj

---

## 🔧 Aktualizacje Aplikacji

Service Worker automatycznie:
- Cache'a zasoby offline
- Sprawdza aktualizacje co 60 sekund
- Powiadamia o nowej wersji

### Ciąg wersjonowania
Zmień wersję w `service-worker.js`:
```javascript
const CACHE_NAME = 'zegar-v2'; // Zmień z v1 na v2
```

---

## 🐛 Tryb Offline

Wszystkie strony zostały cache'owane:
- start.html (index.html)
- nauka.html
- godziny.html
- wpisz.html
- ustaw.html
- ustawienia.html
- clock-renderer.js
- clock-styles.css
- manifest.json

---

## ⚙️ Zmienne Środowiskowe

Jeśli chcesz zmienić BASE_PATH (np. na localhost):

```javascript
// service-worker.js
const BASE_PATH = '/Zegar'; // Zmień tutaj
```

---

## 📚 Dodatkowe Informacje

- **PWA Checklist**: https://www.w3.org/TR/appmanifest/
- **Service Workers**: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- **GitHub Pages Docs**: https://docs.github.com/en/pages

---

## ✅ Checklist Wdrożenia

- [ ] Pliki dodane do Git
- [ ] Push do GitHub
- [ ] GitHub Pages skonfigurowana
- [ ] Aplikacja dostępna na HTTPS
- [ ] Service Worker rejestruje się (Console: ✅ Service Worker zarejestrowany)
- [ ] Prompt instalacji pojawia się
- [ ] Offline mode działa
- [ ] Ikony wyświetlają się prawidłowo

---

**Gotowe! 🎉 Twoja aplikacja Zegar jest teraz Progressive Web App na GitHub Pages!**
