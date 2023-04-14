import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./styles.css";
import { Notyf } from "notyf";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
function ModalAutre({ autreFuncClose, show }) {
  const notyf = new Notyf();
  const [content, setContent] = useState();
  const [choixList, setChoixList] = useState([]);
  const ValiderFunc = () => {
    axios
      .post("http://localhost:4000/api/users/addOthers", content)
      .then((response) => {
        setContent(null);
        notyf.success("Message envoyé");
      });
  };
  const choixChange = (event) => {
    let key = event.target.name;
    let value = event.target.checked;
    let ch = choixList;
    if (event.target.checked) {
      ch.push(key);
    } else {
      ch = ch.filter((item) => item != key);
    }
    setChoixList(ch);
    setContent({ ...content, Choix: ch.join("-") });
  };
  const inputChange = (event) => {
    let key = event.target.name;
    let value = event.target.value;
    let contentTemp = { ...content, [key]: value };
    setContent(contentTemp);
    // console.log(contentTemp);
  };

  return (
    <>
      <Modal show={show} onHide={autreFuncClose}>
        <Modal.Header closeButton>
          <Modal.Title>Autres </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form" id="start" action="/">
            <div className="formGroup">
              <label className="formLabel" for="password">
                Nom
              </label>
              <input
                className="formInput"
                placeholder={"Veuilez saisir votre nom"}
                id="password"
                name="Nom"
                type="text"
                value={content?.Nom || ""}
                onChange={(e) => inputChange(e)}
              />
            </div>
            <div className="formGroup">
              <label className="formLabel" for="password">
                Prénom
              </label>
              <input
                className="formInput"
                placeholder={"Veuilez saisir votre prénom"}
                id="password"
                name="Prenom"
                type="text"
                value={content?.Prenom || ""}
                onChange={(e) => inputChange(e)}
              />
            </div>
            <div className="liste">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Alimentation"
                  name="Alimentation"
                  onChange={(e) => choixChange(e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Vêtements"
                  name="Vêtements"
                  onChange={(e) => choixChange(e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Médicaments"
                  name="Médicaments"
                  onChange={(e) => choixChange(e)}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Jouets"
                  name="Jouets"
                  onChange={(e) => choixChange(e)}
                />
              </FormGroup>
            </div>

            <div className="buttons">
              <div className="formBtnGroup">
                <Button
                  style={{ backgroundColor: "red", marginRight: "15px" }}
                  onClick={autreFuncClose}
                >
                  Annuler
                </Button>
              </div>
              <div className="formBtnGroup">
                <Button onClick={ValiderFunc}>Valider</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalAutre;
