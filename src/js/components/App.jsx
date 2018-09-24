import React from 'react';
import {FooterContact} from './FooterContact.jsx';
import {Form} from './Form.jsx';


export class App extends React.Component {
    render(){
        return(
            <div>
                <div className="footer-banner">
                    <FooterContact/>
                </div>
                <div className="contact-banner">
                    <Form/>
                </div>
            </div>
        )
    }
}

