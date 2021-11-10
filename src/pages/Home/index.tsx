import React from 'react';
import Container, {
  ContainerRow,
  Separator,
} from 'components/common/Container';
import { HowToPlay, Menu } from './elements';

const Home: React.FC = () => {
  return (
    <Container title='Home'>
      <ContainerRow>
        <HowToPlay />
        <Separator />
        <Menu />
      </ContainerRow>
    </Container>
  );
};

export default Home;
