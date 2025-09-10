import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Keys
const FS_KEY = "jsos_fs";
const NOTES_KEY = "jsos_notes";
const SETTINGS_KEY = "jsos_settings";
const HISTORY_KEY = "jsos_history";
const ICONS_KEY = "jsos_icons";
const RECYCLE_KEY = "jsos_recycle";

// FS helpers
function loadFS() {
  return JSON.parse(localStorage.getItem(FS_KEY)) || { "/": [] };
}
function saveFS(fs) {
  localStorage.setItem(FS_KEY, JSON.stringify(fs));
}

// Notes
function loadNotes() {
  return localStorage.getItem(NOTES_KEY) || "";
}
function saveNotes(text) {
  localStorage.setItem(NOTES_KEY, text);
}

// Settings
function loadSettings() {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { theme: "light", wallpaper: "blue" };
}
function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// History
function loadHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}
function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// Icons positions
function loadIcons() {
  return (
    JSON.parse(localStorage.getItem(ICONS_KEY)) || {
      Terminal: { x: 30, y: 30 },
      Explorer: { x: 30, y: 120 },
      Notes: { x: 30, y: 210 },
      Settings: { x: 30, y: 300 },
      Recycle: { x: 30, y: 390 }
    }
  );
}
function saveIcons(icons) {
  localStorage.setItem(ICONS_KEY, JSON.stringify(icons));
}

// Recycle bin
function loadRecycle() {
  return JSON.parse(localStorage.getItem(RECYCLE_KEY)) || [];
}
function saveRecycle(items) {
  localStorage.setItem(RECYCLE_KEY, JSON.stringify(items));
}

