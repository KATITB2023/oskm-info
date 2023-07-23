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
  Icon,
  Select
} from '@chakra-ui/react';
import { TRPCClientError } from '@trpc/client';
import { type BaseSyntheticEvent, useEffect, useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { type RouterInputs, api } from '~/utils/api';
import { FaInfoCircle, FaMinus, FaPlus } from 'react-icons/fa';
import { GotTalentFull } from './GotTalentFull';
import _ from 'lodash';
import { GotTalentSubmitted } from './GotTalentSubmitted';

interface FormValue {
  name: string;
  contestant: { name: string }[];
  ktm: FileList | null;
  musik: FileList | null;
  property: { name: string }[];
  date: string;
  id: string;
}

interface DateDetail {
  id: string;
  time: string;
}

interface Date {
  [key: string]: DateDetail[];
}

// TODO: handle kalau dah submit
export const GotTalentForm = () => {
  const { control, register, formState, setValue, getValues, watch } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      contestant: [{ name: '' }],
      ktm: null,
      musik: null,
      property: [{ name: '' }],
      date: '',
      id: ''
    }
  });
  const {
    fields: contestantField,
    append: contestantAppend,
    remove: contestantRemove
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
    control
  });

  const dateQuery = api.showcase.getGotTalentTime.useQuery();
  const dateData = dateQuery?.data?.gotTalentTime;
  const registerGotTalentMutation =
    api.showcase.registerGotTalent.useMutation();
  const [dateList, setDateList] = useState<Date>({});
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();
  const formDate = watch('date');

  const lastElWarning = () => {
    toast({
      title: 'Warning',
      description: 'Isi data terakhir terlebih dahulu',
      status: 'warning',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  const submitGotTalent = async (
    data: FormValue,
    event: BaseSyntheticEvent
  ) => {
    event.preventDefault();
    setLoading(true);

    try {
      // TODO: ktm sama musik belum dihandle
      const payload: RouterInputs['showcase']['registerGotTalent'] = {
        teamName: data.name,
        teamMember: data.contestant.map((item) => item.name),
        ktmPath: '',
        musicPath: '',
        property: data.property.map((item) => item.name),
        scheduleId: data.id
      };

      const result = await registerGotTalentMutation.mutateAsync(payload);

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
      setValue('date', Object.keys(dateList)[0] ?? '');
      setValue('id', dateList[Object.keys(dateList)[0] ?? '']?.[0]?.id ?? '');
    }
  }, [dateData, setValue]);

  if (_.isEmpty(dateList) && !dateQuery.isLoading) {
    return <GotTalentFull />;
  }

  if (formState.isSubmitSuccessful) {
    const date = getValues('date') ?? '5 Agustus 2023';
    const timeId = getValues('id') ?? '55736ca4-44cf-4bd2-8a6c-2d285648cfc9';
    const time =
      (dateList[date] as DateDetail[])?.find((date) => date.id === timeId)
        ?.time ?? '';
    console.log(time);
    console.log(dateList[date]);
    return <GotTalentSubmitted date={date} time={time} />;
  }

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
        ITB GOT TALENT
      </Heading>
      <form
        onSubmit={(e: BaseSyntheticEvent) =>
          void submitGotTalent(getValues(), e)
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
                      onClick={() => void contestantRemove(index)}
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
              onClick={() => {
                const lastEl = getValues('contestant');
                if (!lastEl[lastEl.length - 1]?.name) {
                  lastElWarning();
                  return;
                }
                void contestantAppend({ name: '' });
              }}
              variant='outline'
            >
              <FaPlus size={18} />
            </Button>
          </FormControl>
          <FormControl isInvalid={!!formState.errors.property}>
            <FormLabel>
              <Flex flexDir='row' gap={2}>
                <Tooltip
                  label='Selain yang disediakan panitia (drumset, microphone, gitar, dan bass)'
                  placement='top'
                >
                  Properti (Opsional)
                </Tooltip>
                <Icon as={FaInfoCircle} alignSelf='center' />
              </Flex>
            </FormLabel>
            <Flex flexDir='column' gap={1}>
              {propertyField.map((field, index) => (
                <Flex flexDir='row' gap={2} key={field.id}>
                  <Input
                    placeholder='Masukkan properti'
                    {...register(`property.${index}.name`)}
                  />
                  {index !== 0 && (
                    <Button
                      size='sm'
                      alignSelf='center'
                      onClick={() => void propertyRemove(index)}
                      variant='outline'
                    >
                      <FaMinus size={18} />
                    </Button>
                  )}
                </Flex>
              ))}
            </Flex>
            {formState.errors.property && (
              <FormErrorMessage>
                {formState.errors.property.root?.message as string}
              </FormErrorMessage>
            )}
            <Button
              mt={2}
              size='sm'
              w='100%'
              onClick={() => {
                const lastEl = getValues('property');
                if (!lastEl[lastEl.length - 1]?.name) {
                  lastElWarning();
                  return;
                }
                void propertyAppend({ name: '' });
              }}
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
          <FormControl isInvalid={!!formState.errors.id}>
            <FormLabel>Jadwal</FormLabel>
            <Controller
              control={control}
              name='id'
              rules={{
                required: {
                  value: true,
                  message: 'Jadwal tidak boleh kosong'
                }
              }}
              render={() => (
                <Flex flexDir='row' gap={2}>
                  <Select
                    variant='filled'
                    bg='gray.600'
                    color='white'
                    w='50%'
                    borderColor='gray.400'
                    onChange={(e) => setValue('date', e.target.value)}
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
                    {Object.keys(dateList).map((date) => (
                      <option
                        style={{
                          background: 'gray.600',
                          color: 'white'
                        }}
                        key={date}
                        value={date}
                      >
                        {date}
                      </option>
                    ))}
                  </Select>
                  <Select
                    variant='filled'
                    bg='gray.600'
                    color='white'
                    w='50%'
                    borderColor='gray.400'
                    onChange={(e) => setValue('id', e.target.value)}
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
                    {(dateList[formDate] as DateDetail[])?.map(
                      (date: DateDetail) => (
                        <option
                          style={{
                            background: 'gray.600',
                            color: 'white'
                          }}
                          key={date.id}
                          value={date.id}
                        >
                          {date.time}
                        </option>
                      )
                    )}
                  </Select>
                </Flex>
              )}
            />
            {formState.errors.id && (
              <FormErrorMessage>
                {formState.errors.id.message as string}
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
          >
            Daftar
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
