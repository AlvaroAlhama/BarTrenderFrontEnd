import React from 'react'
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
} from "react-bootstrap";

export default class EditOwnerProfile extends React.Component {
    constructor() {
        super();

        this.state = {

            input: {
                name: '',
                surname: '',
                email: '',
                phone: '',
                old_password: null,
                password: null
            },

            sendFinal: {},


            errorsApiGet: {},
            errorsApiPut: {},
            errors: {},
            msg: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }



    async getOwner() {
        var token = sessionStorage.getItem("token");

        const url = "http://develop-backend-sprint-01.herokuapp.com/v1/authentication/user";

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'token': token,
            }
        });

        if (response.ok) {
            const data = await response.json();
            this.setState({
                input: {
                    name: data.name,
                    surname: data.surname,
                    email: data.email,
                    phone: data.phone,
                    old_password: null,
                    password: null
                }
            });
        } else {
            const data = await response.json();
            this.setState({ errorsApiGet: data.errors });
        }
    }

    componentDidMount() {
        this.getOwner();
    }

    async handleUpdate() {
        var token = sessionStorage.getItem('token');
        console.log(this.state.sendFinal)
        const urlUpdate = "http://develop-backend-sprint-01.herokuapp.com/v1/authentication/user/edit"

        const update = await fetch(urlUpdate, {
            method: 'PUT',
            headers: {
                'token': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.sendFinal),
        });

        if (update.ok) {
            const data = await update.json();
            this.setState({
                msg: data.msg,
            })
            sessionStorage.setItem("token", data.token)
            setTimeout(window.location.reload(), 2000)
        } else {
            const data = await update.json();
            this.setState({
                errorsApiPut: data
            })
            console.log(this.state.errorsApiPut.error)
        }
    }

    async handleChange(event) {
        event.persist();
        await this.setState({
            input: {
                ...this.state.input,
                [event.target.name]: event.target.value
            }
        })

        console.log(this.state.input)
    }

    handleSubmit(event) {
        event.preventDefault();
        let inputs = this.state.input;
        console.log(inputs, "Estos son los inputs")

        let sendWithNewpass = {};
        let send = {};

        console.log(this.validate(), "este es el validate")
        if (this.validate()) {
            if (inputs['password'] == undefined) {
                console.log(send, "Send antes de asignar")
                send['name'] = inputs.name;
                send['surname'] = inputs.surname;
                send['email'] = inputs.email;
                send['phone'] = inputs.phone;
                send['old_password'] = inputs.old_password;
                console.log(send, "Despues de Asignar")

                this.state.sendFinal = send;

                this.handleUpdate()

                console.log(this.state.sendFinal, "Lo que se va a enviar")
            } else {
                console.log(sendWithNewpass, "Send antes de asignar")
                sendWithNewpass['name'] = inputs.name;
                sendWithNewpass['surname'] = inputs.surname;
                sendWithNewpass['email'] = inputs.email;
                sendWithNewpass['phone'] = inputs.phone;
                sendWithNewpass['old_password'] = inputs.old_password;
                sendWithNewpass['password'] = inputs.password;
                console.log(sendWithNewpass, "Despues de Asignar")

                this.state.sendFinal = sendWithNewpass;
                this.handleUpdate()

                console.log(this.state.sendFinal, "Lo que se envia si tiene password nuevo")
            }


        }
    }

    validate() {
        let inputs = this.state.input;

        let errors = {};

        let isValid = true;

        if (!inputs['name']) {
            isValid = false;
            errors['name'] = 'El nombre no puede estar vacío';
        }

        if (!inputs['surname']) {
            isValid = false;
            errors['surname'] = 'El apellido no puede estar vacío';
        }

        if (!inputs['email']) {
            isValid = false;
            errors['email'] = 'El email no puede estar vacío';
        }

        if (typeof inputs['email'] !== "undefined") {
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );

            if (!pattern.test(inputs['email'])) {
                isValid = false;

                errors['email'] =
                    'Escriba una dirección de correo electrónico correcta.';
            }
        }

        if (!inputs['phone']) {
            isValid = false;
            errors['phone'] = 'El teléfono no puede estar vacío';
        }
        if (!inputs['old_password']) {
            isValid = false;
            errors['old_password'] = 'Tiene que poner su contraseña para poder verificar su identidad';
        }


        if (inputs['password']) {
            var pattern = new RegExp(
                /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i
            );
            if (!pattern.test(inputs['password'])) {
                isValid = false;

                errors['password'] =
                    'La nueva contraseña debe tener al menos 8 carácteres, un dígito, una mayúscula y un carácter especial.';
            }
        }


        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        if (sessionStorage.getItem('rol') === 'client') {
            return (
                <h1>Debes ser tener el rol Owner para poder acceder aquí</h1>
            )
        } else {
            return (
                <>
                    <div class='container-fluid'>
                        <div class='header'>
                            <h2>Mi Perfil</h2>
                        </div>
                        <hr></hr>
                        <form onSubmit={this.handleSubmit}>
                            <div class='row'>
                                <div class='col pr-1 md-6'>
                                    <div class='form-group my-1'>
                                        <label>Nombre</label>
                                        <input
                                            type='text'
                                            name='name'
                                            value={this.state.input.name}
                                            onChange={this.handleChange}
                                            class='form-control'
                                            id='name-owner'
                                        />
                                        <div class="text-danger">{this.state.errors.name}</div>
                                    </div>
                                </div>
                                <div class='col pl-1 md-6'>
                                    <div class='form-group my-1'>
                                        <label>Apellido</label>
                                        <input
                                            type='text'
                                            name='surname'
                                            value={this.state.input.surname}
                                            onChange={this.handleChange}
                                            class='form-control'
                                            id='surname-owner'
                                        />
                                        <div class="text-danger">{this.state.errors.surname}</div>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col pr-1 md-6'>
                                    <div class='form-group my-1'>
                                        <label>Email</label>
                                        <input
                                            type='email'
                                            name='email'
                                            value={this.state.input.email}
                                            onChange={this.handleChange}
                                            class='form-control'
                                            id='email-owner'
                                        />
                                        <div class="text-danger">{this.state.errors.email}</div>
                                    </div>
                                </div>
                                <div class='col pl-1 md-6'>
                                    <div class='form-group my-1'>
                                        <label>Teléfono</label>
                                        <input
                                            type='tel'
                                            name='phone'
                                            value={this.state.input.phone}
                                            onChange={this.handleChange}
                                            class='form-control'
                                            id='phone-owner'
                                        />
                                        <div class="text-danger">{this.state.errors.phone}</div>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col pr-1 md-6'>
                                    <div class='form-group my-1'>
                                        <label>Tu contraseña</label>
                                        <input
                                            type='password'
                                            name='old_password'
                                            value={this.state.input.old_password}
                                            placeholder='Ponga su contraseña para verificar los datos'
                                            onChange={this.handleChange}
                                            class='form-control'
                                            id='old-password-owner'
                                        />
                                        <div class="text-danger">{this.state.errors.old_password}</div>
                                    </div>
                                </div>
                                <div class='col pl-1 md-6'>
                                    <div class='form-group my-1'>
                                        <label>Nueva Contraseña</label>
                                        <input
                                            type='password'
                                            name='password'
                                            defaultValue={this.state.input.password}
                                            placeholder='Rellene este campo sólo si quiere cambiar la contraseña'
                                            onChange={this.handleChange}
                                            class='form-control'
                                            id='old-password-owner'
                                        />
                                        <div class="text-danger">{this.state.errors.password}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-center">
                                <input
                                    type="submit"
                                    value="Guardar cambios"
                                    class="btn btn-primary"
                                />
                            </div>
                        </form>
                        <div class='row '>
                            <div class="text-danger">{this.state.errorsApiPut == undefined ? "" : this.state.errorsApiPut.error}</div>
                        </div>
                        <div class='row'>
                            <div class="text-success">{this.state.msg == undefined ? "" : this.state.msg}</div>
                        </div>
                    </div>

                </>
            )
        }
    }
}