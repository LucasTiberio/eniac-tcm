import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';

import CreateSupplierModal from '../CreateSupplierModal';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedSupplierData = {
  zipCode: '128457112',
  address: 'Avenida República do Líbano',
  number: '12',
  complement: 'Cj 12',
  neighborhood: 'Moema',
  city: 'São Paulo',
  state: 'SP',
  ownerEmail: 'mk@email.com',
  ownerPhoneNumber: '5511912365412',
  name: 'Nome distribuidora mockado',
  ownerName: 'Nome distribuidor mockado',
  phoneNumber: '1140028922',
  cnpj: '01.254.454/0001-93',
};

describe('SuppliersDetails', () => {
  beforeEach(() => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedSupplierData,
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should have one POST request', done => {
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedSupplierData,
      }),
    );

    const wrapper = mount(
      <CreateSupplierModal
        createSupplierModal={{
          modalOpened: true,
          formValues: {
            phoneNumber: mockedSupplierData.phoneNumber,
            name: mockedSupplierData.name,
            ownerName: mockedSupplierData.ownerName,
            cnpj: mockedSupplierData.cnpj,
          },
        }}
        setCreateSupplierModal={jest.fn()}
        setSupplierList={jest.fn()}
        supplierList={[]}
      />,
    );

    const form = wrapper.find('form');
    form.simulate('submit');

    setTimeout(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith('/suppliers', mockedSupplierData);

      done();
    });
  });
});
