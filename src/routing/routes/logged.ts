import { lazy } from 'react';

import { RouteAndRedirect } from '../../routing/types';

export const SUPPLIER_LISTING_PATH = '/suppliers';
const SUPPLIER_LISTING_COMPONENT = lazy(() => import('@poupachef/io/supplies/SupplierList'));

export const SUPPLIER_UNIQUE_PATH = '/suppliers/:supplierId';
const SUPPLIER_UNIQUE_COMPONENT = lazy(() => import('@poupachef/io/supplies/SupplierDetails'));

const routes: RouteAndRedirect[] = [
  {
    path: SUPPLIER_LISTING_PATH,
    component: SUPPLIER_LISTING_COMPONENT,
    authenticated: true,
    exact: true,
  },
  {
    path: SUPPLIER_UNIQUE_PATH,
    component: SUPPLIER_UNIQUE_COMPONENT,
    authenticated: true,
    exact: true,
  },
];

export default routes;
