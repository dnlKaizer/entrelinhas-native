import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { coverUploadService } from '@/services/cover-upload.service';
import { useAuth } from './useAuth';
import { ROUTES } from '@/constants/routes';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export function useUploadImage() {
    const [loading, setLoading] = useState(false);
    const [filePath, setFilePath] = useState<string | null>(null);
    const { user } = useAuth();

    if (!user) {
        router.replace(ROUTES.LOGIN);
        return {
            selectFromGallery: async () => null,
            takeWithCamera: async () => null,
            filePath: null,
            loading: false
        };
    }

    const userId = user.id;

    // ─── Função Interna de Upload ─────────────────────────────────────────────
    const uploadFile = async (uri: string, name: string, mimeType: string) => {
        try {
            setLoading(true);
            const expoFile = {
                uri,
                name,
                mimeType,
            };

            const path = await coverUploadService.uploadCover(expoFile, userId);
            setFilePath(path);
            return path;
        } catch (error) {
            console.error("Erro no upload do arquivo:", error);
            Alert.alert("Erro", "Não foi possível enviar a imagem para o servidor.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    // ─── Fluxo da Galeria (DocumentPicker) ────────────────────────────────────
    const selectFromGallery = async () => {
        try {
            const document = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: true,
            });

            if (document.canceled) return null;

            const asset = document.assets[0];
            return await uploadFile(
                asset.uri,
                asset.name,
                asset.mimeType ?? 'image/jpeg'
            );
        } catch (error) {
            console.error("Erro ao selecionar da galeria:", error);
            return null;
        }
    };

    // ─── Fluxo da Câmera (ImagePicker) ───────────────────────────────────────
    const takeWithCamera = async () => {
        try {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            if (permissionResult.granted === false) {
                Alert.alert('Permissão necessária', 'Você precisa dar permissão de acesso à câmera.');
                return null;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [3, 4], // Boa proporção para capas de livro
                quality: 0.8,
            });

            if (result.canceled || !result.assets?.[0]?.uri) return null;

            const asset = result.assets[0];

            // Como a câmera não dá um nome de arquivo nativo amigável em algumas plataformas, 
            // geramos um dinâmico com a extensão correta.
            const filename = `camera_${Date.now()}.jpg`;
            const mimeType = asset.mimeType ?? 'image/jpeg';

            return await uploadFile(asset.uri, filename, mimeType);
        } catch (error) {
            console.error("Erro ao tirar foto:", error);
            return null;
        }
    };

    return { selectFromGallery, takeWithCamera, filePath, loading };
}