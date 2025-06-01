
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
}

export const handleFileUpload = async (files: FileList): Promise<UploadedFile[]> => {
  const uploadedFiles: UploadedFile[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error(`File ${file.name} exceeds 10MB limit`);
    }
    
    // Create a mock URL for demo purposes (in real app, this would upload to storage)
    const url = URL.createObjectURL(file);
    
    const uploadedFile: UploadedFile = {
      id: `file_${Date.now()}_${i}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url,
      uploadedAt: new Date()
    };
    
    uploadedFiles.push(uploadedFile);
  }
  
  return uploadedFiles;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
