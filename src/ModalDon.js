import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./styles.css";
import { Notyf } from "notyf";
import axios from "axios";
function ModalDon({ donFuncClose, show }) {
  const notyf = new Notyf();
  const [content, setContent] = useState("");
  const [mailError, setMailError] = useState(false);
  const [numeError, setNumeError] = useState(false);
  const ValiderFunc = () => {
    let errorMail = validationMail(content?.Mail);
    let errorNume = validationNume(content?.Nume);
    if (!errorMail && !errorNume) {
      axios
        .post("http://localhost:4000/api/users/addDon", content)
        .then((response) => {
          setContent(null);
          notyf.success("Message envoyé");
        });
    } else {
      if (errorMail) notyf.error("Votre adresse mail est incorrecte");
      if (errorNume) notyf.error("Votre numero bancaire est incorrecte");
    }
  };
  const inputChange = (event) => {
    let key = event.target.name;
    let value = event.target.value;
    let contentTemp = { ...content, [key]: value };
    setContent(contentTemp);
    console.log(contentTemp);
  };

  //Validation adresse mail

  const validationMail = (Mail) => {
    let expressionReguliereMail =
      /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if (!Mail.match(expressionReguliereMail)) {
      setMailError(true);
      return true;
    } else {
      setMailError(false);
      return false;
    }
  };
  //Validation numero bancaire
  const validationNume = (Nume) => {
    let expressionReguliereNume =
      /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if (!Nume.match(expressionReguliereNume)) {
      setNumeError(true);
      return true;
    } else {
      setNumeError(false);
      return false;
    }
  };

  return (
    <>
      <Modal show={show} onHide={donFuncClose}>
        <Modal.Header closeButton>
          <Modal.Title>Faire un Don </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form" id="start" action="/">
            <div className="formGroup">
              <label className="formLabel" for="password">
                Nom
              </label>
              <input
                className="formInput"
                placeholder={"Veuillez saisir votre nom"}
                id="password"
                name="Nom"
                type="text"
                value={content?.Nom || ""}
                onChange={(e) => inputChange(e)}
                required="required"
              />
            </div>
            <div className="formGroup">
              <label className="formLabel" for="password">
                Prénom
              </label>
              <input
                className="formInput"
                placeholder={"Veuillez saisir votre prénom"}
                id="password"
                name="Prenom"
                type="text"
                value={content?.Prenom || ""}
                onChange={(e) => inputChange(e)}
                required="required"
              />
            </div>

            <div className="formGroup">
              <label className="formLabel" for="password">
                Adresse mail
              </label>
              <input
                className="formInput"
                placeholder={"Veuillez saisir votre adresse mail"}
                id="password"
                name="Mail"
                type="text"
                value={content?.Mail || ""}
                onChange={(e) => inputChange(e)}
                required="required"
              />
              {mailError && (
                <span
                  style={{
                    color: "red",
                  }}
                >
                  Veuillez saisir une adresse mail valide
                </span>
              )}
            </div>

            <div className="formGroup">
              <label className="formLabel" for="password">
                Montant
              </label>
              <input
                className="formInput"
                placeholder={"Veuillez saisir le montant € "}
                id="password"
                name="Montant"
                type="text"
                value={content?.Montant || ""}
                onChange={(e) => inputChange(e)}
                required="required"
              />
            </div>

            <div className="formGroup">
              <label className="formLabel" for="password">
                {" "}
                Num de carte bancaire
              </label>
              <input
                className="formInput"
                placeholder={
                  "Veuillez saisir le numero de votre carte bancaire"
                }
                id="password"
                name="Nume"
                type="text"
                maxLength={14}
                value={content?.Nume || ""}
                onChange={(e) => inputChange(e)}
                required="required"
              />
              {numeError && (
                <span
                  style={{
                    color: "red",
                  }}
                >
                  Veuillez saisir un numéro bancaire valide
                </span>
              )}
            </div>

            <div className="formGroup">
              <label className="formLabel" for="password">
                CVC
              </label>
              <input
                className="formInput"
                placeholder={"Veuillez saisir votre CVC"}
                id="password"
                name="CVC"
                type="password"
                maxLength={3}
                value={content?.CVC || ""}
                onChange={(e) => inputChange(e)}
                required="required"
              />
            </div>

            <div className="formBtnGroup">
              <Button
                style={{ backgroundColor: "red", marginRight: "15px" }}
                onClick={donFuncClose}
              >
                Annuler
              </Button>
            </div>
            <div className="formBtnGroup">
              <Button onClick={ValiderFunc}>Valider</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default ModalDon;
