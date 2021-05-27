import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';

import InformationBox from '../SupplierDetails/components/InformationBox';
import ModalEditInformation from '../SupplierDetails/components/ModalEditInformation';
import { SaveRoundedButton } from '../SupplierDetails/components/InformationBox/style';
import SupplierDetails from '../SupplierDetails';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedSupplierData = {
  address: 'Rua mock',
  city: 'Cidade mock',
  cnpj: '000000',
  complement: 'Casa',
  createdAt: '000',
  name: 'Distribuidora mock nome',
  neighborhood: 'Avenida Paulista',
  number: '11',
  ownerEmail: 'mock@mock.com',
  ownerName: 'Mockado',
  ownerPhoneNumber: '5511987460946',
  phoneNumber: '5511987460946',
  _id: 'mocked-public-id',
  state: 'SP',
  updatedAt: '0000',
  zipCode: '05565000',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    supplierId: mockedSupplierData._id,
  }),
}));

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

  it('Should show loading spinner', () => {
    const wrapper = mount(<SupplierDetails />);

    const spinnerSvg = wrapper.find('svg').exists();
    const spinnerCircle = wrapper.find('circle').exists();

    expect(spinnerSvg && spinnerCircle).toBeTruthy();
  });

  it('Should make an GET request to get suppliers data', () => {
    mount(<SupplierDetails />);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(`/suppliers/${mockedSupplierData._id}`);
  });

  it('Should show information boxes', done => {
    const wrapper = mount(<SupplierDetails />);

    setTimeout(() => {
      wrapper.update();

      const informationBoxExists = wrapper.find(InformationBox).exists();
      expect(informationBoxExists).toBeTruthy();

      done();
    });
  });

  it('Should open modal edit dialog', done => {
    const wrapper = mount(<SupplierDetails />);

    setTimeout(async () => {
      wrapper.update();

      const editButton = wrapper.find(SaveRoundedButton).at(0);
      editButton.simulate('click');

      const modalExists = wrapper.find('.parent-modal-div').exists();
      expect(modalExists).toBeTruthy();

      done();
    });
  });

  it('Should submit informations', done => {
    mockedAxios.put.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedSupplierData,
      }),
    );

    const informationValues = {
      supplierInformations: [
        { key: '_id', label: 'ID', value: mockedSupplierData._id },
        { key: 'phoneNumber', label: 'Número', value: mockedSupplierData.phoneNumber },
        { key: 'name', label: 'Nome', value: mockedSupplierData.name },
        { key: 'cnpj', label: 'CNPJ', value: mockedSupplierData.cnpj },
      ],
      localizationInformations: [
        { key: 'state', label: 'Estado', value: mockedSupplierData.state },
        { key: 'city', label: 'Cidade', value: mockedSupplierData.city },
        { key: 'zipCode', label: 'CEP', value: mockedSupplierData.zipCode },
        { key: 'neighborhood', label: 'Bairro', value: mockedSupplierData.neighborhood },
        { key: 'address', label: 'Rua', value: mockedSupplierData.address },
        { key: 'number', label: 'Logradouro', value: mockedSupplierData.number },
        { key: 'complement', label: 'Complemento', value: mockedSupplierData.complement },
      ],
      supplierOwnerDetails: [
        { key: 'ownerName', label: 'Nome', value: mockedSupplierData.ownerName },
        { key: 'ownerEmail', label: 'Email', value: mockedSupplierData.ownerEmail },
        { key: 'ownerPhoneNumber', label: 'Celular', value: mockedSupplierData.ownerPhoneNumber },
      ],
    };
    const wrapper = mount(
      <ModalEditInformation
        supplier={mockedSupplierData}
        informationValues={informationValues}
        selectedInformation="supplierInformations"
        closeModal={jest.fn()}
        setSupplier={jest.fn()}
      />,
    );

    const form = wrapper.find('form');
    form.simulate('submit');

    setTimeout(() => {
      expect(mockedAxios.put).toHaveBeenCalledTimes(1);
      expect(mockedAxios.put).toHaveBeenCalledWith('/suppliers', mockedSupplierData);

      done();
    });
  });
});
