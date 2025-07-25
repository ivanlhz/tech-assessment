import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { UserTable } from '../../organisms/UserTable';
import { Header, PageWrapper } from './UsersPage.styled';

export const UsersPage = () => {
  return (
    <PageWrapper>
      <Header>
        <Typography variant="h1">
          Alumnos
        </Typography>
        <Button size="lg" leftIcon={<Icon name="circle-plus" size={20} />}>
          <b>Nuevo alumno</b>
        </Button>
      </Header>
      <main>
        <UserTable />
      </main>
    </PageWrapper>
  );
};
