import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { Logo } from 'components';
import * as S from './Header.styles';

export default function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

  return (
    <S.HeaderContainer>
      <Link href='/'>
        <a href='/'>
          <Logo />
        </a>
      </Link>

      <S.Slogan>O melhor lugar para você ouvir podcasts, sempre.</S.Slogan>

      <S.Date data-testid='current-date'>{currentDate}</S.Date>
    </S.HeaderContainer>
  );
}
