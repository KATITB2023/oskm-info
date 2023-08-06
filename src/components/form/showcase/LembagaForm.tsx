import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Select,
  Checkbox,
  Box,
  Link
} from '@chakra-ui/react';
import { type BaseSyntheticEvent } from 'react';
import {
  type UseFormHandleSubmit,
  type FormState,
  type UseFormRegister,
  type Control,
  type UseFormSetValue,
  Controller
} from 'react-hook-form';
import { Lembaga } from '~/utils/file';
import { type LembagaFormValues } from './FirstForm';

interface Props {
  control: Control<LembagaFormValues>;
  register: UseFormRegister<LembagaFormValues>;
  formState: FormState<LembagaFormValues>;
  setValue: UseFormSetValue<LembagaFormValues>;
  handleSubmit: UseFormHandleSubmit<LembagaFormValues>;
  setPage: (page: number) => void;
}

export const LembagaForm = ({
  control,
  register,
  formState,
  setValue,
  handleSubmit,
  setPage
}: Props) => {
  const handleLembaga = () => {
    setPage(3);
  };

  return (
    <form
      onSubmit={(event: BaseSyntheticEvent) =>
        void handleSubmit(handleLembaga)(event)
      }
    >
      <VStack spacing={4} mt={5} color='white'>
        <Box bg='purple.1' px={5} py={3} borderRadius='lg' w='100%'>
          <Box as='span'>
            Sebelum mengisi form di bawah, harap membaca ToR dan SOP yang akan
            berlaku untuk Festival serta mengisi MoU yang ada di{' '}
          </Box>
          <Link isExternal href='https://linktr.ee/FestivalITBShowcase2023'>
            https://linktr.ee/FestivalITBShowcase2023
          </Link>
        </Box>
        <Box bg='purple.1' px={5} py={3} borderRadius='lg'>
          <Box as='span'>
            <b>Lembaga</b> yang ingin ikut serta dalam kegiatan parade dapat mengisi formulir berikut:{' '}
          </Box>
          <Link isExternal href='https://go.oskmitb.com/IkutParade'>
            https://go.oskmitb.com/IkutParade
          </Link>
        </Box>
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
            placeholder='Nama lembaga'
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
            placeholder='Ketua'
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
        <Checkbox
          spacing={4}
          onChange={(e) => setValue('noise', e.target.checked)}
        >
          Apakah akan menggunakan properti yang menimbulkan kebisingan?
          <br />
          Jika ya, apakah bersedia untuk menyesuaikan dengan lembaga di
          sekitarnya untuk mengatur tingkat kebisingan? (dibahas lebih lanjut
          bersama LO masing-masing)
        </Checkbox>
        {/* <FormControl isInvalid={!!formState.errors.mouPath}>
          <FormLabel>File MoU</FormLabel>
          <Input
            type='file'
            accept='application/pdf'
            variant='unstyled'
            {...register('mouPath', {
              validate: (value) => {
                const file: File | undefined = value[0] as File | undefined;
                if (!file) return 'File MoU tidak boleh kosong';
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
        </FormControl> */}
      </VStack>
      <Flex justifyContent='space-between' mt={7}>
        <Button
          w={{ base: '75px', lg: '25%' }}
          variant='outline'
          alignSelf='center'
          onClick={() => setPage(1)}
        >
          Back
        </Button>
        <Button
          w={{ base: '75px', lg: '25%' }}
          alignSelf='center'
          type='submit'
          isDisabled={Object.values(formState.errors).length > 0}
        >
          Next
        </Button>
      </Flex>
    </form>
  );
};
