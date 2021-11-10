import classNames from 'classnames';
import React, { FunctionComponent, SVGProps } from 'react';
import { ReactComponent as Heart } from 'assets/img/icons/heart-f.svg';
import { ReactComponent as Shield } from 'assets/img/icons/shield-f.svg';
import { ReactComponent as Sword } from 'assets/img/icons/sword-f.svg';
import { ReactComponent as Magic } from 'assets/img/icons/magic-f.svg';
import { ReactComponent as ChevronRight } from 'assets/img/icons/chevron-right.svg';

export enum IconName {
  HEART = 'heart',
  SHIELD = 'shield',
  SWORD = 'sword',
  MAGIC = 'magic',
  CHEVRON_RIGHT = 'chevron-right',
}

enum IconSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

const IconComponent: Record<
  string,
  FunctionComponent<SVGProps<SVGSVGElement>>
> = {
  [IconName.HEART]: Heart,
  [IconName.SHIELD]: Shield,
  [IconName.SWORD]: Sword,
  [IconName.MAGIC]: Magic,
  [IconName.CHEVRON_RIGHT]: ChevronRight,
};

interface IconProps {
  icon: string;
  className?: string;
  size?: string;
}

const Icon: FunctionComponent<IconProps> = ({ icon, size, className }) => {
  const Svg = IconComponent[icon];

  return Svg ? (
    <Svg
      className={classNames(
        className,
        size === IconSize.SMALL && 'w-4 h-4',
        size === IconSize.MEDIUM && 'w-6 h-6',
        size === IconSize.LARGE && 'w-8 h-8'
      )}
    />
  ) : null;
};

export default Icon;
