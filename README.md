
# 🌹 Romantic Birthday Website

A handcrafted, cinematic birthday surprise website — made with love, built with HTML5, CSS3, JavaScript, GSAP, ScrollTrigger, and Lenis.

---

## 📁 Project Structure

```
Birth_month/
├── index.html              ← Main HTML file
├── css/
│   └── style.css           ← All styles
├── js/
│   ├── config.js           ← ⭐ EDIT THIS to personalize everything
│   └── script.js           ← All interactive logic
├── assets/
│   ├── images/             ← Put your photos here
│   │   ├── memory-01.jpg
│   │   ├── memory-02.jpg
│   │   ├── memory-03.jpg
│   │   ├── memory-04.jpg
│   │   ├── memory-05.jpg
│   │   ├── memory-06.jpg
│   │   ├── story-01.jpg
│   │   ├── story-02.jpg
│   │   └── story-03.jpg
│   └── music/
│       └── our-song.mp3    ← Put your song here
└── README.md
```

---

## 🚀 How to Run Locally

### Option 1 — VS Code Live Server (Recommended)
1. Open the `Birth_month` folder in VS Code
2. Install the **Live Server** extension by Ritwick Dey
3. Right-click `index.html` → **Open with Live Server**
4. It opens at `http://127.0.0.1:5500`

### Option 2 — Python (no install needed)
```bash
cd Birth_month
python -m http.server 8080
# Open http://localhost:8080
```

### Option 3 — Node.js
```bash
npx serve .
```

> ⚠️ **Do NOT open index.html directly as a file** (`file://...`) — fonts and some features require an HTTP server.

---

## ✏️ How to Personalize

### 1. Change Her Name / Your Name
Open `js/config.js` and edit:
```javascript
girlfriendName: "HER NAME",   // ← Her name
yourName:       "YOUR NAME",  // ← Your name
```
These are automatically used everywhere in the website.

### 2. Add Your Photos

Place your photos in `assets/images/` and use these exact filenames:

| Filename | Used in |
|----------|---------|
| `memory-01.jpg` to `memory-06.jpg` | Photo gallery (Polaroid section) |
| `story-01.jpg` to `story-03.jpg` | "Our Story" section |

You can also update the paths in `config.js` under `memories` and `ourStory` arrays.

**Recommended image sizes:**
- Memory photos: square (600×600px or similar)
- Story photos: portrait (600×750px or similar)

**Tip:** Compress photos before using (use [squoosh.app](https://squoosh.app)) — aim for under 300KB each.

### 3. Add Your Song
1. Copy your MP3 to `assets/music/our-song.mp3`
2. The music button (🎵) in the bottom-right corner starts/stops it
3. Music does **not** autoplay (browsers block this — she must tap the button)

### 4. Edit the Love Letter
In `js/config.js`, find the `loveLetter` section:
```javascript
loveLetter: {
    greeting: "Dear [HER NAME],",
    paragraphs: [
        "Your first paragraph here...",
        "Second paragraph...",
        // Add as many as you like
    ],
    closing:   "Happy Birthday, my love. ❤️",
    signature: "— [YOUR NAME]"
},
```
Replace the paragraph text with your own words.

### 5. Change Timeline Entries
In `js/config.js`, find the `timeline` array:
```javascript
timeline: [
    {
        index: "01",
        title: "The Beginning",
        date:  "January 2024",    // ← Real date
        description: "Our story started here...",
        image: "/assets/images/memory-01.jpg"  // optional
    },
    // ... more entries
]
```

### 6. Edit "Our Story" Section
In `js/config.js`, find the `ourStory` array and replace the dates, titles, and text paragraphs.

### 7. Edit Love Cards
In `js/config.js`, find the `loveCards` array. Customize each card's title and description.

### 8. Edit the Secret Message
```javascript
secretMessage: "Your secret message here...",
```

### 9. Edit the Final Message
```javascript
finalMessage: [
    "Line one of your message.",
    "Line two.",
    // etc.
],
```

---

## 🎂 How Birthday Detection Works

The website reads the current date from the visitor's browser.

- **Before 27 October 2026:** Shows a live countdown.
- **On 27 October 2026:** Automatically activates Birthday Mode — a cinematic sequence plays with the cake, confetti, and fireworks. She can click the cake to blow out the candles.
- **After 27 October 2026:** Shows "Your special day has arrived. ❤️"

The birthday date is set in `config.js`:
```javascript
birthday: "2026-10-27",
```

---

## 🌐 Deploy to Netlify (Easiest)

### Option A — Drag & Drop
1. Go to [netlify.com](https://netlify.com) and log in
2. In your dashboard, look for **"Sites"** → drag the entire `Birth_month` folder onto the page
3. Netlify gives you a URL like `https://random-name.netlify.app`
4. (Optional) Customize the URL in **Site settings → Site name**

### Option B — Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

---

## 🌐 Deploy to GitHub Pages

1. Push the project to a GitHub repository:
```bash
git init
git add .
git commit -m "Birthday website ❤️"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

2. In GitHub: **Settings → Pages → Source → Deploy from branch → main / root**
3. Your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/`

> **Tip:** Make the repository **private** so only people with the link can access it.

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Fonts not loading | Run via HTTP server, not `file://` |
| Music not playing | She must tap 🎵 button first (browser policy) |
| Photos showing as placeholder | Check file names match exactly, including case |
| Birthday mode not triggering | Check `config.js` birthday date format: `"2026-10-27"` |
| Animations too heavy | The site respects `prefers-reduced-motion` automatically |

---

## 💌 Easter Eggs (don't spoil these!)

There are 3 hidden interactions:
1. **Click the small ✦ star** in the October countdown section — reveals a secret message
2. **Double-click any polaroid photo** — floating hearts appear
3. **Click the ❤️ on the final screen** — reveals a hidden message

---

*Made with love. ❤️*
