import styled from "styled-components";
import { CatFoodCard } from "./components/CatFoodCard/CatFoodCard";
import { IndexHeading1 } from "./ui/typography/headings/headings";

function App() {
  const catFoods = [
    {
      id: "fois-gras",
      brandCategory: "Сказочное заморское яство",
      title: "Нямушка с фуа-гра",
      portions: 10,
      giftMice: 1,
      weight: "0.5 кг",
      isCustomerHappy: 0,
      imgPath: "images/cat-0.png",
    },
    {
      id: "fish",
      brandCategory: "Сказочное заморское яство",
      title: "Нямушка с рыбой",
      portions: 40,
      giftMice: 2,
      weight: "2 кг",
      isCustomerHappy: 0,
      imgPath: "images/cat-0.png",
      itemDescription: "Головы щучьи с чесноком да свежайшая сёмгушка.",
    },
    {
      id: "chicken",
      brandCategory: "Сказочное заморское яство",
      title: "Нямушка с курой",
      portions: 100,
      giftMice: 5,
      weight: "5 кг",
      isCustomerHappy: 1,
      imgPath: "images/cat-0.png",
      disabled: true,
    },
  ];
  return (
    <AppContainer>
      <CatFoodBlock>
        <IndexHeadingWrapper>
          <IndexHeading1>Ты сегодня покормил кота?</IndexHeading1>
        </IndexHeadingWrapper>
        <CardsRow>
          {catFoods.map((catFoodProps) => (
            <CatFoodCard key={catFoodProps.id} {...catFoodProps} />
          ))}
        </CardsRow>
      </CatFoodBlock>
    </AppContainer>
  );
}

export default App;

const CatFoodBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 768px) {
    min-height: 100vh;
  }
`;

const AppContainer = styled.div``;

const FlexRow = styled.div`
  display: flex;
`;

const IndexHeadingWrapper = styled(FlexRow)`
  justify-content: center;
  padding: 3.6rem 8rem 2.4rem 8rem;
`;

const CardsRow = styled(FlexRow)`
  justify-content: space-around;
  padding: 0 2rem;
  padding-bottom: 6.7rem;
  width: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    row-gap: 3rem;
  }
  & > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;
