# Winks - Anonymous Chat Application

Winks is an anonymous chat application built using **React.js** and **Supabase** with sleek, responsive styling provided by **Styled Components**. It allows users to join chat rooms, send messages anonymously, and manage chat rooms effortlessly.

## Features

- **Anonymous Messaging**: Users can chat without revealing their identity.
- **Room Management**: Create, join, and delete chat rooms as needed.
- **Invite with Links**: Share invite links to let others join a room seamlessly.
- **User Nicknames**: Set temporary nicknames for easier communication.
- **Real-Time Updates**: Messages appear instantly using Supabase's real-time features.

## Technologies Used

- **Frontend**: React.js (Functional Components with React Hooks)
- **Backend**: Supabase (Database + Real-time Messaging)
- **Styling**: Styled Components
<!-- - **Hosting**: (Specify your hosting platform, e.g., Vercel, Netlify, etc.) -->

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- A Supabase account.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/winks.git
   cd winks
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your Supabase project:

   - Go to [Supabase](https://supabase.com/) and create a new project.
   - Configure the database with a `messages` table and a `rooms` table as needed.
   - Add environment variables in a `.env` file:
     ```bash
     VITE_APP_SUPABASE_URL=your-supabase-url
     VITE_APP_SUPABASE_KEY=your-supabase-key
     ```

4. Run the application:
   ```bash
   npm start
   ```

### Usage

- Open the app in your browser (default: `http://localhost:3000`).
- Create or join a chat room.
- Share the invite link to let others join.
- Start chatting anonymously!

## Folder Structure

```
winks/
├── src/
│   ├── Client/      # Supabase Client confifguration
│   ├── Features/    # Supabase operations and Redux store functions
│   ├── Hooks/       # Reusable custom react hooks
│   ├── Pages/       # Pages like ( Home, New Chat, Not found,.. etc)
│   └── styles/      # Css styles
│   └── UI/          # UI components for the applications
│   └── Utils/       # Helper functions
├── public/          # Static assets
├── App.js/
├── main.js/
└── package.json     # Project metadata and dependencies
```

## Future Enhancements

- Add support for file sharing (images, documents, etc.).
- Implement end-to-end encryption for enhanced privacy.
- Include user authentication for optional profile creation.

## Contributing

Contributions are welcome! Please fork this repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---
