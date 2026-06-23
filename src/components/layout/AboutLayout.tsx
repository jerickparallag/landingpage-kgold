import { Outlet } from 'react-router-dom';
import { ABOUT_PAGE } from '../../constants/content';
import { PageSubNav } from './PageSubNav';

export function AboutLayout() {
  return (
    <>
      <PageSubNav parentLink={ABOUT_PAGE.subNavParent} links={ABOUT_PAGE.subNav} />
      <Outlet />
    </>
  );
}
