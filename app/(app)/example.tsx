import { ThemeContext } from '@/providers/ThemeProvider';
import { useContext, useState } from 'react';
import {
    Button,
    Card,
    H1,
    H3,
    Paragraph,
    XStack,
    YStack,
    Input,
    Label,
    Theme,
    Progress,
    Separator,
    ScrollView
} from 'tamagui';
import { BookOpen, Moon, Sun, Search, Plus } from '@tamagui/lucide-icons'; // Certifique-se de ter instalado caso queira usar ícones

export default function ExamplePage() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [progress] = useState(65);

    return (
        // O contêiner principal escuta os tokens globais $background e $color
        <ScrollView paddingBottom="$8" backgroundColor="$background" flex={1}>
            <YStack padding="$4" gap="$5" flex={1}>

                {/* 1. CABEÇALHO E SWITCH DE TEMA */}
                <XStack alignItems="center" justifyContent="space-between" marginTop="$2">
                    <YStack>
                        <Paragraph color="$colorMuted" size="$3" fontWeight="bold">Olá, desenvolvedor! 👋</Paragraph>
                        <H1 size="$7" color="$color" fontFamily="$heading" fontWeight="900">EntreLinhas</H1>
                    </YStack>

                    {/* Botão de alternar tema fornecido pelo seu provider */}
                    <Button
                        size="$4"
                        circular
                        borderColor="$borderColor"
                        borderWidth={1}
                        backgroundColor="$background"
                        onPress={toggleTheme}
                        icon={theme === 'light' ? Moon : Sun}
                    />
                </XStack>

                <Separator borderColor="$borderColor" />

                {/* 2. BARRA DE PESQUISA (EXEMPLO DE INPUT COM VARIANTES) */}
                <XStack alignItems="center" gap="$2" backgroundColor="$backgroundHover" padding="$2" borderRadius="$4" borderWidth={1} borderColor="$borderColor">
                    <Search size={20} color="$colorMuted" />
                    <Input
                        flex={1}
                        borderWidth={0}
                        backgroundColor="transparent"
                        placeholder="Pesquisar na sua biblioteca..."
                        placeholderTextColor="$colorMuted"
                        color="$color"
                    />
                </XStack>

                {/* 3. CARD DE PROGRESSO GERAL (DEMONSTRAÇÃO DE ELEVAÇÃO E PROGRESS BAR) */}
                <Card
                    padding="$4"
                    elevation="$4"
                    backgroundColor="$background"
                    borderWidth={1}
                    borderColor="$borderColor"
                    borderRadius="$4"
                >
                    <YStack gap="$2">
                        <H3 color="$color" size="$5" fontWeight="bold">Meta de Leitura de 2026</H3>
                        <Paragraph color="$colorMuted" size="$3">Você já leu 13 de 20 livros programados.</Paragraph>

                        <Progress value={progress} max={100} size="$3" marginTop="$2" backgroundColor="$borderColor">
                            <Progress.Indicator animation="lazy" backgroundColor="$primary" />
                        </Progress>

                        <XStack justifyContent="flex-end" marginTop="$1">
                            <Paragraph color="$primary" size="$2" fontWeight="bold">{progress}% Concluído</Paragraph>
                        </XStack>
                    </YStack>
                </Card>

                {/* 4. SEÇÃO "LENDO AGORA" (VITRINE DE CARDS EM LINHA - XSTACK) */}
                <YStack gap="$3">
                    <H3 color="$color" size="$5" fontWeight="bold">Lendo Agora</H3>

                    <XStack gap="$3" flexWrap="wrap">
                        {/* Card Exemplo 1 */}
                        <Card
                            flex={1}
                            flexBasis={150}
                            padding="$3"
                            backgroundColor="$backgroundHover"
                            borderWidth={1}
                            borderColor="$borderColor"
                            borderRadius="$3"
                        >
                            <YStack gap="$2">
                                <XStack padding="$2" backgroundColor="$primary" borderRadius="$2" alignSelf="flex-start">
                                    <BookOpen size={16} />
                                </XStack>
                                <Paragraph color="$color" fontWeight="bold" size="$3" numberOfLines={1}>O Hobbit</Paragraph>
                                <Paragraph color="$colorMuted" size="$2">J.R.R. Tolkien</Paragraph>
                                <Button size="$2" theme="blue" marginTop="$2">Atualizar Pág.</Button>
                            </YStack>
                        </Card>

                        {/* Card Exemplo 2 */}
                        <Card
                            flex={1}
                            flexBasis={150}
                            padding="$3"
                            backgroundColor="$backgroundHover"
                            borderWidth={1}
                            borderColor="$borderColor"
                            borderRadius="$3"
                        >
                            <YStack gap="$2">
                                <XStack padding="$2" backgroundColor="$primary" borderRadius="$2" alignSelf="flex-start">
                                    <BookOpen size={16} />
                                </XStack>
                                <Paragraph color="$color" fontWeight="bold" size="$3" numberOfLines={1}>Duna</Paragraph>
                                <Paragraph color="$colorMuted" size="$2">Frank Herbert</Paragraph>
                                <Button size="$2" theme="blue" marginTop="$2" >Atualizar Pág.</Button>
                            </YStack>
                        </Card>
                    </XStack>
                </YStack>

                {/* 5. FORMULÁRIO RÁPIDO (EXEMPLO DE INPUTS E COMPONENTES DE TEMA INVERSO) */}
                <YStack gap="$3" marginTop="$2">
                    <H3 color="$color" size="$5" fontWeight="bold">Adicionar livro rápido</H3>

                    <YStack gap="$2">
                        <Label color="$color" size="$3">Título do Livro</Label>
                        <Input
                            backgroundColor="$backgroundHover"
                            borderColor="$borderColor"
                            color="$color"
                            placeholder="Ex: Dom Casmurro"
                        />
                    </YStack>

                    {/* O componente <Theme name="inverse"> força tudo dentro dele a inverter as cores. 
              Se o app estiver em Light, o botão renderiza como se fosse Dark, criando um contraste excelente */}
                    <Theme name="inverse">
                        <Button icon={Plus} fontWeight="bold" marginTop="$2" elevation="$2">
                            Salvar na Lista
                        </Button>
                    </Theme>
                </YStack>

            </YStack>
        </ScrollView>
    );
}