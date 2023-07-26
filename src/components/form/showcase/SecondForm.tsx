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
import {
  type BaseSyntheticEvent,
  useEffect,
  useState,
  SyntheticEvent
} from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { type RouterInputs, api } from '~/utils/api';
import _ from 'lodash';
import { Lembaga } from '~/utils/file';
import { getQueryKey } from '@trpc/react-query';

interface FormValues {
  token: string;
  location: string;
}

export const SecondForm = () => {
  const { register, formState, setValue, getValues, reset } =
    useForm<FormValues>({
      mode: 'onChange',
      delayError: 1000,
      defaultValues: {
        token: '',
        location: ''
      }
    });

  const [token, setToken] = useState('');
  const locationsQuery = api.showcase.getLocation.useQuery({ token: token });
  const registerLocation = api.showcase.bookLocation.useMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const locationsList = locationsQuery.data;

  const toast = useToast();

  const fetchLocations = (e: SyntheticEvent) => {
    setToken((e.target as HTMLInputElement).value);
  };

  const submitFirstShowcase = async (
    data: FormValues,
    event: BaseSyntheticEvent
  ) => {
    event.preventDefault();
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
        AMBIL LOKASI
      </Heading>
      <form onSubmit={(event) => void submitFirstShowcase(getValues(), event)}>
        <VStack spacing={4} mt={5} color='white'>
          <FormControl isRequired isInvalid={!!formState.errors.token}>
            <FormLabel>Token</FormLabel>
            <Input
              placeholder='Masukkan token'
              {...register('token', {
                onChange: _.debounce(
                  (e: SyntheticEvent) => fetchLocations(e),
                  1000
                )
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
            <Select
              variant='filled'
              bg='gray.600'
              color='white'
              w='full'
              borderColor='gray.400'
              onChange={(e) =>
                setValue(
                  'location',
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
          >
            Ambil
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
