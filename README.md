# 🍉 RSVPify

> Beautiful party invites. Instant RSVPs.

A fruity, animated birthday invitation page with a built-in RSVP form that saves responses directly to Google Sheets. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Deployed on **Vercel**.

---

## ✨ Features

- 🎨 Animated fruit-themed birthday invitation
- 📋 Inline RSVP form — no popups, no redirects
- 📊 Responses saved automatically to Google Sheets via Google Apps Script
- 💫 Hydration-safe animations (no `Math.random()` on the server)
- 📱 Fully responsive — designed for mobile sharing
- ⚡ Deployed on Vercel with instant load via Next.js `<Image>` priority loading

---

## 🛠 Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Framework   | Next.js 15 (App Router)              |
| Language    | TypeScript                           |
| Styling     | Tailwind CSS                         |
| Fonts       | Fredoka One + Nunito (Google Fonts)  |
| Backend     | Google Apps Script (Web App)         |
| Database    | Google Sheets                        |
| Hosting     | Vercel                               |

---

## 📁 Project Structure

```
/
├── app/
│   └── page.tsx                  # Main invitation page
├── public/
│   └── alanis.png                # Birthday photo (add your own)
├── alanis-rsvp-script.gs         # Google Apps Script (deploy separately)
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd rsvpify
npm install
```

### 2. Add the Birthday Photo

Place the child's photo in the `/public` folder and name it:

```
public/alanis.png
```

### 3. Set Up Google Sheets Integration

1. Open your Google Sheet
2. Click **Extensions → Apps Script**
3. Delete any existing code and paste the contents of `alanis-rsvp-script.gs`
4. Click **Save**, then **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** and authorise access
6. Copy the **Web App URL**

### 4. Add the Script URL

In `app/page.tsx`, replace the placeholder with your Web App URL:

```ts
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec";
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploying to Vercel

This project is already deployed on Vercel. To redeploy after changes:

```bash
git add .
git commit -m "your message"
git push
```


---

## 📝 License

Built with ❤️ for Alanis's 1st birthday 🍉

---