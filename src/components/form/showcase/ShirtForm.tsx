import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Select,
  Box,
  Image,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  UnorderedList,
  ListItem,
  useToast,
  HStack
} from '@chakra-ui/react';
import { type BaseSyntheticEvent } from 'react';
import {
  type UseFormHandleSubmit,
  type FormState,
  type UseFormRegister,
  type Control,
  type UseFormSetValue,
  Controller,
  type SubmitHandler,
  useFieldArray
} from 'react-hook-form';
import { type ShirtFormValues } from './FirstForm';
import { FaInfoCircle, FaPlus, FaMinus } from 'react-icons/fa';

interface Props {
  control: Control<ShirtFormValues>;
  register: UseFormRegister<ShirtFormValues>;
  formState: FormState<ShirtFormValues>;
  setValue: UseFormSetValue<ShirtFormValues>;
  handleSubmit: UseFormHandleSubmit<ShirtFormValues>;
  handleSubmitForm: SubmitHandler<ShirtFormValues>;
  loading: boolean;
  setPage: (page: number) => void;
}

export const ShirtForm = ({
  control,
  register,
  formState,
  setValue,
  handleSubmit,
  handleSubmitForm,
  loading,
  setPage
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: 'kaos',
    control
  });

  const sizeArr = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL'];
  const sleeveArr = ['Pendek', 'Panjang'];
  const methodArr = [
    'GoPay',
    'ShopeePay',
    'DANA',
    'OVO',
    'Bank Mandiri',
    'Bank Jago'
  ];
  const methodInfo = [
    {
      title: 'GoPay/ShopeePay/DANA/OVO',
      info: '081387368511',
      name: 'ASTRI BUDIARTI'
    },
    {
      title: 'Bank Mandiri',
      info: '1560016955132',
      name: 'ASTRI BUDIARTI'
    },
    {
      title: 'Bank Jago (Bebas fee min. 20k dari GoPay)',
      info: '109311879674',
      name: 'ASTRI BUDIARTI'
    }
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <form
        onSubmit={(event: BaseSyntheticEvent) =>
          void handleSubmit(handleSubmitForm)(event)
        }
      >
        <VStack spacing={4} mt={5} color='white'>
          <Box bg='purple.1' px={5} py={3} borderRadius='lg'>
            Setiap penjaga booth ITB SHOWCASE WAJIB membeli kaos dan lanyard
            seharga Rp 115.000. Terdapat biaya tambahan untuk kaos lengan
            panjang sebesar Rp 10.000 dan penambahan biaya untuk kaos dengan
            ukuran selain S-XL, yaitu sebesar Rp5.000 untuk XXL-XXXL dan Rp
            10.000 untuk XXXXL-XXXXXL. Untuk informasi terkait PO baju, dapat
            menghubungi Naveen: naveennaomi
          </Box>
          <Image src='/size-chart.png' alt='chart' draggable='false' />
          <FormControl isInvalid={!!formState.errors.kaos}>
            <FormLabel>
              <Flex flexDir='row' gap={2} alignItems='center'>
                <Box>Kaos</Box>
                {fields.length > 2 && (
                  <Button
                    size='sm'
                    alignSelf='center'
                    onClick={() => void remove(fields.length - 1)}
                    variant='outline'
                  >
                    <FaMinus size={12} />
                  </Button>
                )}
              </Flex>
            </FormLabel>
            <Flex flexDirection='column' gap={1}>
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  control={control}
                  name={`kaos.${index}`}
                  render={() => (
                    <HStack spacing={2}>
                      <Select
                        variant='filled'
                        bg='gray.600'
                        color='white'
                        w='full'
                        borderColor='gray.400'
                        onChange={(e) =>
                          setValue(`kaos.${index}.size`, e.target.value)
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
                        {sizeArr.map((size, index) => (
                          <option
                            style={{
                              background: 'gray.600',
                              color: 'white'
                            }}
                            key={index}
                            value={size}
                          >
                            {size}
                          </option>
                        ))}
                      </Select>
                      <Select
                        variant='filled'
                        bg='gray.600'
                        color='white'
                        w='full'
                        borderColor='gray.400'
                        onChange={(e) =>
                          setValue(`kaos.${index}.sleeve`, e.target.value)
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
                        {sleeveArr.map((sleeve, index) => (
                          <option
                            style={{
                              background: 'gray.600',
                              color: 'white'
                            }}
                            key={index}
                            value={sleeve}
                          >
                            {sleeve}
                          </option>
                        ))}
                      </Select>
                    </HStack>
                  )}
                />
              ))}
            </Flex>
            {formState.errors.kaos && (
              <FormErrorMessage>
                {formState.errors.kaos.message as string}
              </FormErrorMessage>
            )}
            <Button
              mt={2}
              size='sm'
              w='100%'
              onClick={() => void append({ size: 'S', sleeve: 'Pendek' })}
              variant='outline'
            >
              <FaPlus size={18} />
            </Button>
          </FormControl>
          <FormControl isInvalid={!!formState.errors.total}>
            <FormLabel>Total</FormLabel>
            <Flex flexDir='column' gap={1}>
              <Input
                placeholder='Total Harga (Isi tanpa titik)'
                {...register('total', {
                  required: {
                    value: true,
                    message: 'Total harga tidak boleh kosong'
                  },
                  pattern: {
                    value: new RegExp('^[0-9]+$'),
                    message: 'Total harga harus berupa angka'
                  }
                })}
              />
            </Flex>
            {formState.errors.total && (
              <FormErrorMessage>
                {formState.errors.total.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.method}>
            <FormLabel>
              <Flex flexDir='row' gap={2}>
                Metode Pembayaran
                <Icon
                  as={FaInfoCircle}
                  transition='all 0.2s ease-in-out'
                  alignSelf='center'
                  onClick={onOpen}
                  _hover={{ cursor: 'pointer', opacity: 0.8 }}
                />
              </Flex>
            </FormLabel>
            <Controller
              control={control}
              name='method'
              rules={{
                required: {
                  value: true,
                  message: 'Metode pembayaran tidak boleh kosong'
                }
              }}
              render={() => (
                <Select
                  variant='filled'
                  bg='gray.600'
                  color='white'
                  w='full'
                  borderColor='gray.400'
                  onChange={(e) => setValue('method', e.target.value)}
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
                  {methodArr.map((method, index) => (
                    <option
                      style={{
                        background: 'gray.600',
                        color: 'white'
                      }}
                      key={index}
                      value={method}
                    >
                      {method}
                    </option>
                  ))}
                </Select>
              )}
            />
            {formState.errors.method && (
              <FormErrorMessage>
                {formState.errors.method.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.proofPath}>
            <FormLabel>Bukti Pembayaran</FormLabel>
            <Input
              type='file'
              accept='.png, .jpeg, .jpg'
              variant='unstyled'
              {...register('proofPath', {
                validate: (value) => {
                  const file: File | undefined = value[0] as File | undefined;
                  if (!file) return 'Bukti pembayaran tidak boleh kosong';

                  const ext = ['png', 'jpeg', 'jpg'];
                  if (
                    file &&
                    !ext.includes(
                      file.name.split('.')[1]?.toLowerCase() as string
                    )
                  ) {
                    return 'Bukti harus berupa gambar';
                  }
                  return true;
                }
              })}
            />
            {formState.errors.proofPath && (
              <FormErrorMessage>
                {formState.errors.proofPath.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
        </VStack>
        <Flex justifyContent='space-between' mt={7}>
          <Button
            w={{ base: '75px', lg: '25%' }}
            variant='outline'
            alignSelf='center'
            onClick={() => setPage(2)}
          >
            Back
          </Button>
          <Button
            w={{ base: '75px', lg: '25%' }}
            alignSelf='center'
            isLoading={loading}
            loadingText='Submitting'
            type='submit'
            isDisabled={Object.values(formState.errors).length > 0}
          >
            Submit
          </Button>
        </Flex>
      </form>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
        <ModalOverlay />
        <ModalContent backgroundColor='rgba(52, 12, 143, 0.9)' color='white'>
          <ModalHeader>Info Pembayaran</ModalHeader>
          <ModalBody>
            <UnorderedList>
              {methodInfo.map((item, index) => (
                <ListItem key={index}>
                  {item.title}
                  <br />
                  <Box
                    as='span'
                    onClick={() => {
                      void navigator.clipboard.writeText(item.info);
                      toast({
                        description: 'Nomor berhasil disalin',
                        status: 'success',
                        position: 'top'
                      });
                    }}
                    _hover={{
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    {item.info}
                  </Box>
                  <Box as='span'> a.n. {item.name}</Box>
                </ListItem>
              ))}
            </UnorderedList>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
