# BingeTown

_An entertainment platform for discovering Movies and TV shows._

![Bingetown banner](/public/images/banner.webp)

Visit it live, [here](https://bingetown.vercel.app)

### Highlights

- Movie & TV show recommendations
- YouTube trailer previews
- Mobile responsiveness
- OAuth Authentication
- Saved and Watchlists

### Local installation

- Clone the repo

  ```bash
  git clone -b next https://github.com/tejas-git64/BingeTown.git
  ```

- Install dependencies

  ```bash
  npm install
  ```

- Create a `.env` file at the root of the project, add the respective **Firebase** and **TMDB** keys

  ```bash
   ##Firebase API keys
   NEXT_PUBLIC_FIREBASE_API_KEY=<firebase api key>
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<firebase project auth domain>
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=<firebase project id>
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<firebase storage bucket>
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<firebase message sender id>
   NEXT_PUBLIC_FIREBASE_APP_ID=<firebase app id>

   ## TMDB Keys
   NEXT_PUBLIC_TMDB_API_KEY=<TMDB api key>
   NEXT_PUBLIC_TMDB_READ_ACCESS_KEY=<TMDB read access key>
  ```

- Run the project

  ```bash
  npm run dev
  ```

- Preview by pasting the url `http://localhost:3000` in your browser

#### This project uses [TMDB API](https://developer.themoviedb.org/docs/getting-started) for resource data

### Tech stack

- **Client**: Next.js, Tailwind, TypeScript
- **Backend**: Firebase
- **Hosting**: Vercel
