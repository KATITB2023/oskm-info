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
  Tooltip,
  Icon
} from '@chakra-ui/react';
import { TRPCClientError } from '@trpc/client';
import { type BaseSyntheticEvent, useEffect, useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { api } from '~/utils/api';
import { FaInfoCircle, FaMinus, FaPlus } from 'react-icons/fa';

interface Date {
  [key: string]: {
    id: string;
    time: string;
  }[];
}

export const BookingShowcaseForm = () => {
  const {
    handleSubmit,
    control,
    register,
    formState,
    setValue,
    getValues,
    watch
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      contestant: [{ name: '' }],
      ktm: null,
      musik: null,
      property: [{ name: '' }],
      waktu: ''
    }
  });
  const {
    fields: contestantField,
    append: contestantAppend,
    remove: removeContestant
  } = useFieldArray({
    name: 'contestant',
    control,
    rules: {
      minLength: {
        value: 1,
        message: 'Minimal 1 peserta'
      },
      validate: (value) => {
        if (value.some((item) => item.name === '')) {
          return value.length > 1
            ? 'Nama peserta tidak boleh ada yang kosong'
            : 'Nama peserta tidak boleh kosong';
        }
        return true;
      }
    }
  });
  const {
    fields: propertyField,
    append: propertyAppend,
    remove: propertyRemove
  } = useFieldArray({
    name: 'property',
    control,
    rules: {
      // TODO: recheck yang pantes gimana validasinya
      validate: (value) => {
        if (value.some((item) => item.name === '')) {
          return value.length > 1
            ? 'Nama peserta tidak boleh ada yang kosong'
            : 'Nama peserta tidak boleh kosong';
        }
        return true;
      }
    }
  });
  const dateQuery = api.showcase.getGotTalentTime.useQuery();
  const dateData = dateQuery?.data?.gotTalentTime;
  const registerGotTalentMutation =
    api.showcase.registerGotTalent.useMutation();
  const [dateList, setDateList] = useState<Date>({});
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const submitBooking = async (data: any, event: BaseSyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // TODO: beresin
      const result = await registerGotTalentMutation.mutateAsync(data);

      toast({
        title: 'Success',
        description: result?.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
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

  useEffect(() => {
    if (dateData) {
      const dateList: Date = {};
      dateData.forEach((date) => {
        if (!dateList[date.day]) {
          dateList[date.day] = [];
        }
        dateList[date.day]?.push({
          id: date.id,
          time: date.time
        });
      });
      setDateList(dateList);
    }
  }, [dateData]);

  return (
    <Box
      zIndex='10'
      bgGradient='linear(to-br, navy.1, purple.3)'
      boxShadow='inset 0 0 24px rgba(0,0,0,0.8), 12px 12px rgba(0,0,0,0.4)'
      px={12}
      py={5}
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
        ITB GOT TALENT
      </Heading>
      <form
        onSubmit={(e: BaseSyntheticEvent) =>
          void handleSubmit(submitBooking)(e)
        }
      >
        <VStack spacing={4} mt={5} color='white'>
          <FormControl isInvalid={!!formState.errors.name}>
            <FormLabel>
              <Flex flexDir='row' gap={2}>
                <Tooltip
                  label='Gunakan nama panggung jika sendiri'
                  placement='top'
                >
                  Nama Tim
                </Tooltip>
                <Icon as={FaInfoCircle} alignSelf='center' />
              </Flex>
            </FormLabel>
            <Input
              placeholder='Masukkan nama tim'
              {...register('name', {
                required: {
                  value: true,
                  message: 'Nama tim tidak boleh kosong'
                }
              })}
            />
            {formState.errors.name && (
              <FormErrorMessage>
                {formState.errors.name.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.contestant}>
            <FormLabel>Nama Peserta</FormLabel>
            <Flex flexDir='column' gap={1}>
              {contestantField.map((field, index) => (
                <Flex flexDir='row' gap={2} key={field.id}>
                  <Input
                    placeholder='Masukkan nama peserta'
                    {...register(`contestant.${index}.name`)}
                  />
                  {index !== 0 && (
                    <Button
                      size='sm'
                      alignSelf='center'
                      onClick={() => {
                        console.log(index);
                        void removeContestant(index);
                      }}
                      variant='outline'
                    >
                      <FaMinus size={18} />
                    </Button>
                  )}
                </Flex>
              ))}
            </Flex>
            {formState.errors.contestant && (
              <FormErrorMessage>
                {formState.errors.contestant.root?.message as string}
              </FormErrorMessage>
            )}
            <Button
              mt={2}
              size='sm'
              w='100%'
              onClick={() => void contestantAppend({ name: '' })}
              variant='outline'
            >
              <FaPlus size={18} />
            </Button>
          </FormControl>
          <FormControl isInvalid={!!formState.errors.ktm}>
            <FormLabel>
              <Flex flexDir='row' gap={2}>
                <Tooltip label='Compress dalam bentuk .zip' placement='top'>
                  KTM
                </Tooltip>
                <Icon as={FaInfoCircle} alignSelf='center' />
              </Flex>
            </FormLabel>
            <Input
              type='file'
              accept='application/zip'
              variant='unstyled'
              {...register('ktm', {
                required: {
                  value: true,
                  message: 'KTM tidak boleh kosong'
                },
                validate: (value: FileList | null) => {
                  if (value && value[0]?.type !== 'application/zip') {
                    return 'KTM harus berupa file .zip';
                  }
                  return true;
                }
              })}
            />
            {formState.errors.ktm && (
              <FormErrorMessage>
                {formState.errors.ktm.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.musik}>
            <FormLabel>
              <Flex flexDir='row' gap={2}>
                <Tooltip label='Digunakan untuk musik latar' placement='top'>
                  Musik (Opsional)
                </Tooltip>
                <Icon as={FaInfoCircle} alignSelf='center' />
              </Flex>
            </FormLabel>
            <Input
              type='file'
              accept='audio/mp3'
              variant='unstyled'
              {...register('musik', {
                validate: (value: FileList | null) => {
                  if (value && value[0]?.type !== 'audio/mp3') {
                    return 'Musik harus berupa file .mp3';
                  }
                  return true;
                }
              })}
            />
            {formState.errors.musik && (
              <FormErrorMessage>
                {formState.errors.musik.message as string}
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
            onClick={() => console.log(formState)}
          >
            Daftar
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
