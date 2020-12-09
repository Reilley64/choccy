import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../ui-library/Button/Button";
import Card from "../../ui-library/Card";
import Grid from "../../ui-library/Grid";
import Modal from "../../ui-library/Modal/Modal";
import TextField from "../../ui-library/TextField/TextField";
import Typography from "../../ui-library/Typography";

const CreateBrandMutation = gql`
  mutation CreateBrandMutation(
    $name: String!
    $company: String!
    $image: String!
    $ingredients: String!
    $website: String!
  ) {
    createBrand(
      name: $name
      company: $company
      image: $image
      ingredients: $ingredients
      website: $website
    ) {
      id
      name
      company
      image
      ingredients
      website
      likes {
        id
        ip
      }
    }
  }
`;

const NewMilkModal = () => {
  const [newMilkModalOpen, setNewMilkModalOpen] = useState(false);

  const [createBrand, { data, loading: createBrandLoading }] = useMutation(CreateBrandMutation, {
    update(cache, { data: { createBrand } }) {
      cache.modify({
        fields: {
          brands(existingBrands = []) {
            const newBrandRef = cache.writeFragment({
              data: createBrand,
              fragment: gql`
                fragment NewBrand on Brand {
                  id
                  name
                  company
                  image
                  ingredients
                  website
                  likes {
                    id
                    ip
                  }
                }
              `,
            });
            return [...existingBrands, newBrandRef];
          },
        },
      });
    },
  });

  const { handleSubmit, register, reset, watch } = useForm();

  const close = () => {
    setNewMilkModalOpen(false);
    reset();
  };

  useEffect(() => {
    if (data && !createBrandLoading) {
      close();
    }
  }, [data, createBrandLoading])

  const onSubmit = (values) => createBrand({ variables: values });

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
