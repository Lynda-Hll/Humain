import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./styles.css";
import { Notyf } from "notyf";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import axios from "axios";
function ModalMot({ motFuncClose, show }) {
  const notyf = new Notyf();
  const [content, setContent] = useState();

  const ValiderFunc = () => {
    axios
      .post("http://localhost:4000/api/users/addComment", content)
      .then((response) => {
        setContent(null);
        notyf.success("Message envoyé");
      });
  };
  //   useEffect(() => {
  //     setContent(null);
  //     setContentRefresh(false);
  //   }, [contentRefresh]);

  const inputChange = (event) => {
    let key = event.target.name;
    let value = event.target.value;
    let contentTemp = { ...content, [key]: value };
    setContent(contentTemp);
    console.log(contentTemp);
  };
  return (
    <>
      <Modal show={show} onHide={motFuncClose}>
        <Modal.Header closeButton>
          <Modal.Title>Laisser un mot </Modal.Title>
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
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Laissez votre message"
                name="Commentaire"
                style={{ width: 400 }}
                value={content?.Commentaire || ""}
                onChange={(e) => inputChange(e)}
              />
            </div>

            <div className="buttons">
              <div className="formBtnGroup">
                <Button
                  style={{ backgroundColor: "red", marginRight: "15px" }}
                  onClick={motFuncClose}
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
export default ModalMot;
