import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Create, Add } from '@material-ui/icons';

import api from '@poupachef/api';

import { SUPPLIER_LISTING_PATH } from '@poupachef/routing/routes/logged';
import SpinnerComponent from '@poupachef/components/Spinner';
import { Container } from './style';
import CreateSupplierModal from '../CreateSupplierModal';

export interface SupplieListItemI {
  publicId: string;
  name: string;
  cnpj: string;
  phoneNumber: string;
  ownerName: string;
}

const SupplierList = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();

  const { jwt }: any = location.state || '';

  const [createSupplierModal, setCreateSupplierModal] = useState<ICreateSupplierModal>({
    modalOpened: false,
    formValues: {},
  });
  const [supplierList, setSupplierList] = useState<SupplieListItemI[]>([]);

  useEffect(() => {
    const initialHeader = jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : {};

    api.get('/suppliers', initialHeader).then(({ data }) => {
      setSupplierList(data);
    });
  }, []);

  const handleGoToDetails = (supplierId: string): void =>
    history.push(`${SUPPLIER_LISTING_PATH}/${supplierId}`);

  const handleCreateNewSupplier = (): void => {
    setCreateSupplierModal({
      ...createSupplierModal,
      modalOpened: true,
    });
  };

  if (!supplierList.length) return <SpinnerComponent />;

  return (
    <>
      <CreateSupplierModal
        createSupplierModal={createSupplierModal}
        setCreateSupplierModal={setCreateSupplierModal}
        setSupplierList={setSupplierList}
        supplierList={supplierList}
      />
      <Container>
        <table>
          <thead>
            <tr>
              <td>Distribuidora</td>
              <td>Distribuidor</td>
              <td>CNPJ</td>
              <td>Número</td>
              <td
                onClick={handleCreateNewSupplier}
                onKeyDown={handleCreateNewSupplier}
                role="button"
              >
                <Add />
              </td>
            </tr>
          </thead>

          <tbody>
            {supplierList.map((supplie, i) => {
              const onClick = (): void => handleGoToDetails(supplie.publicId);
              return (
                <tr key={i}>
                  <td>{supplie.name}</td>
                  <td>{supplie.ownerName}</td>
                  <td>{supplie.cnpj}</td>
                  <td>{supplie.phoneNumber}</td>
                  <td onClick={onClick} onKeyDown={onClick} role="button">
                    <Create />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default SupplierList;
