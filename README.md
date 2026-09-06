# TeleSpace 100

TeleSpace 100 is a small retro new tab page inspired by 1980s Teletext and CEEFAX screens.

The screen looks like an old CRT television with scanlines and bright pixel colors. Type a three-digit page number to explore the information pages. News articles on Page 400 can be opened with a mouse click.

This is a student project made for Hack Club's **Give Your Website a Pulse** challenge.

## Pages

### Page 100 - Main Menu

The starting page with the available page numbers and a short TeleSpace welcome message.

### Page 200 - Space Weather

Shows the latest Kp index from NOAA's Space Weather Prediction Center API.

The page displays:

- Current Kp index
- Measurement time in UTC
- A simple space weather status

### Page 300 - NASA APOD

Shows NASA's Astronomy Picture of the Day information:

- Title
- Date
- Explanation

### Page 400 - Space News

Shows four current spaceflight news articles from the Spaceflight News API:

- Article number
- News source
- Publication time
- Clickable article link

## Controls

Type a three-digit page number with your keyboard:

```text
100  Main menu
200  NOAA space weather
300  NASA Astronomy Picture of the Day
400  Current spaceflight news
```

Use the keyboard to change pages. The current page number appears in the top-right corner while typing. On Page 400, click a news article to open it in a new tab.

## Run Locally

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_NASA_API_KEY=DEMO_KEY
```

Then start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Build

Create a production build with:

```bash
npm run build
```

The finished files are generated in the `dist` folder. To test that build locally:

```bash
npm run preview
```

## Deployment

TeleSpace 100 can be deployed with Vercel or GitHub Pages.

For a deployment build, add `VITE_NASA_API_KEY` to the hosting provider's environment variables. Do not upload the real `.env` file or a private API key to GitHub.

## Built With

- Vite
- TypeScript
- Vanilla CSS
- NOAA Space Weather API
- NASA APOD API
- Spaceflight News API

## License

This project is made for learning and experimentation.