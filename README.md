# final-project-mern

project link https://lukii3564.github.io/final-project-mern/
## Overview

Coderscave is a small web project that combines a Python backend with a simple frontend. This README explains the project structure, how the files work together, and how to set up and run the project on Windows (PowerShell).

## Project Structure

- **`app.py`**: The project's Python backend entry point. Common uses:
	- If this is a Flask app, `app.py` defines routes (API endpoints) and may serve the frontend.
	- If it's a script, it may provide local processing or utilities used by the frontend.
- **`index.html`**: The main frontend HTML file. Loads styles and JavaScript, and provides the user interface.
- **`script.js`**: Frontend JavaScript. Handles DOM interactions, UI events, and network requests (fetch/XHR) to backend endpoints.
- **`style.css`**: Styles for the frontend UI.
- **`Assets/`**: Folder for images, fonts, icons, and other static assets used by the frontend.
- **`requirements.txt`**: Python dependencies required to run `app.py` (if `app.py` is a Python web app).
- **`README.md`**: This document.

## How the Files Work Together

- Browser requests `index.html` (either opened directly or served by the backend/static server).
- `index.html` loads `style.css` and `script.js` to render the UI and attach client-side behavior.
- `script.js` performs client-side tasks (form handling, interactivity) and calls backend endpoints exposed by `app.py` (for example: `/api/data`, `/api/save`).
- `app.py` receives requests, processes data (database, file, or in-memory logic), and returns JSON or HTML responses.

Typical flow (if `app.py` is a Flask app):

- Client -> `index.html` -> `script.js` -> fetch `/api/...` -> `app.py` handles and responds -> `script.js` updates the UI.

If `app.py` is not a web server, you may open `index.html` directly in the browser and use `script.js` without backend calls.

## Setup & Run (Windows PowerShell)

1. Create a virtual environment and install dependencies (if using Python backend):

```powershell
python -m venv .\venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Run the backend (typical for Flask):

```powershell
python app.py
# or if using flask CLI (and environment variables are set):
# $env:FLASK_APP = "app.py"; flask run
```

3. Serve the frontend only (no backend):

```powershell
# Simple static server using Python 3
python -m http.server 8000
# then open http://localhost:8000/index.html
```

Notes:
- If `app.py` binds to a port (e.g., 5000 for Flask), open that address in the browser.
- Adjust firewall or port settings if the site is not reachable from other machines.

## Development Notes

- Editing frontend: modify `index.html`, `style.css`, and `script.js`. Use your browser devtools to inspect network calls and console logs.
- Editing backend: change `app.py` endpoints and behavior. Restart the server after edits (or use a reloader such as Flask's debug mode).
- Adding libraries: add Python packages to `requirements.txt` and re-run `pip install -r requirements.txt`.

## Troubleshooting

- If `script.js` fetch calls fail, check the browser console and network tab for the requested URL and response code.
- If Python dependencies fail to install, ensure you are using the correct Python version and that `pip` is up to date.
- If static assets (images/fonts) do not appear, verify the path in `index.html` and that the `Assets/` folder contains the files.

## Contributing

- Fork the repository, create a feature branch, make changes, and open a pull request. Describe changes and test steps.

## License & Copyright

Copyright (c) 2025 Jackson Lukoye. All rights reserved.

If you want a permissive or open license (MIT, Apache, etc.), say which one and it can be added here.

