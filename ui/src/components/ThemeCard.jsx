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

const ProbabilityDisplay = styled.div`
  display: flex;
  gap: 8px;
  opacity: 75%;

  margin-top: 16px;
  font-weight: 700;
`

const ThemeProbability = styled.span`
  &.very-unlikely {
    color: #f77e6e;
  }
  &.unlikely {
    color: #f0c743;
  }
  &.likely {
    color: #1cd47e;
  }
  &.very-likely {
    color: #17f117;
  } 
`;

function renderProbability(value) {
  const assignRules = [
    [[0, 30], 'very-unlikely'],
    [[40, 55], 'unlikely'],
    [[55, 75], 'likely'],
    [[75, 100.01], 'very-likely'],
  ];

  const themeProbabilityClass = assignRules.find((v) => {
    const min = v[0][0];
    const max = v[0][1];
    return min <= value && max > value;
  })

  return <ThemeProbability className={themeProbabilityClass[1]}>
    {value}%
  </ThemeProbability>;
}

export function ThemeCard({ themeId, text, likeliness=0 }) {
  return (
    <StyledCard>
      <ThemeID>
        <Label>Tema Repetitivo</Label>
        <NumberID>{themeId}</NumberID>
      </ThemeID>
      <Text>{text}</Text>
      <ProbabilityDisplay>
        <span>Probabilidade:</span>
        {renderProbability(likeliness)}
      </ProbabilityDisplay>
    </StyledCard>
  );
}
