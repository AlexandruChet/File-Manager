const express = require("express");
const app = express();
const port = 3000;

const htmlContent = `
      <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Bootstrap demo</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
          </head>
          <body>
            <h1>Hello, world!</h1>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
          </body>
        </html>
    `;

const htmlHeader = `
      <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Bootstrap demo</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
          </head>
          <body>
            <header>
              <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                  <a class="navbar-brand" href="#">MyLogo</a>

                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Services</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                      </li>
                      <li class="nav-item">
                        <a class="btn btn-primary ms-2" href="#">Sign Up</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </header>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
          </body>
        </html>
`;

const error404html = `
      <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>404 Not Found</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f8f9fa;
                text-align: center;
                flex-direction: column;
              }
              h1 {
                font-size: 8rem;
                font-weight: bold;
              }
              p {
                font-size: 1.5rem;
              }
            </style>
          </head>
          <body>
            <h1>404</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <a href="/" class="btn btn-primary mt-3">Go Home</a>
          </body>
        </html>
`;

app.get("/", (req, res) => {
  res.send(htmlContent);
});

app.get("/header", (req, res) => {
  res.send(htmlHeader);
});

app.use((req, res) => {
  res.status(404).send(error404html);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});