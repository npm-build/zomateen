import { useState, ChangeEvent } from "react";
import Cookies from "js-cookie";
import { Formik, Field, Form, FieldArray } from "formik";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import "../../styles/UpdateItems.styles.scss";

const App: React.FC = () => {
  const accessToken = Cookies.get("accessToken");

  const [file, setFile] = useState<Blob>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const validationSchema = yup.object({
    name: yup.string().required().max(20),
    foodId: yup.number().required().min(1),
    price: yup.number().required().min(1),
    isAvailable: yup.boolean(),
    day: yup.string().required().max(10),
    tags: yup.array().of(yup.string().max(12)),
  });

  return (
    <div id="add-food">
      <h1>Add Food</h1>
      <Formik
        validateOnChange={true}
        initialValues={{
          name: "",
          foodId: "",
          price: "",
          isAvailable: false,
          day: "",
          img: "",
          tags: [""],
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);

          if (!file) {
            return console.warn("Upload Image");
          }

          const formData = new FormData();
          formData.append("filePath", file);
          formData.append("name", data.name);
          formData.append("foodId", data.foodId);
          formData.append("isAvailable", data.isAvailable.toString());
          formData.append("day", data.day);
          formData.append("price", data.price);
          formData.append("tags", JSON.stringify(data.tags));

          await axios
            .post("/api/food/add", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + accessToken,
              },
            })
            .then((res) => {
              console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });

          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form id="add-form">
            <div className="form-input">
              <label htmlFor="name">Name</label>
              <Field
                className="form-group"
                type="text"
                placeholder="food item name"
                name="name"
              />
            </div>
            <div className="form-input">
              <label htmlFor="foodId">Food ID</label>
              <Field
                className="form-group"
                type="number"
                placeholder="food id"
                name="foodId"
              />
            </div>
            <div className="form-input">
              <label htmlFor="price">Price</label>
              <Field
                className="form-group"
                type="number"
                placeholder="food price"
                name="price"
              />
            </div>
            <div className="form-input">
              <label htmlFor="isAvailable">In Stock? (default 'no')</label>
              <Field
                className="form-group"
                name="isAvailable"
                type="checkbox"
              />
            </div>
            <div className="form-input">
              <label htmlFor="day">Item of which day?</label>
              <Field
                className="form-group"
                type="text"
                placeholder="food item of the day"
                name="day"
              />
            </div>
            <div className="form-input">
              <label htmlFor="img">Food Image</label>
              <input
                className="form-group"
                type="file"
                onChange={onChange}
                name="img"
                id="file"
              />
            </div>
            <FieldArray name="tags">
              {(arrayHelpers) => (
                <div className="form-input">
                  <button
                    className="btn"
                    style={{ maxHeight: "50px" }}
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                  >
                    Add Tag
                  </button>
                  <div className="tags">
                    {values.tags.map((tag, index) => {
                      return (
                        <div className="tag" key={index}>
                          <Field
                            className="form-group"
                            type="text"
                            placeholder="tag"
                            name={`tags.${index}`}
                          />

                          <button
                            className="rem-btn"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            x
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </FieldArray>
            {/* {console.log(errors)} */}
            <div>
              <Button
                variant="success"
                className="btn"
                disabled={isSubmitting}
                type="submit"
              >
                submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
