import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../ui-library/Button/Button";
import Card from "../../ui-library/Card";
import Grid from "../../ui-library/Grid";
import Modal from "../../ui-library/Modal/Modal";
import TextField from "../../ui-library/TextField/TextField";
import Typography from "../../ui-library/Typography";

const NewMilkModal = ({ mutate }) => {
  const [newMilkModalOpen, setNewMilkModalOpen] = useState(false);

  const { handleSubmit, register, reset, watch } = useForm();

  const close = () => {
    setNewMilkModalOpen(false);
    reset();
  };

  const onSubmit = (values) => {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation { createBrand(name: "${values.name}", company: "${values.company}", image: "${values.image}", ingredients: "${values.ingredients}", website: "${values.website}" ) { id } }`,
      }),
    }).then(() => {
      mutate();
      close();
    });
  };

  return (
    <>
      <Card
        style={{
          alignItems: "center",
          cursor: "pointer",
          height: "100%",
          minHeight: "319.617px",
          justifyContent: "center",
        }}
      >
        <Button onClick={() => setNewMilkModalOpen(true)} variant="text">
          New milk
        </Button>
      </Card>
      <Modal open={newMilkModalOpen} close={close}>
        <Card>
          <Card.Body
            style={{
              borderBottom: "1px solid rgba(0, 0, 0, .12)",
              paddingBottom: "16px",
            }}
          >
            <Typography level={6} type={"headline"}>
              New milk
            </Typography>
          </Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} style={{ overflow: "auto" }}>
            <Card.Body>
              <Grid>
                <Grid.Col xs={12}>
                  <TextField
                    label={"Name"}
                    register={register}
                    name="name"
                    value={watch("name")}
                  />
                </Grid.Col>
                <Grid.Col xs={12}>
                  <TextField
                    label={"Company"}
                    register={register}
                    name="company"
                    value={watch("company")}
                  />
                </Grid.Col>
                <Grid.Col xs={12}>
                  <TextField
                    label={"Image"}
                    register={register}
                    name="image"
                    value={watch("image")}
                  />
                </Grid.Col>
                <Grid.Col xs={12}>
                  <TextField
                    label={"Ingredients"}
                    register={register}
                    name="ingredients"
                    textarea
                    value={watch("ingredients")}
                  />
                </Grid.Col>
                <Grid.Col xs={12}>
                  <TextField
                    label={"Website"}
                    register={register}
                    name="website"
                    value={watch("website")}
                  />
                </Grid.Col>
              </Grid>
            </Card.Body>
            <Card.Actions style={{ flexDirection: "row-reverse" }}>
              <Button
                style={{ marginLeft: "8px" }}
                type="submit"
                variant="text"
              >
                Save
              </Button>
              <Button onClick={() => close()} variant="text">
                Cancel
              </Button>
            </Card.Actions>
          </form>
        </Card>
      </Modal>
    </>
  );
};

export default NewMilkModal;
