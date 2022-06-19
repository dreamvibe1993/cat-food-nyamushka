import React from "react";
import styled from "styled-components";
import { Heading1, Heading4 } from "../../ui/typography/headings/headings";
import { Text } from "../../ui/typography/text/text";
import { changeSuffix } from "../../utils/text/changeSuffix";

export const CatFoodCard = ({
  id,
  brandCategory,
  title: rawTitle,
  portions: rawPortions,
  giftMice: rawGiftMice,
  weight: rawWeight,
  isCustomerHappy,
  imgPath,
  itemDescription,
  disabled,
}) => {
  const [title, setTitle] = React.useState();
  const [subtitle, setSubtitle] = React.useState();
  const [portions, setPortions] = React.useState();
  const [mice, setMice] = React.useState();
  const [weight, setWeight] = React.useState();
  const [dimMeasure, setDimMeasure] = React.useState();
  const [isChosen, setIsChosen] = React.useState(false);

  const cryAboutError = (propName, type) =>
    console.error(
      `Either ${propName} hasn't been passed into CatFoodCard.js or it is not type of ${type}!`
    );

  React.useEffect(() => {
    if (rawTitle && typeof rawTitle === "string") {
      const words = rawTitle.split(" ");
      setTitle(words[0]);
      setSubtitle(rawTitle.slice(words[0].length));
    } else {
      cryAboutError("title", "string");
    }
    if (rawPortions && typeof rawPortions === "number") {
      setPortions(
        `${rawPortions} ${changeSuffix(rawPortions, [
          "порция",
          "порции",
          "порций",
        ])}`
      );
    } else {
      cryAboutError("portions", "number");
    }
    if (rawGiftMice && typeof rawGiftMice === "number") {
      setMice(
        `${rawGiftMice} ${changeSuffix(rawGiftMice, [
          "мышь",
          "мыши",
          "мышей",
        ])} в подарок`
      );
      if (rawGiftMice === 1) setMice((prev) => prev.replace("1", " "));
    } else {
      cryAboutError("giftMice", "number");
    }
    if (rawWeight && typeof rawTitle === "string") {
      const words = rawWeight.split(" ");
      setWeight(words[0].replace(".", ","));
      setDimMeasure(rawWeight.slice(words[0].length));
    } else {
      cryAboutError("weight", "string");
    }
  }, [rawGiftMice, rawPortions, rawTitle, rawWeight]);

  const chooseThisItem = (e) => {
    if (e) e.stopPropagation();
    if (disabled) return;
    setIsChosen((prev) => !prev);
  };

  const itemDescriptionFallback = (
    <>
      Чего сидишь? Порадуй котэ,{" "}
      <span className="anchorLike" onClick={chooseThisItem}>
        купи
      </span>
      <span style={{ color: "#FFF" }}>.</span>
    </>
  );

  return (
    <CardContainer disabled={disabled}>
      <CardBorder
        disabled={disabled}
        isChosen={isChosen}
        onClick={(e) => chooseThisItem(e)}
      >
        <Card>
          <TextBlock disabled={disabled}>
            <TextRow>
              <TextGrey>{brandCategory || ""}</TextGrey>
            </TextRow>
            <CardTitleBlock>
              <TextRow>
                <Heading1>{title || ""}</Heading1>
              </TextRow>
              <TextRow>
                <Heading4>{subtitle || ""}</Heading4>
              </TextRow>
            </CardTitleBlock>
            <TextRow>
              <TextGrey>{portions || ""}</TextGrey>
            </TextRow>
            <TextRow>
              <TextGrey>{mice || ""}</TextGrey>
            </TextRow>
            {isCustomerHappy === 1 && (
              <TextRow>
                <TextGrey>заказчик доволен</TextGrey>
              </TextRow>
            )}
          </TextBlock>
          <CatImgWrapper disabled={disabled}>
            <CatImg src={imgPath || "images/cat-0.png"} />
          </CatImgWrapper>
          <WeightBadge disabled={disabled}>
            <WeightBadgeWeight>{weight || ""}</WeightBadgeWeight>
            <WeightBadgeUnitMeasure>{dimMeasure || ""}</WeightBadgeUnitMeasure>
          </WeightBadge>
        </Card>
      </CardBorder>
      <CardBottomTextContainer>
        <CardBottomText disabled={disabled}>
          {disabled
            ? `Печалька, ${subtitle} закончился.`
            : itemDescription || itemDescriptionFallback}
        </CardBottomText>
      </CardBottomTextContainer>
    </CardContainer>
  );
};

const FlexRow = styled.div`
  display: flex;
`;

const CardBorder = styled.div`
  * {
    transition: all 0.2s ease;
  }
  height: var(--cardHeight);
  width: var(--cardWidth);
  background-color: ${(p) =>
    p.disabled ? `var(--cardBorderColorDisabled)` : `var(--cardBorderColor)`};
  clip-path: polygon(0 8%, 0px 100%, 100% 100%, 100% 0, 12.5% 0);
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  cursor: ${(p) => (p.disabled ? "initial" : "pointer")};
  --cardBorderColor: ${(p) => p.isChosen && `var(--cardBorderColorChosen)`};
  --cardBorderColor: ${(p) => p.disabled && `var(--cardBorderColorDisabled)`};
  &:hover {
    @media (min-width: 768px) {
      --cardBorderColor: var(--cardBorderColorChosen);
    }
  }
`;

const TextRow = styled(FlexRow)``;

const Card = styled(CardBorder)`
  position: absolute;
  top: 50%;
  left: 50%;
  height: calc(var(--cardHeight) - var(--cardBorderWidth));
  width: calc(var(--cardWidth) - var(--cardBorderWidth));
  transform: translate(-50%, -50%);
  background-color: var(--cardBGColor);
`;

const CatImg = styled.img`
  object-fit: cover;
  width: 100%;
`;

const CatImgWrapper = styled.div`
  position: absolute;
  bottom: -20%;
  left: -8%;
  width: 36.5rem;
  height: 36rem;
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
`;

const TextGrey = styled(Text)`
  color: #666666;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.1rem 4.8rem;
  * {
    color: ${(p) => p.disabled && `#D2D2D2`};
  }
`;

const CardTitleBlock = styled.div`
  padding: 0.5rem 0px;
  padding-bottom: 1.5rem;
  color: #000000;
`;

const WeightBadge = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  background-color: var(--cardBorderColor);
  position: absolute;
  right: 1.6rem;
  bottom: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding-top: 1.1rem;
`;

const WeightBadgeWeight = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 4.5rem;
  line-height: 3rem;
  margin-bottom: 0.5rem;
`;

const WeightBadgeUnitMeasure = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 1.8rem;
`;

const CardContainer = styled.div`
  color: #fff;
  pointer-events: ${(p) => (p.disabled ? "none" : "initial")};
`;

const CardBottomText = styled(Text)`
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1.5rem;
  color: ${(p) => (p.disabled ? "#FFFF66" : "inherit")};
  .anchorLike {
    color: #1698d9;
    border-bottom: 1px dashed #1698d9;
    text-decoration: dashed !important;
    cursor: pointer;
  }
`;

const CardBottomTextContainer = styled(TextRow)`
  margin-top: 1.4rem;
  justify-content: center;
`;
