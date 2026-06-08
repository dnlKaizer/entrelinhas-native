import React, { useCallback } from 'react';
import {
    YStack,
    XStack,
    Text,
    Input,
    TextArea,
    Button,
    Separator,
    ScrollView,
    Spinner,
    H4,
} from 'tamagui';
import {
    BookOpen,
    User,
    Hash,
    Calendar,
    AlignLeft,
    Image as ImageIcon,
    CheckCircle,
} from '@tamagui/lucide-icons-2';
import { IBook, IBookInsert, IBookUpdate } from '@/types/book.types';
import { BookFormValues, useBookForm } from '@/hooks/useBookForm';
import { FieldWrapper } from './FieldWrapper';
import { StatusSelector } from './StatusSelector';

// ─── Tipagens ────────────────────────────────────────────────────────────────

interface BookFormProps {
    /** Livro existente para modo de edição. Omita para modo de inserção. */
    book?: IBook;
    /** Callback chamado após submit bem-sucedido. */
    onSubmit: (data: IBookInsert | IBookUpdate) => Promise<void> | void;
    /** Callback para cancelar / fechar o formulário. */
    onCancel?: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function bookToFormValues(book: IBook): Partial<BookFormValues> {
    return {
        nome: book.nome ?? '',
        numPag: book.numPag?.toString() ?? '',
        status: book.status,
        autor: book.autor ?? '',
        ano: book.ano?.toString() ?? '',
        text: book.text ?? '',
        dtInicial: book.dtInicial ?? '',
        dtFinal: book.dtFinal ?? '',
        numPagRead: book.numPagRead?.toString() ?? '',
        img: book.img ?? '',
    };
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
    const initialValues = React.useMemo(() => {
        return book ? bookToFormValues(book) : undefined;
    }, [book]);

    const {
        values,
        errors,
        touched,
        isSubmitting,
        isEditMode,
        setValue,
        setBlurred,
        handleSubmit,
        reset,
    } = useBookForm({ initialValues, onSubmit });

    // Helpers de binding para inputs de texto
    const bind = useCallback(
        (field: keyof BookFormValues) => ({
            value: values[field] as string,
            onChangeText: (text: string) => setValue(field, text as any),
            onBlur: () => setBlurred(field),
        }),
        [values, setValue, setBlurred]
    );

    const showProgress =
        values.status === 'Lendo' || values.status === 'Lido';

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            backgroundColor="$background"
        >
            <YStack
                width="100%"
                maxWidth={800}
                backgroundColor="$background"
                borderRadius="$6"
                padding="$5"
                gap="$5"
                margin="$3"
                alignSelf='center'
            >
                {/* Header */}
                <YStack gap="$1">
                    <H4 fontWeight="800" letterSpacing={-0.5}>
                        {isEditMode ? '✏️  Editar livro' : '📚  Adicionar livro'}
                    </H4>
                    <Text color="$color10" fontSize="$3">
                        {isEditMode
                            ? 'Atualize as informações do livro.'
                            : 'Preencha os dados do novo livro.'}
                    </Text>
                </YStack>

                <Separator />

                {/* ── Seção: Identificação ── */}
                <YStack gap="$4">
                    <Text
                        fontSize="$2"
                        fontWeight="700"
                        color="$color9"
                        textTransform="uppercase"
                        letterSpacing={1.2}
                    >
                        Identificação
                    </Text>

                    {/* Nome */}
                    <FieldWrapper
                        label="Título"
                        error={touched.nome ? errors.nome : undefined}
                        required
                        icon={<BookOpen size={14} />}
                        htmlFor="nome"
                    >
                        <Input
                            id="nome"
                            placeholder="Ex.: O Senhor dos Anéis"
                            size="$4"
                            borderColor={touched.nome && errors.nome ? '$red8' : '$borderColor'}
                            focusStyle={{ borderColor: '$blue8' }}
                            {...bind('nome')}
                        />
                    </FieldWrapper>

                    {/* Autor */}
                    <FieldWrapper
                        label="Autor"
                        error={touched.autor ? errors.autor : undefined}
                        icon={<User size={14} />}
                        htmlFor="autor"
                    >
                        <Input
                            id="autor"
                            placeholder="Ex.: J.R.R. Tolkien"
                            size="$4"
                            focusStyle={{ borderColor: '$blue8' }}
                            {...bind('autor')}
                        />
                    </FieldWrapper>

                    {/* Ano + Páginas */}
                    <XStack gap="$3">
                        <YStack flex={1}>
                            <FieldWrapper
                                label="Ano"
                                error={touched.ano ? errors.ano : undefined}
                                icon={<Calendar size={14} />}
                                htmlFor="ano"
                            >
                                <Input
                                    id="ano"
                                    placeholder="Ex.: 1954"
                                    keyboardType="numeric"
                                    size="$4"
                                    borderColor={touched.ano && errors.ano ? '$red8' : '$borderColor'}
                                    focusStyle={{ borderColor: '$blue8' }}
                                    {...bind('ano')}
                                />
                            </FieldWrapper>
                        </YStack>

                        <YStack flex={1}>
                            <FieldWrapper
                                label="Nº de páginas"
                                error={touched.numPag ? errors.numPag : undefined}
                                required
                                icon={<Hash size={14} />}
                                htmlFor="numPag"
                            >
                                <Input
                                    id="numPag"
                                    placeholder="Ex.: 576"
                                    keyboardType="numeric"
                                    size="$4"
                                    borderColor={
                                        touched.numPag && errors.numPag ? '$red8' : '$borderColor'
                                    }
                                    focusStyle={{ borderColor: '$blue8' }}
                                    {...bind('numPag')}
                                />
                            </FieldWrapper>
                        </YStack>
                    </XStack>
                </YStack>

                <Separator />

                {/* ── Seção: Status & Progresso ── */}
                <YStack gap="$4">
                    <Text
                        fontSize="$2"
                        fontWeight="700"
                        color="$color9"
                        textTransform="uppercase"
                        letterSpacing={1.2}
                    >
                        Status & Progresso
                    </Text>

                    <StatusSelector
                        value={values.status}
                        onChange={(v) => setValue('status', v)}
                        error={touched.status ? errors.status : undefined}
                    />

                    {/* Datas de leitura */}
                    {showProgress ? (
                        <XStack gap="$3"  enterStyle={{ opacity: 0, y: -8 }}>
                            <YStack flex={1}>
                                <FieldWrapper
                                    label="Início"
                                    error={touched.dtInicial ? errors.dtInicial : undefined}
                                    icon={<Calendar size={14} />}
                                    htmlFor="dtInicial"
                                >
                                    <Input
                                        id="dtInicial"
                                        placeholder="AAAA-MM-DD"
                                        keyboardType="numbers-and-punctuation"
                                        size="$4"
                                        borderColor={
                                            touched.dtInicial && errors.dtInicial
                                                ? '$red8'
                                                : '$borderColor'
                                        }
                                        focusStyle={{ borderColor: '$blue8' }}
                                        {...bind('dtInicial')}
                                    />
                                </FieldWrapper>
                            </YStack>

                            {values.status === 'Lido' ? (
                                <YStack flex={1}>
                                    <FieldWrapper
                                        label="Conclusão"
                                        error={touched.dtFinal ? errors.dtFinal : undefined}
                                        icon={<CheckCircle size={14} />}
                                        htmlFor="dtFinal"
                                    >
                                        <Input
                                            id="dtFinal"
                                            placeholder="AAAA-MM-DD"
                                            keyboardType="numbers-and-punctuation"
                                            size="$4"
                                            borderColor={
                                                touched.dtFinal && errors.dtFinal
                                                    ? '$red8'
                                                    : '$borderColor'
                                            }
                                            focusStyle={{ borderColor: '$blue8' }}
                                            {...bind('dtFinal')}
                                        />
                                    </FieldWrapper>
                                </YStack>
                            ): null}
                        </XStack>
                    ) : null}

                    {/* Páginas lidas — só quando "Lendo" */}
                    <YStack  enterStyle={{ opacity: 0, y: -8 }}>
                        <FieldWrapper
                            label="Páginas lidas"
                            error={touched.numPagRead ? errors.numPagRead : undefined}
                            icon={<Hash size={14} />}
                            htmlFor="numPagRead"
                        >
                            <XStack alignItems="center" gap="$3">
                                <Input
                                    id="numPagRead"
                                    flex={1}
                                    placeholder="Ex.: 150"
                                    keyboardType="numeric"
                                    size="$4"
                                    borderColor={
                                        touched.numPagRead && errors.numPagRead
                                            ? '$red8'
                                            : '$borderColor'
                                    }
                                    focusStyle={{ borderColor: '$blue8' }}
                                    {...bind('numPagRead')}
                                />
                                {values.numPag ? (
                                    <Text color="$color9" fontSize="$3">
                                        de {values.numPag}
                                    </Text>
                                ) : null}
                            </XStack>

                            {/* Barra de progresso simples */}
                            {values.numPag && values.numPagRead ? (
                                <YStack
                                    marginTop="$2"
                                    height={6}
                                    backgroundColor="$color4"
                                    borderRadius="$10"
                                    overflow="hidden"
                                >
                                    <YStack
                                        height="100%"
                                        backgroundColor="$orange9"
                                        borderRadius="$10"
                                        width={`${Math.min(
                                            100,
                                            (Number(values.numPagRead) / Number(values.numPag)) * 100
                                        )}%`}
                                    />
                                </YStack>
                            ) : null}
                        </FieldWrapper>
                    </YStack>
                </YStack>

                <Separator />

                {/* ── Seção: Detalhes opcionais ── */}
                <YStack gap="$4">
                    <Text
                        fontSize="$2"
                        fontWeight="700"
                        color="$color9"
                        textTransform="uppercase"
                        letterSpacing={1.2}
                    >
                        Detalhes opcionais
                    </Text>

                    {/* URL da capa */}
                    <FieldWrapper
                        label="URL da capa"
                        icon={<ImageIcon size={14} />}
                        htmlFor="img"
                    >
                        <Input
                            id="img"
                            placeholder="https://..."
                            keyboardType="url"
                            autoCapitalize="none"
                            size="$4"
                            focusStyle={{ borderColor: '$blue8' }}
                            {...bind('img')}
                        />
                    </FieldWrapper>

                    {/* Sinopse / notas */}
                    <FieldWrapper
                        label="Sinopse / Notas"
                        icon={<AlignLeft size={14} />}
                        htmlFor="text"
                    >
                        <TextArea
                            id="text"
                            placeholder="Adicione uma sinopse, resenha ou notas pessoais..."
                            size="$4"
                            minHeight={100}
                            focusStyle={{ borderColor: '$blue8' }}
                            {...bind('text')}
                        />
                    </FieldWrapper>
                </YStack>

                <Separator />

                {/* ── Ações ── */}
                <XStack gap="$3" justifyContent="flex-end">
                    {onCancel && (
                        <Button
                            size="$4"
                            variant="outlined"
                            onPress={onCancel}
                            disabled={isSubmitting}
                            pressStyle={{ opacity: 0.7 }}
                            flex={1}
                        >
                            Cancelar
                        </Button>
                    )}

                    <Button
                        size="$4"
                        backgroundColor="$blue9"
                        color="white"
                        fontWeight="700"
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        pressStyle={{ opacity: 0.85, scale: 0.98 }}
                        
                        flex={onCancel ? 2 : 1}
                        icon={isSubmitting ? <Spinner color="white" size="small" /> : undefined}
                    >
                        {isSubmitting
                            ? 'Salvando...'
                            : isEditMode
                                ? 'Salvar alterações'
                                : 'Adicionar livro'}
                    </Button>
                </XStack>
            </YStack>
        </ScrollView>
    );
}