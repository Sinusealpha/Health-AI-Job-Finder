# Health AI Job Finder

This is an AI-powered web application that finds recent, public job postings for roles in the Health AI sector and posts in the [MedAI Opportunities](https://t.me/medai_opportunities) telegram channel. It uses the Google Gemini API with Google Search grounding to crawl the web for relevant job listings based on your search queries.
![Alt text](https://raw.githubusercontent.com/Sinusealpha/Health-AI-Job-Finder/refs/heads/main/1404-05-26%2006.50.35.jpg)


## Features

-   **Real Job Postings**: Leverages the Google Gemini API with search grounding to find real-time, public job listings from the web.
-   **Focused Search**: Designed specifically for finding roles in the Health AI, medical technology, and bioinformatics fields.
-   **Detailed Job Cards**: Each listing includes a title, company, location, key skills/responsibilities, a brief description, and a direct link to the job posting.
-   **Responsive Design**: A clean, modern UI that works on desktops, tablets, and mobile devices, built with Tailwind CSS.
-   **No Backend Needed**: Runs entirely in the browser, communicating directly with the Gemini API.

## How It Works

The application takes a user's search term (e.g., "Clinical NLP") and sends a prompt to the Gemini API, instructing it to use Google Search to find public job postings. The AI then crawls for relevant listings, extracts key details like the job title, company, and the direct link, and returns this information in a structured JSON format. The frontend then displays the job listings in a user-friendly interface.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine or hosting provider.

### Prerequisites

You need an API key for the Google Gemini API. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Environment Variables

This project is configured to use an environment variable `process.env.API_KEY` to securely access the Google Gemini API. **Do not hardcode your API key directly in the source code.**

When deploying this application to a hosting service (like Vercel, Netlify, or a similar platform), you must configure the environment variable in your project's settings on that platform.

-   **Variable Name**: `API_KEY`
-   **Variable Value**: Your_Actual_Google_Gemini_API_Key

The hosting platform will securely inject this key into the application's environment at runtime.

### Local Development

Because this is a static web application that uses modern JavaScript modules and environment variables, you'll need a simple development server that can handle this. `vite` is a great tool for this.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/health-ai-job-finder.git
    cd health-ai-job-finder
    ```

2.  **Install dependencies (Vite):**
    ```bash
    npm install -D vite
    ```

3.  **Create an environment file:**
    Create a file named `.env.local` in the root of your project and add your API key:
    ```
    VITE_API_KEY=Your_Actual_Google_Gemini_API_Key
    ```
    *Note: Vite exposes environment variables to the client prefixed with `VITE_`. You would need to adjust `services/geminiService.ts` to read `import.meta.env.VITE_API_KEY` for local development.*

4.  **Run the development server:**
    ```bash
    npx vite
    ```
    Open your browser and navigate to the local address provided by Vite (e.g., `http://localhost:5173`).

## How to Use

1.  Open the application in your web browser.
2.  The search bar will be pre-filled with "Health AI". You can use this or enter another keyword related to the healthcare technology field (e.g., "Bioinformatics Scientist", "Medical Imaging Engineer").
3.  Click the "Search" button.
4.  The application will display a loading indicator while the AI searches the web for job postings.
5.  Browse the list of job cards. Click "View Details" to navigate to the original job posting.

## Disclaimer

-   This tool uses AI to find and summarize public job postings from the web.
-   The accuracy and availability of the job listings are dependent on Google Search results and the AI's ability to parse the information correctly. Always verify details on the source website.
