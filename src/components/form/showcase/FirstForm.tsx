import { Box, Heading, useToast } from '@chakra-ui/react';
import { TRPCClientError } from '@trpc/client';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { api } from '~/utils/api';
import { Lembaga, sanitizeURL, uploadFile } from '~/utils/file';
import { ShowCaseSubmitted } from './ShowCaseSubmitted';
import { IdentityForm } from './IdentityForm';
import { LembagaForm } from './LembagaForm';
import { ShirtForm } from './ShirtForm';

export interface IdentityFormValues {
  name: string;
  nim: string;
  fakultas: string;
  jurusan: string;
  angkatan: string;
  lineId: string;
  waNumber: string;
}

export interface LembagaFormValues {
  lembaga: Lembaga;
  lembagaName: string;
  position: string;
  noise: boolean;
  mouPath: FileList;
}

export interface ShirtFormValues {
  kaos: {
    size: string;
    sleeve: string;
  }[];
  total: number;
  method: string;
  proofPath: FileList;
}

interface FormValues
  extends IdentityFormValues,
    LembagaFormValues,
    ShirtFormValues {}

export const FirstForm = () => {
  const {
    register: identityRegister,
    formState: identityFormState,
    handleSubmit: handleIdentitySubmit,
    getValues: getIdentityValues
  } = useForm<IdentityFormValues>({
    mode: 'onSubmit'
  });
  const {
    control: lembagaControl,
    register: lembagaRegister,
    formState: lembagaFormState,
    setValue: setLembaga,
    handleSubmit: handleLembagaSubmit,
    getValues: getLembagaValues
  } = useForm<LembagaFormValues>({
    mode: 'onSubmit',
    delayError: 1000,
    defaultValues: {
      lembaga: Object.values(Lembaga)[0],
      noise: false
    }
  });
  const {
    control: ShirtControl,
    register: ShirtRegister,
    formState: ShirtFormState,
    setValue: setShirt,
    handleSubmit: handleShirtSubmit
  } = useForm<ShirtFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      kaos: [
        { size: 'S', sleeve: 'Pendek' },
        { size: 'S', sleeve: 'Pendek' }
      ],
      method: 'GoPay'
    }
  });

  const registerUnitMutation = api.showcase.registerUnit.useMutation();
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const submitFirstShowcase: SubmitHandler<ShirtFormValues> = async (
    data: ShirtFormValues
  ) => {
    setLoading(true);

    try {
      const formData: FormValues = {
        ...getIdentityValues(),
        ...getLembagaValues(),
        ...data
      };

      const mouPath = '';
      let proofPath = '';

      // if (formData.mouPath[0]) {
      //   const fileName = `mou-${formData.nim}-${formData.lembagaName.replace(
      //     ' ',
      //     ''
      //   )}`;
      //   const file = formData.mouPath[0] as File | undefined;
      //   const extension = file?.name.split('.').pop() as string;
      //   const tempPath = `https://cdn.oskmitb.com/showcase/${fileName}.${extension}`;
      //   mouPath = sanitizeURL(tempPath);
      //   await uploadFile(mouPath, formData.mouPath[0]);
      // }

      if (formData.proofPath[0]) {
        const fileName = `proof-${formData.nim}-${formData.lembagaName.replace(
          ' ',
          ''
        )}`;
        const file = formData.proofPath[0] as File | undefined;
        const extension = file?.name.split('.').pop() as string;
        const tempPath = `https://cdn.oskmitb.com/showcase/${fileName}.${extension}`;
        proofPath = sanitizeURL(tempPath);
        await uploadFile(proofPath, formData.proofPath[0]);
      }

      const result = await registerUnitMutation.mutateAsync({
        ...formData,
        total: parseInt(formData.total.toString()),
        waNumber: `+62${formData.waNumber}`,
        mouPath,
        proofPath
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
      maxH='80vh'
      overflowY='auto'
      w={{ base: '90%', lg: '700px' }}
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
        DAFTAR BOOTH SHOWCASE
      </Heading>
      {page === 1 && (
        <IdentityForm
          register={identityRegister}
          formState={identityFormState}
          handleSubmit={handleIdentitySubmit}
          setPage={setPage}
        />
      )}
      {page === 2 && (
        <LembagaForm
          control={lembagaControl}
          register={lembagaRegister}
          formState={lembagaFormState}
          setValue={setLembaga}
          handleSubmit={handleLembagaSubmit}
          setPage={setPage}
        />
      )}
      {page === 3 && (
        <ShirtForm
          control={ShirtControl}
          register={ShirtRegister}
          formState={ShirtFormState}
          setValue={setShirt}
          handleSubmit={handleShirtSubmit}
          handleSubmitForm={submitFirstShowcase}
          loading={loading}
          setPage={setPage}
        />
      )}
    </Box>
  );
};
