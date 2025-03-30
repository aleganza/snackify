<p align="center">
    <img width="120px" src="static/logo.png"/>
    <h1 align="center">Snackify</h1>
</p>

<p align="center">
  <strong>Create personalized Spotify playlists based on your saved tracks and favorite artists.</strong>
</p>

> **Note:** The Spotify API is only available in development mode. This means you cannot use it directly from the website; you must follow the installation steps below.

Snackify is a SvelteKit application that creates personalized Spotify playlists based on your saved tracks and favorite artists.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/aleganza/snackify.git
   cd snackify
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Spotify API credentials:
   ```sh
   VITE_SPOTIFY_CLIENT_ID=
   VITE_SPOTIFY_CLIENT_SECRET=
   VITE_SPOTIFY_REDIRECT_URI=
   ```

4. Start the development server:
   ```sh
   yarn dev
   ```
