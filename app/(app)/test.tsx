import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Sharing from 'expo-sharing';
import React, { useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Button, Image, Text, XStack, YStack } from 'tamagui';

export default function TestPage() {
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const cameraRef = useRef<any>(null);

    // 1. Verifica se as permissões foram carregadas
    if (!permission) {
        return (
            <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
                <Text>Carregando permissões...</Text>
            </YStack>
        );
    }

    // 2. Se a permissão não foi concedida, exibe a tela de solicitação
    if (!permission.granted) {
        return (
            <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" gap="$4" backgroundColor="$background">
                <Text textAlign="center" fontSize="$5">Precisamos da sua permissão para acessar a câmera</Text>
                <Button theme="blue" onPress={requestPermission}>
                    Conceder Permissão
                </Button>
            </YStack>
        );
    }

    // 3. Função para tirar a foto
    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const options = { quality: 0.8, skipProcessing: false };
                const data = await cameraRef.current.takePictureAsync(options);
                setPhotoUri(data.uri);
            } catch (error) {
                console.error("Erro ao tirar foto:", error);
            }
        }
    };

    // 4. Função para compartilhar a foto 
    const sharePhoto = async () => {
        if (!photoUri) return;

        const isAvailable = await Sharing.isAvailableAsync();

        if (isAvailable) {
            // Se for Web (Pode retirar se quiser Danilo)
            if (Platform.OS === 'web') {
                try {
                    await navigator.share({
                        title: 'Minha Foto de Teste',
                        text: 'Olha a foto que acabei de tirar!',
                        url: window.location.href
                    });
                } catch (webError) {
                    console.log('Compartilhamento cancelado ou não suportado no navegador:', webError);
                }
            } else {
                // Comportamento Nativo
                await Sharing.shareAsync(photoUri, {
                    dialogTitle: 'Compartilhar sua foto de teste',
                    mimeType: 'image/jpeg',
                });
            }
        } else {
            alert('O compartilhamento não está disponível nesta plataforma.');
        }
    };

    return (
        <YStack flex={1} backgroundColor="$background" padding="$4" gap="$4" justifyContent="center">
            <Text fontSize="$8" fontWeight="bold" textAlign="center" marginBottom="$4">
                Teste: SDK de Câmera e Compartilhamento
            </Text>

            {/* Container da foto */}
            <YStack width="100%" height={400} borderRadius="$4" overflow="hidden" backgroundColor="$backgroundHover" justifyContent="center" alignItems="center">
                {!photoUri ? (
                    <CameraView
                        ref={cameraRef}
                        style={{ flex: 1, width: '100%', transform: [{ scaleX: -1 }] }}
                        facing="back"
                    />
                ) : (
                    <Image
                        src={photoUri}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                    />
                )}
            </YStack>

            {/* Controles  */}
            <XStack gap="$3" justifyContent="center" marginTop="$2">
                {!photoUri ? (
                    <Button theme="green" flex={1} onPress={takePicture}>
                        Tirar Foto
                    </Button>
                ) : (
                    <>
                        <Button theme="alt1" flex={1} onPress={() => setPhotoUri(null)}>
                            Tirar Outra
                        </Button>
                        <Button theme="purple" flex={1} onPress={sharePhoto}>
                            Compartilhar
                        </Button>
                    </>
                )}
            </XStack>
        </YStack>
    );
}