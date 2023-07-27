import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  Flex,
  useToast,
  Select,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';
import { TRPCClientError } from '@trpc/client';
import { type BaseSyntheticEvent, useState } from 'react';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { api } from '~/utils/api';
import { Lembaga, uploadFile } from '~/utils/file';
import { ShowCaseSubmitted } from './ShowCaseSubmitted';

interface FormValues {
  name: string;
  nim: string;
  lembaga: Lembaga;
  lembagaName: string;
  position: string;
  lineId: string;
  waNumber: string;
  mouPath: FileList;
}

export const FirstForm = () => {
  const { control, register, formState, setValue, handleSubmit } =
    useForm<FormValues>({
      mode: 'onChange',
      delayError: 1000,
      defaultValues: {
        name: '',
        nim: '',
        lembaga: Object.values(Lembaga)[0],
        lembagaName: '',
        position: '',
        lineId: '',
        waNumber: '',
        mouPath: undefined
      }
    });

  const registerUnitMutation = api.showcase.registerUnit.useMutation();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const submitFirstShowcase: SubmitHandler<FormValues> = async (
    data: FormValues
  ) => {
    setLoading(true);

    try {
      let fullPath = '';
      if (data.mouPath[0]) {
        const fileName = `showcase-mou-${data.nim}-${data.lembagaName}`;
        const extension = data.mouPath[0]?.name.split('.').pop() as string;
        fullPath = `https://cdn.oskmitb.com/${fileName}.${extension}`;
        await uploadFile(fullPath, data.mouPath[0]);
      }

      const result = await registerUnitMutation.mutateAsync({
        ...data,
        mouPath: fullPath
      });

      toast({
        title: 'Success',
        description: result.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });

      setSuccess(true);
    } catch (error: unknown) {
      if (!(error instanceof TRPCClientError)) throw error;

      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    }

    setLoading(false);
  };

  if (success) {
    return <ShowCaseSubmitted firstForm={true} />;
  }

  return (
    <Box
      zIndex='10'
      backdropFilter='blur(13px)'
      boxShadow='3px 3px 14px 0px rgba(0, 0, 0, 0.69)'
      backgroundColor='rgba(237, 240, 247, 0.20)'
      px={12}
      py={9}
      borderRadius='lg'
      color='yellow.3'
      maxH='70vh'
      overflowY='auto'
      w={{ base: '80%', lg: '700px' }}
      sx={{
        '&::-webkit-scrollbar': {
          width: '0'
        }
      }}
    >
      <Heading
        fontSize='2xl'
        textAlign='center'
        textShadow='4px 6px rgba(0,0,0,0.5)'
        color='white'
      >
        DAFTAR UNIT
      </Heading>
      <form
        onSubmit={(event: BaseSyntheticEvent) =>
          void handleSubmit(submitFirstShowcase)(event)
        }
      >
        <VStack spacing={4} mt={5} color='white'>
          <FormControl isInvalid={!!formState.errors.name}>
            <FormLabel>Nama</FormLabel>
            <Input
              placeholder='Masukkan nama Anda'
              {...register('name', {
                required: {
                  value: true,
                  message: 'Nama tidak boleh kosong'
                }
              })}
            />
            {formState.errors.name && (
              <FormErrorMessage>
                {formState.errors.name.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.nim}>
            <FormLabel>NIM</FormLabel>
            <Flex flexDir='column' gap={1}>
              <Input
                placeholder='Masukkan NIM Anda'
                {...register('nim', {
                  required: {
                    value: true,
                    message: 'NIM tidak boleh kosong'
                  },
                  pattern: {
                    value: new RegExp('^[0-9]{8}$'),
                    message: 'NIM tidak valid'
                  }
                })}
              />
            </Flex>
            {formState.errors.nim && (
              <FormErrorMessage>
                {formState.errors.nim.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.lembaga}>
            <FormLabel>Lembaga</FormLabel>
            <Controller
              control={control}
              name='lembaga'
              rules={{
                required: {
                  value: true,
                  message: 'Lembaga tidak boleh kosong'
                }
              }}
              render={() => (
                <Select
                  variant='filled'
                  bg='gray.600'
                  color='white'
                  w='full'
                  borderColor='gray.400'
                  onChange={(e) =>
                    setValue(
                      'lembaga',
                      Lembaga[e.target.value as keyof typeof Lembaga]
                    )
                  }
                  transition='all 0.2s ease-in-out'
                  _hover={{
                    opacity: 0.8
                  }}
                  _focus={{
                    background: 'gray.600',
                    borderColor: 'gray.400',
                    color: 'white'
                  }}
                  css={{
                    option: {
                      background: '#2F2E2E'
                    }
                  }}
                >
                  {Object.values(Lembaga).map((lembaga, index) => (
                    <option
                      style={{
                        background: 'gray.600',
                        color: 'white'
                      }}
                      key={index}
                      value={lembaga}
                    >
                      {lembaga}
                    </option>
                  ))}
                </Select>
              )}
            />
            {formState.errors.lembaga && (
              <FormErrorMessage>
                {formState.errors.lembaga.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.lembagaName}>
            <FormLabel>Nama Lembaga</FormLabel>
            <Input
              placeholder='Masukkan nama lembaga Anda'
              {...register('lembagaName', {
                required: {
                  value: true,
                  message: 'Nama lembaga tidak boleh kosong'
                }
              })}
            />
            {formState.errors.lembagaName && (
              <FormErrorMessage>
                {formState.errors.lembagaName.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.position}>
            <FormLabel>Jabatan</FormLabel>
            <Input
              placeholder='Masukkan jabatan Anda'
              {...register('position', {
                required: {
                  value: true,
                  message: 'Jabatan tidak boleh kosong'
                }
              })}
            />
            {formState.errors.position && (
              <FormErrorMessage>
                {formState.errors.position.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.lineId}>
            <FormLabel>ID Line</FormLabel>
            <Input
              placeholder='Masukkan ID Line Anda'
              {...register('lineId', {
                required: {
                  value: true,
                  message: 'ID Line tidak boleh kosong'
                }
              })}
            />
            {formState.errors.lineId && (
              <FormErrorMessage>
                {formState.errors.lineId.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.waNumber}>
            <FormLabel>Nomor WhatsApp</FormLabel>
            <InputGroup>
              <InputLeftAddon>+62</InputLeftAddon>
              <Input
                placeholder='Masukkan nomor WhatsApp Anda'
                {...register('waNumber', {
                  required: {
                    value: true,
                    message: 'Nomor WhatsApp tidak boleh kosong'
                  },
                  setValueAs: (v: string) => {
                    let value = v;
                    if (v[0] === '0') {
                      value = v.slice(1);
                    }
                    return '+62'.concat(value);
                  },
                  pattern: {
                    value: new RegExp(
                      `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$`
                    ),
                    message: 'Nomor WhatsApp invalid'
                  }
                })}
              />
            </InputGroup>
            {formState.errors.waNumber && (
              <FormErrorMessage>
                {formState.errors.waNumber.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.mouPath}>
            <FormLabel>Insert Media MoU</FormLabel>
            <Input
              type='file'
              accept='application/pdf'
              variant='unstyled'
              {...register('mouPath', {
                validate: (value) => {
                  const file: File | undefined = value[0];
                  if (file && file.name.split('.')[1] !== 'pdf') {
                    return 'MoU harus berupa file .pdf';
                  }
                  return true;
                }
              })}
            />
            {formState.errors.mouPath && (
              <FormErrorMessage>
                {formState.errors.mouPath.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
        </VStack>
        <Flex justifyContent='center' mt={7}>
          <Button
            alignSelf='center'
            isLoading={loading}
            loadingText='Mendaftarkan...'
            type='submit'
            isDisabled={Object.values(formState.errors).length > 0}
            w='50%'
          >
            Daftar
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
