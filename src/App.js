import React, { useEffect, useReducer } from "react";
import "./styles.css";
import {
  Button,
  Card,
  CardTitle,
  CardText,
  SelectionControlGroup,
  DialogContainer,
  Toolbar
} from "react-md";

import { findIndex, cloneDeep } from "lodash";

const App = () => {
  const initialState = {
    score: 0,
    topScore: 0,
    choiceArr: [],
    viewScore: false
  };

  const reducer = (state, { type, payload }) => {
    const newState = { ...state, [type]: payload };
    return newState;
  };

  const choices = key => [
    { label: "HAIL MOTHER FUCKING BRETHREN", value: "A", key: `${key}-A` },
    { label: "If he dies, he dies.", value: "B", key: `${key}-B` },
    { label: "Ya", value: "C", key: `${key}-C` },
    { label: "Bruh, Bruh...", value: "D", key: `${key}-D` },
    { label: "I feel rapeéd", value: "E", key: `${key}-E` }
  ];

  const questions = [
    "How do you feel about Kobe's death?",
    "How do you feel if furries are euthanized?",
    "Does god love the Warcampaign?",
    "Do you feel gay?",
    "Are memes good?",
    "Do you like taking backholes?",
    "Have you ever wanted to be Rico Acted?"
  ];

  const [state, dispatch] = useReducer(reducer, initialState);

  const { score, choiceArr, topScore, viewScore } = state;

  useEffect(() => {
    dispatch({ type: "topScore", payload: questions.length * 4 });
    const payload = questions.map(question => ({ question, value: 4 }));
    dispatch({ type: "choiceArr", payload: [...choiceArr, ...payload] });
  }, []);

  const onChoice = (question, value) => {
    const payload = cloneDeep(choiceArr);
    const findChoice = findIndex(payload, { question });
    const convertValue = letter => {
      let numValue;
      switch (letter) {
        case "A":
          numValue = 4;
          break;
        case "B":
          numValue = 3;
          break;
        case "C":
          numValue = 2;
          break;
        case "D":
          numValue = 1;
          break;
        default:
          numValue = 0;
      }
      return numValue;
    };
    payload[findChoice].value = convertValue(value);
    dispatch({ type: "choiceArr", payload });
  };

  const setViewDialog = bool => dispatch({ type: "viewScore", payload: bool });

  const onSubmit = () => {
    setViewDialog(true);
    let payload = 0;
    choiceArr.forEach(choice => {
      payload = choice.value + payload;
      return payload;
    });
    payload = payload * 100;
    payload = Math.round(payload / topScore);
    dispatch({ type: "score", payload });
  };

  return (
    <>
      <Card className="md-grid md-cell md-cell--12">
        <CardTitle
          title="Do you deserve to carry the Warcampaign Name?"
          subtitle="AKA Master Purity Spergity Test"
        />
        {questions.map((question, index) => {
          return (
            <Card
              className="md-cell md-cell--12"
              style={{
                background: index % 2 === 0 ? "#eee" : "lightgrey"
              }}
            >
              <CardTitle title={question} style={{ color: "white" }} />
              <CardText style={{ color: "white" }}>
                <SelectionControlGroup
                  id={`${index}-choices`}
                  name={`${index}-choices`}
                  type="radio"
                  controls={choices(question)}
                  key={`${question}-${index}`}
                  onChange={value => onChoice(question, value)}
                />
              </CardText>
            </Card>
          );
        })}
        <div
          style={{
            padding: 10,
            background: "rgba(224, 224, 224, 0.5)",
            position: "fixed",
            bottom: 10,
            right: -10
          }}
          className="md-cell md-cell--3"
        >
          <Button
            name="submit"
            id="submit"
            primary
            raised
            className="md-cell md-cell--12"
            onClick={onSubmit}
            disabled={viewScore}
          >
            Submit
          </Button>
        </div>
      </Card>
      <DialogContainer
        id="score"
        aria-describedby="score"
        name="historyTable"
        visible={viewScore}
        onHide={() => setViewDialog(false)}
        width="85%"
        height="720px"
        style={{ position: "relative" }}
        focusOnMount={false}
        modal
        closeOnEsc={false}
        actions={[
          <Toolbar
            colored
            fixed
            title="Your WC Spergturion Score"
            actions={[
              <Button
                icon
                secondary
                onClick={() => setViewDialog(false)}
                name="close"
              >
                close
              </Button>
            ]}
          />
        ]}
      >
        <Card style={{ background: "#eee", marginTop: 50 }}>
          <h3>Your Spergturion score is</h3>
          <h1>{score}%</h1>
        </Card>
      </DialogContainer>
    </>
  );
};

export default App;
