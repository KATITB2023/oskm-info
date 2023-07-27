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
import { useForm } from 'react-hook-form';
import { api } from '~/utils/api';
import { Lembaga, uploadFile } from '~/utils/file';

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
  const { register, formState, setValue, getValues, reset } =
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
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const submitFirstShowcase = async (
    data: FormValues,
    event: BaseSyntheticEvent
  ) => {
    event.preventDefault();
    setLoading(true);

    const fileName = `showcase-mou-${data.nim}-${data.lembagaName}`;
    const extension = data.mouPath[0]?.name.split('.').pop() as string;
    const fullPath = `https://cdn.oskmitb.com/${fileName}.${extension}`;

    if (data.mouPath[0]) {
      await uploadFile(fullPath, data.mouPath[0]);
    }

    try {
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
      reset();
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

  return (
    <Box
      zIndex='10'
      bgGradient='linear(to-br, navy.1, purple.3)'
      boxShadow='inset 0 0 24px rgba(0,0,0,0.8), 12px 12px rgba(0,0,0,0.4)'
      px={12}
      py={9}
      borderRadius='lg'
      color='yellow.3'
      maxH='70vh'
      overflowY='auto'
      w={{ base: '80%', lg: '700px' }}
    >
      <Heading
        fontSize='2xl'
        textAlign='center'
        textShadow='4px 6px rgba(0,0,0,0.5)'
      >
        DAFTAR UNIT
      </Heading>
      <form onSubmit={(event) => void submitFirstShowcase(getValues(), event)}>
        <VStack spacing={4} mt={5} color='white'>
          <FormControl isRequired isInvalid={!!formState.errors.name}>
            <FormLabel>Nama</FormLabel>
            <Input placeholder='Masukkan nama Anda' {...register('name')} />
            {formState.errors.name && (
              <FormErrorMessage>
                {formState.errors.name.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!!formState.errors.nim}>
            <FormLabel>NIM</FormLabel>
            <Flex flexDir='column' gap={1}>
              <Input
                placeholder='Masukkan NIM Anda'
                {...register('nim', {
                  minLength: {
                    value: 8,
                    message: 'NIM invalid'
                  },
                  maxLength: {
                    value: 8,
                    message: 'NIM invalid'
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
          <FormControl isRequired isInvalid={!!formState.errors.lembaga}>
            <FormLabel>Lembaga</FormLabel>
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
            {formState.errors.lembaga && (
              <FormErrorMessage>
                {formState.errors.lembaga.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!!formState.errors.lembagaName}>
            <FormLabel>Nama Lembaga</FormLabel>
            <Input
              placeholder='Masukkan nama lembaga Anda'
              {...register('lembagaName')}
            />
            {formState.errors.lembagaName && (
              <FormErrorMessage>
                {formState.errors.lembagaName.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!!formState.errors.position}>
            <FormLabel>Jabatan</FormLabel>
            <Input
              placeholder='Masukkan jabatan Anda'
              {...register('position')}
            />
            {formState.errors.position && (
              <FormErrorMessage>
                {formState.errors.position.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!!formState.errors.lineId}>
            <FormLabel>ID Line</FormLabel>
            <Input
              placeholder='Masukkan ID Line Anda'
              {...register('lineId')}
            />
            {formState.errors.lineId && (
              <FormErrorMessage>
                {formState.errors.lineId.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!!formState.errors.waNumber}>
            <FormLabel>Nomor WhatsApp</FormLabel>
            <InputGroup>
              <InputLeftAddon>+62</InputLeftAddon>
              <Input
                placeholder='Masukkan nomor WhatsApp Anda'
                {...register('waNumber', {
                  setValueAs: (v: string) => {
                    let value = v;
                    if (v[0] === '0') {
                      value = v.slice(1);
                    }
                    return '+62'.concat(value);
                  },
                  pattern: {
                    value: new RegExp(
                      `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`
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
                  if (value[0] && value[0].type !== 'application/pdf') {
                    return 'MoU harus berupa file pdf';
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
          >
            Daftar
          </Button>
        </Flex>
      </form>
    </Box>
  );
};