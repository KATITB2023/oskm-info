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
  Select
} from '@chakra-ui/react';
import { TRPCClientError } from '@trpc/client';
import { type BaseSyntheticEvent, useState } from 'react';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { api } from '~/utils/api';
import _ from 'lodash';
import { ShowCaseSubmitted } from './ShowCaseSubmitted';

interface FormValues {
  token: string;
  location: string;
}

export const SecondForm = () => {
  const { control, register, formState, setValue, handleSubmit, watch } =
    useForm<FormValues>({
      mode: 'onChange',
      delayError: 1000,
      defaultValues: {
        token: '',
        location: ''
      }
    });

  const token = watch('token');
  const locationsQuery = api.showcase.getLocation.useQuery({ token: token });
  const registerLocation = api.showcase.bookLocation.useMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);

  const locationsList = locationsQuery.data;
  const toast = useToast();

  const submitSecondShowCase: SubmitHandler<FormValues> = async (
    data: FormValues
  ) => {
    setLoading(true);

    try {
      const result = await registerLocation.mutateAsync(data);

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
    return <ShowCaseSubmitted firstForm={false} />;
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
        AMBIL LOKASI
      </Heading>
      <form
        onSubmit={(event: BaseSyntheticEvent) =>
          void handleSubmit(submitSecondShowCase)(event)
        }
      >
        <VStack spacing={4} mt={5} color='white'>
          <FormControl isRequired isInvalid={!!formState.errors.token}>
            <FormLabel>Token</FormLabel>
            <Input
              placeholder='Masukkan token'
              {...register('token', {
                required: {
                  value: true,
                  message: 'Token tidak boleh kosong'
                }
              })}
            />
            {formState.errors.token && (
              <FormErrorMessage>
                {formState.errors.token.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!!formState.errors.location}>
            <FormLabel>Lokasi</FormLabel>
            <Controller
              control={control}
              name='location'
              rules={{
                required: {
                  value: true,
                  message: 'Lokasi tidak boleh kosong'
                }
              }}
              render={() => (
                <Select
                  variant='filled'
                  bg='gray.600'
                  color='white'
                  w='full'
                  borderColor='gray.400'
                  onChange={(e) => setValue('location', e.target.value)}
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
                  {locationsList ? (
                    locationsList.locations.map((location, index) => (
                      <option
                        style={{
                          background: 'gray.600',
                          color: 'white'
                        }}
                        key={index}
                        value={location}
                      >
                        {location}
                      </option>
                    ))
                  ) : (
                    <option
                      style={{
                        background: 'gray.600',
                        color: 'white'
                      }}
                      selected
                      disabled
                    >
                      Invalid token
                    </option>
                  )}
                </Select>
              )}
            />
            {formState.errors.location && (
              <FormErrorMessage>
                {formState.errors.location.message as string}
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
            Ambil
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
