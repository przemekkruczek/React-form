import React from'react';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {formatDate, parseDate} from "react-day-picker/moment"
import axios from 'axios';

export class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            selectedDay: '',
            errors: []
        }
    };

    handleChangeName = event => {
        this.setState({
            name: event.target.value,
        })
    };
    handleChangeSurname = event => {
        this.setState({
            surname: event.target.value,
        })
    };
    handleChangeEmail = event => {
        this.setState({
            email: event.target.value,
        })
    };
    handleDayChange = day => {
        this.setState({
            selectedDay: day,
        })
    };
    handleSubmit = (event) => {
        event.preventDefault();

        console.log(this.state);

        const serverport = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            selectedDay: this.state.selectedDay
        };

        const { name, surname, email, selectedDay} = this.state;

        function handleValidation(name, surname, email, selectedDay) {
            const errors = [];

            if (name.length === 0) {
                errors.push("Name can't be empty");
            }
            if (surname.length === 0) {
                errors.push("Surname can't be empty");
            }
            if (email.length < 5) {
                errors.push("Email should be at least 5 charcters long");
            }
            if (email.split('').filter(x => x === '@').length !== 1) {
                errors.push("Email should contain a @");
            }
            if (email.indexOf('.') === -1) {
                errors.push("Email should contain at least one dot");
            }
            if (selectedDay.length === 0)  {
                errors.push("Please select day");
            }
            return errors;
        }
        const errors = handleValidation(name, surname, email, selectedDay);
        if (errors.length > 0) {
            this.setState({ errors });
            return;
        }
        axios.post('http://localhost:4200/serverport/add', serverport)
            .then(res => console.log(res.data));
        this.setState({
            name: '',
            surname: '',
            email: '',
            selectedDay: ''
        })
    };
    render(){
        const { errors } = this.state;
        return(
            <div className="send">
                <h1>Contact Form</h1>
                <form onSubmit={this.handleSubmit} className="send_form">
                    {errors.map(error => (<p key={error}>Error: {error}</p>))}
                    <div className="input_box">
                        <div className="avatar">
                            <i className="fas fa-user"/>
                        </div>
                            <div className="line"/>
                            <input type='text' value={this.state.name} onChange={this.handleChangeName} placeholder="First name" required/>
                        </div>
                    <div className="input_box">
                        <div className="avatar">
                            <i className="far fa-user"/>
                        </div>
                        <div className="line"/>
                            <input type='text' value={this.state.surname} onChange={this.handleChangeSurname} placeholder="Last name" required/>
                    </div>
                    <div className="input_box">
                        <div className="avatar">
                            <i className="fas fa-envelope"/>
                        </div>
                        <div className="line"/>
                        <input type='email' value={this.state.email} onChange={this.handleChangeEmail} placeholder="Email" required/>
                    </div>
                    <div className="input_box">
                        <div className="avatar">
                            <i className="far fa-calendar-alt"/>
                        </div>
                        <div className="line"/>
                        <DayPickerInput formatDate={formatDate} parseDate={parseDate} placeholder={`${formatDate(new Date())}`} onDayChange={this.handleDayChange} required={true}/>
                    </div>
                    <input className="btn_box" type="submit" value="Submit" />
                    <a href="http://localhost:4200/serverport/">View feedback</a>
                </form>
            </div>
        )
    }
}