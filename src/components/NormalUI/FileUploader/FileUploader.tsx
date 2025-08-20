import React, { useState, useEffect } from 'react';
import style from './FileUploader.module.css';

// FileUploader component (not tested and work in progress)

interface FileUploaderProps {
    onFileChange: (file: File | null) => void;
    className?: string;
}

export const FileUploaderComponent: React.FC<FileUploaderProps> = ({
    onFileChange,
    className = '',
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        onFileChange(selectedFile);
    }, [selectedFile, onFileChange]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            if (file.size > 500 * 1024 * 1024) {
                setError('File size exceeds 500MB limit.');
                setSelectedFile(null);
            } else {
                setError('');
                setSelectedFile(file);
            }
        } else {
            setSelectedFile(null);
            setError('');
        }
    };

    return (
        <div className={`${style.FileUploaderComponentWrapper} ${className}`}>
            <input
                type="file"
                onChange={handleFileChange}
                className={style.FileUploaderComponentInput}
            />

            {error && (
                <div className={style.FileUploaderComponentError}>{error}</div>
            )}

            {selectedFile && (
                <div className={style.FileUploaderComponentFileName}>
                    {selectedFile.name}
                </div>
            )}
        </div>
    );
};
