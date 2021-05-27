import React, { useEffect, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { toast } from 'react-toastify';

import api from '@poupachef/api';
import Modal from '@poupachef/ui/modal';
import { SUPPLIER_LISTING_PATH } from '@poupachef/routing/routes/logged';

import { Flex, Text } from 'rebass';
import { Button } from '@material-ui/core';
import SpinnerComponent from '@poupachef/components/Spinner';
import { Container, DoubleInformationBox } from './style';
import InformationBox from './components/InformationBox';
import ModalEditInformation from './components/ModalEditInformation';

const SupplierDetails = (): JSX.Element => {
  const history = useHistory();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalInformation, setModalInformation] = React.useState<string>('');
  const [supplier, setSupplier] = React.useState<SupplierI>({
    address: '',
    city: '',
    cnpj: '',
    complement: '',
    createdAt: '',
    name: '',
    neighborhood: '',
    number: '',
    ownerEmail: '',
    ownerName: '',
    ownerPhoneNumber: '',
    phoneNumber: '',
    _id: '',
    state: '',
    updatedAt: '',
    zipCode: '',
  });

  const informationValues = useMemo(() => {
    return {
      supplierInformations: [
        { key: '_id', label: 'ID', value: supplier?._id },
        { key: 'phoneNumber', label: 'Número', value: supplier?.phoneNumber },
        { key: 'name', label: 'Nome', value: supplier?.name },
        { key: 'cnpj', label: 'CNPJ', value: supplier?.cnpj },
      ],
      localizationInformations: [
        { key: 'state', label: 'Estado', value: supplier?.state },
        { key: 'city', label: 'Cidade', value: supplier?.city },
        { key: 'zipCode', label: 'CEP', value: supplier?.zipCode },
        { key: 'neighborhood', label: 'Bairro', value: supplier?.neighborhood },
        { key: 'address', label: 'Rua', value: supplier?.address },
        { key: 'number', label: 'Logradouro', value: supplier?.number },
        { key: 'complement', label: 'Complemento', value: supplier?.complement },
      ],
      supplierOwnerDetails: [
        { key: 'ownerName', label: 'Nome', value: supplier?.ownerName },
        { key: 'ownerEmail', label: 'Email', value: supplier?.ownerEmail },
        {
          key: 'ownerPhoneNumber',
          label: 'Celular',
          value: supplier.ownerPhoneNumber || 'aasddasdsda',
        },
      ],
    };
  }, [supplier]);

  const params: {
    supplierId: string;
  } = useParams();

  const { supplierId } = params;

  useEffect(() => {
    api
      .get(`/suppliers/${supplierId}`)
      .then(({ data }) => {
        delete data.createdAt;
        delete data.updatedAt;
        setSupplier(data);
      })
      .catch(() => history.push(SUPPLIER_LISTING_PATH));
  }, []);

  if (Object.values(supplier).some(informations => informations === ''))
    return <SpinnerComponent />;

  const handleOpen = (informationKey: string) => {
    setModalOpen(true);
    setModalInformation(informationKey);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleBackToSupplierList = (): void => history.push(SUPPLIER_LISTING_PATH);

  const handleDeleteSupplier = () => {
    api
      .delete(`/suppliers/${supplier._id}`)
      .then(() => {
        toast.success('Fornecedor deletado com sucesso!');
        handleBackToSupplierList();
      })
      .catch(({ response }) => toast.error(response.data.error_description));
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" pb="32px">
        <Flex alignItems="center" justifyContent="space-between" onClick={handleBackToSupplierList}>
          <ArrowBackIosIcon style={{ cursor: 'pointer' }} />
          <Text as="span" fontSize="22px" sx={{ cursor: 'pointer' }}>
            Voltar
          </Text>
        </Flex>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleDeleteSupplier}
        >
          DELETAR
        </Button>
      </Flex>
      <Modal title="Editar informações" open={modalOpen} closeModal={handleCloseModal}>
        <ModalEditInformation
          supplier={supplier}
          setSupplier={setSupplier}
          closeModal={handleCloseModal}
          selectedInformation={modalInformation}
          informationValues={informationValues}
        />
      </Modal>

      <Container>
        <InformationBox
          title="Informações da distribuidora"
          values={informationValues.supplierInformations}
          onClickEdit={(): void => handleOpen('supplierInformations')}
        />
        <DoubleInformationBox>
          <InformationBox
            title="Detalhes da localização"
            values={informationValues.localizationInformations}
            onClickEdit={(): void => handleOpen('localizationInformations')}
          />
          <InformationBox
            title="Dados do fornecedor"
            values={informationValues.supplierOwnerDetails}
            onClickEdit={(): void => handleOpen('supplierOwnerDetails')}
          />
        </DoubleInformationBox>
      </Container>
    </>
  );
};

export default SupplierDetails;
