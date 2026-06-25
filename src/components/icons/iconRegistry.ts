import {
  ArrowRight01Icon,
  BodySoapIcon,
  CheckmarkCircle02Icon,
  DropletIcon,
  Scissor01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';

export const ICONS = {
  arrowRight: ArrowRight01Icon,
  check: CheckmarkCircle02Icon,
  skincare: DropletIcon,
  haircare: Scissor01Icon,
  bodycare: BodySoapIcon,
  men: UserIcon,
} as const;

export type TIconKey = keyof typeof ICONS;
