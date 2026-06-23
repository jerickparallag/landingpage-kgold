import { Outlet } from 'react-router-dom';
import { CAREERS_PAGE } from '../../constants/content';
import { PageSubNav } from './PageSubNav';

export function CareersLayout() {
  return (
    <>
      <PageSubNav parentLink={CAREERS_PAGE.subNavParent} links={CAREERS_PAGE.subNav} />
      <Outlet />
    </>
  );
}
