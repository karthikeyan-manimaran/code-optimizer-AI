import React, { useEffect, useRef, useState } from 'react';
import * as monaco from '@monaco-editor/react';

const CodeEditor = ({ onChange, onCodeChange }) => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'xml', label: 'XML' },
    { value: 'yaml', label: 'YAML' },
    { value: 'json', label: 'JSON' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'shell', label: 'Shell Script' }
  ];

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleChange = (value) => {
    setCode(value);
    onChange?.(value);
    onCodeChange?.(value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex h-full rounded-l-md bg-gray-800 text-white p-4">
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Code Editor</h3>
          <select
            className="bg-gray-700 text-white rounded-md p-1 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleLanguageChange}
            value={language}
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative bg-gray-900 rounded-md h-full overflow-hidden">
          <monaco.Editor
            height="100%"
            language={language}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
            }}
            onChange={handleChange}
            onMount={handleEditorDidMount}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;