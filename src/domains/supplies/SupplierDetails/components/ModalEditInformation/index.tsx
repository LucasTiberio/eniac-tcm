import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import api from '@poupachef/api';
import { Box } from 'rebass';

interface Props {
  supplier: SupplierI;
  closeModal(): void;
  setSupplier(supplier: SupplierI): void;
  informationValues: {
    supplierInformations: {
      label: string;
      key: string;
      value: string;
    }[];
    localizationInformations: {
      label: string;
      key: string;
      value: string;
    }[];
    supplierOwnerDetails: {
      label: string;
      key: string;
      value: string;
    }[];
  };
  selectedInformation: string;
}
const ModalEditOpen = ({
  selectedInformation,
  informationValues,
  supplier,
  closeModal,
  setSupplier,
}: Props): JSX.Element => {
  const informationList = informationValues[selectedInformation as keyof typeof informationValues];

  if (!informationList) return <></>;

  const handleUpdateValues = (values: any): void => {
    api
      .put('/suppliers', {
        ...supplier,
        ...values,
      })
      .then(({ data }) => {
        toast.success('Dados alterados com sucesso!');
        setSupplier(data);
        closeModal();
      })
      .catch(() => toast.error('Ocorreu um erro ao alterar estes dados.'));
  };

  const initialValues = informationList.reduce((previous, current) => {
    return {
      ...previous,
      [current.key]: current.value || '',
    };
  }, {});

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      handleUpdateValues(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {informationList.map((information, i) => (
        <Box pb="32px" key={i}>
          <TextField
            label={information.label}
            name={information.key}
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values[information.key as keyof typeof formik.values]}
            disabled={information.key === '_id'}
          />
        </Box>
      ))}

      <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
        ATUALIZAR
      </Button>
    </form>
  );
};

export default ModalEditOpen;
