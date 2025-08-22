import React, { useState, useEffect, useCallback, useRef } from 'react';
import style from './FileUploader.module.css';

// FileUploader component

interface FileUploaderProps {
    onFileChange: (file: File | null) => void;
    className?: string;
    accept?: string;
}

export const FileUploaderComponent: React.FC<FileUploaderProps> = ({ onFileChange, className = '', accept }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Effect to handle file changes and update preview URL
    useEffect(() => {
        onFileChange(selectedFile);

        if (!selectedFile) {
            setPreviewUrl(null);
            return;
        }

        if (
            selectedFile.type.startsWith('image/') ||
            selectedFile.type.startsWith('video/') ||
            selectedFile.type.startsWith('audio/') ||
            selectedFile.type === 'application/pdf'
        ) {
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [selectedFile, onFileChange]);

    // Close preview on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowPreview(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Function to handle file selection and validation, useCallback to prevent unnecessary re-renders
    const handleFile = useCallback((file: File | null) => {
        if (!file) {
            setSelectedFile(null);
            setError('');
            return;
        }

        if (file.size > 500 * 1024 * 1024) {
            setError('File size exceeds 500MB limit.');
            setSelectedFile(null);
        } else {
            setError('');
            setSelectedFile(file);
        }
    }, []);

    // Handlers for file input change, drag and drop events
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        handleFile(file);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null;
        handleFile(file);
    };

    return (
        <div
            className={`${style.FileUploaderComponentWrapper} ${className} ${isDragging ? style.FileUploaderComponentDragActive : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            aria-label="File uploader. Click to select a file or drag and drop"
        >
            <input
                id="fileInput"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className={style.FileUploaderComponentInput}
                accept={accept}
            />

            <label htmlFor="fileInput" className={style.FileUploaderComponentDropzone}>
                {isDragging ? 'Drop your file here' : 'Drag & drop a file or click to select'}
            </label>

            {error && (
                <div className={style.FileUploaderComponentError} role="alert">
                    {error}
                </div>
            )}

            {selectedFile && (
                <div
                    className={style.FileUploaderComponentFileName}
                    onMouseEnter={() => setShowPreview(true)}
                    onMouseLeave={() => setShowPreview(false)}
                >
                    {selectedFile.name}

                    {showPreview && (
                        <div className={style.FileUploaderComponentHoverPreview} role="dialog" aria-modal="true" aria-label="File preview">
                            <button
                                className={style.FileUploaderComponentCloseButton}
                                aria-label="Close preview"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowPreview(false);
                                }}
                            >
                                ✕
                            </button>

                            {previewUrl && selectedFile.type.startsWith('image/') && (
                                <img
                                    src={previewUrl}
                                    alt={`Preview of ${selectedFile.name}`}
                                    className={style.FileUploaderComponentPreviewImage}
                                />
                            )}
                            {previewUrl && selectedFile.type.startsWith('video/') && (
                                <video
                                    src={previewUrl}
                                    controls
                                    aria-label={`Video preview of ${selectedFile.name}`}
                                    className={style.FileUploaderComponentPreviewVideo}
                                />
                            )}
                            {previewUrl && selectedFile.type.startsWith('audio/') && (
                                <audio
                                    src={previewUrl}
                                    controls
                                    aria-label={`Audio preview of ${selectedFile.name}`}
                                    className={style.FileUploaderComponentPreviewAudio}
                                />
                            )}
                            {previewUrl && selectedFile.type === 'application/pdf' && (
                                <embed
                                    src={previewUrl}
                                    type="application/pdf"
                                    className={style.FileUploaderComponentPreviewPdf}
                                    aria-label={`PDF preview of ${selectedFile.name}`}
                                />
                            )}
                            {!previewUrl && (
                                <div className={style.FileUploaderComponentPreviewFallback}>
                                    <strong>{selectedFile.name}</strong>
                                    <p>Type: {selectedFile.type || 'Unknown'}</p>
                                    <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

/*

USE EXAMPLES:

// 1. Basic usage (just get selected file):
// <FileUploaderComponent
//     onFileChange={(file) => {
//         console.log("Selected file:", file);
//     }}
// />

// 2. Restrict usage to specific file types:
// <FileUploaderComponent
//     onFileChange={(file) => {
//         if (file && !file.type.startsWith("image/")) {
//             alert("Only images are allowed!");
//             return;
//         }
//         console.log("Valid image file:", file);
//     }}
// />

// 3. Upload to server after selection:
// <FileUploaderComponent
//     onFileChange={(file) => {
//         if (!file) return;
//         const formData = new FormData();
//         formData.append("file", file);
//         fetch("/api/upload", {
//             method: "POST",
//             body: formData,
//         })
//         .then(res => res.json())
//         .then(data => console.log("Upload success:", data))
//         .catch(err => console.error("Upload error:", err));
//     }}
// />

*/
