import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { coverUploadService } from '@/services/cover-upload.service';
import { useAuth } from './useAuth';

export function useUploadImage() {
    const [loading, setLoading] = useState(false);
    const [filePath, setFilePath] = useState<string | null>(null);
    const { user } = useAuth();

    if (!user) {
        throw new Error("Usuário não autenticado. O hook useUploadImage requer um usuário autenticado.");
    }

    const userId = user.id;

    const selectAndUpload = async () => {
        try {
            const resultado = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
            });

            if (resultado.canceled) return null;

            setLoading(true);
            const asset = resultado.assets[0];

            // Chamada simplificada usando o serviço novo
            const path = await coverUploadService.uploadCover({
                uri: asset.uri,
                name: asset.name,
                mimeType: asset.mimeType ?? 'image/jpeg',
            }, userId);

            setFilePath(path);
            return path;
        } catch (error) {
            console.error("Erro no hook de upload:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };


    return { selectAndUpload, filePath, loading };
}