// Modern Boot screen
function BootScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("Initializing JS-OS...");
  
  useEffect(() => {
    const bootTexts = [
      "Initializing JS-OS...",
      "Loading system components...",
      "Setting up desktop environment...",
      "Preparing user interface...",
      "Almost ready..."
    ];

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        const textIndex = Math.floor((newProgress / 100) * bootTexts.length);
        setCurrentText(bootTexts[Math.min(textIndex, bootTexts.length - 1)]);
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onFinish(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Modern Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
          <span className="text-4xl font-bold">JS</span>
        </div>
      </motion.div>

      {/* OS Name */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
      >
        JS Operating System
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg text-gray-300 mb-12"
      >
        Built with React & Modern Web Technologies
      </motion.p>

      {/* Progress Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="w-80 mb-6"
      >
        <div className="bg-gray-700 rounded-full h-2 mb-3 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>{currentText}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </motion.div>

      {/* Loading Indicator */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
}

// Clock
function Clock({ theme }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className={`px-2 text-sm font-mono ${theme === "dark" ? "text-white" : "text-black"}`}>
      {time.toLocaleTimeString()}
    </div>
  );
}

// Modern Window wrapper
function Window({ title, children, onClose, theme, width = "w-96", height = "h-64" }) {
  return (
    <motion.div 
      drag 
      dragConstraints={{ left: -200, right: 800, top: -50, bottom: 400 }}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`absolute top-24 left-24 ${width} ${
        theme === "dark" 
          ? "bg-gray-900 bg-opacity-95 text-white border-gray-700 shadow-2xl" 
          : "bg-white bg-opacity-95 text-black border-gray-200 shadow-2xl"
      } rounded-2xl overflow-hidden border backdrop-blur-xl`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div 
        className={`${
          theme === "dark" 
            ? "bg-gradient-to-r from-gray-800 via-gray-750 to-gray-800 border-gray-600" 
            : "bg-gradient-to-r from-gray-50 via-white to-gray-50 border-gray-200"
        } px-6 py-4 flex justify-between items-center border-b cursor-move select-none backdrop-blur-sm`}
      > 
        <div className="font-semibold text-sm flex items-center">
          <div className="flex items-center mr-4 space-x-2">
            <motion.div 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            ></motion.div>
            <motion.div 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            ></motion.div>
            <motion.div 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            ></motion.div>
          </div>
          <span className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>{title}</span>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose} 
          className={`${
            theme === "dark" 
              ? "text-gray-400 hover:text-red-400 hover:bg-red-900 hover:bg-opacity-30" 
              : "text-gray-500 hover:text-red-600 hover:bg-red-50"
          } rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition-all duration-200 backdrop-blur-sm`}
        >
          ×
        </motion.button>
      </div>
      <div className={`p-6 ${height} overflow-auto ${title.includes('Terminal') ? 'font-mono' : ''} text-sm`}>
        {children}
      </div>
    </motion.div>
  );
}

// Terminal (enhanced)
function Terminal({ onClose, theme }) {
  const [history, setHistory] = useState(["> Welcome to JS-OS Terminal v1.0", "> Type 'help' for available commands"]);
  const [input, setInput] = useState("");
  const [fs, setFs] = useState(loadFS());
  const [currentPath, setCurrentPath] = useState("/");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (cmd) => {
    if (!cmd.trim()) return;
    const args = cmd.trim().split(" ");
    let out = "";
    
    switch (args[0]) {
      case "help":
        out = `Available commands:
  help          - Show this help message
  echo <msg>    - Display message
  clear         - Clear terminal
  ls            - List directory contents
  mkdir <dir>   - Create directory
  touch <file>  - Create empty file
  rm <file>     - Remove file (moves to recycle bin)
  cat <file>    - Display file contents
  pwd           - Show current directory
  whoami        - Display current user
  date          - Show current date and time`;
        break;
      case "echo":
        out = args.slice(1).join(" ");
        break;
      case "clear":
        setHistory(["> Welcome to JS-OS Terminal v1.0", "> Type 'help' for available commands"]);
        return;
      case "ls":
        if (fs[currentPath] && fs[currentPath].length > 0) {
          out = fs[currentPath].map((f) => `${f.type === 'dir' ? '📁' : '📄'} ${f.name}`).join("\n");
        } else {
          out = "(empty directory)";
        }
        break;
      case "pwd":
        out = currentPath;
        break;
      case "whoami":
        out = "user@js-os";
        break;
      case "date":
        out = new Date().toString();
        break;
      case "mkdir":
        if (!args[1]) out = "Usage: mkdir <directory_name>";
        else if (fs[currentPath] && fs[currentPath].find((f) => f.name === args[1])) out = "Directory already exists";
        else {
          const newFs = { ...fs };
          if (!newFs[currentPath]) newFs[currentPath] = [];
          newFs[currentPath] = [...newFs[currentPath], { name: args[1], type: "dir" }];
          setFs(newFs); saveFS(newFs); out = `Directory '${args[1]}' created`;
        }
        break;
      case "touch":
        if (!args[1]) out = "Usage: touch <filename>";
        else if (fs[currentPath] && fs[currentPath].find((f) => f.name === args[1])) out = "File already exists";
        else {
          const newFs = { ...fs };
          if (!newFs[currentPath]) newFs[currentPath] = [];
          newFs[currentPath] = [...newFs[currentPath], { name: args[1], type: "file", content: "" }];
          setFs(newFs); saveFS(newFs); out = `File '${args[1]}' created`;
        }
        break;
      case "cat":
        if (!args[1]) out = "Usage: cat <filename>";
        else {
          const file = fs[currentPath] && fs[currentPath].find((f) => f.name === args[1] && f.type === "file");
          if (!file) out = "File not found";
          else out = file.content || "(empty file)";
        }
        break;
      case "rm":
        if (!args[1]) out = "Usage: rm <filename>";
        else {
          const item = fs[currentPath] && fs[currentPath].find((f) => f.name === args[1]);
          if (!item) out = "File not found";
          else {
            const recycle = loadRecycle();
            saveRecycle([...recycle, { ...item, originalPath: currentPath }]);
            const newFs = { ...fs };
            newFs[currentPath] = newFs[currentPath].filter((f) => f.name !== args[1]);
            setFs(newFs); saveFS(newFs);
            out = `'${args[1]}' moved to recycle bin`;
          }
        }
        break;
      default:
        out = `Command not found: ${args[0]}. Type 'help' for available commands.`;
    }
    setHistory((h) => [...h, `${currentPath}$ ${cmd}`, out]);
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      handleCommand(input.trim()); 
      setInput("");
    }
  };

  return (
    <Window title="Terminal" onClose={onClose} theme={theme} width="w-[500px]" height="h-80">
      <div className="terminal">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith(">") ? "text-green-400" : line.startsWith(currentPath + "$") ? "text-blue-400" : ""}>
            {line}
          </div>
        ))}
        <div className="mt-2 flex items-center">
          <span className="text-blue-400">{currentPath}$&nbsp;</span>
          <input 
            ref={inputRef}
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={onKey} 
            className={`bg-transparent outline-none flex-1 ${theme === "dark" ? "text-white" : "text-black"}`}
          />
        </div>
      </div>
    </Window>
  );
}

