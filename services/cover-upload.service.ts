import { supabase } from "@/lib/supabase/client";

interface ExpoFile {
    uri: string;
    name: string;
    mimeType?: string;
}

class CoverUploadService {

    async uploadCover(file: ExpoFile, userId: string): Promise<string> {
        const extension = file.name.split('.').pop() ?? 'jpg';
        const filePath = `${userId}/${this.generateId()}.${extension}`;

        try {
            // 1. Converter a URI para um Blob (binário)
            const response = await fetch(file.uri);
            const arrayBuffer = await response.arrayBuffer();

            // 2. Fazer o upload usando o Array Buffer gerado
            const { error } = await supabase.storage
                .from('covers')
                .upload(filePath, arrayBuffer, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: file.mimeType || 'image/jpeg',
                });

            if (error) throw error;

            return filePath;

        } catch (error) {
            console.error("Erro no upload:", error);
            throw error;
        }
    }

    private generateId(): string {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 8);
        return `${timestamp}-${randomStr}`;
    }
}

export const coverUploadService = new CoverUploadService();