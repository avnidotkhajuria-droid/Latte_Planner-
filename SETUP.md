# Put LattePlanner online (about an hour, all free)

You'll set up four things: GitHub (hosts the website), Firebase (sign-in and saving),
Spotify (Mood Mix), then move your data in. Do them in this order.
Wherever you see `YOUR-USERNAME`, use your GitHub username.

---------------------------------------------------------------------------------
## 1 · GitHub: put the website online  (~15 min)

1. Make a free account at https://github.com (skip if you have one).
2. Top-right **+** → **New repository**.
   - Name: `latteplanner`
   - Public
   - Tick "Add a README file"
   - **Create repository**
3. In the new repo: **Add file → Upload files**. Unzip `latteplanner-app.zip` on your
   laptop, then drag in everything inside the folder: `index.html`, `app.js`, `config.js`,
   `sw.js`, `manifest.webmanifest`, `news.json`, `firestore.rules`, `SETUP.md`, `.nojekyll`
   and the folders `icons`, `scripts`, `src`. Press **Commit changes**.
4. The `.github` folder is often hidden and skipped by uploads, so add it by hand:
   **Add file → Create new file**, type the name `.github/workflows/news.yml`
   (the slashes make the folders), paste in the contents of that file from the zip,
   then **Commit changes**.
5. **Settings → Pages**. Source: *Deploy from a branch*. Branch: `main`, folder `/ (root)`.
   **Save**. After a minute your site is live at
   **https://YOUR-USERNAME.github.io/latteplanner/**
6. **Settings → Actions → General → Workflow permissions** → choose
   **Read and write permissions** → **Save**. This lets the morning-paper script save the news.
7. **Actions** tab → *Morning paper* → **Run workflow**. It runs by itself every day at 6:41 am from now on.

---------------------------------------------------------------------------------
## 2 · Firebase: Google sign-in and sync  (~15 min)

1. Go to https://console.firebase.google.com and sign in with your Google account.
2. **Create a project** → name it `latteplanner` → turn **off** Google Analytics → Create.
3. Left menu **Build → Authentication → Get started**.
   - Sign-in method: **Google** → Enable → pick your email as support email → **Save**.
   - **Settings** tab → **Authorised domains** → **Add domain** → `YOUR-USERNAME.github.io` → Add.
4. Left menu **Build → Firestore Database → Create database**.
   - Location: **asia-south1 (Mumbai)**
   - Start in **production mode**
   - Open the **Rules** tab, replace everything with the contents of `firestore.rules`,
     then **Publish**. This makes sure only you can read your planner.
5. Click the ⚙️ gear → **Project settings** → scroll to *Your apps* → the **</>** (Web) button →
   nickname `LattePlanner` → **Register app** (leave "Firebase Hosting" unticked).
   It shows a `firebaseConfig` with `apiKey`, `authDomain`, and so on. Keep this page open.
6. On GitHub open `config.js` → ✏️ pencil (edit) → copy each value from Firebase into the
   matching `""` → **Commit changes**.

---------------------------------------------------------------------------------
## 3 · Spotify: Mood Mix  (~10 min, optional)

1. Go to https://developer.spotify.com/dashboard, log in with your Spotify account and accept the terms.
2. **Create app**
   - App name: `LattePlanner`
   - Description: `My study planner`
   - Redirect URI: `https://YOUR-USERNAME.github.io/latteplanner/`
     (copy it exactly, **with** the last `/`) → **Add**
   - APIs used: tick **Web API** → agree → **Save**
3. Open the app → **Settings** → copy the **Client ID**.
4. On GitHub edit `config.js` again → paste it into `spotifyClientId: ""` → Commit.
5. If Spotify says your account isn't allowed: app **Settings → User Management** →
   add your own name and Spotify email.

---------------------------------------------------------------------------------
## 4 · Move in and install on your phone  (~5 min)

1. Open **https://YOUR-USERNAME.github.io/latteplanner/** on your laptop →
   **Continue with Google**.
2. **Settings → Account & backup → Import a backup** → choose `my-data.json`.
   The page reloads with your subjects, timetable, exams, routines and everything else.
3. On your phone, open the same address in Chrome → **Continue with Google** →
   your planner appears.
4. Chrome menu **⋮ → Add to Home screen → Install**. It now opens like an app.
   (On iPhone: Safari → Share → **Add to Home Screen**.)

---------------------------------------------------------------------------------
## Good to know

- **Sign-in popup doesn't open?** Allow pop-ups for the site. If you use the home-screen app,
  sign in once there too.
- **Backups:** Settings → *Download a backup* anytime. It saves one file with everything.
- **Changing the app later:** edit `src/app.jsx`, then rebuild with
  `npx esbuild src/app.jsx --loader:.jsx=jsx --minify --target=es2019 --outfile=app.js`
  and upload the new `app.js`. Or just ask Claude to make the change and send you a new `app.js`.
- **Free limits:** Firebase's free plan allows about 50,000 reads a day, far more than one person
  uses. GitHub Pages and Actions are free for public repos.
- **Privacy:** the repo is public but holds no personal data. Your planner lives in Firebase,
  and only your Google account can read it. Never upload `my-data.json` to GitHub.
