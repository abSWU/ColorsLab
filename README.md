# COLORS

COLORS is a website built as a part of the COP4331 course. The application allows users to make an account and login, add colors, and search colors, all through the website's interface.

## Technologies Used

The application uses the LAMP stack along with standard frontend web technologies.

- **Linux** – Server operating system
- **Apache** – Web server
- **MySQL** – Database
- **PHP** – Backend API
- **HTML** – Page structure
- **CSS** – Styling
- **JavaScript** – Frontend functionality and API communication
- **DigitalOcean** – Hosting/deployment
- **Git/GitHub** – Version control and collaboration

## Project Structure

The project is organized into frontend resources and backend API endpoints.

- `css/` – Stylesheets
- `images/` – Images and other visual assets
- `js/` – Client-side JavaScript
- `LAMPAPI/` – PHP API endpoints
  - `Login.php` – Handles user authentication
  - `AddColor.php` – Adds colors
  - `SearchColors.php` – Searches for colors
- `index.html` – Main application page

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/abSWU/ColorsLab.git

## AI Usage
Parts of the project had AI involvement to help solve problems. For example, AI assisted in figuring out how to securely put database login information into a .env so that no one could see the actual login info. AI was also used in figuring out SSH problems during the DigitalOcean setup.
