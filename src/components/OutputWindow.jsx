import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import { compareCode } from '../backend/optimization';

const Tab = ({ label, active, onClick, indicator }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 flex items-center space-x-2 ${
            active
                ? 'text-zinc-100 border-b-2 border-emerald-500'
                : 'text-zinc-400 hover:text-zinc-300'
        }`}
    >
        {indicator && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
        <span>{label}</span>
    </button>
);

const OutputWindow = ({ response, loading, originalCode }) => {
    const [activeTab, setActiveTab] = useState('output');
    const [analysisDetails, setAnalysisDetails] = useState('');
    const [analyzing, setAnalyzing] = useState(false);

    const filterThinkTags = (text) => {
        if (!text) return text;
        return text.replace(/<think>[\s\S]*?<\/think>/g, '');
    };

    const processedResponse = response ? filterThinkTags(response) : response;

    useEffect(() => {
        const analyzeChanges = async () => {
            if (processedResponse && originalCode && activeTab === 'details') {
                setAnalyzing(true);
                try {
                    const analysis = await compareCode(originalCode, processedResponse);
                    setAnalysisDetails(analysis);
                } catch (error) {
                    console.error('Analysis error:', error);
                    setAnalysisDetails('Failed to analyze optimization details. Please try again.');
                }
                setAnalyzing(false);
            }
        };

        analyzeChanges();
    }, [processedResponse, originalCode, activeTab]);

    const renderContent = () => {
        if (activeTab === 'output') {
            if (loading) {
                return (
                    <div className="flex items-center justify-center h-full space-x-2 text-zinc-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Optimizing code...</span>
                    </div>
                );
            }

            if (processedResponse) {
                return (
                    <div className="h-full w-full">
                        <Editor
                            height="100%"
                            defaultLanguage="javascript"
                            value={processedResponse}
                            theme="vs-dark"
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                fontSize: 14,
                                lineNumbers: 'on',
                                renderLineHighlight: 'all',
                                scrollbar: {
                                    vertical: 'visible',
                                    horizontal: 'visible'
                                }
                            }}
                        />
                    </div>
                );
            }

            return (
                <div className="flex items-center justify-center h-full text-zinc-500">
                    Optimized code will appear here...
                </div>
            );
        } else {
            // Details tab
            if (analyzing) {
                return (
                    <div className="flex items-center justify-center h-full space-x-2 text-zinc-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing optimization details...</span>
                    </div>
                );
            }

            if (analysisDetails) {
                return (
                    <div className="h-full overflow-y-auto pr-2">
                        <Markdown className="prose prose-invert max-w-none">
                            {analysisDetails}
                        </Markdown>
                    </div>
                );
            }

            if (!originalCode || !processedResponse) {
                return (
                    <div className="flex items-center justify-center h-full text-zinc-500">
                        Enter code and optimize it to see analysis details...
                    </div>
                );
            }

            return (
                <div className="flex items-center justify-center h-full text-zinc-500">
                    Optimization details will appear here...
                </div>
            );
        }
    };

    return (
        <div className="w-1/2 h-[600px] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col">
            <div className="border-b border-zinc-800 bg-zinc-950">
                <div className="flex items-center">
                    <Tab
                        label="Optimized Output"
                        active={activeTab === 'output'}
                        onClick={() => setActiveTab('output')}
                        indicator={true}
                    />
                    <Tab
                        label="Optimization Details"
                        active={activeTab === 'details'}
                        onClick={() => setActiveTab('details')}
                    />
                </div>
            </div>

            <div className="flex-1 p-4 text-white overflow-hidden font-mono text-sm">
                {renderContent()}
            </div>
        </div>
    );
};

export default OutputWindow;