import React, { useState, useEffect, useCallback, useRef } from 'react';
import style from './FileUploader.module.css';

// FileUploader component (works, but not working the way i want it to. Might try adding the progress bar component instead of making a new one)
// Css problem with preview window
// Scroll problem with preview window

interface FileUploaderProps {
    onFileChange: (file: File | null) => void;
    className?: string;
}

export const FileUploaderComponent: React.FC<FileUploaderProps> = ({ onFileChange, className = '' }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={`${style.FileUploaderComponentWrapper} ${className} ${isDragging ? style.FileUploaderComponentDragActive : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick} 
        >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className={style.FileUploaderComponentInput} />

            <div className={style.FileUploaderComponentDropzone}>
                {isDragging ? 'Drop your file here' : 'Drag & drop a file or click to select'}
            </div>

            {error && <div className={style.FileUploaderComponentError}>{error}</div>}

            {selectedFile && (
                <div
                    className={style.FileUploaderComponentFileName}
                    onMouseEnter={() => setShowPreview(true)}
                    onMouseLeave={() => setShowPreview(false)}
                >
                    {selectedFile.name}

                    {showPreview && (
                        <div className={style.FileUploaderComponentHoverPreview}>
                            {previewUrl && selectedFile.type.startsWith('image/') && (
                                <img src={previewUrl} alt="Preview" className={style.FileUploaderComponentPreviewImage} />
                            )}
                            {previewUrl && selectedFile.type.startsWith('video/') && (
                                <video src={previewUrl} controls className={style.FileUploaderComponentPreviewVideo} />
                            )}
                            {previewUrl && selectedFile.type.startsWith('audio/') && (
                                <audio src={previewUrl} controls className={style.FileUploaderComponentPreviewAudio} />
                            )}
                            {previewUrl && selectedFile.type === 'application/pdf' && (
                                <embed src={previewUrl} type="application/pdf" className={style.FileUploaderComponentPreviewPdf} />
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
