import React from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';
import { Box } from 'rebass';

import api from '@poupachef/api';
import Modal from '@poupachef/ui/modal';
import { SupplieListItemI } from '../SupplierList';

interface ICreateSupplierModalProps {
  createSupplierModal: ICreateSupplierModal;
  setCreateSupplierModal: (newCreateSupplierModal: ICreateSupplierModal) => void;
  setSupplierList: (newSupplierList: SupplieListItemI[]) => void;
  supplierList: SupplieListItemI[];
}

const defaultSupplierValues = {
  zipCode: '128457112',
  address: 'Avenida República do Líbano',
  number: '12',
  complement: 'Cj 12',
  neighborhood: 'Moema',
  city: 'São Paulo',
  state: 'SP',
  ownerEmail: 'mk@email.com',
  ownerPhoneNumber: '5511912365412',
};

const CreateSupplierModal = ({
  createSupplierModal,
  setCreateSupplierModal,
  setSupplierList,
  supplierList,
}: ICreateSupplierModalProps): JSX.Element => {
  const handleCloseCreateSupplierModal = (): void =>
    setCreateSupplierModal({ ...createSupplierModal, modalOpened: false });

  const handleCreateSupplier = (values: any): void => {
    api
      .post('/suppliers', {
        ...defaultSupplierValues,
        ...values,
      })
      .then(({ data }) => {
        toast.success('Distribuidor criado com sucesso!');

        const newSupplierList = [...supplierList];
        newSupplierList.push(data);
        setSupplierList(newSupplierList);

        setCreateSupplierModal({
          modalOpened: false,
          formValues: {},
        });
      })
      .catch(() => toast.error('Ocorreu um erro ao criar um distribuidor.'));
  };

  const initialValues = {
    name: createSupplierModal.formValues.name || '',
    cnpj: createSupplierModal.formValues.cnpj || '',
    ownerName: createSupplierModal.formValues.ownerName || '',
    phoneNumber: createSupplierModal.formValues.phoneNumber || '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      handleCreateSupplier(values);
    },
  });

  return (
    <Modal
      open={createSupplierModal.modalOpened}
      title="Criar distribuidor"
      closeModal={handleCloseCreateSupplierModal}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box pb="32px">
          <TextField
            label="Nome da distribuidora"
            name="name"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Box>
        <Box pb="32px">
          <TextField
            label="CNPJ"
            name="cnpj"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.cnpj}
          />
        </Box>
        <Box pb="32px">
          <TextField
            label="Número de telefone"
            name="phoneNumber"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
        </Box>
        <Box pb="32px">
          <TextField
            label="Nome do distribuidor (responsável)"
            name="ownerName"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.ownerName}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
          CRIAR
        </Button>
      </form>
    </Modal>
  );
};

export default CreateSupplierModal;
