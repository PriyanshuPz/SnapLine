> [!CAUTION]  
> Going to be read only soon.

# SnapLine - AI-Powered Creativity and Prompts Platform

![SnapLine Logo](/screenshots/3.png)

Welcome to **SnapLine**, an innovative platform that leverages AI to ignite creativity through thought-provoking prompts. Whether you're a writer, artist, or enthusiast looking for inspiration, SnapLine is designed to spark your imagination and fuel your creative journey.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)
- [Environment Variables](#environment-variables)
- [Learning Resources](LEARN.md)

## Features

- Access a diverse range of AI-generated prompts for various creative domains.
- Explore categories such as writing, art, music, and more.
- Create an account to save and share your favorite prompts.
- Collaborate with AI to generate unique and innovative content.
- Engage with a dynamic community of creative minds.

## Getting Started

These instructions will guide you through setting up and running the SnapLine project locally for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (Installed globally)
- [Docker](https://www.docker.com/) (Optional, for containerization)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/p7uverma/SnapLine.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd SnapLine
   ```

3. **Install dependencies:**

   ```bash
   yarn
   ```

4. **Edit .env:**

   ```
   cp .env.example .env
   ```

5. **Init Prisma:**

   ```bash
   yarn prisma db push
   ```

### Usage

1. **Start the development server:**

   ```bash
   yarn dev
   ```

2. **Access the application in your web browser:**

   ```
   http://localhost:3000
   ```

### Technologies Used

SnapLine is built using a modern technology stack:

- Next.js 13
- MongoDB
- Prisma
- Docker (for containerization)
- Shadcn UI
- React
- Node.js
- TypeScript

## Contributing

We welcome and appreciate contributions from the community! Here's how you can contribute:

1. **Fork the repository.**

2. **Create a new branch:**

   ```bash
   git checkout -b feature-name
   ```

3. **Make your changes and commit them:**

   ```bash
   git commit -m "Add new feature"
   ```

4. **Push your changes to the branch:**

   ```bash
   git push origin feature-name
   ```

5. **Create a pull request on GitHub.**

   We'll review your changes and merge them if they align with our project goals.

6. **Join the discussion:**

   Participate in discussions, share your ideas, and help us improve SnapLine together.

7. **Report issues:**

   If you encounter bugs or have suggestions, please open an issue on our GitHub repository.

## Contact

Have questions or feedback? Reach out to us:

- GitHub: [@PriyanshuPz](https://github.com/priyanshupz)
- Email: priyanshuverma@outlook.in

## License

This project is now open-source and is released under the [MIT License](LICENSE).

## Environment Variables

To configure SnapLine, you need to set up the following environment variables. You can create a `.env` file in the project root and add these variables with your values. Refer to the [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions and comments for each variable.

## Learning Resources

Explore the [LEARN.md](LEARN.md) file for a comprehensive list of learning resources, documentation, and guides to help you understand and contribute effectively to SnapLine.
