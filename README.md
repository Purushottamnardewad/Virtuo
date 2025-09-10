##Virtuo

Virtuo is a browser-based virtual operating system that brings a fully interactive desktop experience to your web browser. Built with React, it allows you to explore a desktop-like environment with apps, widgets, and an intuitive UI—no installation required.

Whether you want to experiment with a virtual OS, create web-based tools, or showcase interactive UI elements, Virtuo provides a seamless and modern desktop experience entirely in your browser.

Live Demo

Check out Virtuo live in your browser: 


Features
	• Desktop Environment: Draggable icons and windows
	• File System: Create, edit, delete files and folders
	• Terminal: Command-line interface with common Unix-like commands
	• Text Editor: Built-in text editor with syntax highlighting
	• Recycle Bin: Temporary storage for deleted items
	• Settings: Customizable themes and wallpapers
	• Persistence: All data stored in browser’s localStorage

Available Terminal Commands
	•	help - Show available commands
	•	ls - List directory contents
	•	mkdir <name> - Create directory
	•	touch <name> - Create file
	•	rm <name> - Delete file/folder (moves to recycle bin)
	•	cat <file> - Display file contents
	•	pwd - Show current directory
	•	whoami - Display current user
	•	date - Show current date and time
	•	clear - Clear terminal
	•	echo <message> - Display message

Getting Started
1.	Clone the repository:

git clone https://github.com/Purushottamnardewad/Virtuo.git

2.	Install dependencies:

npm install

3.	Start the development server:

npm run dev

4.	Open your browser at http://localhost:3000 to explore the virtual OS.

Project Structure

src/
├── App.jsx          # Main application component
├── main.jsx         # React entry point
└── index.css        # Global styles and Tailwind imports

Technologies Used
	•	React 18 - User interface library
	•	Framer Motion - Animation library
	•	Tailwind CSS - Utility-first CSS framework
	•	Vite - Build tool and development server

## Features Overview

Desktop Icons
	•	Draggable desktop icons for applications
	•	Double-click to open applications
	•	Icons show status (e.g., recycle bin shows count)

File Explorer
	•	Browse and manage files/folders
	•	Right-click context menu for file operations
	•	Create new files and folders
	•	Double-click files to edit them

Terminal
	•	Unix-like command interface
	•	File system operations
	•	Command history and auto-focus

Text Editor
	•	Edit any text file
	•	Real-time character and line count
	•	Keyboard shortcuts (Ctrl+S to save)
	•	Unsaved changes indicator

Settings
	•	Switch between light and dark themes
	•	Multiple wallpaper options
	•	Persistent settings storage

Recycle Bin
	•	Temporary storage for deleted items
	•	Restore deleted files/folders
	•	Permanent deletion option
	•	Visual indicator for non-empty bin

Customization

The OS supports various customization options:
	•	Themes: Light and Dark modes
	•	Wallpapers: Ocean Blue, Purple Sunset, Forest Green, Storm Gray
	•	Icon Positions: Drag icons to customize desktop layout

Data Persistence

All data is stored in the browser’s localStorage:
	•	File system structure and content
	•	Application settings and preferences
	•	Desktop icon positions
	•	Command history
	•	Recycle bin contents

Contributing

This is a demonstration project showcasing React capabilities for building desktop-like interfaces. Feel free to extend it with additional features like:
	•	More terminal commands
	•	Additional applications
	•	Network simulation
	•	Process management
	•	More file types and viewers
