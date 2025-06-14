import React, { useState } from "react";

type FormFieldName = "firstName" | "secondName" | "age" | "mobile" | "gender";

type FormField = {
  type: string;
  value: string;
  touched: boolean
  errors: {
    required: boolean;
    minLength?: number;
    max?: number;
    min?: number;
    allowNumbers?: boolean;
    length?: number;
  };
};

type UserInfoFormType = {
  firstName: FormField;
  secondName: FormField;
  age: FormField;
  mobile: FormField;
  gender: FormField;
};

function FormUiValidation() {
  const [userInfoForm, setUserInfoForm] = useState<UserInfoFormType>({
    firstName: {
      type: "text",
      value: "",
      touched: false,
      errors: {
        required: true,
        minLength: 0,
        allowNumbers: false,
      },
    },
    secondName: {
      type: "text",
      value: "",
      touched: false,
      errors: {
        required: false,
        minLength: 0,
        allowNumbers: false,
      },
    },
    age: {
      type: "number",
      value: "",
      touched: false,
      errors: {
        required: false,
        allowNumbers: true,
        min: 0,
        max: 99,
      },
    },
    mobile: {
      type: "number",
      value: "",
      touched: false,
      errors: {
        required: false,
        allowNumbers: true,
        length: 10,
      },
    },
    gender: {
      type: "select",
      value: "",
      touched: false,
      errors: {
        required: true,
      },
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserInfoForm((prev) => ({
      ...prev,
      [name as keyof UserInfoFormType]: {
        ...prev[name as keyof UserInfoFormType],
        value,
        touched: true
      },
    }));
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name } = e.target;
  setUserInfoForm(prev => ({
    ...prev,
    [name as keyof UserInfoFormType]: {
      ...prev[name as keyof UserInfoFormType],
      touched: true
    }
  }));
};


  const renderError = (field: FormField) => {
    if(field.errors.required && !field.value && field.touched ) {
        return <span className="error">Please fill this field.</span>
    }
  };

  return (
    <div className="form-ui-card">
      <header>
        <div className="title">About Me</div>
      </header>
      <main className="form-card-body">
        <form>
          <fieldset>
            <label htmlFor="firstName">
              First name <span className="required">*</span>
            </label>
            <div className="form-field">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userInfoForm.firstName.value}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="error">{renderError(userInfoForm.firstName)}</div>
          </fieldset>
          <fieldset>
            <label htmlFor="secondName">
              Second name <span className="required">*</span>
            </label>
            <div className="form-field">
              <input
                type="text"
                id="secondName"
                name="secondName"
                value={userInfoForm.secondName.value}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
}

export default FormUiValidation;
