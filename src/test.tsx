import * as React from "react";
import { Field as FormField, InjectedFormProps, reduxForm } from "redux-form";

interface CustomProps {
  customText: string;
}

class FormComponent extends React.Component<
  CustomProps & InjectedFormProps<{}, CustomProps>
> {
  render() {
    const { handleSubmit, customText } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <p>{customText}</p>
        </div>
      </form>
    );
  }
}

export const Form = reduxForm<{}, CustomProps>({
  form: "form"
})(FormComponent);

const Hello = () => <Form customText="123" />;
