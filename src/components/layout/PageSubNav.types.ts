export interface IPageSubNavLink {
  label: string;
  href: string;
}

export interface IPageSubNavProps {
  parentLink: IPageSubNavLink;
  links: readonly IPageSubNavLink[];
}
