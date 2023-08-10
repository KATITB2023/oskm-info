import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack
} from '@chakra-ui/react';
import { type BaseSyntheticEvent } from 'react';
import {
  type UseFormHandleSubmit,
  type FormState,
  type UseFormRegister
} from 'react-hook-form';
import { type IdentityFormValues } from './FirstForm';

interface Props {
  register: UseFormRegister<IdentityFormValues>;
  formState: FormState<IdentityFormValues>;
  handleSubmit: UseFormHandleSubmit<IdentityFormValues>;
  setPage: (page: number) => void;
}

export const IdentityForm = ({
  register,
  formState,
  handleSubmit,
  setPage
}: Props) => {
  const handleIdentity = () => {
    setPage(2);
  };

  return (
    <form
      onSubmit={(event: BaseSyntheticEvent) =>
        void handleSubmit(handleIdentity)(event)
      }
    >
      <VStack spacing={4} mt={5} color='white'>
        <FormControl isInvalid={!!formState.errors.name}>
          <FormLabel>Nama</FormLabel>
          <Input
            placeholder='Nama Lengkap'
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
              placeholder='13520999'
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
        <FormControl isInvalid={!!formState.errors.fakultas}>
          <FormLabel>Fakultas</FormLabel>
          <Input
            placeholder='Fakultas'
            {...register('fakultas', {
              required: {
                value: true,
                message: 'Fakultas tidak boleh kosong'
              }
            })}
          />
          {formState.errors.fakultas && (
            <FormErrorMessage>
              {formState.errors.fakultas.message as string}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!formState.errors.jurusan}>
          <FormLabel>Jurusan</FormLabel>
          <Input
            placeholder='Jurusan (Contoh: Teknik Informatika)'
            {...register('jurusan', {
              required: {
                value: true,
                message: 'Jurusan tidak boleh kosong'
              }
            })}
          />
          {formState.errors.jurusan && (
            <FormErrorMessage>
              {formState.errors.jurusan.message as string}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!formState.errors.angkatan}>
          <FormLabel>Angkatan</FormLabel>
          <Input
            placeholder='2020'
            {...register('angkatan', {
              required: {
                value: true,
                message: 'Angkatan tidak boleh kosong'
              },
              pattern: {
                value: new RegExp('^[0-9]{4}$'),
                message: 'Angkatan tidak valid'
              }
            })}
          />
          {formState.errors.angkatan && (
            <FormErrorMessage>
              {formState.errors.angkatan.message as string}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!formState.errors.lineId}>
          <FormLabel>ID Line</FormLabel>
          <Input
            placeholder='ID Line'
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
              placeholder='81234567890'
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
                  return value;
                },
                pattern: {
                  value: new RegExp('^[+]?[0-9]{2}[0-9]+$'),
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
      </VStack>
      <Flex justifyContent='center' mt={7}>
        <Button
          alignSelf='center'
          type='submit'
          isDisabled={Object.values(formState.errors).length > 0}
          w='50%'
        >
          Next
        </Button>
      </Flex>
    </form>
  );
};
