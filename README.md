# CDC Bar Calendar

A modern web application for discovering and tracking bar events in Chengdu. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌐 Bilingual support (English and Chinese)
- 📱 Fully responsive design
- 🎨 Modern dark theme with warm accent colors
- 📅 Event listing and details
- 📧 Newsletter subscription
- 📝 Contact form
- 🔍 Dynamic event pages

## Prerequisites

- Node.js 18.17 or later
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cdc-bar-calendar
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
cdc-bar-calendar/
├── public/
│   └── images/         # Static images
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # Reusable components
│   ├── data/         # Static data (events)
│   ├── locales/      # Translation files
│   └── i18n-config.ts # i18n configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── next.config.ts    # Next.js configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