// Text editor (enhanced)
function TextEditor({ file, onSave, onClose, theme }) {
  const [content, setContent] = useState(file.content || "");
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setSaved(content === (file.content || ""));
  }, [content, file.content]);

  const save = () => { 
    onSave({ ...file, content }); 
    setSaved(true);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      save();
    }
  };

  return (
    <Window title={`${file.name}${saved ? '' : ' •'}`} onClose={onClose} theme={theme} width="w-[600px]" height="h-96">
      <div className="flex flex-col h-full">
        <textarea 
          className={`w-full flex-1 p-2 border rounded resize-none ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`} 
          value={content} 
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start typing..."
        />
        <div className="flex justify-between items-center mt-2 pt-2 border-t">
          <div className="text-xs text-gray-500">
            Lines: {content.split('\n').length} | Characters: {content.length}
            {!saved && <span className="text-orange-500 ml-2">Unsaved changes</span>}
          </div>
          <div className="flex gap-2">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm" 
              onClick={save}
              disabled={saved}
            >
              Save {!saved && '(Ctrl+S)'}
            </button>
          </div>
        </div>
      </div>
    </Window>
  );
}

// Recycle Bin App (enhanced)
function RecycleBinApp({ onClose, theme, onRestore, onEmpty }) {
  const [items, setItems] = useState(loadRecycle());

  useEffect(() => { setItems(loadRecycle()); }, []);

  const restore = (item) => {
    onRestore(item);
    const remaining = loadRecycle().filter((i) => i.name !== item.name);
    saveRecycle(remaining);
    setItems(remaining);
  };

  const empty = () => {
    if (items.length === 0) return;
    if (confirm(`Are you sure you want to permanently delete ${items.length} item(s)?`)) {
      saveRecycle([]);
      setItems([]);
      if (onEmpty) onEmpty();
    }
  };

  const deleteItem = (item) => {
    if (confirm(`Are you sure you want to permanently delete '${item.name}'?`)) {
      const remaining = loadRecycle().filter((i) => i.name !== item.name);
      saveRecycle(remaining);
      setItems(remaining);
    }
  };

  return (
    <Window title={`Recycle Bin (${items.length} items)`} onClose={onClose} theme={theme} width="w-[400px]">
      {items.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          <div className="text-4xl mb-2">🗑️</div>
          <div>Recycle bin is empty</div>
        </div>
      ) : (
        <>
          <ul className="space-y-1">
            {items.map((item, idx) => (
              <li key={idx} className={`py-2 px-2 rounded flex justify-between items-center border-b ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                <div className="flex items-center">
                  <span className="mr-2 text-lg">
                    {item.type === 'app' ? '💻' : item.type === 'dir' ? '📁' : '📄'}
                  </span>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 capitalize">
                      {item.type === 'app' ? 'Application' : item.type}
                      {item.deletedAt && (
                        <span className="ml-2">
                          • Deleted {new Date(item.deletedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    className="text-xs px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white" 
                    onClick={() => restore(item)}
                    title={item.type === 'app' ? 'Restore application to desktop' : 'Restore item'}
                  >
                    Restore
                  </button>
                  <button 
                    className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white" 
                    onClick={() => deleteItem(item)}
                    title="Delete permanently"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t">
            <button 
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm w-full" 
              onClick={empty}
            >
              Empty Recycle Bin ({items.length} items)
            </button>
          </div>
        </>
      )}
    </Window>
  );
}

// File Explorer with context menu (enhanced)
function FileExplorer({ onClose, theme, onDelete }) {
  const [fs, setFs] = useState(loadFS());
  const [openFile, setOpenFile] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    const handler = () => setCtx(null);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const refresh = () => { 
    const f = loadFS(); 
    setFs(f); 
  };

  const onContext = (e, item) => {
    e.preventDefault();
    setCtx({ x: e.clientX, y: e.clientY, item });
  };

  const rename = (item) => {
    const name = prompt("Rename to:", item.name);
    if (!name || name === item.name) return;
    const f = loadFS();
    if (f[currentPath] && f[currentPath].find((it) => it.name === name)) { 
      alert('Name already exists'); 
      return; 
    }
    const newFs = { ...f };
    if (newFs[currentPath]) {
      newFs[currentPath] = newFs[currentPath].map((it) => 
        it.name === item.name ? { ...it, name } : it
      );
    }
    saveFS(newFs); 
    refresh();
  };

  const del = (item) => {
    if (!confirm(`Are you sure you want to move '${item.name}' to recycle bin?`)) return;
    
    const recycle = loadRecycle();
    saveRecycle([...recycle, { ...item, originalPath: currentPath }]);
    const f = loadFS();
    const newFs = { ...f };
    if (newFs[currentPath]) {
      newFs[currentPath] = newFs[currentPath].filter((it) => it.name !== item.name);
    }
    saveFS(newFs); 
    refresh();
    if (onDelete) onDelete();
  };

  const createNew = (type) => {
    const name = prompt(`Enter ${type} name:`);
    if (!name) return;
    
    const f = loadFS();
    if (f[currentPath] && f[currentPath].find((it) => it.name === name)) {
      alert('Name already exists');
      return;
    }
    
    const newFs = { ...f };
    if (!newFs[currentPath]) newFs[currentPath] = [];
    newFs[currentPath] = [...newFs[currentPath], { 
      name, 
      type, 
      content: type === 'file' ? '' : undefined 
    }];
    saveFS(newFs);
    refresh();
  };

  const currentFiles = fs[currentPath] || [];

  return (
    <>
      <Window title={`File Explorer - ${currentPath}`} onClose={onClose} theme={theme} width="w-[500px]" height="h-80">
        <div className="flex justify-between items-center mb-3 pb-2 border-b">
          <div className="text-sm text-gray-500">
            {currentFiles.length} item(s)
          </div>
          <div className="flex gap-2">
            <button 
              className="text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => createNew('file')}
            >
              New File
            </button>
            <button 
              className="text-xs px-2 py-1 rounded bg-green-600 hover:bg-green-700 text-white"
              onClick={() => createNew('dir')}
            >
              New Folder
            </button>
          </div>
        </div>
        
        <ul>
          {currentFiles.length === 0 ? (
            <li className="text-gray-500 text-center py-8">
              <div className="text-4xl mb-2">📁</div>
              <div>This folder is empty</div>
            </li>
          ) : (
            currentFiles.map((item, idx) => (
              <li 
                key={idx} 
                onContextMenu={(e) => onContext(e, item)} 
                onDoubleClick={() => item.type === 'file' && setOpenFile(item)} 
                className={`py-2 px-2 rounded cursor-pointer ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"} flex justify-between items-center border-b`}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{item.type === 'dir' ? '📁' : '📄'}</span>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{item.type}</div>
                  </div>
                </div>
                {item.type === 'file' && (
                  <div className="text-xs text-gray-500">
                    {item.content ? `${item.content.length} chars` : 'Empty'}
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </Window>

      {ctx && (
        <div 
          style={{ position: 'fixed', left: ctx.x, top: ctx.y, zIndex: 9999 }} 
          className={`context-menu shadow-lg rounded min-w-[120px] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        >
          {ctx.item.type === 'file' && (
            <div className="px-3 py-2 cursor-pointer hover:bg-blue-600 hover:text-white text-sm" onClick={() => { setCtx(null); setOpenFile(ctx.item); }}>
              Open
            </div>
          )}
          <div className="px-3 py-2 cursor-pointer hover:bg-blue-600 hover:text-white text-sm" onClick={() => { setCtx(null); rename(ctx.item); }}>
            Rename
          </div>
          <div className="px-3 py-2 cursor-pointer hover:bg-red-600 hover:text-white text-sm" onClick={() => { setCtx(null); del(ctx.item); }}>
            Delete
          </div>
        </div>
      )}

      {openFile && (
        <TextEditor 
          file={openFile} 
          onSave={(f) => { 
            const ff = loadFS(); 
            const newFs = { ...ff };
            if (newFs[currentPath]) {
              newFs[currentPath] = newFs[currentPath].map(it => it.name === f.name ? f : it);
            }
            saveFS(newFs); 
            refresh(); 
          }} 
          onClose={() => setOpenFile(null)} 
          theme={theme} 
        />
      )}
    </>
  );
}

// DesktopIcon (enhanced with modern design and animations)
function DesktopIcon({ name, x, y, onOpen, theme, updatePosition, full, onDelete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x, y });

  const getModernIcon = () => {
    const iconStyle = "text-3xl drop-shadow-lg";
    switch (name) {
      case 'Terminal': 
        return <div className={`${iconStyle} bg-gradient-to-br from-gray-900 to-black text-green-400 w-12 h-12 rounded-2xl flex items-center justify-center border border-gray-700 shadow-inner`}>⌘</div>;
      case 'Explorer': 
        return <div className={`${iconStyle} bg-gradient-to-br from-blue-500 to-blue-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>�</div>;
      case 'Notes': 
        return <div className={`${iconStyle} bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>📝</div>;
      case 'Settings': 
        return <div className={`${iconStyle} bg-gradient-to-br from-gray-600 to-gray-800 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>⚙️</div>;
      case 'Recycle': 
        return <div className={`${iconStyle} bg-gradient-to-br from-red-500 to-red-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg relative`}>
          🗑️
          {full && <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-xs">●</div>}
        </div>;
      default: 
        return <div className={`${iconStyle} bg-gradient-to-br from-purple-500 to-purple-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>📄</div>;
    }
  };

  // Check if dragged over recycle bin
  const checkRecycleBinDrop = (x, y, recyclePosition) => {
    const iconSize = 80;
    const recycleSize = 80;
    
    return (
      x + iconSize > recyclePosition.x &&
      x < recyclePosition.x + recycleSize &&
      y + iconSize > recyclePosition.y &&
      y < recyclePosition.y + recycleSize
    );
  };

  return (
    <motion.div 
      drag 
      dragMomentum={false}
      dragElastic={0.1}
      whileHover={{ scale: isDragging ? 1 : 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{ scale: 1.1, zIndex: 50, rotate: 2 }}
      onDragStart={() => setIsDragging(true)}
      onDrag={(event, info) => {
        setDragPosition({ 
          x: Math.max(0, info.point.x), 
          y: Math.max(0, info.point.y) 
        });
      }}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        const finalX = Math.max(0, Math.min(info.point.x, window.innerWidth - 80));
        const finalY = Math.max(0, Math.min(info.point.y, window.innerHeight - 140));
        
        // If this is not the recycle bin itself, check if dropped on recycle bin
        if (name !== 'Recycle' && onDelete) {
          const recyclePosition = document.querySelector('[data-icon="Recycle"]')?.getBoundingClientRect();
          if (recyclePosition) {
            const isOverRecycle = checkRecycleBinDrop(
              info.point.x,
              info.point.y,
              { x: recyclePosition.left, y: recyclePosition.top }
            );
            
            if (isOverRecycle) {
              // Show confirmation dialog
              if (confirm(`Move ${name} to Recycle Bin?`)) {
                onDelete(name);
                return;
              }
            }
          }
        }
        
        updatePosition(name, finalX, finalY);
      }}
      style={{ 
        position: 'absolute', 
        left: x, 
        top: y, 
        width: 80,
        zIndex: isDragging ? 50 : 1
      }} 
      className="desktop-icon cursor-pointer group"
      data-icon={name}
    >
      <div onDoubleClick={onOpen} className="flex flex-col items-center">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl backdrop-blur-sm ${
          isDragging ? 'ring-4 ring-blue-400 ring-opacity-50 shadow-2xl' : ''
        } ${
          theme === 'dark' 
            ? 'bg-white bg-opacity-10 border border-white border-opacity-20 hover:bg-opacity-20' 
            : 'bg-white bg-opacity-90 border border-gray-200 hover:bg-opacity-100 hover:shadow-xl'
        }`}>
          {getModernIcon()}
        </div>
        <div className={`text-xs mt-3 px-3 py-1 rounded-full max-w-20 text-center font-medium transition-all duration-300 backdrop-blur-md ${
          theme === 'dark' 
            ? 'text-white bg-black bg-opacity-50 group-hover:bg-opacity-70 border border-white border-opacity-20' 
            : 'text-gray-800 bg-white bg-opacity-80 group-hover:bg-opacity-95 border border-gray-300 shadow-sm'
        }`}>
          {name}
        </div>
      </div>
      
      {/* Modern drag indicator */}
      {isDragging && (
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-white text-xs font-bold">↕</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// Modern Settings Window
function SettingsWindow({ onClose, theme, settings, onSettingsChange }) {
  const [localSettings, setLocalSettings] = useState(settings);

  const applySettings = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const wallpaperPreview = {
    blue: { 
      bg: 'bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800',
      name: 'Ocean Breeze',
      desc: 'Calm blue tones'
    },
    purple: { 
      bg: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
      name: 'Sunset Glow',
      desc: 'Vibrant purple-pink'
    },
    green: { 
      bg: 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600',
      name: 'Forest Serenity',
      desc: 'Natural green blend'
    },
    gray: { 
      bg: 'bg-gradient-to-br from-slate-400 via-gray-500 to-zinc-600',
      name: 'Urban Steel',
      desc: 'Professional gray'
    }
  };

  return (
    <Window title="System Preferences" onClose={onClose} theme={theme} width="w-[540px]" height="h-[500px]">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl text-white">⚙️</span>
          </div>
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Customize Your Experience
          </h2>
        </div>

        {/* Wallpaper Section */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm">🖼️</span>
            </div>
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Desktop Wallpaper
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(wallpaperPreview).map(([key, { bg, name, desc }]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLocalSettings({...localSettings, wallpaper: key})}
                className={`relative h-24 rounded-xl cursor-pointer border-2 transition-all duration-300 overflow-hidden ${
                  localSettings.wallpaper === key 
                    ? 'border-blue-500 ring-4 ring-blue-200 ring-opacity-50 shadow-xl' 
                    : 'border-gray-300 hover:border-gray-400 hover:shadow-lg'
                } ${bg}`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center">
                  <span className="text-white text-sm font-bold mb-1">{name}</span>
                  <span className="text-white text-xs opacity-80">{desc}</span>
                </div>
                {localSettings.wallpaper === key && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-xs font-bold">✓</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Theme Section */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm">🎨</span>
            </div>
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Appearance Theme
            </h3>
          </div>
          <div className="flex gap-4">
            {[
              { 
                key: 'light', 
                label: 'Light Mode', 
                icon: '☀️', 
                bg: 'bg-gradient-to-br from-white to-gray-100 border-gray-300 text-gray-800',
                desc: 'Clean and bright'
              },
              { 
                key: 'dark', 
                label: 'Dark Mode', 
                icon: '🌙', 
                bg: 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 text-white',
                desc: 'Easy on the eyes'
              }
            ].map(({ key, label, icon, bg, desc }) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLocalSettings({...localSettings, theme: key})}
                className={`flex-1 h-20 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                  localSettings.theme === key 
                    ? 'border-blue-500 ring-4 ring-blue-200 ring-opacity-50 shadow-xl' 
                    : 'border-gray-300 hover:border-gray-400 hover:shadow-lg'
                } ${bg} flex flex-col items-center justify-center relative overflow-hidden`}
              >
                <span className="text-2xl mb-1">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs opacity-70">{desc}</span>
                {localSettings.theme === key && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-xs font-bold">✓</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Info Card */}
        <div className={`p-4 rounded-xl ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600' 
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
        }`}>
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm">💻</span>
            </div>
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              System Information
            </h3>
          </div>
          <div className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="flex justify-between">
              <span>Operating System</span>
              <span className="font-medium">JS-OS v1.0</span>
            </div>
            <div className="flex justify-between">
              <span>Framework</span>
              <span className="font-medium">React + Framer Motion</span>
            </div>
            <div className="flex justify-between">
              <span>Storage</span>
              <span className="font-medium">Browser LocalStorage</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300'
            }`}
            onClick={onClose}
          >
            Cancel
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={applySettings}
          >
            Apply Changes
          </motion.button>
        </div>
      </div>
    </Window>
  );
}

// Desktop (main component)
function Desktop() {
  const [settings, setSettings] = useState(loadSettings());
  const [history, setHistory] = useState(loadHistory());
  const [icons, setIcons] = useState(loadIcons());
  const [showTerminal, setShowTerminal] = useState(false);
  const [showExplorer, setShowExplorer] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showRecycle, setShowRecycle] = useState(false);
  const [recycleItems, setRecycleItems] = useState(loadRecycle());
  const [showHistoryMenu, setShowHistoryMenu] = useState(false);

  useEffect(() => { 
    setRecycleItems(loadRecycle()); 
  }, []);

  const theme = settings.theme;

  const openApp = (app) => {
    const newHist = [app, ...history.filter(h => h !== app)].slice(0, 10);
    setHistory(newHist); 
    saveHistory(newHist);

    switch (app) {
      case 'Terminal': setShowTerminal(true); break;
      case 'Explorer': setShowExplorer(true); break;
      case 'Notes': setShowNotes(true); break;
      case 'Settings': setShowSettings(true); break;
      case 'Recycle': setShowRecycle(true); break;
      default: break;
    }
  };

  const updateIconPosition = (name, x, y) => {
    // Constrain positions to screen boundaries
    const constrainedX = Math.max(0, Math.min(x, window.innerWidth - 80));
    const constrainedY = Math.max(0, Math.min(y, window.innerHeight - 140)); // Leave space for taskbar
    
    const newIcons = { ...icons, [name]: { x: constrainedX, y: constrainedY } };
    setIcons(newIcons); 
    saveIcons(newIcons);
  };

  const wallpaperClass = {
    blue: 'bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800',
    purple: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500', 
    green: 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600',
    gray: 'bg-gradient-to-br from-slate-400 via-gray-500 to-zinc-600'
  }[settings.wallpaper] || 'bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800';

  const onDeleteFromExplorer = () => { 
    setRecycleItems(loadRecycle()); 
  };

  const handleRestore = (item) => {
    const f = loadFS();
    const targetPath = item.originalPath || "/";
    if (!f[targetPath]) f[targetPath] = [];
    saveFS({ ...f, [targetPath]: [...f[targetPath], item] });
    setRecycleItems(loadRecycle().filter(i => i.name !== item.name));
  };

  const handleEmpty = () => { 
    saveRecycle([]); 
    setRecycleItems([]); 
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleAppDelete = (appName) => {
    // Remove the app icon from desktop (except Recycle bin)
    if (appName === 'Recycle') return;
    
    // Create a "deleted app" entry for recycle bin
    const deletedApp = {
      name: `${appName} App`,
      type: 'app',
      originalName: appName,
      deletedAt: new Date().toISOString()
    };
    
    const currentRecycle = loadRecycle();
    saveRecycle([...currentRecycle, deletedApp]);
    setRecycleItems([...currentRecycle, deletedApp]);
    
    // Remove from icons (hide from desktop)
    const newIcons = { ...icons };
    delete newIcons[appName];
    setIcons(newIcons);
    saveIcons(newIcons);
    
    // Show success message
    setTimeout(() => {
      alert(`${appName} has been moved to Recycle Bin`);
    }, 100);
  };

  const handleAppRestore = (deletedApp) => {
    if (deletedApp.type === 'app' && deletedApp.originalName) {
      // Restore app icon to desktop
      const defaultPositions = {
        Terminal: { x: 30, y: 30 },
        Explorer: { x: 30, y: 120 },
        Notes: { x: 30, y: 210 },
        Settings: { x: 30, y: 300 }
      };
      
      const newIcons = { 
        ...icons, 
        [deletedApp.originalName]: defaultPositions[deletedApp.originalName] || { x: 30, y: 480 }
      };
      setIcons(newIcons);
      saveIcons(newIcons);
      
      // Remove from recycle bin
      const remaining = loadRecycle().filter(item => item.name !== deletedApp.name);
      saveRecycle(remaining);
      setRecycleItems(remaining);
    } else {
      // Handle regular files (existing functionality)
      handleRestore(deletedApp);
    }
  };

  return (
    <div className={`h-screen w-screen relative ${wallpaperClass} overflow-hidden`}>
      {/* Desktop Icons */}
      {Object.keys(icons).map((name) => (
        <DesktopIcon 
          key={name} 
          name={name} 
          x={icons[name].x} 
          y={icons[name].y} 
          onOpen={() => openApp(name)} 
          theme={theme} 
          updatePosition={updateIconPosition} 
          full={name === 'Recycle' && recycleItems.length > 0}
          onDelete={name !== 'Recycle' ? handleAppDelete : undefined}
        />
      ))}

      {/* Applications */}
      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} theme={theme} />}
      {showExplorer && <FileExplorer onClose={() => setShowExplorer(false)} theme={theme} onDelete={onDeleteFromExplorer} />}
      {showNotes && (
        <TextEditor 
          file={{ name: 'notes.txt', content: loadNotes() }} 
          onSave={(f) => saveNotes(f.content)} 
          onClose={() => setShowNotes(false)} 
          theme={theme} 
        />
      )}
      {showSettings && (
        <SettingsWindow 
          onClose={() => setShowSettings(false)} 
          theme={theme} 
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      )}
      {showRecycle && (
        <RecycleBinApp 
          onClose={() => setShowRecycle(false)} 
          theme={theme} 
          onRestore={(it) => { 
            handleAppRestore(it); 
          }} 
          onEmpty={() => { handleEmpty(); }} 
        />
      )}

      {/* Taskbar */}
      <Taskbar 
        onOpenTerminal={() => openApp('Terminal')} 
        onOpenExplorer={() => openApp('Explorer')} 
        onOpenNotes={() => openApp('Notes')} 
        onOpenSettings={() => openApp('Settings')} 
        history={history} 
        reopenApp={openApp} 
        theme={theme}
        showHistoryMenu={showHistoryMenu}
        setShowHistoryMenu={setShowHistoryMenu}
      />
    </div>
  );
}

// Modern Taskbar component
function Taskbar({ onOpenTerminal, onOpenExplorer, onOpenNotes, onOpenSettings, history, reopenApp, theme, showHistoryMenu, setShowHistoryMenu }) {
  const taskbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (taskbarRef.current && !taskbarRef.current.contains(event.target)) {
        setShowHistoryMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowHistoryMenu]);

  const taskbarButtons = [
    { onClick: onOpenTerminal, icon: '⌘', label: 'Terminal', color: 'from-gray-800 to-black' },
    { onClick: onOpenExplorer, icon: '�', label: 'Explorer', color: 'from-blue-500 to-blue-700' },
    { onClick: onOpenNotes, icon: '📝', label: 'Notes', color: 'from-yellow-400 to-orange-500' },
    { onClick: onOpenSettings, icon: '⚙️', label: 'Settings', color: 'from-gray-600 to-gray-800' }
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 h-16 ${
      theme === 'dark' 
        ? 'bg-black bg-opacity-80' 
        : 'bg-white bg-opacity-80'
    } backdrop-blur-2xl border-t ${
      theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
    } flex items-center justify-between px-8 shadow-2xl`}
    style={{
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}
    >
      {/* Left side - App buttons */}
      <div className="flex items-center gap-3">
        {taskbarButtons.map(({ onClick, icon, label, color }) => (
          <motion.button 
            key={label}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 text-white text-lg relative group`} 
            onClick={onClick}
          >
            {icon}
            {/* Tooltip */}
            <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
            }`}>
              {label}
            </div>
          </motion.button>
        ))}
        
        {/* Recent Apps Dropdown */}
        <div className="relative ml-2" ref={taskbarRef}>
          <motion.button 
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 text-white text-lg relative group ${
              showHistoryMenu ? 'ring-4 ring-purple-300 ring-opacity-50' : ''
            }`}
            onClick={() => setShowHistoryMenu(!showHistoryMenu)}
          >
            📋
            {/* Tooltip */}
            <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
            }`}>
              Recent
            </div>
          </motion.button>
          
          {showHistoryMenu && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute bottom-16 left-0 min-w-[220px] rounded-2xl shadow-2xl border backdrop-blur-xl ${
                theme === 'dark' 
                  ? 'bg-gray-900 bg-opacity-95 text-white border-gray-700' 
                  : 'bg-white bg-opacity-95 text-gray-700 border-gray-200'
              } max-h-56 overflow-y-auto`}
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="p-4">
                <div className={`text-sm font-bold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Recently Used
                </div>
                {history.length === 0 ? (
                  <div className={`text-sm text-center py-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <div className="text-2xl mb-2">📭</div>
                    <div>No recent applications</div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {history.map((h, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ x: 4, backgroundColor: theme === 'dark' ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.5)' }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-3 py-2 cursor-pointer text-sm rounded-xl transition-all duration-200 flex items-center gap-3`} 
                        onClick={() => { reopenApp(h); setShowHistoryMenu(false); }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white">
                          {h === 'Terminal' ? '⌘' : h === 'Explorer' ? '�' : h === 'Notes' ? '📝' : h === 'Settings' ? '⚙️' : '🗑️'}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{h}</div>
                          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Application
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Right side - System info */}
      <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
        {/* Clock with modern design */}
        <div className={`px-4 py-2 rounded-2xl text-sm font-mono ${
          theme === 'dark' 
            ? 'bg-gray-800 bg-opacity-50 border border-gray-700' 
            : 'bg-gray-100 bg-opacity-50 border border-gray-200'
        } backdrop-blur-sm shadow-lg`}>
          <Clock theme={theme} />
        </div>
      </div>
    </div>
  );
}

// Main App component
export default function App() {
  const [booting, setBooting] = useState(true);
  
  useEffect(() => { 
    if (!localStorage.getItem(FS_KEY)) {
      saveFS({ "/": [
        { name: "welcome.txt", type: "file", content: "Welcome to JS-OS!\n\nThis is a simple operating system built with React.\n\nFeatures:\n- File system with create, edit, delete operations\n- Terminal with basic commands\n- Recycle bin functionality\n- Customizable themes and wallpapers\n- Draggable windows and desktop icons\n\nDouble-click files to edit them or use the terminal for advanced operations.\n\nEnjoy exploring your new OS!" },
        { name: "documents", type: "dir" },
        { name: "readme.txt", type: "file", content: "JS-OS v1.0\n\nCreated by: Purushottam Nardewad\n\nThis operating system demonstrates:\n- React component architecture\n- Local storage for persistence\n- Drag and drop functionality\n- Context menus and file operations\n\nTry creating new files and folders!" }
      ] }); 
    } 
  }, []);

  return booting ? <BootScreen onFinish={() => setBooting(false)} /> : <Desktop />;
}
