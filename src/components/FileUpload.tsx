/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FC } from 'react';
import { UploadCloud } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="file-upload" className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-600 bg-slate-800 p-8 text-center transition-colors hover:border-cyan-500 hover:bg-slate-700">
        <UploadCloud size={40} className="text-slate-500" />
        <p className="mt-2 text-lg font-semibold text-gray-300">ارفع ملف PDF</p>
        <p className="text-sm text-gray-400">اسحب الملف هنا أو اضغط للتحميل</p>
      </label>
      <input id="file-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
