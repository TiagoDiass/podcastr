import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { Logo } from 'components';
import * as S from './Header.styles';

type HeaderProps = {
  onThemeChange: () => void;
};

export default function Header({ onThemeChange }: HeaderProps) {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

  return (
    <S.HeaderContainer>
      <Link href='/'>
        <a href='/' title='Navegar para a Home'>
          <Logo />
        </a>
      </Link>

      <S.Slogan>O melhor para você ouvir, sempre.</S.Slogan>

      <S.Date data-testid='current-date'>{currentDate}</S.Date>

      {/* <S.ThemeChangeButton onClick={onChangeTheme}>Mudar tema</S.ThemeChangeButton> */}
    </S.HeaderContainer>
  );
}
