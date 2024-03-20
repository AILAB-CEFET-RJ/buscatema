import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const StyledCard = styled(Card)`
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: none;
  color: #0A0909;
  padding: 16px;
  margin-bottom: 16px;
`;

const ThemeID = styled('div')`
  display: flex;
  gap: 16px;
`;

const Label = styled(Typography)`
  font-weight: 700;
`;

const NumberID = styled(Typography)`
  color: #395FC2;
  font-weight: 700;
`;

const Text = styled(Typography)`
  margin-top: 8px;
  color: #AEAEAE;
`;

export function ThemeCard({ themeId, text }) {
  return (
    <StyledCard>
      <ThemeID>
        <Label>Tema Repetitivo</Label>
        <NumberID>{themeId}</NumberID>
      </ThemeID>
      <Text>{text}</Text>
    </StyledCard>
  );
}
