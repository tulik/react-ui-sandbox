import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { history } from "_helpers";
import { authActions } from "_store";

export { Register };

function Register() {
  const dispatch = useDispatch();
  const authUser = useSelector((x) => x.auth.user);
  const authError = useSelector((x) => x.auth.error?.message || false);

  useEffect(() => {
    // redirect to home if already logged in
    if (authUser) history.navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get functions to build form with useForm() hook
  const { formState } = useForm();
  const { errors, isSubmitting } = formState;

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    return dispatch(authActions.register(formDataObj));
  };

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <Form method={"post"} onSubmit={onFormSubmit}>
            <Form.Group controlId="formRegisterFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="name"
              />
              <Form.Text className="invalid-feedback">
                {errors.name?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formRegisterEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
              <Form.Text className="invalid-feedback">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formRegisterPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
              <Form.Text className="invalid-feedback">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formRegisterPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirm"
              />
              <Form.Text className="invalid-feedback">
                {errors.passwordConfirm?.message}
              </Form.Text>
            </Form.Group>
            <Button disabled={isSubmitting} variant="primary" type="submit">
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Register
            </Button>
            {authError?.message && (
              <div className="alert alert-danger">{authError.message}</div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
